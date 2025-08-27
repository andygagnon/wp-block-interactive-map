/**
 * Retrieves the translation strings and other dependencies from the global WordPress object.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

// Import the stylesheet for the block editor.
import './editor.scss';

// Note: In a real project, you would install react-map-gl via npm.
// For this example, we assume it's available.
// import Map from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * The Edit function describes the structure of your block in the context of the editor.
 * This is where you'll define the interactive component that appears in the editor.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const [viewport, setViewport] = useState({
		latitude: attributes.latitude,
		longitude: attributes.longitude,
		zoom: attributes.zoom,
	});
	const [userLocation, setUserLocation] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// Mock data for nearby places to demonstrate dynamic markers.
	const mockPlaces = [
		{ name: 'Coffee Shop', lat: 34.053, lon: -118.245 },
		{ name: 'Bookstore', lat: 34.051, lon: -118.240 },
		{ name: 'Museum', lat: 34.055, lon: -118.248 },
	];

	// Use the browser's Geolocation API to get the user's location.
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					// On success, update the state and block attributes.
					const newLocation = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					};
					setUserLocation(newLocation);
					setAttributes({
						latitude: newLocation.latitude,
						longitude: newLocation.longitude,
						hasUserLocation: true,
					});
					setIsLoading(false);
				},
				(error) => {
					// On error, fall back to the default location.
					console.error('Geolocation failed:', error);
					setAttributes({ hasUserLocation: false });
					setIsLoading(false);
				}
			);
		} else {
			// Browser doesn't support Geolocation.
			console.error('Geolocation is not supported by this browser.');
			setAttributes({ hasUserLocation: false });
			setIsLoading(false);
		}
	}, []); // Empty dependency array means this effect runs only once on mount.

	// A custom component to render a simple map-like preview in the editor.
	// This avoids external library dependencies during build process.
	const MapPreview = () => {
		const markers = [...mockPlaces];
		if (userLocation) {
			markers.push({ name: 'You are here', lat: userLocation.latitude, lon: userLocation.longitude });
		}

		return (
			<div className="interactive-map-aag-map-container" style={{ position: 'relative', overflow: 'hidden' }}>
				<div style={{
					backgroundColor: '#e0e0e0',
					height: '400px',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: '#666',
					border: '2px solid #ccc',
					boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
					position: 'relative',
				}}>
					<p>{__('Interactive Map Preview', 'interactive-map-aag')}</p>
					{userLocation && (
						<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
							📍
						</div>
					)}
					{markers.map((marker, index) => (
						<div key={index} style={{
							position: 'absolute',
							top: `${50 + (marker.lat - userLocation?.latitude) * 500}px`,
							left: `${50 + (marker.lon - userLocation?.longitude) * 500}px`,
						}}>
							📌
						</div>
					))}
				</div>
			</div>
		);
	};

	// Render the block in the editor.
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Map Settings', 'interactive-map-aag')}>
					<RangeControl
						label={__('Zoom Level', 'interactive-map-aag')}
						value={attributes.zoom}
						onChange={(newZoom) => setAttributes({ zoom: newZoom })}
						min={1}
						max={18}
					/>
					<ToggleControl
						label={__("Show User's Location", 'interactive-map-aag')}
						checked={attributes.hasUserLocation}
						onChange={(hasLocation) => setAttributes({ hasUserLocation: hasLocation })}
						help={__('If enabled, the map will try to center on the user’s location on the front-end.', 'interactive-map-aag')}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{isLoading ? (
					<div className="interactive-map-aag-loading">
						<Spinner />
						<p>{__('Requesting geolocation...', 'interactive-map-aag')}</p>
					</div>
				) : (
					<div className="interactive-map-aag-map-container">
						{/* In a real scenario, you'd use a React mapping library here. */}
						{/* For demonstration, we use a simple placeholder. */}
						<MapPreview />
						<p className="interactive-map-aag-coords">
							Latitude: {userLocation ? userLocation.latitude.toFixed(4) : attributes.latitude.toFixed(4)}<br />
							Longitude: {userLocation ? userLocation.longitude.toFixed(4) : attributes.longitude.toFixed(4)}
						</p>
					</div>
				)}
			</div>
		</>
	);
}
