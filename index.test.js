import rollDice from './index';

describe('rollDice', () => {
    // Mock Math.random for predictable tests
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5; // Will always return middle value
    global.Math = mockMath;

    describe('Basic functionality', () => {
        test('should return a function with methods', () => {
            const dice = rollDice(1, 6);
            expect(typeof dice).toBe('function');
            expect(typeof dice.roll).toBe('function');
            expect(typeof dice.noZero).toBe('function');
            expect(typeof dice.minValue).toBe('function');
            expect(typeof dice.average).toBe('function');
        });

        test('should calculate correct values for single roll', () => {
            const dice = rollDice(1, 6);
            expect(dice()).toBe(4); // With Math.random = 0.5, on d6 we get 4
        });

        test('should handle modifiers correctly', () => {
            const dice = rollDice(1, 6, 2);
            expect(dice()).toBe(6); // 4 + 2 modifier
        });
    });

    describe('Input validation', () => {
        test('should throw error for invalid number of rolls', () => {
            expect(() => rollDice(0, 6)).toThrow('Number of rolls must be a positive integer');
            expect(() => rollDice(-1, 6)).toThrow('Number of rolls must be a positive integer');
            expect(() => rollDice(1.5, 6)).toThrow('Number of rolls must be a positive integer');
        });

        test('should throw error for invalid number of sides', () => {
            expect(() => rollDice(1, 0)).toThrow('Number of sides must be a positive integer');
            expect(() => rollDice(1, -6)).toThrow('Number of sides must be a positive integer');
            expect(() => rollDice(1, 2.5)).toThrow('Number of sides must be a positive integer');
        });

        test('should throw error for invalid modifier', () => {
            expect(() => rollDice(1, 6, 1.5)).toThrow('Modifier must be an integer');
        });
    });

    describe('Helper methods', () => {
        test('noZero should ensure minimum of 1', () => {
            const dice = rollDice(1, 6, -10);
            expect(dice.noZero()()).toBe(1);
        });

        test('minValue should enforce minimum value', () => {
            const dice = rollDice(1, 6);
            expect(dice.minValue(5)()).toBe(5);
        });

        test('average should return correct average for multiple rolls', () => {
            const dice = rollDice(2, 6);
            expect(dice.average()).toBe((8 / 2).toFixed(2)); // Two rolls of 4 divided by 2
        });

        test('inspiration should use higher roll', () => {
            const dice = rollDice(1, 6);
            expect(dice.inspiration()()).toBe(4); // Both rolls will be 4 with our mock
        });

        test('disspiration should use lower roll', () => {
            const dice = rollDice(1, 6);
            expect(dice.disspiration()()).toBe(4); // Both rolls will be 4 with our mock
        });

        test('abilityScore should calculate correct value', () => {
            const dice = rollDice(1, 6);
            expect(dice.abilityScore()).toBe(12); // Top 3 of four 4s = 12
        });
    });

    describe('Convenience methods', () => {
        test('numberOfRolls should return correct dice methods', () => {
            const twoRolls = rollDice.numberOfRolls(2);
            expect(typeof twoRolls.fourSides).toBe('function');
            expect(typeof twoRolls.sixSides).toBe('function');
            expect(typeof twoRolls.tenSides).toBe('function');
            expect(typeof twoRolls.twentySides).toBe('function');
            expect(typeof twoRolls.hundredSides).toBe('function');
        });

        test('direct dice methods should work correctly', () => {
            expect(rollDice.sixSides()()).toBe(4);
            expect(rollDice.twentySides(1, 2)()).toBe(13); // 11 + 2 modifier
        });
    });
}); 