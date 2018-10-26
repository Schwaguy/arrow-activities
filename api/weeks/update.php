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
  	$startDate = mysqli_real_escape_string($con, $request->data->startDate);
	if (!empty($startDate)) { $startDate = date("Y-m-d", strtotime($startDate)); }
	$endDate = mysqli_real_escape_string($con, $request->data->endDate);
	if (!empty($endDate)) { $endDate = date("Y-m-d", strtotime($endDate)); }
	
	// Update.
  	$sql = "UPDATE `weeks` SET `name`='{$name}', `startDate`='{$startDate}', `endDate`='{$endDate}' WHERE `id`='{$id}' LIMIT 1";
	if(mysqli_query($con, $sql)) {
		http_response_code(204);
  	} else {
    	return http_response_code(422);
  	}  
}