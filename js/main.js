const $arenas = document.querySelector(".arenas"); 
const $chat = document.querySelector(".chat"); 
const $formFight = document.querySelector(".control");
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

function addLog(text) { 
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML("afterbegin", el);
} 

function generateLogs(type, player1, player2) {

    let text = "";
    const date = `${new Date().getHours()}:${new Date().getMinutes()}`; 
    switch(type) {  
        case "start":
            text = logs[type].replace("[time]", date).
            replace("[player1]", player1.name).
            replace("[player2]", player2.name);
            break;
        case "hit": 
            text = `${date} - ${logs[type][getRandom(logs[type].length) - 1].replace("[playerDefence]", player1.name).
            replace("[playerKick]", player2.name)}`;
            break;
        case "end": 
            text = `${date} - ${logs[type][getRandom(logs[type].length) - 1].replace("[playerWins]", player1.name).
            replace("[playerLose]", player2.name)}`;
            break;
        case "defence":  
            text = `${date} - ${logs[type][getRandom(logs[type].length) - 1].replace("[playerDefence]", player1.name).
            replace("[playerKick]", player2.name)}`;
            break;
        case "draw": 
            text = logs[type];
            break;
    }

    addLog(text);
}

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
    changeHP,
    elHP,
    renderHP
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
    changeHP,
    elHP,
    renderHP
};


generateLogs("start", player1, player2);


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

function attackEnemy(p1, p2, attackPlaeyr, attackEnemy) {
    if(attackPlaeyr.defence !== attackEnemy.hit) {
        p1.changeHP(attackEnemy.value);

        generateLogs("hit", p1, p2);
    } else {
        generateLogs("defence", p1, p2);
    }

    p1.renderHP();
}

function playerAttack() {
    const attack = {}; 

    for(let item of $formFight) {
        if(item.checked && item.name === "hit") {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === "defence") {
            attack.defence = item.value;
        } 

        item.checked = false;
    } 

    return attack;
}

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

$formFight.addEventListener("submit", (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();
 

    attackEnemy(player1, player2, player, enemy);
    attackEnemy(player2, player1, enemy, player); 

    showResault();
});