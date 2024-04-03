import User from '../Models/User.js';

import axios from 'axios';

const API_BASE_URL = 'https://api.datamuse.com/words';

export const getWords = async (req, res) => {
  const category = req.params.category;
  const apiUrl = `${API_BASE_URL}?${category}`;

  try {
    const response = await axios.get(apiUrl);
    const words = response.data.slice(0, 10).map(word => word.word);
    res.render('index', { words });
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).send('Internal Server Error');
  }
}

//module.exports = {
  //getWords,
//};
