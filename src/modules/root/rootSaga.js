import { fork, all } from 'redux-saga/effects';

import gCalendarSaga from '../gCalendar/gCalendarSaga'

export default function*() {
  yield all(
    [
      fork(gCalendarSaga),
    ]
  );
}
