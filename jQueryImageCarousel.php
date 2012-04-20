<?php
/*
Plugin Name: jQuery Image Carousel for WordPress
Plugin URI: 
Description: Use shortcodes in your posts to display multiple images in a carousel.
Version: 1.0.0
Author: Ankur Taxali
Author URI: https://github.com/oldmill1
License: GPL2
*/

wp_enqueue_script(
	'jic', 
	plugins_url( 'js/jic.js', __FILE__ ), 
	NULL, 
	NULL, 
	TRUE 
); 

wp_enqueue_style(
	'jic-styles', 
	plugins_url( 'css/style.css', __FILE__ ) 
); 

//[carouselle]
function carousel_func( $atts ){
	$postID = get_the_id();
	$num = -1; 
	$size = 'full'; //thumbnail, medium, large or full, or array(w, h)
	
	$images = get_children( 
		array( 
			'post_parent' => $postID, 
			'post_type' => 'attachment', 
			'numberposts' => $num, 
			'order' => 'ASC', 
			'orderby' => 'ID', 
			'post_mime_type' => 'image'	
		)
	); 
	
	if ( !empty( $images ) ) { 
		// we've got some images ! 
		foreach ( $images as $image ) { 
			$attachmenturl = wp_get_attachment_url($image->ID); 
			$attachmentthumbsrc = wp_get_attachment_image_src( $image->ID, 'full' ); 
			$img_title = $image->post_title;
			$imagelocs[] = array( 
				"full" => $attachmenturl, 
				"thumb" => $attachmentthumbsrc[0], 
				"title" => $img_title, 
				"width" => $attachmentthumbsrc[1], 
				"height" => $attachmentthumbsrc[2]
			); 
		} 	
	} 
	
	$build = "<div id='jquery_image_carousel'>"; 
	$build .= "<ul>"; 
		foreach ( $imagelocs as $imageloc ) { 
			$build .= "<li><img src='{$imageloc['full']}' width='{$imageloc['width']}' height='{$imageloc['height']}' /><div class='caption'><h6>{$imageloc['title']}</h6></div></li>"; 
		} 	
	$build .= "</ul>"; 
	$build .= "<a href='#' class='jic_nav jic_previous'>Previous</a>"; 
	$build .= "<a href='#' class='jic_nav jic_next'>Next</a>";
	$build .= "</div>"; 
	
	return $build; 
}


add_shortcode( 'carousel', 'carousel_func' );