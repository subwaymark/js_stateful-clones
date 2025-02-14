'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  actions.forEach((action, i) => {
    const previousIndex = i - 1 < 0 ? i : i - 1;

    switch (action.type) {
      case 'clear':
        result.push({});
        break;
      case 'addProperties':
        result.push({
          ...result[previousIndex],
          ...action.extraData,
        });
        break;
      case 'removeProperties':
        const previousState = { ...result[previousIndex] };

        Object.values(action.keysToRemove).forEach((key) => {
          delete previousState[key];
        });

        result.push({ ...previousState });
        break;
      default:
        result.push({
          ...result[previousIndex],
        });
        break;
    }
  });

  return result;
}

module.exports = transformStateWithClones;
