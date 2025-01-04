const bannedWords = require('./bannedWords');

const checkBannedWords = (text) => {

    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

    const matchedWords = words.filter(word => bannedWords.has(word));
    return matchedWords;
};

module.exports = checkBannedWords;