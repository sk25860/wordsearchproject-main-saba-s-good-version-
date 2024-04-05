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
