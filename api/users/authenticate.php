<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require('../connect.php');
include_once('../includes/globals.php');
include_once('../includes/functions.php');

// Get the posted data.
$postdata = file_get_contents("php://input");

$postdata = 'test';

if(isset($postdata) && !empty($postdata)) {
	
	// Extract the data.
  	$request = json_decode($postdata);
	
	// Validate.
	//if((trim($request->data->username)==='') || (trim($request->data->password)==='')) {
	//	return http_response_code(400);
  	//}
	
  	// Sanitize.
  	//$username = mysqli_real_escape_string($con, (trim($request->data->username)));
	//$password = mysqli_real_escape_string($con, (trim($request->data->password)));
	
	$username = 'Schwaguy';
	$password = 'illomocj3705';
	
	
	// Get User salt for password check
	$sql = "SELECT `salt` FROM `users` WHERE `username`='$username' OR `email`='$username' LIMIT 1";
	$res = $con->query($sql);
	$row = mysqli_fetch_assoc($res);
	$pwCheck = hash("sha256", $password . $row['salt']);
		
	$sql = "SELECT * FROM `users` WHERE username='$username' AND `password`='$pwCheck'"; 
	$res = $con->query($sql);
	
	if ($res) {
		$row = $res->fetch_array(MYSQLI_ASSOC);
		if ($row['active'] == 1) {
			$id = $row['id'];
			$firstName = $row['firstName'];
			$lastName = $row['lastName'];
			$email = $row['email'];
			$username = $row['username'];
			$access_level = $row['access_level'];
			$bunk = $row['bunk'];
			$res->free();
			$query = "UPDATE `users` SET `lastLogin`='$now' WHERE `id`='$id'"; 
			$result = $con->query($query);
			
			http_response_code(200);
			$user = [
				'id' => $id,
				'firstName' => $firstName,
				'lastName' => $lastName,
				'username' => $username,
				'access_level' => $access_level,
				'bunk' => $bunk,
				'token' => 'test-user-login-token'
			];
			echo json_encode(['data'=>$user]);
			
		} else {
			http_response_code(422);
		} 
  	} else {
    	http_response_code(422);
  	}
} 