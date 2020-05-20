//canvas


//Snake
var swipedir;
var dir = "X";
var snake_speed=150;
//box
var box = 25;

if (window.matchMedia("(max-width: 600px)").matches) {
  /* The viewport is less than, or equal to, 700 pixels wide */
  box=25;
}
//images

const ground = new Image();
ground.src = 'image/ground.png';

const foodimg = new Image();
foodimg.src = "image/frog.png";
//audio
var click_sound = new Audio();
click_sound.src = 'sound/btn-click.mp3';

var eat_sound = new Audio();
eat_sound.src = 'sound/eat.mp3';

var gameover_sound = new Audio();
gameover_sound.src = 'sound/gameover.mp3';

//score
var score=0;
//wall
var wall;



//maze_side
var maze_side = [];
for (let k = 0; k < 49; k++) {
  if (k >= 0 && k < 5) {
    maze_side[k] = {
      x: 3 * box,
      y: (3 + k) * box
    }
  } else if (k >= 5 && k < 9) {
    maze_side[k] = {
      x: (k - 1) * box,
      y: 3 * box
    }
  } else if (k >= 9 && k < 14) {
    maze_side[k] = {
      x: 17 * box,
      y: (k - 6) * box
    }
  } else if (k >= 14 && k < 18) {
    maze_side[k] = {
      x: (k - 1) * box,
      y: 3 * box
    }
  } else if (k >= 18 && k < 23) {
    maze_side[k] = {
      x: 3 * box,
      y: (k - 5) * box
    }
  } else if (k >= 23 && k < 27) {
    maze_side[k] = {
      x: (k - 19) * box,
      y: 17 * box
    }
  } else if (k >= 27 && k < 32) {
    maze_side[k] = {
      x: 17 * box,
      y: (k - 14) * box
    }
  } else if (k >= 32 && k < 36) {
    maze_side[k] = {
      x: (k - 19) * box,
      y: 17 * box
    }
  } else if (k >= 36 && k < 43) {
    maze_side[k] = {
      x: (k - 29) * box,
      y: 10 * box
    }
  } else if (k >= 43 && k < 46)
    maze_side[k] = {
      x: 10 * box,
      y: (k - 36) * box
    }
  else if (k >= 46 && k < 49) {
    maze_side[k] = {
      x: 10 * box,
      y: (k - 35) * box
    }
  }

}
function mfunc(){
  location.reload();
}
//game start from Menu
function game_start(){
  showScreen(0);
}


//html elements

let snake = [];
snake[0] = {
  x: 10 * box,
  y: 2 * box
}
//generate_random generate_number

//set food coordinates

//food
function slow(){
  snake_speed-=20;
}
function fast(){
  snake_speed+=20;
  alert("speed up");
}
var paused = false;
function pauseGame(){
  paused = !paused;

}
 function resumeGame(){
   paused = false;
 }





function generate_food(){}


function check(a,b){
  var num=0;
  for(let s=0;s<3;s++){
    if(a == maze_side[s].x || b == maze_side[s].y)
    num++;
  }
if(num!=0)
  return 0;
  else return 1;
}
function gen_number(max){
  var obj = {
    x:175,
    y:175
  }
  obj.x = Math.floor((Math.random() * max) + 1)*box ;
  obj.y = Math.floor((Math.random() * max )+ 1)*box ;
  if(check(obj.x,obj.y))
    return obj;

}

var f = {
  x:175,
  y:175
}

var set = Object.assign(f,gen_number(9));

var food = {
  x:f.x,
  y:f.y
}
var speed_x = 0 ;
var speed_y = 0;
 function speedShow(dir){

   var speed = box/(snake_speed/100);
    speed=speed.toFixed(2);
    if(dir == "X"){
    speed_x = speed;
    speed_y = 0;
    }
       else if(dir == "Y"){
         speed_x = 0;
         speed_y = speed;
       }
       else if(paused = true){
         speed_x = 0;
         speed_y = 0;
       }
 }


//snake direction
let d;
document.addEventListener("keydown", direction);

function direction(event) {

  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
    click_sound.play();
    dir = "X";
    speedShow(dir);
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
    click_sound.play();
    dir = "Y";
    speedShow(dir);
  } else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
    click_sound.play();
    dir = "X";
    speedShow(dir);
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
    click_sound.play();
    dir = "Y";
    speedShow(dir);
  }
}
//collision
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y)
      return true;
  }
  return false;
}
//maze collision
function maze_collision(head, maze_side) {
  for (k = 0; k < 49; k++) {
    if (head.x == maze_side[k].x && head.y == maze_side[k].y)
      return true;
  }
  return false;
}


//draw everything
function draw() {
if(paused){
  document.getElementById("speed_show_x").innerHTML = 0;
  document.getElementById("speed_show_y").innerHTML = 0;
  return ;

}


  document.getElementById("speed_show_x").innerHTML = speed_x;
  document.getElementById("speed_show_y").innerHTML = speed_y;

  ctx.drawImage(ground, 0, 0, 525, 525);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "green" : "blue";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  //maze_sude draw
  for (k = 0; k < 49; k++) {
    ctx.fillStyle = "red";
    ctx.fillRect(maze_side[k].x, maze_side[k].y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(maze_side[k].x, maze_side[k].y, box, box);

  }
  ctx.drawImage(foodimg, food.x, food.y, box, box);


  //old head positions
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  //direction
  if (d == "LEFT" || swipedir== 'left') snakeX -= box;
  if (d == "UP" || swipedir== 'up') snakeY -= box;
  if (d == "RIGHT" || swipedir== 'right') snakeX += box;
  if (d == "DOWN" || swipedir== 'down') snakeY += box;

  document.getElementById("myText").innerHTML = score;
  //eat food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    document.getElementById("myText").innerHTML = score;

frog = Object.assign(f,gen_number(9));
    food = {
      x: f.x,
      y: f.y
    }
    eat_sound.play();
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }
  //gameover
  if (snakeX < 0 || snakeX > 20 * box || snakeY < 0 || snakeY > 20 * box || collision(newHead, snake) || maze_collision(newHead, maze_side)) {
    clearInterval(game);
    gameover_sound.play();
    showScreen(2);
    document.getElementById("gameover").innerHTML = score;
  }


  snake.unshift(newHead);


}
let game = setInterval(draw,snake_speed);



//showscreen
var showScreen = function(screen_opt){
    switch(screen_opt){

        case 0:  screen_snake.style.display = "block";
                 screen_menu.style.display = "none";
                 screen_gameover.style.display = "none";
                 break;

        case 1:  screen_snake.style.display = "none";
                 screen_menu.style.display = "block";

                 screen_gameover.style.display = "none";
                 break;

        case 2:  screen_snake.style.display = "none";
                 screen_menu.style.display = "none";

                 screen_gameover.style.display = "block";
                 break;

             }
         }
         window.onload = function(){

             canvas = document.getElementById("canvas");
             ctx = canvas.getContext("2d");

                 // Screens
                 screen_snake = document.getElementById("snake");
                 screen_menu = document.getElementById("menu");
                 screen_gameover = document.getElementById("game-over");



                 // Buttons
                 button_newgame_menu = document.getElementById("newgame_menu");
                 button_newgame_gameover = document.getElementById("newgame_gameover");
                 btn_speed_up = document.getElementById("speed_up");
                 btn_speed_down = document.getElementById("speed_down");






                showScreen(1);
                 document.onkeydown = function(evt){
                     if(screen_gameover.style.display == "block"){
                         evt = evt || window.event;
                         if(evt.keyCode == 32){

                         }
                     }
                 }
                 function swipedetect(el, callback){

                     var touchsurface = el,

                     startX,
                     startY,
                     distX,
                     distY,
                     threshold = 150, //required min distance traveled to be considered swipe
                     restraint = 100, // maximum distance allowed at the same time in perpendicular direction
                     allowedTime = 300, // maximum time allowed to travel that distance
                     elapsedTime,
                     startTime,
                     handleswipe = callback || function(swipedir){}
                     touchsurface.addEventListener('touchstart', function(e){
                           var touchobj = e.changedTouches[0]
                           swipedir = 'none'
                           dist = 0
                           startX = touchobj.pageX
                           startY = touchobj.pageY
                           startTime = new Date().getTime() // record time when finger first makes contact with surface
                           e.preventDefault()
                       }, false)

                       touchsurface.addEventListener('touchmove', function(e){
                           e.preventDefault() // prevent scrolling when inside DIV
                       }, false)
                       touchsurface.addEventListener('touchend', function(e){
                         var touchobj = e.changedTouches[0]
                         distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
                         distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
                         elapsedTime = new Date().getTime() - startTime // get time elapsed
                         if (elapsedTime <= allowedTime){ // first condition for awipe met
                             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                                 swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                             }
                             else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                                 swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                             }
                         }

                         e.preventDefault()
                     }, false)
                 }
               }
