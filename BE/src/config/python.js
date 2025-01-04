// createConfig.js
const fs = require('fs');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'blog_the_thao'
};

// Lưu vào file config.json
fs.writeFileSync('config.json', JSON.stringify(dbConfig, null, 2));
console.log('Cấu hình đã được lưu vào config.json');
