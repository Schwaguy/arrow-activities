<?php
require('../connect.php');
include_once('../includes/functions.php');

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	
	// Extract the data.
  	$request = json_decode($postdata);
	
	// Validate.
	if(trim($request->data->name) === '') {
		return http_response_code(400);
  	}
	
  	// Sanitize.
  	$name = mysqli_real_escape_string($con, trim($request->data->name));
  	$description = mysqli_real_escape_string($con, trim($request->data->description));
	$week = mysqli_real_escape_string($con, (int)$request->data->week);
    
  	// Store.
  	$sql = "INSERT INTO `activities` (`id`,`name`,`description`, `week`) VALUES (null,'{$name}','{$description}','{$week}')";

	if(mysqli_query($con,$sql)) {
    	http_response_code(201);
    	$activity = [
      		'name' => $name,
      		'description' => $description,
			'week' => $week,
      		'id'   => mysqli_insert_id($con)
    	];
    	echo json_encode(['data'=>$activity]);
  	} else {
    	http_response_code(422);
  	}
}