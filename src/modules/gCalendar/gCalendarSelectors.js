import { createSelector } from 'reselect';
import _ from 'lodash';

const getGCalendar = state => state.gCalendar;

export const getIsLoggedIn = createSelector(
  getGCalendar,
  calendar => calendar.isLoggedIn
);

export const getEvents = createSelector(
  getGCalendar,
  calendar => calendar.events
);

export const getCalendarId = createSelector(
  getGCalendar,
  calendar => calendar.calendarId
);

export const getTimeMin = createSelector(
  getGCalendar,
  calendar => calendar.timeMin
);

export const getTimeMax = createSelector(
  getGCalendar,
  calendar => calendar.timeMax
);

export const getColors = createSelector(
  getGCalendar,
  calendar => calendar.colors
);

export const getCalendars = createSelector(
  getGCalendar,
  calendar => calendar.calendars
);

export const getCalendarOptions = createSelector(
  getGCalendar,
  calendar => _.map(calendar.calendars, calendar => (
  {
    label: calendar.summary,
    value: calendar.id,
  }
  ))
);