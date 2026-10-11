const test = require('node:test');
const assert = require('node:assert/strict');

const { createGameState, normalizeFishState } = require('./state');

test('createGameState initializes fish slots and tracks dirty state changes', () => {
  const state = createGameState(4);

  assert.equal(state.getState().length, 4);
  assert.deepEqual(state.getState()[0], { fish: 1, status: 'none', size: 0, location: 'none', trash: 'none' });
  assert.equal(state.hasChanged(), false);

  state.updateFish(2, { status: 'caught', size: 12, location: 'north', trash: 'plastic bottle' });

  assert.equal(state.hasChanged(), true);
  assert.deepEqual(state.getFish(2), { fish: 2, status: 'caught', size: 12, location: 'north', trash: 'plastic bottle' });

  state.clearDirty();
  assert.equal(state.hasChanged(), false);
});

test('normalizeFishState strips invalid values and keeps fish numbering aligned', () => {
  const normalized = normalizeFishState([
    { fish: 1, status: 'swim', size: 7, location: 'west', trash: 'saran wrapper' },
    { fish: 2, status: 'hooked', size: 'NaN', location: 'east', trash: 'plastic bottle' },
    { fish: 3, status: 'lost', size: 15, location: 'south', trash: 'beer can' }
  ]);

  assert.deepEqual(normalized[0], { fish: 1, status: 'swim', size: 7, location: 'west', trash: 'saran wrapper' });
  assert.deepEqual(normalized[1], { fish: 2, status: 'hooked', size: 0, location: 'east', trash: 'plastic bottle' });
  assert.equal(normalized[2].size, 15);
});

test('resetToDefaults clears values back to the initial default game state', () => {
  const state = createGameState(4);

  state.updateFish(1, { status: 'eating', size: 26, location: 'north', trash: 'cigarette box' });
  state.updateFish(3, { status: 'hooked', size: 19, location: 'west', trash: 'beer bottle' });

  const resetState = state.resetToDefaults();

  assert.equal(state.hasChanged(), true);
  assert.deepEqual(resetState, [
    { fish: 1, status: 'none', size: 0, location: 'none', trash: 'none' },
    { fish: 2, status: 'none', size: 0, location: 'none', trash: 'none' },
    { fish: 3, status: 'none', size: 0, location: 'none', trash: 'none' },
    { fish: 4, status: 'none', size: 0, location: 'none', trash: 'none' }
  ]);
});
