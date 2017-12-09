import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import gCalendar from '../gCalendar/gCalendarReducer';
import stafle from '../stafle/stafleReducer';

export default combineReducers({
  gCalendar,
  stafle,
  form: formReducer
});


