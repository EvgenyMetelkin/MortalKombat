const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
    player: 1,
    name: "SCORPION",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["Катана"],
    attack: function () {
        console.log(this.name + " Fight...");
    }
}; 

const player2 = {
    player: 2,
    name: "SUB-ZERO",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Катана"],
    attack: function () {
        console.log(this.name + " Fight...");
    }
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

function changeHP(player) {
    const $playerLife = document.querySelector(".player" + player.player + " .life");

    const hit = Math.ceil(Math.random() * 20);

    if(player.hp >= hit) {
        player.hp -= hit;
    } else {
        player.hp = 0;
    }
    $playerLife.style.width = player.hp + "%";

    if (player.hp === 0) {
        $randomButton.disabled = true;

        if(player.player === 1) {
            $arenas.appendChild(playerWin(player2.name));
        } else {            
            $arenas.appendChild(playerWin(player1.name));
        }
        
    }
}

function playerLose(name) {
    const $loseTitle = createElement("div", "loseTitle");
    $loseTitle.innerText = name + " lose";

    return $loseTitle;
}

function playerWin(name) {
    const $winTitle = createElement("div", "loseTitle");
    $winTitle.innerText = name + " win";

    return $winTitle;
}

$randomButton.addEventListener("click", () => { 
    changeHP(player1);
    changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
