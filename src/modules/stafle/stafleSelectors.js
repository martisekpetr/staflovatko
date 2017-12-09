import { createSelector } from 'reselect';

const getStafle = state => state.stafle;

export const getIsDragging = createSelector(
  getStafle,
  stafle => stafle.isDragging
);

export const getLayout = createSelector(
  getStafle,
  stafle => stafle.layout
);