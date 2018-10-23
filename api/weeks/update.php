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
  	$start = mysqli_real_escape_string($con, $request->data->start);
	if (!empty($start)) { $start = date("Y-m-d", strtotime($start)); }
	$end = mysqli_real_escape_string($con, $request->data->end);
	if (!empty($end)) { $end = date("Y-m-d", strtotime($end)); }
	
	// Update.
  	$sql = "UPDATE `weeks` SET `name`='{$name}', `start`='{$start}', `end`='{$end}' WHERE `id`='{$id}' LIMIT 1";
	if(mysqli_query($con, $sql)) {
		http_response_code(204);
  	} else {
    	return http_response_code(422);
  	}  
}