const Potion = require('./Potion');
const Character = require('./Character');

class Enemy extends Character {
    constructor(name, weapon) {
        //call parent constructor
        super(name);

        this.weapon = weapon;
        this.potion = new Potion();
    }
    
    //returns a description of the enemy
    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    }
}


module.exports = Enemy;