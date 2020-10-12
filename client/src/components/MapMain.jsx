import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';


const Map = ReactMapboxGl({
	accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  });




export default class MapMain extends Component {
	render() {
		console.log(process.env.REACT_APP_MAPBOX_TOKEN, Map)
		return (
				<Map
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: '100vh',
						width: '100vw',
						maxHeight: '100%',
						maxWidth: '100%'
				}}
					center={[ 2.3488, 48.8534]}
				>
					<Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
						<Feature coordinates={[2.349014, 48.864716]} />
					</Layer>
				</Map>
		)
	}
}
