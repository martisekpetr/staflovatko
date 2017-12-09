export default (actionHandlers, initialState) => {
  if (typeof actionHandlers !== 'object') {
    throw new Error('ActionHandlers must be an object');
  }

  if (typeof initialState === 'undefined') {
    throw new Error('Please define initialState');
  }

  return (state = initialState, { type, payload }) => {
    if (actionHandlers[type]) {
      return actionHandlers[type](state, payload);
    }

    return state;
  };
};
