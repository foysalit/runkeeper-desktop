import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as ReactDOM from 'react-dom';
import { readGpx } from '../actions/stats';
import {GoogleMap, Marker} from "react-google-maps";
import styles from './Counter.module.css';

function showList (props) {
	const { showStats, stats } = props;

	return (
		<div>
			<div className={styles.backButton}>
				<Link to="/">
					<i className="fa fa-arrow-left fa-3x" />
				</Link>
			</div>
			
			<h2>Here are your stats</h2>
			<button className={styles.btn} onClick={showStats}>Show Stats</button>


			<ul>
			{
				props.stats.map(function(item) {
					let route = "/stats/"+ item['GPX File'];
					return <li key={item["Date"]}>
						<Link to={route}>
							{item["Date"]} 
						</Link><br/>
						Total: {item["Distance (km)"]}
					</li>
				})
			}
			</ul>
			
		</div>
	);
}

function showMap (props, ctx) {
	const { showMap, stats } = props;
	const { file } = props.params;

	function mapClicked () {
		let {map} = ctx.refs;
		let {file} = ctx.props.params;

		if (map && file) {
			const geoData = readGpx(file);
			map.state.map.data.addGeoJson(geoData);
		}
	}

	return (
		<div>
			<div className={styles.backButton}>
				<Link to="/stats">
					<i className="fa fa-arrow-left fa-3x" />
				</Link>
			</div>
			<button className={styles.btn} onClick={mapClicked}> Show Route </button>
			<section style={{height: "40vh"}}>
				<GoogleMap containerProps={{
					style: {
						height: "100%",
					},
				}}
				defaultZoom={11}
				defaultCenter={{lat: 45.0667, lng: 7.7000}}
				onClick={props.onMapClick}
				ref="map"
				>
				</GoogleMap>
			</section>
		</div>
	);
}

class Stats extends Component {
	static propTypes = {
		showStats: PropTypes.func.isRequired,
		stats: PropTypes.any.isRequired
	};

	render() {
		let {file} = this.props.params;

		if (file) {
			return showMap(this.props, this);
		} else
			return showList(this.props); 
	}
}

export default Stats;
/*

				{props.stats.map((marker, index) => {
					return (
						<Marker
						{...marker}
						onRightclick={() => props.onMarkerRightclick(index)} />
						);
				})}
			*/