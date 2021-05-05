//Pausing game on canvas. Function Pause
// function pauseGameKeyHandler(e) {
//     var keyCode = e.key;
//     switch (keyCode) {
//         case 80: //pause key code
//             togglePause();
//             break;
//     }
// };

// function togglePause() {
//     let gamePaused = false;
//     if (gamePaused = !gamePaused) {
//         !gamePaused == true;
//     }
// };

let gamePaused = document.getElementById("pauseButton");
gamePaused.addEventListener("click", (pause) => {
    pause.preventDefault();
    alert("Game is paused");
    if (!gamePaused)
      togglePause(); 
});

