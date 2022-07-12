//const and variables
let inputDir={x:0,y:0};
const foodSound=new Audio('Eating.wav');
const gameOverSound=new Audio('game_over.wav');
const moveSound=new Audio('direction_change.wav');
const musicSound=new Audio('game_continue.wav');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}]; 
let food={x:12,y:10}; 
//game functions
function main(ctime){
    window.requestAnimationFrame(main);
   // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(sarr)
{
    //if snake collide into itself

    for(let i=1;i<snakeArr.length;i++)
    {
        if(snakeArr[i].x===snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y)
        {
            return true;
        }

    }
    //if snake collide into the wall
    if(snakeArr[0].x>20||snakeArr[0].x<=0||snakeArr[0].y>17||snakeArr[0].y<=0)
    {
        return true;
    }
    return false;
}
function gameEngine(){
    //part1 : updating the array and food
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("press anykey to play again");
        snakeArr=[{x:13,y:15}];
        //musicSound.play();
        score=0;
        scoreBox.innerHTML="score: "+score;

    }


    //if snake have eaten the food increment the score and recreate the food
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x)
    {
        foodSound.play();
        score+=1;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.setItem("hicore",JSON.stringify(hiscoreval));
            highscoreBox.innerHTML="High-Score: "+hiscoreval;
        }
        scoreBox.innerHTML="score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=1;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};

    }

    //moving snake

    for(let i=snakeArr.length-2;i>=0;i--)
    {
        //const element=snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //part 2: display the snake and food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
     
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    highscoreBox.innerHTML="High-Score: "+hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:0};
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArroeRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});