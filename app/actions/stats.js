export const SHOW_STATS = 'SHOW_STATS';
export const SHOW_MAP = 'SHOW_MAP';
import * as fs from 'fs';
import { jsdom } from 'jsdom';
import { gpx } from 'togeojson';
import Parser from 'csv-parse';

const dataDir = '/home/foysal/nodepros/runkeeper-desktop/app/data/';

function readCsv (cb) {
	var self = this;
	var parser = Parser({delimiter: ',', columns: true}, cb);

	fs.createReadStream(dataDir +'cardioActivities.csv').pipe(parser);
	return;
}

export function readGpx (file) {
	if (!file){
		console.log('no file');
		return;
	}
	var content = jsdom(fs.readFileSync(dataDir + file, 'utf8'));
	var converted = gpx(content);
	return converted;
}

export function showStats () {
	return dispatch => {
		readCsv((err, data) => {
			if (err)
				return null;

			console.log('got data');
			// self.setState({stats: data});
			dispatch({
				type: SHOW_STATS,
				stats: data
			});
		});
	};
}


export function showMap (file, map) {
	return (dispatch, getState) => {
		dispatch({
			type: SHOW_MAP,
			geojson: readGpx(file)
		});
	};
}

