const fs = require('fs');
const items = require('./weaponData');

// Initialize an empty results array outside of the fs.watch callback
let results = [];

// Function to find an item by id or numerical_id
function findItem(searchTerm) {
  let result;

  // Check if searchTerm is a number
  if (!isNaN(searchTerm)) {
    result = items.find(item => item.numerical_id === parseInt(searchTerm, 10));
  } else {
    // If searchTerm is not a number, search by type
    result = items.filter(item => item.type === searchTerm);
  }

  return result; // No need to handle failure here
}

// Function to write data to output.json
function writeToOutput(data) {
  fs.writeFile('output.json', JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error('Error writing to output.json:', err);
    } else {
      console.log('Data written to output.json');
    }
  });
}

// Watch the input.txt file for changes
fs.watch('input.txt', (eventType, filename) => {
  if (filename && eventType === 'change') {
    console.log(`input.txt has been modified`);

    fs.readFile('input.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading input.txt:', err);
        return;
      }

      results = []; // Reset results array on each file change
      const lines = data.trim().split('\n');

      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine) {
          let foundItem = findItem(trimmedLine);
          if (foundItem && foundItem.length > 0) {
            results.push(foundItem); // Push the found items into the results array
          }
        }
      });

      writeToOutput(results);
    });
  }
});

console.log('Watching for file changes on input.txt');
