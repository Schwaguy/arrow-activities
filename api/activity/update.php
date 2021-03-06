<?php
require('../connect.php');
include_once('../includes/functions.php');

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  	// Extract the data.
  	$request = json_decode($postdata);
	
  	// Validate.
  	if ((int)$request->data->id<1 || trim($request->data->name)=='') {
    	return http_response_code(400);
  	}
    
  	// Sanitize.
  	$id = mysqli_real_escape_string($con, (int)$request->data->id);
  	$name = mysqli_real_escape_string($con, trim($request->data->name));
  	$description = mysqli_real_escape_string($con, trim($request->data->description));
	$week = mysqli_real_escape_string($con, (int)$request->data->week);
	
	// Update.
  	$sql = "UPDATE `activities` SET `name`='{$name}', `description`='{$description}', `week`='{$week}' WHERE `id`='{$id}' LIMIT 1";
	if(mysqli_query($con, $sql)) {
		http_response_code(204);
  	} else {
    	return http_response_code(422);
  	}  
}
