// Define the size of each tile and the player
let tileSize = 50;
let playerSize = 50;

// Initial position of the player
let playerX = 50;
let playerY = 50;

// Define the map with 1s representing solid tiles and 0s representing empty tiles
let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Define the game section and corresponding text
let section = 0;
let sectionText = [
    "Section 1: Introduction",
    "Section 2: Movement",
    "Section 3: Collision Detection",
    "Section 4: Additional Mechanics"
];

// Define properties of the enemy
let enemyX = 300;
let enemyY = 200;
let enemySize = 30;
let enemySpeed = 3;

// Define properties of the collectible
let collectibleX = 250;
let collectibleY = 300;
let collectibleSize = 30;
let collected = false;

function setup() {
    createCanvas(500, 350);
}

function draw() {
    background(255); // Clear the canvas

    // Draw the map
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === 1) { // Draw solid tiles
                fill(0);
                rect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    // Draw the player
    fill(255, 182, 193); // Pink color for the player
    rect(playerX, playerY, playerSize, playerSize);

    // Draw the enemy
    fill(173, 216, 230); // Light blue color for the enemy
    rect(enemyX, enemyY, enemySize, enemySize);

    // Draw the collectible
    if (!collected) {
        fill(255, 255, 153); // Light yellow color for the collectible
        ellipse(collectibleX, collectibleY, collectibleSize, collectibleSize);
    }

    // Draw the section text
    textSize(20);
    textAlign(CENTER);
    fill(0);
    text(sectionText[section], width / 2, height - 20);

    // Update enemy position
    enemyX += enemySpeed;
    if (enemyX <= 0 || enemyX >= width - enemySize) {
        enemySpeed *= -1;
    }

    // Check for collision with the enemy
    if (playerX + playerSize >= enemyX && playerX <= enemyX + enemySize &&
        playerY + playerSize >= enemyY && playerY <= enemyY + enemySize) {
        playerX = 50;
        playerY = 50;
    }

    // Check for collection of the collectible
    if (!collected && dist(playerX + playerSize / 2, playerY + playerSize / 2, collectibleX, collectibleY) < playerSize / 2 + collectibleSize / 2) {
        collected = true;
    }

    // Continuous player movement
    if (keyIsDown(LEFT_ARROW) && !checkCollision(playerX - 5, playerY)) {
        playerX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && !checkCollision(playerX + playerSize + 5, playerY)) {
        playerX += 5;
    }
    if (keyIsDown(UP_ARROW) && !checkCollision(playerX, playerY - 5)) {
        playerY -= 5;
    }
    if (keyIsDown(DOWN_ARROW) && !checkCollision(playerX, playerY + playerSize + 5)) {
        playerY += 5;
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        section++;
        if (section >= sectionText.length) {
            section = 0;
        }
    }
}

function checkCollision(x, y) {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[0].length; col++) {
            if (map[row][col] === 1) {
                let tileLeft = col * tileSize;
                let tileRight = tileLeft + tileSize;
                let tileTop = row * tileSize;
                let tileBottom = tileTop + tileSize;

                if (x + playerSize > tileLeft && x < tileRight &&
                    y + playerSize > tileTop && y < tileBottom) {
                    return true; // Collision detected
                }
            }
        }
    }
    return false; // No collision detected
}
