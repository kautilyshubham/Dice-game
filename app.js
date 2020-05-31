/*
Game Rules:
1. Game will start when user get 6.
2. User will get next chnace if user get 4 or 6.
3. After one chance turn will be of next user
4. Who will react 100 first will be the winner.

*/

var scores, roundScore, activePlayer, playersName, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
playersName = ['Player 1', 'Player 2']

let toastSetting = {
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: false, // Prevents dismissing of toast on hover
    onClick: function () { } // Callback after click
}


document.querySelector(".btn-roll").addEventListener("click", function () {
    rollDice();
});

function rollDice() {
    dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector("#dice").setAttribute('src', `dice-${dice}.png`);
    document.querySelector(`#current-${activePlayer}`).textContent = dice;
    addDiceValue();

}

function addDiceValue() {
    if (scores[activePlayer] === 0) {
        if (dice === 6) {
            Toastify({
                text: `Wow, ${playersName[activePlayer]} get 6 and enters in game`,
                ...toastSetting,
            }).showToast();
            scores[activePlayer] += dice;
            setScore();
        } else {
            changeTurn();
        }
    } else {
        if (dice === 4 || dice === 6) {
            Toastify({
                text: `Wow, ${playersName[activePlayer]} get ${dice}`,
                ...toastSetting,
            }).showToast();
            scores[activePlayer] += dice;
            setScore();
        } else {
            scores[activePlayer] += dice;
            setScore();
            changeTurn();
        }

    }

}

function changeTurn() {
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    Toastify({
        text: `${playersName[activePlayer]} turn`,
        ...toastSetting,
    }).showToast();
}

function setScore() {
    if (scores[0] >= 100 || scores[1] >= 100) {
        document.querySelector("#score-0").textContent = scores[0];
        document.querySelector("#score-1").textContent = scores[1];
        success();
        document.querySelector('#modal-1-content').textContent = `${playersName[activePlayer]} wins the game!!`
    } else {
        document.querySelector("#score-0").textContent = scores[0];
        document.querySelector("#score-1").textContent = scores[1];
    }
}


function success() {
    MicroModal.show('modal-1');
}

document.querySelector("#score-0").textContent = scores[0];
document.querySelector("#score-1").textContent = scores[1];


// get players neme
player1 = prompt('Enter First player name');
if (player1) {
    playersName[0] = player1
}
player2 = prompt('Enter Second player name');
if (player2) {
    playersName[1] = player2
}
document.querySelector("#name-0").textContent = playersName[0];
document.querySelector("#name-1").textContent = playersName[1];


MicroModal.init({
    openTrigger: 'data-custom-open', // [3]
    closeTrigger: 'data-custom-close', // [4]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: false // [10]
});
