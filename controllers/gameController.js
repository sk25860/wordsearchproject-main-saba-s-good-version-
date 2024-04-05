import User from '../Models/User.js';

import axios from 'axios';

const API_BASE_URL = 'https://api.datamuse.com/words';

//module.exports = {
  //getWords,
//};

export const getRelatedWords = async (req, res) => {
   const word = req.body.word;
    try {
        const response = await axios.get(`https://api.datamuse.com/words?rel_jja=${encodeURIComponent(word)}&max=10`);
       console.log(response); 
       const words = response.data.map(wordData => wordData.word);
        res.render('index', { word, words });
    } catch (error) {
        console.error(`Failed to fetch ${word}-related words:`, error.message);
        res.status(500).send(`Failed to fetch ${word}-related words`);
    }
}
