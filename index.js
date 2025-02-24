export function rollDice(numRolls = 1, numSides, modifier = 0) {
    // Validate inputs
    if (!Number.isInteger(numRolls) || numRolls <= 0) {
        throw new Error("Number of rolls must be a positive integer.");
    }
    if (!Number.isInteger(numSides) || numSides <= 0) {
        throw new Error("Number of sides must be a positive integer.");
    }
    if (!Number.isInteger(modifier)) {
        throw new Error("Modifier must be an integer.");
    }

    // Roll the dice and store individual rolls
    const rolls = [];
    for (let i = 0; i < numRolls; i++) {
        rolls.push(Math.floor(Math.random() * numSides) + 1);
    }

    // Calculate total
    let total = rolls.reduce((sum, roll) => sum + roll, 0) + modifier;

    // Chainable object with helper methods
    const methods = {
        roll() {
            return total; // Explicit method for clarity
        },
        noZero() {
            total = Math.max(1, total); // Ensure minimum 1
            return this; // Return the chainable object
        },
        minValue(min) {
            if (!Number.isInteger(min) || min < 1) {
                throw new Error("Minimum value must be an integer greater than or equal to 1.");
            }
            total = Math.max(min, total); // Enforce minimum
            return this;
        },
        average() {
            return (total / numRolls).toFixed(2); // Return average as a fixed-point number
        },
        advantage() {
            const advantageRoll = Math.floor(Math.random() * numSides) + 1;
            total = Math.max(total, advantageRoll); // Use the higher of the two rolls
            return this;
        },
        disadvantage() {
            const disadvantageRoll = Math.floor(Math.random() * numSides) + 1;
            total = Math.min(total, disadvantageRoll); // Use the lower of the two rolls
            return this;
        },
        abilityScore() {
            const rolls = [];
            for (let i = 0; i < 4; i++) {
                rolls.push(Math.floor(Math.random() * numSides) + 1);
            }
            const returnObject = {
                roll1: rolls[0],
                roll2: rolls[1],
                roll3: rolls[2],
                roll4: rolls[3],
                total: rolls.sort((a, b) => b - a).slice(0, 3).reduce((sum, roll) => sum + roll, 0)
            }
            return returnObject;
        }
    };

    return Object.assign(() => total, methods);
}

// Attach helper functions
rollDice.numberOfRolls = (x) => {
    if (!Number.isInteger(x) || x <= 0) {
        throw new Error("Number of rolls must be a positive integer.");
    }

    return {
        fourSides: (modifier = 0) => rollDice(x, 4, modifier),
        sixSides: (modifier = 0) => rollDice(x, 6, modifier),
        eightSides: (modifier = 0) => rollDice(x, 8, modifier),
        tenSides: (modifier = 0) => rollDice(x, 10, modifier),
        twelveSides: (modifier = 0) => rollDice(x, 12, modifier),
        twentySides: (modifier = 0) => rollDice(x, 20, modifier),
        hundredSides: (modifier = 0) => rollDice(x, 100, modifier),
    };
};

rollDice.fourSides = (numRolls = 1, modifier = 0) => rollDice(numRolls, 4, modifier);
rollDice.sixSides = (numRolls = 1, modifier = 0) => rollDice(numRolls, 6, modifier);
rollDice.tenSides = (numRolls = 1, modifier = 0) => rollDice(numRolls, 10, modifier);
rollDice.twentySides = (numRolls = 1, modifier = 0) => rollDice(numRolls, 20, modifier);
rollDice.hundredSides = (numRolls = 1, modifier = 0) => rollDice(numRolls, 100, modifier);

export default rollDice;
