const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');

console.log(new Potion());

//check for the correct creation of the Player object
test('create a player object', () => {
    const player = new Player('Dave');

    //check for the creation of the Player object properties
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    //check for the the creation of an inventory
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

//check for the correct retrieval of player stats data using getStats() player method
test("gets player's stats as an object", () => {
    const player = new Player('Dave');

    //check that player.getStats() method returns an object with four properties
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

//checks for the correct retrieval of player inventory using getInventory() method
test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    //check to see if getInventory returns false if player.inventory is an empty []
    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});