export const CONFIG = {
  ROW_HEIGHT: 60,
  ROWS_PER_DAY: 1,
  COLS: 87,
  MARGIN: [3, 3],
  CONTAINER_PADDING: [10, 10],
  DAYS: [
    'so\n24.2.',
    'ne\n25.2.',
    'po\n26.2.',
    'út\n27.2.',
    'st\n28.2.',
    'čt\n1.3.',
    'pá\n2.3.',
    'so\n3.3.',
    'ne\n4.3.'
  ],
  DAY_LABEL_WIDTH: 3,
  COLORS: {
    FOOD: '#c0ffee',
    WORKOUT: '#ffffff'
  },
  HOUR_WIDTH: 4,
  IS_NIGHT_COMPACT: true,
  NIGHT_DURATION: 6,

  // Client ID and API key from the Developer Console
  CLIENT_ID: '776337434074-ro0mp7peltjmm145fsol3r4sj6dnje4r.apps.googleusercontent.com',
  API_KEY: 'AIzaSyB9GT1RPPnO_puM8YN6IgHBqOanZllwp1o',
  DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES: "https://www.googleapis.com/auth/calendar",
};
