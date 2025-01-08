import React, { memo, useCallback, useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api'
import { groupBy, isEqual, mapValues, uniqWith } from 'lodash'

const containerStyle = {
	width: '100%',
	height: '700px'
}

function Map({ users }) {
	const locationKey = ({ lat, lng }) => `${lat},${lng}`
	const usersByLocation = groupBy(users, ({ location }) => locationKey(location))
	const usersCountByLocation = mapValues(usersByLocation, value => value.length)
	const locations = uniqWith(users.map(({ location }) => location), isEqual)

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: // removed
	})

	const [map, setMap] = useState(null)
	const [center, setCenter] = useState({ lat: 49.8106368, lng: -97.140736 })
	const [activeAt, setActiveAt] = useState(null)

	const onMouseOver = index => setActiveAt(index)

	const onMouseOut = () => setActiveAt(null);

	useEffect(() => {
		getLocation()
	}, [])

	const getLocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCenter({
						lat: position.coords.latitude,
						lng: position.coords.longitude
					})
					console.log(position.coords.latitude);
					console.log(position.coords.longitude);
				},
				(error) => {
					console.error("Error Code = " + error.code + " - " + error.message)
				}
			)
		} else {
			console.log("Geolocation is not supported by this browser.")
		}
	}

	const onLoad = useCallback((map) => {
		const bounds = new window.google.maps.LatLngBounds(center)
		map.fitBounds(bounds)
		setMap(map)
	}, [center])

	const onUnmount = useCallback((map) => {
		setMap(null)
	}, [])


	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{locations.map((location, i) => <Marker
				key={i}
				position={location}
				onMouseOver={() => onMouseOver(i)}
				onMouseOut={onMouseOut}
			>{activeAt === i && (
				<InfoWindow position={location}>
					<>
						<h6>{usersCountByLocation[locationKey(location)]}</h6>
						{usersByLocation[locationKey(location)].map(user =>
							<ul key={user.id}>
								<li>Name: {user.name}</li>
								<li>Session duration: {user.duration}</li>
								<li>IP: {user.IP}</li>
								<li>Page: {user.page}</li>
							</ul>)}
					</>
				</InfoWindow>
			)}</Marker>)}
			<></>
		</GoogleMap>
	) : <></>
}

export default memo(Map)
