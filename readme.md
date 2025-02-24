# D&D Dice Roll NPM Package

A lightweight and versatile dice-rolling package for D&D and other tabletop RPGs. This package supports rolling various types of dice, applying modifiers, and even simulating advantage (inspiration) and disadvantage (disspiration).

---

## Version 1.2.0

- Replaced `inspiration()` and `disspiration()` with `advantage()` and `disadvantage()` methods.
- added `abilityScore()` method.
- added `hundredSides()` method.

---

## Installation

Install the package via npm:

```bash
npm install dnd-dice-roll
```

---

## Usage

Import the package in your project:

```javascript
import rollDice from 'dnd-dice-roll';
```

### Basic Rolls

Roll a single d20:

```javascript
console.log(rollDice.twentySides());
// Example output: 15
```

Roll 3d6 with a +2 modifier:

```javascript
console.log(rollDice.numberOfRolls(3).sixSides(2));
// Example output: 14
```

---

### Helper Methods

#### `roll()`
Explicitly returns the total roll value.

```javascript
const roll = rollDice(1, 20);
console.log(roll.roll());
// Example output: 12
```

#### `advantage()`
Simulates rolling with advantage by rolling an additional die and taking the higher result.

```javascript
console.log(rollDice.twentySides().advantage());
// Example output: 18 (higher of the two rolls)
```

#### `disadvantage()`
Simulates rolling with disadvantage by rolling an additional die and taking the lower result.

```javascript
console.log(rollDice.twentySides().disadvantage());
// Example output: 10 (lower of the two rolls)
```

#### `average()`
Returns the average of the rolls, including any modifiers.

```javascript
console.log(rollDice.numberOfRolls(5).sixSides().average());
// Example output: 3.80
```

#### `noZero()`
Ensures the total roll value is at least 1.

```javascript
console.log(rollDice.twentySides(-20).noZero());
// Example output: 1
```

#### `minValue(min)`
Ensures the total roll value is at least the specified minimum.

```javascript
console.log(rollDice.tenSides(-5).minValue(10));
// Example output: 10
```

#### `abilityScore()`
Returns an object with the results of rolling 4d6, discarding the lowest roll, and summing the remaining three.

```javascript
console.log(rollDice.abilityScore());
// Example output: { roll1: 4, roll2: 6, roll3: 3, roll4: 2, total: 15 }
```
---

### Predefined Dice Rollers

The package includes shortcuts for common dice types:

- `fourSides(numRolls = 1, modifier = 0)`
- `sixSides(numRolls = 1, modifier = 0)`
- `tenSides(numRolls = 1, modifier = 0)`
- `twentySides(numRolls = 1, modifier = 0)`
- `hundredSides(numRolls = 1, modifier = 0)`

Example:

```javascript
console.log(rollDice.fourSides());
// Example output: 3
console.log(rollDice.hundredSides(2, 5));
// Example output: 112
```

---

### Chaining Methods

Methods like `.noZero()`, `.inspiration()`, and `.disspiration()` can be chained for complex rolls.

```javascript
console.log(rollDice.numberOfRolls(3).sixSides(-2).noZero().inspiration());
// Example output: 12
```

---

## Error Handling

The package ensures valid inputs:

- **Number of Rolls**: Must be a positive integer.
- **Number of Sides**: Must be a positive integer.
- **Modifier**: Must be an integer.

Invalid inputs throw an error.

Example:

```javascript
try {
    console.log(rollDice(-1, 6));
} catch (error) {
    console.error(error.message);
    // Output: Number of rolls must be a positive integer.
}
```

---

## License

This project is licensed under the MIT License.

---

## Keywords

dice roll, D&D dice, tabletop RPG, dice roller, d20, dice rolling, Dungeons and Dragons, RPG utilities, advantage rolling, npm dice package

