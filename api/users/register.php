<?php
require('../connect.php');
include_once('../includes/functions.php');

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	
	// Extract the data.
  	$request = json_decode($postdata);
	
	// Validate.
	if((trim($request->data->firstName)==='') || (trim($request->data->lastName)==='') || (trim($request->data->username)==='') || (trim($request->data->password)==='')) {
		return http_response_code(400);
  	}
	
  	// Sanitize.
  	$firstName = mysqli_real_escape_string($con, (trim($request->data->firstName)));
  	$lastName = mysqli_real_escape_string($con, (trim($request->data->lastName)));
	$username = mysqli_real_escape_string($con, (trim($request->data->username)));
	$password = mysqli_real_escape_string($con, (trim($request->data->password)));
	$secPW = generateHashWithSalt($password);	
	$salt = $secPW['salt'];
	$pass = $secPW['pw'];
    
  	// Store.
  	$sql = "INSERT INTO `users` (`id`,`firstName`,`lastName`,`username`,`salt`,`password`) VALUES (null,'{$firstName}','{$lastName}','{$username}','{$salt}','{$pass}')";

	if(mysqli_query($con,$sql)) {
    	http_response_code(201);
    	/*$user = [
      		'firstName' => $firstName,
			'lastName' => $lastName,
			'username' => $username,
      		'id' => mysqli_insert_id($con)
    	];
    	echo json_encode(['data'=>$user]);*/
  	} else {
    	http_response_code(422);
  	}
}