import sys
import pandas as pd
import json
from sqlalchemy import create_engine
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import os

# Đọc cấu hình từ file JSON
def load_db_config():
    config_path = os.path.join(os.path.dirname(__file__), 'config.json')
    with open(config_path, 'r') as file:
        config = json.load(file)
    return config

# Kết nối tới database MySQL
def connect_db():
    config = load_db_config()
    connection_string = f"mysql+mysqlconnector://{config['user']}:{config['password']}@{config['host']}/{config['database']}"
    engine = create_engine(connection_string)
    return engine

# Hàm gợi ý bài viết với log phần trăm tương tự (tìm theo id)
def get_recommendations(blog_id, user_id=None):
    engine = connect_db()

    # Truy vấn lấy danh sách bài viết, bao gồm thông tin tác giả và trạng thái chặn
    if user_id is not None:
        query = """
            SELECT b.blog_id, b.title, b.context, b.image, b.author_id
            FROM blogs b
            LEFT JOIN blocked_users bu
            ON bu.blocked_id = b.author_id AND bu.blocker_id = %s
            WHERE bu.blocked_id IS NULL
        """
        params = (user_id,)
    else:
        query = """
            SELECT b.blog_id, b.title, b.context, b.image, b.author_id
            FROM blogs b
        """
        params = ()  # Không có user_id

    # Lấy dữ liệu từ database
    df2 = pd.read_sql(query, engine, params=params)
    df2['context'] = df2['context'].fillna('')  # Xử lý giá trị NaN trong nội dung bài viết

    # Kiểm tra nếu blog_id không tồn tại
    try:
        idx = df2[df2['blog_id'] == int(blog_id)].index[0]
    except IndexError:
        available_ids = df2['blog_id'].tolist()
        return {
            "error": f"Blog ID '{blog_id}' không tìm thấy. Danh sách ID có sẵn: {available_ids}"
        }

    # Tính toán TF-IDF và độ tương đồng cosine
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(df2['context'])

    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = [score for score in sim_scores if score[1] <= 0.6]
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6]  # Lấy 5 bài viết tương tự nhất, bỏ qua chính bài viết hiện tại

    # Lấy danh sách bài viết gợi ý
    blog_indices = [i[0] for i in sim_scores]

    # Chuẩn bị dữ liệu phần trăm tương tự
    similarity_data = []
    for i in sim_scores:
        similarity_percent = round(i[1] * 100, 2)
        similarity_percent_str = f"{similarity_percent}%"
        similarity_data.append({
            "blog_id": int(df2.iloc[i[0]]['blog_id']),
            "similarity_percent": similarity_percent_str
        })

    # Chuẩn bị danh sách bài viết được gợi ý
    suggested_blogs = df2[['blog_id', 'title', 'context', 'image', 'author_id']].iloc[blog_indices]
    suggested_blogs['blog_id'] = suggested_blogs['blog_id'].astype(int)  # Đảm bảo kiểu dữ liệu hợp lệ
    suggested_blogs = suggested_blogs.to_dict(orient='records')

    # Trả về kết quả
    return {
        "similarity_data": similarity_data,
        "recommended_blogs": suggested_blogs
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Thiếu tham số blog_id"}, ensure_ascii=False))
        sys.exit(1)

    blog_id = int(sys.argv[1])  # Chuyển sang kiểu số nguyên
    user_id = None

    if len(sys.argv) > 2:
        user_id = int(sys.argv[2])  # Chuyển sang kiểu số nguyên nếu có

    recommendations = get_recommendations(blog_id, user_id)

    # Trả về dữ liệu JSON hợp lệ
    sys.stdout.buffer.write(json.dumps(recommendations, ensure_ascii=False).encode('utf-8'))
