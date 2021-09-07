const Potion = require('../lib/Potion.js');

//test to confirm new potion object is created and contains a name property with a value of 'health', and a value property with a value of any number
test('creates a health potion object', () => {
    const potion = new Potion('health');

    expect(potion.name).toBe('health');
    expect(potion.value).toEqual(expect.any(Number));
});

//test to confirm new potion object is created and contains name property that can be any string with length greater than zero, and a value property with a value of any number
test('creates a random potion object', () => {
    const potion = new Potion();

    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});