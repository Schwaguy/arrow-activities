<?php
require('../connect.php');
include_once('../includes/functions.php');

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  	// Extract the data.
  	$request = json_decode($postdata);
	
  	// Validate.
  	if ((int)$request->data->id<1 || trim($request->data->name)=='' || (int)$request->data->groupID<1) {
    	return http_response_code(400);
  	}
    
  	// Sanitize.
  	$id = mysqli_real_escape_string($con, (int)$request->data->id);
  	$name = mysqli_real_escape_string($con, trim($request->data->name));
  	$groupID = mysqli_real_escape_string($con, (int)$request->data->groupID);
	$counselor = mysqli_real_escape_string($con, (int)$request->data->counselor);
	
	// Update.
  	$sql = "UPDATE `bunks` SET `name`='$name', `groupID`='$groupID', `counselor`='$counselor' WHERE `id`='{$id}' LIMIT 1";
	if(mysqli_query($con, $sql)) {
		http_response_code(204);
		if ($counselor != '') {
			$sql = "UPDATE `users` SET `bunk`='$id' WHERE `id`='$counselor' LIMIT 1";
			mysqli_query($con, $sql);
		}
  	} else {
    	return http_response_code(422);
  	}  
}
