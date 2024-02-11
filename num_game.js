// ---- Status ----

// 변수 선언

let randomNum = 0;
let chances = 5;

let gameOver = false;
let inputRecord = [] ;

let recordText = "";

// html elemenet 연결

let userInput = document.getElementById("user-input");

let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");

let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let recordArea = document.getElementById("record-area");

// EventListner

playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){
    userInput.value="";
});

// ---- functions ----

function pickRandomNum(){
    randomNum = Math.floor(Math.random()*100) + 1;
    console.log("정답",randomNum);
};

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100){
        resultArea.textContent = "1~100 사이의 값을 넣어주세요";
        return
    }

    if (inputRecord.includes(userValue)) {
        resultArea.textContent = `${userValue}는 이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.`;
        return
    }

    chances --;
    chanceArea.textContent = `남은 기회: ${chances}`;

    if (userValue < randomNum) {
        resultArea.textContent = "UP!!!!"
    } else if (userValue > randomNum){
        resultArea.textContent = "Down!!!!"
    } else {
        resultArea.textContent = "정답!";
        playButton.disabled = true;
        return
    }

    if ( chances == 0) {
        resultArea.textContent = "Game Over";
        playButton.disabled = true;
    }

    inputRecord.push(userValue);

    recordArea.textContent = `지난 입력값: ${inputRecord}`;
};

function reset() {

    pickRandomNum();
    chances = 5;
    gameOver = false;
    resultArea.textContent = "리셋되었습니다.";
    chanceArea.textContent = `남은 기회: ${chances}`;
    recordArea.textContent = "지난 입력값:";
    playButton.disabled = false;
    inputRecord = [] ;
};

// ---- Run Code ----

pickRandomNum();
