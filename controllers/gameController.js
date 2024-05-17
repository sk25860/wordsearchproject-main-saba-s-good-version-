import axios from 'axios';
import User from '../Models/User.js';

const API_BASE_URL = 'https://api.datamuse.com/words';

export function createGrid (rows, cols) {
   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
   const grid = [];
   for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
         row.push(" "); // Initialize each cell with any value you want
      }
      grid.push(row);
   }
   for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
         if (grid[i][j] === " ") {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            grid[i][j] = alphabet[randomIndex];
         }
      }
   }
   return grid;
}

function placeWord(grid, word) {
    const directions = ['horizontal', 'vertical', 'diagonal'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const wordLength = word.length;

    const canPlaceWord = (row, col, direction) => {
        if (direction === 'horizontal') {
            return col + wordLength <= grid[0].length;
        } else if (direction === 'vertical') {
            return row + wordLength <= grid.length;
        } else if (direction === 'diagonal') {
            return row + wordLength <= grid.length && col + wordLength <= grid[0].length;
        }
        return false;
    };

    const findStartPosition = () => {
        let startRow, startCol;
        do {
            startRow = Math.floor(Math.random() * (grid.length - word.length));
            startCol = Math.floor(Math.random() * (grid[0].length - word.length));
        } while (!canPlaceWord(startRow, startCol, randomDirection));
        return { startRow, startCol };
    };

    const { startRow, startCol } = findStartPosition();

    switch (randomDirection) {
        case 'horizontal':
            for (let i = 0; i < word.length; i++) {
                grid[startRow][startCol + i] = word[i];
            }
            break;
        case 'vertical':
            for (let i = 0; i < word.length; i++) {
                grid[startRow + i][startCol] = word[i];
            }
            break;
        case 'diagonal':
            for (let i = 0; i < word.length; i++) {
                grid[startRow + i][startCol + i] = word[i];
            }
            break;
        default:
            console.error('Invalid direction');
    }
}

export const getRelatedWords = async (req, res) => {
    const word = req.body.word;
    try {
        const response = await axios.get(`${API_BASE_URL}?rel_syn=${encodeURIComponent(word)}&max=10`);
        const words = response.data.map(wordData => wordData.word);
        
        const wordArray = words.slice(); 
        wordArray.unshift(word); 
        
        // Create a 15x15 grid
        const grid = createGrid(15, 15);
        placeWord(grid, word);
        words.forEach(word => placeWord(grid, word));
        
        const user = await User.findOneAndUpdate(
            { name: req.user.name }, 
            { $push: { "Userwords.UserwordArray": wordArray } },
            { new: true, upsert: true } 
        );
        
        res.render('index', { word, words, grid });

    } catch (error) {
        console.error(`Failed to fetch ${word}-related words:`, error.message);
        res.status(500).send(`Failed to fetch ${word}-related words`);
    }
};


