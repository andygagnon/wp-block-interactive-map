/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n'; // <-- This line was missing.

/**
 * The Save function defines the structure of the content that is saved in the post.
 *
 * It is a static representation of the block. The front-end view script (`view.js`)
 * will take this saved data and re-render the interactive map.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save();

	// We only save a simple div with data attributes.
	// This is a common pattern for dynamic, interactive blocks.
	// The `viewScript` (view.js) will read these attributes and render the full interactive map.
	return (
		<div
			{...blockProps}
			data-latitude={attributes.latitude}
			data-longitude={attributes.longitude}
			data-zoom={attributes.zoom}
			data-has-user-location={attributes.hasUserLocation}
		>
			{/* A fallback message for browsers without JavaScript enabled. */}
			<p>
				{/* The __() function is for localization, so the text can be translated. */}
				{__('Map content requires JavaScript to display.', 'interactive-map-aag')}
			</p>
		</div>
	);
}
