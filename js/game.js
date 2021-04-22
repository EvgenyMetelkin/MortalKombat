import getRandom from "./random.js";
import generateLogs from "./logs.js"; 
import {Player} from "./player.js";

export class Game {
    constructor() {
        this.$arenas = document.querySelector(".arenas"); 
        this.$formFight = document.querySelector(".control");
        this.HIT = {
            head: 30,
            body: 25,
            foot: 20,
        };
        this.ATTACK = ['head', 'body', 'foot'];
          
        this.player1 = new Player({
            player: 1,
            name: "SCORPION",
            hp: 100,
            img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif"
        });
        
        this.player2 = new Player({
            player: 2,
            name: "SUB-ZERO",
            hp: 100,
            img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
        });
    }

    start() {
        generateLogs("start", this.player1, this.player2);

        this.$arenas.appendChild(this.createPlayer(this.player1));
        this.$arenas.appendChild(this.createPlayer(this.player2));

        this.$formFight.addEventListener("submit", (e) => {
            e.preventDefault();
            const enemy = this.enemyAttack();
            const player = this.playerAttack(); 
        
            this.attackEnemy(this.player1, this.player2, player, enemy);
            this.attackEnemy(this.player2, this.player1, enemy, player); 
        
            this.showResault();
        });
    }

    createElement(tag, className) {
        const $tag = document.createElement(tag);

        if(className) {
            $tag.classList.add(className);
        }

        return $tag;
    }

    createPlayer(player) {
        const $player = this.createElement("div", "player" + player.player); 

        const $progressbar = this.createElement("div", "progressbar"); 
        $player.appendChild($progressbar);

        const $life = this.createElement("div", "life"); 
        $life.style.width = player.hp + "%";
        $progressbar.appendChild($life);

        const $name = this.createElement("div", "name"); 
        $name.textContent = player.name;
        $progressbar.appendChild($name);

        const $character = this.createElement("div", "character"); 
        $player.appendChild($character);

        const $img = this.createElement("img");
        $img.src = player.img; 
        $character.appendChild($img);

        return $player;
    } 

    gameDraw() {
        const $loseTitle = this.createElement("div", "loseTitle");
        $loseTitle.innerText = "Draw";

        return $loseTitle;
    }

    playerWin(name) {
        const $winTitle = this.createElement("div", "loseTitle");
        $winTitle.innerText = name + " win";

        return $winTitle;
    } 

    createReloadButton() {
        const $reloadWrap = this.createElement("div", "reloadWrap");
        const $button = this.createElement("button", "button");
        $button.textContent = "Restart";

        $button.addEventListener("click", () => {
            window.location.reload();
        });

        $reloadWrap.appendChild($button);

        const $control = document.querySelector(".arenas");
        $control.appendChild($reloadWrap); 
    }

    enemyAttack() {
        const hit = this.ATTACK[getRandom(3) - 1];
        const defence = this.ATTACK[getRandom(3) - 1];

        return {
            value: getRandom(this.HIT[hit]),
            hit,
            defence,
        };
    }  

    attackEnemy(p1, p2, attackPlaeyr, attackEnemy) {
        if(attackPlaeyr.defence !== attackEnemy.hit) {
            p1.changeHP(attackEnemy.value);

            generateLogs("hit", p1, p2);
        } else {
            generateLogs("defence", p1, p2);
        }

        p1.renderHP();
    } 

    playerAttack() {
        const attack = {}; 

        for(let item of this.$formFight) {
            const {checked, name, value, hit} = item;
            if(checked && name === "hit") {
                attack.value = getRandom(this.HIT[value]);
                attack.hit = value;
            }

            if(checked && name === "defence") {
                attack.defence = value;
            } 

            item.checked = false;
        } 

        return attack;
    } 

    showResault() {
        if(this.player1.hp === 0 || this.player2.hp === 0) { 

            this.$formFight.remove();

            if(this.player1.hp === 0 && this.player2.hp === 0) {
                generateLogs("draw", this.player1, this.player2);  
                this.$arenas.appendChild(this.gameDraw());
            } else if(this.player1.hp === 0) {        
                generateLogs("end", this.player2, this.player1);    
                this.$arenas.appendChild(this.playerWin(this.player2.name));
            } else if(this.player2.hp === 0) {     
                generateLogs("end", this.player1, this.player2);           
                this.$arenas.appendChild(this.playerWin(this.player1.name));
            } 

            this.createReloadButton();
        }
    } 
}