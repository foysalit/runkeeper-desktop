import { combineReducers } from 'redux';
import counter from './counter';
import stats from './stats';

const rootReducer = combineReducers({
  counter, stats
});

export default rootReducer;
