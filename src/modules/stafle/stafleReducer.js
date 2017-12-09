import createReducer from 'helpers/createReducer';
import * as ActionTypes from 'constants/actionTypes';
import * as utils from 'helpers/utils';
import _ from 'lodash';

import { CONFIG } from 'config';

const initialState = {
  width: undefined,
  isDragging: false,
  layout: {
    ...utils.generateTimeLabels(),
    ...utils.generateDayLabels(),
    ...utils.generateReccurringEvent('R.', 7, 0.5, CONFIG.COLORS.WORKOUT),
    ...utils.generateReccurringEvent('Sň', 7.5, 0.5, CONFIG.COLORS.FOOD),
    ...utils.generateReccurringEvent('Oběd', 12, 1.75, CONFIG.COLORS.FOOD),
    ...utils.generateReccurringEvent('Večeře', 18, 1, CONFIG.COLORS.FOOD),
  },
};

const setDraggingState = (state, payload) => (
  {
    ...state,
    isDragging: payload,
  }
);

const setBoxProperties = (state, payload) => {
  const newLayout = {
    ...state.layout,
    [payload.i]: {
      ...state.layout[payload.i],
      ...payload.props,
    }
  };

  // changing id, need to clone the element
  if (payload.props.i) {
    newLayout[payload.props.i] = {
      ...newLayout[payload.i],
    };
    delete newLayout[payload.i];
  }

  return {
    ...state,
    layout: {
      ...newLayout,
    }
  }
};

const updateLayout = (state, payload) => (
  {
    ...state,
    layout: {
      ...(_.merge({}, state.layout, payload))
    }
  }
);

const resetLayout = (state, payload) => (
  {
    ...state,
    layout: {
      ...utils.generateTimeLabels(),
      ...utils.generateDayLabels(),
      ...payload
    }
  }
);

const removeBox = (state, payload) => {
  const newLayout = { ...state.layout };

  if (newLayout[payload]){
    delete newLayout[payload]
  }

  return {
    ...state,
    layout: {
      ...newLayout
    }
  }
};


const addBox = (state, payload) => (
  {
    ...state,
    layout: {
      ...state.layout,
      [payload.i]: payload
    }
  }
);

export default createReducer({
  [ActionTypes.SET_DRAGGING_STATE]: setDraggingState,
  [ActionTypes.SET_BOX_PROPERTIES]: setBoxProperties,
  [ActionTypes.REMOVE_BOX]: removeBox,
  [ActionTypes.ADD_BOX]: addBox,
  [ActionTypes.UPDATE_LAYOUT]: updateLayout,
  [ActionTypes.RESET_LAYOUT]: resetLayout,
}, initialState);
