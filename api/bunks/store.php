<?php
require('../connect.php');
include_once('../includes/functions.php');

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
	
	// Extract the data.
  	$request = json_decode($postdata);
	
	// Validate.
	if(trim($request->data->name) === '' || (int)$request->data->groupID < 1) {
		return http_response_code(400);
  	}
	
  	// Sanitize.
  	$name = mysqli_real_escape_string($con, trim($request->data->name));
  	$groupID = mysqli_real_escape_string($con, (int)$request->data->groupID);
	$counselor = mysqli_real_escape_string($con, (int)$request->data->counselor);
    
  	// Store.
  	$sql = "INSERT INTO `bunks` (`id`,`name`,`groupID`,`counselor`) VALUES (null,'{$name}','{$groupID}','{$counselor}')";

	if(mysqli_query($con,$sql)) {
    	http_response_code(201);
		
		if ($counselor != '') {
			$sql = "UPDATE `users` SET `bunk`='$id' WHERE `id`='$counselor' LIMIT 1";
			mysqli_query($con, $sql);
		}
		
    	$bunk = [
      		'name' => $name,
      		'groupID' => $groupID,
			'counselor' => $counselor,
      		'id'   => mysqli_insert_id($con)
    	];
    	echo json_encode(['data'=>$bunk]);
  	} else {
    	http_response_code(422);
  	}
}