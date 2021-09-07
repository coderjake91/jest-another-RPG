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

//start new battle method based on opponent agility values
Game.prototype.startNewBattle = function() {
    if(this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    //print player stat data to the console
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    //print enemy stat data to the console
    console.log(this.currentEnemy.getDescription());

    //start the battle
    this.battle();
};

//battle logic
Game.prototype.battle = function() {
    if(this.isPlayerTurn) {
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if(action === 'Use potion') {
                    if(!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        //end of turn, call checkEndOfBattle method
                        return this.checkEndOfBattle();
                    }
                    inquirer
                    .prompt({
                        type: 'list',
                        name: 'action',
                        message: 'Which potion would you like to use?',
                        choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                    })
                    .then(({ action }) => {
                        const potionDetails = action.split(': ');

                        this.player.usePotion(potionDetails[0] - 1);
                        console.log(`You used a ${potionDetails[1]} potion.`);
                        //end of turn, call checkEndOfBattle method
                        return this.checkEndOfBattle();

                    });
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                    //end of turn, call checkEndOfBattle method
                    return this.checkEndOfBattle();
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        //end of turn, call checkEndOfBattle method
        return this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function() {
    //if player and enemy are still both alive, continue battling
    if(this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    // if player is still alive, but enemy is not, then add the enemies potion to the players inventory using addPotion method, increment roundNumber
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;

        //if enemies still remain to battle, start new battle, if no ememies remain, player wins
        if(this.roundNumber < this.enemies.length){
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('You have won the game!');
        }
    //else, player is defeated, end the game
    } else {
        console.log("You've been defeated! Please play again...");
    }
};

module.exports = Game;