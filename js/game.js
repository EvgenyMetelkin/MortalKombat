import getRandom from "./random.js";
import generateLogs from "./logs.js"; 

export const $arenas = document.querySelector(".arenas"); 
export const $formFight = document.querySelector(".control");
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

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

export const player1 = {
    player: 1,
    name: "SCORPION",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["Катана"],
    attack: function () {
        console.log(this.name + " Fight...");
    },
    changeHP,
    elHP,
    renderHP
}; 

export const player2 = {
    player: 2,
    name: "SUB-ZERO",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Катана"],
    attack: function () {
        console.log(this.name + " Fight...");
    },
    changeHP,
    elHP,
    renderHP
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

export default createPlayer;

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

function createReloadButton() {
    const $reloadWrap = createElement("div", "reloadWrap");
    const $button = createElement("button", "button");
    $button.textContent = "Restart";

    $button.addEventListener("click", () => {
        window.location.reload();
    });

    $reloadWrap.appendChild($button);

    const $control = document.querySelector(".arenas");
    $control.appendChild($reloadWrap); 
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    };
}
 
export default enemyAttack;

function attackEnemy(p1, p2, attackPlaeyr, attackEnemy) {
    if(attackPlaeyr.defence !== attackEnemy.hit) {
        p1.changeHP(attackEnemy.value);

        generateLogs("hit", p1, p2);
    } else {
        generateLogs("defence", p1, p2);
    }

    p1.renderHP();
}

export default attackEnemy;

function playerAttack() {
    const attack = {}; 

    for(let item of $formFight) {
        const {checked, name, value, hit} = item;
        if(checked && name === "hit") {
            attack.value = getRandom(HIT[value]);
            attack.hit = value;
        }

        if(checked && name === "defence") {
            attack.defence = value;
        } 

        item.checked = false;
    } 

    return attack;
}

export default playerAttack;

function showResault() {
    if(player1.hp === 0 || player2.hp === 0) { 

        $formFight.remove();

        if(player1.hp === 0 && player2.hp === 0) {
            generateLogs("draw", player1, player2);  
            $arenas.appendChild(gameDraw());
        } else if(player1.hp === 0) {        
            generateLogs("end", player2, player1);    
            $arenas.appendChild(playerWin(player2.name));
        } else if(player2.hp === 0) {     
            generateLogs("end", player1, player2);           
            $arenas.appendChild(playerWin(player1.name));
        } 

        createReloadButton();
    }
}

export default showResault;