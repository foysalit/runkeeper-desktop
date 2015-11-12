import { SHOW_STATS, SHOW_MAP } from '../actions/stats';
export default function stats(state = [], action) {
	console.log(action, state);
	switch (action.type) {
		case SHOW_STATS:
			return state = action.stats;
		case SHOW_MAP:
			return state = action.geojson;
		default:
			state = [];
			return state;
	}
}
