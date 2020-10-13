import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import apiHandler from "../api/apiHandler";


const Map = ReactMapboxGl({
	accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  });




export default class MapMain extends Component {

state = {
	itemList: null,
}

	componentDidMount() {
		apiHandler
			.getItems()
			.then(items => {
				this.setState({ itemList: items })
			})
			.catch()
	}

	render() {
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
					{this.state.itemList && this.state.itemList.map(item => {
						return <Feature key={item} coordinates={item.location.coordinates} />
					})}
					</Layer>
				</Map>
		)
	}
}
