import {CONFIG} from 'config';
import moment from 'moment';

export function initClientAPI() {
  return new Promise(resolve => {
    window.gapi.load('client:auth2', resolve);
  }).then(() => {
    return window.gapi.client.init({
      apiKey: CONFIG.API_KEY,
      discoveryDocs: CONFIG.DISCOVERY_DOCS,
      clientId: CONFIG.CLIENT_ID,
      scope: CONFIG.SCOPES
    })
  }).then(() => {
    return window.gapi.auth2.getAuthInstance().isSignedIn.get()
  });
}


export const updateEvent = (calendarId, eventId) => {
  if (eventId) {

    // const eventToUpdate = window.gapi.client.calendar.events.get({
    //   calendarId,
    //   eventId
    // }).then(res => console.log(res));


    const eventToUpdate = {
      summary: "updated event"
    };
    //Replace with your values of course :)
    // eventToUpdate.location = $("#update-location").val();
    // eventToUpdate.description = $("#update-description").val();
    // eventToUpdate.start = {
    //   'dateTime': (new Date(2017, 04, 22, 8, 00, 00)).toISOString(), //2017-04-22 08h00m00s
    //   'timeZone': 'Europe/Paris'
    // };
    // eventToUpdate.end = {
    //   'dateTime': (new Date(2017, 04, 22, 9, 00, 00)).toISOString(), //2017-04-22 09h00m00s
    //   'timeZone': 'Europe/Paris'
    // };

    const request = window.gapi.client.calendar.events.patch({
      calendarId,
      eventId,
      'resource': eventToUpdate
    });

    return new Promise(resolve => {
      request.execute(resolve);
    }).then(res => res)

  }
}

export function listUpcomingEventsAPI(calendarId, timeMin, timeMax){
  const req = window.gapi.client.calendar.events.list({
    calendarId,
    timeMin: moment(timeMin).toISOString(),
    timeMax: moment(timeMax).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 250,
    orderBy: 'startTime'
  });

  return new Promise(resolve => {
    req.execute(resolve)
  }).then(res => res.items)
}


export function getUserCalendarsAPI(){
  const req = window.gapi.client.calendar.calendarList.list();

  return new Promise(resolve => {
    req.execute(resolve)
  }).then(res => res.items)
}

export function getCalendarColorsAPI(){
  const req = window.gapi.client.calendar.colors.get();

  return new Promise(resolve => {
    req.execute(resolve)
  }).then(res => res.calendar)
}


export const signInAPI = () => {
  const GoogleAuth = window.gapi.auth2.getAuthInstance();

  return new Promise((resolve, reject) => {
    GoogleAuth.signIn()
      .then(
        (res) => {
          const GoogleUser = GoogleAuth.currentUser.get();
          resolve(GoogleUser.getAuthResponse().id_token);
        },
        (err) => {
          reject(err)
        }
      );
  });
};


export const signOutAPI = () => {
  const GoogleAuth = window.gapi.auth2.getAuthInstance();

  return new Promise((resolve, reject) => {
    GoogleAuth.signOut()
      .then(
        (res) => {
          const GoogleUser = GoogleAuth.currentUser.get();
          resolve(GoogleUser.getAuthResponse().id_token);
        },
        (err) => {
          reject(err)
        }
      );
  });
};