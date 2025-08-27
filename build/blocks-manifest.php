<?php
// This file is generated. Do not modify it manually.
return array(
	'interactive-map-aag' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/interactive-map-aag',
		'version' => '1.0.0',
		'title' => 'Interactive Map',
		'category' => 'widgets',
		'icon' => 'location-alt',
		'description' => 'A block that displays a live, interactive map with the user\'s geolocation and dynamic data.',
		'example' => array(
			'attributes' => array(
				'preview' => true
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'attributes' => array(
			'latitude' => array(
				'type' => 'number',
				'default' => 34.0522
			),
			'longitude' => array(
				'type' => 'number',
				'default' => -118.2437
			),
			'zoom' => array(
				'type' => 'number',
				'default' => 13
			),
			'hasUserLocation' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'textdomain' => 'interactive-map-aag',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
