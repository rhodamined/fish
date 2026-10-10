function normalizeFishRecord(fishValue = {}, index = 0) {
  const fishNumber = Number.isFinite(Number(fishValue.fish))
    ? Number(fishValue.fish)
    : index + 1;

  const status = typeof fishValue.status === 'string' && fishValue.status.length > 0
    ? fishValue.status
    : 'none';

  const rawSize = Number(fishValue.size);
  const size = Number.isFinite(rawSize) ? rawSize : 0;

  const location = typeof fishValue.location === 'string' && fishValue.location.length > 0
    ? fishValue.location
    : 'none';

  return {
    fish: fishNumber,
    status,
    size,
    location
  };
}

function normalizeFishState(rawState = []) {
  return rawState.map((fishValue, index) => {
    if (!fishValue || typeof fishValue !== 'object') {
      return normalizeFishRecord({ fish: index + 1 }, index);
    }

    return normalizeFishRecord(fishValue, index);
  });
}

function createGameState(totalFish = 4) {
  const slotCount = Number.isFinite(totalFish) && totalFish > 0 ? totalFish : 4;
  let hasChanged = false;
  const state = Array.from({ length: slotCount }, (_, index) => normalizeFishRecord({
    fish: index + 1,
    status: 'none',
    size: 0,
    location: 'none'
  }, index));

  return {
    getState() {
      return state.map((fish) => ({ ...fish }));
    },

    getFish(fishNum) {
      const index = Number(fishNum) - 1;
      if (!Number.isInteger(index) || index < 0 || index >= state.length) {
        return null;
      }

      return { ...state[index] };
    },

    updateFish(fishNum, partial = {}) {
      const index = Number(fishNum) - 1;
      if (!Number.isInteger(index) || index < 0 || index >= state.length) {
        return null;
      }

      const current = state[index] || normalizeFishRecord({ fish: index + 1 }, index);
      const nextFish = normalizeFishRecord({
        ...current,
        ...partial,
        fish: index + 1
      }, index);

      state[index] = nextFish;
      hasChanged = true;
      return { ...state[index] };
    },

    setState(nextState = []) {
      const nextNormalized = normalizeFishState(nextState).slice(0, slotCount);
      while (nextNormalized.length < slotCount) {
        nextNormalized.push(normalizeFishRecord({ fish: nextNormalized.length + 1 }, nextNormalized.length));
      }

      for (let index = 0; index < slotCount; index += 1) {
        state[index] = nextNormalized[index];
      }

      hasChanged = true;
      return this.getState();
    },

    hasChanged() {
      return hasChanged;
    },

    clearDirty() {
      hasChanged = false;
      return this.getState();
    }
  };
}

module.exports = {
  normalizeFishRecord,
  normalizeFishState,
  createGameState
};
