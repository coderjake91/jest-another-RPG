const Potion = require('../lib/Potion');

function Player(name = '') {
    this.name = name;
    //create a Player inventory (array of Potion objects)
    this.inventory = [new Potion('health'), new Potion()];

    //set the Player health, strenght, and agility values using Math.random()
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
}

module.exports = Player;