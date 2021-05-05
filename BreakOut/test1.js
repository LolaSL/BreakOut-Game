//BREAKOUT JAVASCRIPT -CODE EXPLAINED
// the button "START GAME" by onclick opens the canvas with all features.
function startGame(){
alert('Game starts!');
var canvas = document.getElementById("myCanvas"); // retrieves the node in the DOM representing the <canvas> element by calling the document.getElementById() method. 
var ctx = canvas.getContext("2d"); // access the drawing context using its getContext() method.
canvas.style.border = "2px solid #000"; //canvas border color
canvas.style.background = "#655858"; //canvas backgroung color
canvas.style.display = "block"; //display stipulation
var ballRadius = 10; //ball radius
var x = canvas.width / 2; //x position on canvas -coordinate of the arc's center
var y = canvas.height - 30; //y position on canvas -coordinate of the arc's center
var dx = 3; //delta of drawn appearance new position of x
var dy = -3; //delta of drawn appearance new position of y
var paddleHeight = 20;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false; //at the beginning the control button is not pressed.
var leftPressed = false; //at the beginning the control button is not pressed.
var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0; //score variable
var lives = 3; //player's number of lives
// Create bricks
var bricks = []; //array Object 
for (var c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = []; // array
    for (var r = 0; r < brickRowCount; r += 1) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        }; // two-dimensional array, where c - brick columns, r - the brick rows, x and y position to paint each brick on the screen.
    }
}
// Control paddle -"ArrowRight" and "ArrowLeft"
document.addEventListener("keydown", keyDownHandler, false); //event listener for keydown; false -control button is not pressed
document.addEventListener("keyup", keyUpHandler, false); //event listener for keyup; false -control button is not pressed
document.addEventListener("mousemove", mouseMoveHandler, false); //event listener for mouse; false -control button is not pressed

//function is handling keydown event -e ; code will be run when the button keydown is pressed.
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") { //right cursor keys
        rightPressed = true; //when press a key down
    } else if (e.key == "Left" || e.key == "ArrowLeft") { //right cursor keys
        leftPressed = true; //when press a key up
    }
}
//function is handling keyup event -e ; code will be run when the button keyup is pressed.
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false; //when the key is released
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false; ////when the key is released
    }
}
// Anchoring the paddle movement to the mouse movement
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft; //relativeX value, which is equal to the horizontal mouse position in the viewport (e.clientX) minus the distance between the left edge of the canvas and left edge of the viewport (canvas.offsetLeft)
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2; //relativeX value minus half the width of the paddle,  movement will actually be relative to the middle of the paddle
    }
}

// Collisions detection
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c += 1) {
        for (var r = 0; r < brickRowCount; r += 1) {
            var b = bricks[c][r]; //b -variable for storing the brick object in every loop of the collision detection
            if (b.status == 1) { // if status is 1, then drawing the brick 
                // The x position of the ball is greater than the x position of the brick.
                // The x position of the ball is less than the x position of the brick plus its width.
                // The y position of the ball is greater than the y position of the brick.
                // The y position of the ball is less than the y position of the brick plus its height.
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0; //if status is equal to 0, then it was hit by the ball and it will not be shown on the screen
                    score += 1; //increment the value of the score variable each time a collision is detected
                    if (score == brickRowCount * brickColumnCount) { //condition of destroying all bricks
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload(); //method is used to reload the current document
                    }
                }
            }
        }
    }
}
// Drawing the Ball
function drawBall() {
    ctx.beginPath(); //method  to create a new path.
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // arc radius; 0 -start angle, Math.PI * 2 -end angle 360;
    ctx.fillStyle = "#c50d0d"; //fillstyle - specified the color of ball
    ctx.fill(); // method  fills the current path with the current fillStyle.
    ctx.strokeStyle = "#cab4b4"; //outline filling color
    ctx.stroke(); //method  which strokes (outlines) the current  path with the current stroke style.
    ctx.closePath(); //method, which automatically connects the shape's first and last points.
}
// Drawing the Paddle
function drawPaddle() {
    ctx.beginPath(); //method  to create a new path.
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); //The rect() method creates a rectangle.
    ctx.fillStyle = "#c50d0d"; //fillstyle specified the color of paddle
    ctx.fill(); // method fills the current path with the current fillStyle.
    ctx.strokeStyle = "#cab4b4"; //outline filling color
    ctx.strokeRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.closePath(); //method, which automatically connects the shape's first and last points.
}
// Drawing the bricks in two-dimensional array
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c += 1) {
        for (var r = 0; r < brickRowCount; r += 1) {
            if (bricks[c][r].status == 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath(); //method  to create a new path.
                ctx.rect(brickX, brickY, brickWidth, brickHeight); //The rect() method creates a brick
                ctx.fillStyle = "#d15010"; //fillstyle specified the color of brick
                ctx.fill(); // method fills the current path with the current fillStyle.
                ctx.strokeStyle = "#cab4b4"; //outline filling color
                ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
                ctx.closePath(); //method, which automatically connects the shape's first and last points.
            }
        }
    }
}
// Score
function drawScore() {
    ctx.font = "16px Arial"; //the font property sets the current font properties for text content on the canvas.
    ctx.fillStyle = "#c50d0d"; //fillstyle - specified the color of score
    ctx.fillText("Score: " + score, 8, 20,) // canvas coordinates for Score
}
// Lives
function drawLives() {
    ctx.font = "16px Arial"; //the font property sets the current font properties for text content on the canvas.
    ctx.fillStyle = "#c50d0d"; //fillstyle - specified the color of lives
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20); // canvas coordinates for Score
}
// Draw game attributes
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //method which sets the pixels in a rectangular area to transparent black
    drawBricks(); //to draw the bricks to the canvas
    drawBall(); //to draw the ball to the canvas
    drawPaddle(); //to draw the paddle to the canvas
    drawScore(); //to draw the score to the canvas
    drawLives(); //to draw the lives to the canvas
    collisionDetection(); //code enables the collision detection for the ball and bricks
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { //Bouncing off to the left and to the right sides
        dx = -dx;
    }
    if (y + dy < ballRadius) { // Bouncing off to the top
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) { // bouncing off 
        if (x > paddleX && x < paddleX + paddleWidth) { //hits the paddle
            dy = -dy;
        } else {
            lives--;
            if (!lives) { // if not equal to lives quantity
                alert("GAME OVER");
                document.location.reload(); // position of the ball and the paddle are reset
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3; //delta of drawn appearance new position of x
                dy = -3; //delta of drawn appearance new position of y
                paddleX = (canvas.width - paddleWidth) / 2; //if there are still some lives left, position of  the  ball movement
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7; //If the right cursor is pressed and paddleX less than canvas.width  substract paddleWidth; paddle will move seven pixels to the left
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7; //If the left cursor is pressed and paddleX is greater than zero; paddle will move seven pixels to the right
    }
    x += dx; //drawing the ball on updated x value for next frame
    y += dy; //drawing the ball on  updated y value for next frame
    }
setInterval(draw, 20);
}
//the button "Close" by onclick closes the canvas with all features.
function closeGame() {
    const canvas = document.getElementById("myCanvas")
    canvas.style.display = "none";
}