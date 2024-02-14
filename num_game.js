// ---- Status ----

// 변수 선언

let introNum = 1;
let introControl = "intro1";

let randomNum = 0;
let chances = 5;

let gameOver = false;
let inputRecord = [] ;

let recordText = "";

let upDown = "";

// html elemenet 연결



let userInput = document.getElementById("user-input");

let startButton = document.getElementById("start-button");
let nextButton1 = document.getElementById("next1");
let nextButton2 = document.getElementById("next2");
let nextButton3 = document.getElementById("next3");
let gameButton = document.getElementById("game");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");


let startBox = document.getElementById("start-box");
let introBox = document.getElementById("intro-box");
let playBox = document.getElementById("play-box");

let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let recordArea = document.getElementById("record-area");

// EventListner

startButton.addEventListener("click",start);
nextButton1.addEventListener("click",next);
nextButton2.addEventListener("click",next);
nextButton3.addEventListener("click",next);
gameButton.addEventListener("click",game);
playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);


userInput.addEventListener("focus",function(){
    userInput.value="";
});

userInput.addEventListener('keyup', function(e){
    if(e.key == 'Enter'){
        play()
    }
})

// ---- functions ----

function start(){
    startBox.classList.add('hidden');
    introBox.classList.remove('hidden');
}

function next(){
    document.getElementById(introControl).classList.add("hidden");
    introNum++;
    introControl = "intro" + introNum;
    document.getElementById(introControl).classList.remove("hidden");   
}

function game(){
    introBox.classList.add('hidden');
    playBox.classList.remove('hidden');
}

function pickRandomNum(){
    randomNum = Math.floor(Math.random()*100) + 1;
    console.log("정답",randomNum);
};

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100){
        resultArea.textContent = `1에서 100 사이라고 말한 것 못 들었어?`;
        return
    }

    if (inputRecord.includes(userValue)) {
        resultArea.textContent = `${userValue}은 이미 말했어. 다른 숫자를 말하라고`;
        return
    }

    chances --;
    chanceArea.textContent = `남은 기회: ${chances}`;

    if (userValue < randomNum) {
        resultArea.textContent = `UP!!!! 통 크게 불러봐!`;
        userInput.value="";
        upDown = "↑";

    } else if (userValue > randomNum){
        resultArea.textContent = `Down!!!! 더 작은 수라고.`;
        userInput.value="";
        upDown = "↓";
    } else {
        resultArea.textContent = `정답!! 정말 맞출지는 몰랐는데!!`;
        playButton.disabled = true;
        upDown = "★";
        inputRecord.push(userValue + upDown);
        recordArea.textContent = `지난 입력값 :  ${inputRecord}`;
        return
    };

    inputRecord.push(userValue + upDown);
    recordArea.textContent = `지난 입력값 :  ${inputRecord}`;

    if ( chances == 0) {
        resultArea.textContent = `Game Over! 정답은 ${randomNum}였어.`;
        playButton.disabled = true;
    };

};

function reset() {

    pickRandomNum();
    chances = 5;
    gameOver = false;
    resultArea.textContent = `좋아. 다시 한번 도전해봐`;
    chanceArea.textContent = `남은 기회: ${chances}`;
    recordArea.textContent = "지난 입력값 :  ";
    playButton.disabled = false;
    inputRecord = [] ;
};

// ---- Run Code ----

pickRandomNum();
