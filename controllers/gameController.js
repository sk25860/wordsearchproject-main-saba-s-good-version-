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
            row.push(" "); // Initialize each cell with any value you want
        }
        grid.push(row);
    }
    return grid;
}

// Example usage:
var grid = createGrid(15, 15);
console.log(grid);


function placeWord(grid, word) {
    const directions = ['horizontal', 'vertical', 'diagonal'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const wordLength = word.length;
    const maxRowIndex = grid.length - 1;
    const maxColIndex = grid[0].length - 1;

    // Randomly choose starting position
    let startRow = Math.floor(Math.random() * grid.length);
    let startCol = Math.floor(Math.random() * grid[0].length);

    switch (randomDirection) {
        case 'horizontal':
            if (startCol + wordLength <= grid[0].length) {
                for (let i = 0; i < word.length; i++) {
                    grid[startRow][startCol + i] = word[i];
                }
            }
            break;
        case 'vertical':
            if (startRow + wordLength <= grid.length) {
                for (let i = 0; i < word.length; i++) {
                    grid[startRow + i][startCol] = word[i];
                }
            }
            break;
        case 'diagonal':
            if (startRow + wordLength <= grid.length && startCol + wordLength <= grid[0].length) {
                for (let i = 0; i < word.length; i++) {
                    grid[startRow + i][startCol + i] = word[i];
                }
            }
            break;
        default:
            console.error('Invalid direction');
    }

    // Log the grid after placing the word
    console.log(grid);
}

// Example usage:
var grid = createGrid(15, 15);
placeWord(grid, "exampleWord");


export const getRelatedWords = async (req, res) => {
    const word = req.body.word;
    try {
        const response = await axios.get(`https://api.datamuse.com/words?rel_jja=${encodeURIComponent(word)}&max=10`);
        const words = response.data.map(wordData => wordData.word);

        // Create a 15x15 grid
        const grid = createGrid(15, 15);

        // Place the theme word and related words in the grid
        placeWord(grid, word);
        words.forEach(relatedWord => placeWord(grid, relatedWord));

        // Render the grid and related words
        res.render('index', { word, words, grid });
    } catch (error) {
        console.error(`Failed to fetch ${word}-related words:`, error.message);
        res.status(500).send(`Failed to fetch ${word}-related words`);
    }
};


