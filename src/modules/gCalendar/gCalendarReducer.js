import createReducer from 'helpers/createReducer';
import * as ActionTypes from 'constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  calendarId: 'natur.cuni.cz_106ivfm68gi5pn4cpo0ovn56fs@group.calendar.google.com',
  timeMin: (new Date(2018,1,23)).toISOString(),
  timeMax: (new Date(2018,4,4)).toISOString(),
  events: [],
  colors: {},
  calendars: {},
};

const setLoggedIn = (state, payload) => {
  return {
    ...state,
    isLoggedIn: payload,
  }
};

const eventsUpdated = (state, payload) => {
  return {
    ...state,
    events: payload
  }
};

const colorsLoaded = (state, payload) => {
  return {
    ...state,
    colors: payload
  }
};

const calendarsLoaded = (state, payload) => {
  return {
    ...state,
    calendars: payload
  }
};

const calendarIdChanged = (state, payload) => {
  return {
    ...state,
    calendarId: payload
  }
};


export default createReducer({
  [ActionTypes.SIGNED_IN]: setLoggedIn,
  [ActionTypes.EVENTS_UPDATED]: eventsUpdated,
  [ActionTypes.COLORS_LOADED]: colorsLoaded,
  [ActionTypes.CALENDARS_LOADED]: calendarsLoaded,
  [ActionTypes.CALENDAR_ID_CHANGED]: calendarIdChanged,
}, initialState);
