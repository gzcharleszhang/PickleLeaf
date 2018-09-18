import { createSelector } from 'reselect';

export const usersByIdSelector = state => state.users.usersById;

export const usersSelector = createSelector(
  usersByIdSelector,
  usersById => Object.values(usersById),
);