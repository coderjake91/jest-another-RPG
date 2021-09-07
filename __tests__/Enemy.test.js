const Enemy = require('../lib/Enemy');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');

//test for proper enemy object creation
test('create an enemy object', () => {
    const enemy = new Enemy('Thanos', 'Infinity Gauntlet');

    expect(enemy.name).toBe('Thanos');
    expect(enemy.weapon).toBe('Infinity Gauntlet');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

//test getHealth() method of enemy
test("gets enemy's health value", () => {
    const enemy = new Enemy('Thanos', 'Infinity Gauntlet');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

//tests isAlive() method of enemy
test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('Thanos', 'Infinity Gauntlet');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;

    expect(enemy.isAlive()).toBeFalsy();
});

//tests to confirm reduceHealth() enemy method is correctly deducting health points from the enemy properly
test("substracts from enemy's health", () => {
    const enemy = new Enemy('Thanos', 'Infinity Gauntlet');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999);

    expect(enemy.health).toBe(0);
});

//tests getAttackValue enemy method
test("gets enemy's attack value", () => {
    const enemy = new Enemy('Thanos', 'Infinity Gauntlet');

    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

//tests getDescription enemy method
test('gets a description of the enemy', () => {
    const enemy = new Enemy('Thanos', 'Infinity Gauntlet');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('Thanos'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('Infinity Gauntlet'));
});