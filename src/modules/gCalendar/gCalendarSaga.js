import { call, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import moment from 'moment';
import { formValueSelector } from 'redux-form';

import * as ActionTypes from 'constants/actionTypes';
import * as GCalendarAPI from 'modules/gCalendar/gCalendarAPI';
import * as gCalendarSelectors from 'modules/gCalendar/gCalendarSelectors';
import {CONFIG} from 'config';
import {keyByI, getX} from 'helpers/utils';
import * as FORMS from 'constants/forms';


function eventsToBoxes(events, timeMin, colors) {
  return keyByI(events.filter(event => event.start.dateTime).map(event => {
    const startTime = moment(event.start.dateTime);
    const endTime = moment(event.end.dateTime);
    const dayIndex = startTime.diff(moment(timeMin), 'days');

    const startX = getX(startTime.hours() + (startTime.minutes() / 60));
    const endX = getX(endTime.hours() + (endTime.minutes() / 60));

    return {
      name: event.summary,
      i: event.id,
      h: CONFIG.ROWS_PER_DAY,
      y: dayIndex * CONFIG.ROWS_PER_DAY,
      x: startX,
      w: endX - startX,
      color: colors && colors[event.colorId] && colors[event.colorId].background,
    }
  }));
}


function* updateEvent({ payload }) {
  const eventId = payload;
  const calendarId = yield select(gCalendarSelectors.getCalendarId);
  console.log(eventId);
  try {
    const res = yield call(GCalendarAPI.updateEvent, calendarId, eventId);
    if (res) {
      console.log(res);
      // yield put({type: ActionTypes.EVENTS_UPDATED, payload: events});
      // yield put({type: ActionTypes.RESET_LAYOUT, payload: eventsToBoxes(events, timeMin, colors)});
    }
  }
  catch (e){
    console.error(e);
  }
}

function* listUpcomingEvents() {
  const { calendarId, timeMin, timeMax } =
    yield select(formValueSelector(FORMS.LOAD_EVENTS_FORM), 'calendarId', 'timeMin', 'timeMax');

  const colors = yield select(gCalendarSelectors.getColors);
  yield put({type: ActionTypes.RESET_LAYOUT, payload: {}});

  try {
    const events = yield call(GCalendarAPI.listUpcomingEventsAPI, calendarId, timeMin, timeMax);
    if (events) {
      yield put({type: ActionTypes.EVENTS_UPDATED, payload: events});
      yield put({type: ActionTypes.RESET_LAYOUT, payload: eventsToBoxes(events, timeMin, colors)});
      yield put({type: ActionTypes.CALENDAR_ID_CHANGED, payload: calendarId});
    }
  }
  catch (e){
    console.error(e);
  }
}


function* getUserCalendars() {
  try {
    const calendars = yield call(GCalendarAPI.getUserCalendarsAPI);
    if (calendars) {
      yield put({type: ActionTypes.CALENDARS_LOADED, payload: calendars});
    }
  }
  catch (e){
    console.error(e);
  }
}


function* getCalendarColors() {
  try {
    const colors = yield call(GCalendarAPI.getCalendarColorsAPI);
    if (colors) {
      yield put({type: ActionTypes.COLORS_LOADED, payload: colors});
    }
    return colors;
  }
  catch (e){
    console.error(e);
    return null;
  }
}



function* onSignIn() {
  try {
    const id_token = yield call(GCalendarAPI.signInAPI);
    if (id_token) { /* Possibly with more checks and validations */
      console.log(id_token);
      yield call(getCalendarColors);
      yield call(getUserCalendars);
      yield put({ type: ActionTypes.SIGNED_IN, payload: true });
    }
  } catch (e) {
    console.log(e);
  }
}

function* onSignOut() {
  try {
    yield call(GCalendarAPI.signOutAPI);
    yield put({ type: ActionTypes.SIGNED_IN, payload: false });
    yield put({type: ActionTypes.RESET_LAYOUT, payload: {}});
  } catch (e) {
    console.log(e);
  }
}


function* initClient() {
  try {
    const isSignedIn = yield call(GCalendarAPI.initClientAPI);
    if (isSignedIn) {
      yield put({ type: ActionTypes.SIGNED_IN, payload: isSignedIn });
      yield call(getCalendarColors);
      yield call(getUserCalendars);
    }
  } catch (e) {
    console.log(e);
  }
}



export default function* () {
  yield [
    takeEvery(ActionTypes.INIT_CLIENT, initClient),
    takeEvery(ActionTypes.SIGN_IN, onSignIn),
    takeEvery(ActionTypes.SIGN_OUT, onSignOut),
    takeEvery(ActionTypes.LOAD_EVENTS, listUpcomingEvents),
    takeEvery(ActionTypes.UPDATE_EVENT, updateEvent),
  ];
}
