/**
 * Created by Petr on 03.12.2017.
 */
import _ from 'lodash';
import { CONFIG } from '../config';

export const getX = (hour) => {
  if (CONFIG.IS_NIGHT_COMPACT) {
    return hour < CONFIG.NIGHT_DURATION
      ? CONFIG.DAY_LABEL_WIDTH + hour * CONFIG.HOUR_WIDTH / 2
      : CONFIG.DAY_LABEL_WIDTH
      + (CONFIG.NIGHT_DURATION * CONFIG.HOUR_WIDTH / 2)
      + ((hour-CONFIG.NIGHT_DURATION) * CONFIG.HOUR_WIDTH);
  }
  else {
    return CONFIG.DAY_LABEL_WIDTH + hour * CONFIG.HOUR_WIDTH;
  }
};

export const keyByI = (arr) =>_.keyBy(arr, 'i');

export const generateTimeLabels = (hours=24) => {
  const getWidth = (hour) => {
    if (CONFIG.IS_NIGHT_COMPACT) {
      return hour < CONFIG.NIGHT_DURATION ? CONFIG.HOUR_WIDTH / 2 : CONFIG.HOUR_WIDTH;
    }
    else {
      return CONFIG.HOUR_WIDTH;
    }
  };
  
  return keyByI([...(new Array(hours)).keys()].map(hour => ({
    name: `${hour}:00`,
    i: `${hour.toString()}hr`,
    x: getX(hour),
    y: 0,
    h: CONFIG.ROWS_PER_DAY,
    w: getWidth(hour),
    static: true,
  })));
};

export const generateDayLabels = () => {
  return keyByI(CONFIG.DAYS.map((day, index) => ({
    name: day,
    i: 'day' + index,
    x: 0,
    y: index*CONFIG.ROWS_PER_DAY + CONFIG.ROWS_PER_DAY,
    h: CONFIG.ROWS_PER_DAY,
    w: CONFIG.DAY_LABEL_WIDTH,
    static: true,
  })));
};

export const generateReccurringEvent = (name, hour, duration, color) => {
  
  return keyByI(CONFIG.DAYS.map((day, index) => ({
    name,
    i: name + index,
    x: getX(hour),
    y: index*CONFIG.ROWS_PER_DAY + CONFIG.ROWS_PER_DAY,
    h: CONFIG.ROWS_PER_DAY,
    w: duration * CONFIG.HOUR_WIDTH,
    color: color,
    isUnlockable: true
  })));
};
