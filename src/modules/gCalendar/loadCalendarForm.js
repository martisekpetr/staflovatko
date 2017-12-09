import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import buildActionCreators from 'helpers/buildActionCreators';

import { compose } from 'redux';
import * as ActionTypes from 'constants/actionTypes';
import * as gCalendarSelectors from 'modules/gCalendar/gCalendarSelectors';
import {LOAD_EVENTS_FORM} from 'constants/forms';
import Select from 'helpers/formFields/Select';
import moment from 'moment';

class LoadCalendarForm extends React.Component {
  render() {
    const {
      handleSubmit,
      calendarOptions
    } = this.props;


    return (
      <div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Field
            className="form-field"
            name="calendarId"
            label="Select calendar:"
            options={calendarOptions}
            component={Select}
          />
          <Field
            className="form-field"
            name="timeMin"
            label="Start"
            component='input'
            type='date'
          />
          <Field
            className="form-field"
            name="timeMax"
            label="End"
            component='input'
            type='date'
          />
          <button type="submit" >
            Load events
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  calendarOptions: gCalendarSelectors.getCalendarOptions(state),
});

export default compose(
  connect(
    mapStateToProps,
    buildActionCreators({
      onSubmit: ActionTypes.LOAD_EVENTS,
    }),
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
      initialValues: {
        calendarId:
        stateProps.calendarOptions &&
        stateProps.calendarOptions.length > 0 &&
        stateProps.calendarOptions[0].value,
        timeMin: moment().format('YYYY-MM-DD'),
        timeMax: moment().add(7, 'd').format('YYYY-MM-DD')
      }
    })
  ),
  reduxForm({
    form: LOAD_EVENTS_FORM,
    enableReinitialize: true,
    keepDirtyOnReinitialize: false,
  })
)(LoadCalendarForm);
