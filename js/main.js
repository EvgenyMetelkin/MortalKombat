

const player1 = {
    name: "SCORPION",
    hp: 90,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["Катана"],
    attack: function () {
        console.log(this.name + " Fight...");
    }
}; 

const player2 = {
    name: "SUB-ZERO",
    hp: 80,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Катана"],
    attack: function () {
        console.log(this.name + " Fight...");
    }
};
 
function createPlayer(name, player) {
    const $player = document.createElement("div");
    $player.classList.add(name);

    const $progressbar = document.createElement("div");
    $progressbar.classList.add("progressbar");
    $player.appendChild($progressbar);

    const $life = document.createElement("div");
    $life.classList.add("life"); 
    $life.style.width = player.hp + "%";
    $progressbar.appendChild($life);

    const $name = document.createElement("div");
    $name.classList.add("name");
    $name.textContent = player.name;
    $progressbar.appendChild($name);

    const $character = document.createElement("div");
    $character.classList.add("character");
    $player.appendChild($character);

    const $img = document.createElement("img");
    $img.src = player.img; 
    $character.appendChild($img);

    const $root = document.querySelector(".arenas");
    $root.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);