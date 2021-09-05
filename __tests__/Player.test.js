const { expect } = require('@jest/globals');
const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');

console.log(new Potion());

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