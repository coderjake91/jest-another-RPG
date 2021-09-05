const Potion = require('../lib/Potion');

function Player(name = '') {
    this.name = name;
    //create a Player inventory (array of Potion objects)
    this.inventory = [new Potion('health'), new Potion()];

    //set the Player health, strenght, and agility values using Math.random()
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
};

//returns an object with various player properties
//protoype syntax
Player.prototype.getStats = function() {
    return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
            };
};


//returns the inventory array or false if empty
//protoype syntax
Player.prototype.getInventory = function() {
    if(this.inventory.length){
        return this.inventory;
    }
    return false;
};

module.exports = Player;