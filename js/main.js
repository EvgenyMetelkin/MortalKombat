import generateLogs from "./logs.js"; 
import {player1, player2, $arenas, $formFight, 
    createPlayer, enemyAttack, playerAttack,
    attackEnemy, showResault} from "./game.js";

generateLogs("start", player1, player2);

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$formFight.addEventListener("submit", (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack(); 

    attackEnemy(player1, player2, player, enemy);
    attackEnemy(player2, player1, enemy, player); 

    showResault();
});