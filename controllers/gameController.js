import User from '../Models/User.js';

import axios from 'axios';

const API_BASE_URL = 'https://api.datamuse.com/words';

//module.exports = {
  //getWords,
//};


function createGrid(rows, cols) {
    var grid = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            row.push(""); // You can initialize each cell with any value you want
        }
        grid.push(row);
    }
    return grid;
}

// Example usage:
var grid = createGrid(15, 15);
console.log(grid); // This will log the 20x20 grid to the console

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

