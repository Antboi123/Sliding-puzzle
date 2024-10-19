const puzzleElement = document.getElementById('puzzle');
const shuffleButton = document.getElementById('shuffle');

let tiles = [...Array(8).keys(), null]; // 0-7 are tile numbers, null is the empty space

// Function to create puzzle tiles
function createTiles() {
    puzzleElement.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.className = tile === null ? 'tile empty' : 'tile';
        tileElement.innerText = tile !== null ? tile + 1 : '';
        tileElement.dataset.index = index;
        tileElement.addEventListener('click', () => handleTileClick(index));
        puzzleElement.appendChild(tileElement);
    });
}

// Function to handle tile clicks
function handleTileClick(index) {
    const emptyIndex = tiles.indexOf(null);
    const adjacentIndices = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3]; // left, right, up, down

    if (adjacentIndices.includes(index)) {
        // Swap tiles
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        createTiles();
        checkWin();
    }
}

// Function to shuffle tiles
function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    createTiles();
}

// Function to check for win condition
function checkWin() {
    if (tiles.join(',') === [...Array(8).keys(), null].join(',')) {
        setTimeout(() => alert('Congratulations! You solved the puzzle!'), 100);
    }
}

// Initial setup
createTiles();
shuffleButton.addEventListener('click', shuffleTiles);


