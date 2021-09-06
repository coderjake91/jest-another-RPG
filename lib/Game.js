const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');


//constructor function to house main RPG game logic
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

//initialize game method
Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'axe'));
    this.enemies.push(new Enemy('skeleton', 'war hammer'));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
    //destructure name from the prompt object
    .then(({ name }) => {
        this.player = new Player(name);

        this.startNewBattle();
    });
};

module.exports = Game;