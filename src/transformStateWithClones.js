'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const previousState = [
    {
      ...state,
    },
  ];

  return actions.map((action) => {
    switch (action.type) {
      case 'clear':
        previousState[0] = {};

        return {
          ...previousState[0],
        };
      case 'addProperties':
        previousState[0] = {
          ...previousState[0],
          ...action.extraData,
        };

        return {
          ...previousState[0],
        };
      case 'removeProperties':
        Object.values(action.keysToRemove).forEach((key) => {
          delete previousState[0][key];
        });

        return {
          ...previousState[0],
        };
    }
  });
}

module.exports = transformStateWithClones;
