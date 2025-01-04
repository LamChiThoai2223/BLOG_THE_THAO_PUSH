import axios from 'axios';

const API_URL = 'https://api.yourwebsite.com';

// Function to fetch sports articles
export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
