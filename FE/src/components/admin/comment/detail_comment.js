// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchCommentDetails } from '../../../services/Comment';

// const CommentDetails = () => {
//     const { commentId } = useParams();
//     const [comment, setComment] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchCommentDetails(commentId, setComment, setError);
//     }, [commentId]);

//     if (error) {
//         return <div className="text-danger">Error: {error}</div>;
//     }

//     if (!comment) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className='app'>
//             <div className='app-wrapper-admin'>
//                 <div className="app-content pt-3 p-md-3 p-lg-4">
//                     <div className="container-xl card">
//                         <div className="card-body">
//                             <h1 className="app-page-title mb-0">Comment Details</h1>
//                             <div>
//                                 <h2>Comment ID: {comment.comment_id}</h2>
//                                 <p>User: {comment.user_id}</p>
//                                 <p>Content: {comment.content}</p>
//                                 <p>Comment Date: {new Date(comment.create_at).toLocaleDateString()}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CommentDetails;
