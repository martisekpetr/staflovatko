/* global gapi */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as gCalendarSelectors from 'modules/gCalendar/gCalendarSelectors';
import * as ActionTypes from 'constants/actionTypes';
import buildActionCreators from 'helpers/buildActionCreators';
import LoadCalendarForm from 'modules/gCalendar/loadCalendarForm';

class GCalIntegration extends React.Component{
  componentDidMount(){
    this.props.initClient()
  }

  render(){
    const { isLoggedIn, events, signOut, signIn } = this.props;

    let authButton = <button id="authorize-button" onClick={signIn}>Authorize</button>;
    let signOutButton = <button id="signout-button" onClick={signOut}>Sign Out</button>;

    return(
      <div className="container">
        {isLoggedIn ? signOutButton : authButton }
        {isLoggedIn && (
            <LoadCalendarForm/>
        )}
        <ul id="content">
          {events.map(event => {
            const startDate = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
            const endDate = event.end.dateTime ? new Date(event.end.dateTime) : new Date(event.end.date);
            return (<li
              key={event.id}
            >
              {`
                ${event.summary} (
                ${startDate.getHours()}:${startDate.getMinutes()} -
                ${endDate.getHours()}:${endDate.getMinutes()},
                ${event.creator.displayName},
                ${event.organizer.displayName}
              )`}
              <a href={event.htmlLink}>link</a>
            </li>)
          })}
        </ul>
      </div>
    )
  }
}

GCalIntegration.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  initClient: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})),
  calendars: PropTypes.arrayOf(PropTypes.shape({})),
};


const mapStateToProps = state => ({
  isLoggedIn: gCalendarSelectors.getIsLoggedIn(state),
  events: gCalendarSelectors.getEvents(state),
  calendars: gCalendarSelectors.getCalendars(state),
});


export default connect(
  mapStateToProps,
  buildActionCreators({
    signIn: ActionTypes.SIGN_IN,
    signOut: ActionTypes.SIGN_OUT,
    initClient: ActionTypes.INIT_CLIENT,
    loadEvents: ActionTypes.LOAD_EVENTS,
  })
)(GCalIntegration);