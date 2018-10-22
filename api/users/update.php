<?php
require('../connect.php');
include_once('../includes/functions.php');

$id = 1;
$value = 'illomocj3705';
$secPW = generateHashWithSalt($value);	
$salt = $secPW['salt'];
$pass = $secPW['pw'];


$sql = "UPDATE `users` SET `salt`='$salt', `password`='$pass' WHERE `id`='$id'";
mysqli_query($con, $sql);


// Get the posted data.
/*$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  	// Extract the data.
  	$request = json_decode($postdata);
	
  	// Validate.
  	if ((int)$request->data->id < 1 || trim($request->data->name) == '' || (int)$request->data->groupID < 1) {
    	return http_response_code(400);
  	}
    
  	// Sanitize.
  	$id = mysqli_real_escape_string($con, (int)$request->data->id);
  	$name = mysqli_real_escape_string($con, trim($request->data->name));
  	$groupID = mysqli_real_escape_string($con, (int)$request->data->groupID);

  	// Update.
  	$sql = "UPDATE `bunks` SET `name`='$name', `groupID`='$groupID' WHERE `id`= '{$id}' LIMIT 1";

	if(mysqli_query($con, $sql)) {
    	http_response_code(204);
  	} else {
    	return http_response_code(422);
  	}  
}*/
