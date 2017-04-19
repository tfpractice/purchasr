import { combineReducers, } from 'redux';
import { reducer as form, } from 'redux-form';

export default function getReducer (client) {
  return combineReducers({ form, apollo: client.reducer(), });
}
