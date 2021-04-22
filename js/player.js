export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = ["Катана"];
    }

    attack() {
        console.log(this.name + " Fight...");
    }

    changeHP(damage) {
        if(this.hp >= damage) {
            this.hp -= damage;
        } else {
            this.hp = 0;
        }
    }

    elHP() {
        return document.querySelector(
            ".player" + this.player + " .life");
    }

    renderHP() {
        this.elHP().style.width = this.hp + "%";
    }
}  