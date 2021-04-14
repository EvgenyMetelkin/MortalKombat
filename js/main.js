const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

function changeHP(damage) {
    if(this.hp >= damage) {
        this.hp -= damage;
    } else {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector(
        ".player" + this.player + " .life");
}

function renderHP() {
    this.elHP().style.width = this.hp + "%";
}

const player1 = {
    player: 1,
    name: "SCORPION",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["Катана"],
    attack: function () {
        console.log(this.name + " Fight...");
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
}; 

const player2 = {
    player: 2,
    name: "SUB-ZERO",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Катана"],
    attack: function () {
        console.log(this.name + " Fight...");
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
}
 
function createPlayer(player) {
    const $player = createElement("div", "player" + player.player); 

    const $progressbar = createElement("div", "progressbar"); 
    $player.appendChild($progressbar);

    const $life = createElement("div", "life"); 
    $life.style.width = player.hp + "%";
    $progressbar.appendChild($life);

    const $name = createElement("div", "name"); 
    $name.textContent = player.name;
    $progressbar.appendChild($name);

    const $character = createElement("div", "character"); 
    $player.appendChild($character);

    const $img = createElement("img");
    $img.src = player.img; 
    $character.appendChild($img);
    
    return $player;
}

function getRandom(maxVal) {
    return Math.ceil(Math.random() * maxVal);
} 

function gameDraw() {
    const $loseTitle = createElement("div", "loseTitle");
    $loseTitle.innerText = "Draw";

    return $loseTitle;
}

function playerWin(name) {
    const $winTitle = createElement("div", "loseTitle");
    $winTitle.innerText = name + " win";

    return $winTitle;
}

$randomButton.addEventListener("click", () => { 
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20)); 

    player1.renderHP();
    player2.renderHP();

    if(player1.hp === 0 || player2.hp === 0) {
        
        $randomButton.disabled = true;

        if(player1.hp === 0 && player2.hp === 0) {
            $arenas.appendChild(gameDraw());
        } else if(player1.hp === 0) {            
            $arenas.appendChild(playerWin(player2.name));
        } else if(player2.hp === 0) {            
            $arenas.appendChild(playerWin(player1.name));
        } 

        createReloadButton();
    }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


function createReloadButton() {
    const $reloadWrap = createElement("div", "reloadWrap");
    const $button = createElement("button", "button");
    $button.textContent = "Restart";

    $button.addEventListener("click", () => {
        window.location.reload();
    });

    $reloadWrap.appendChild($button);

    const $control = document.querySelector(".control");
    $control.appendChild($reloadWrap); 
}