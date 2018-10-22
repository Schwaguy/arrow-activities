<?php
/* Returns the list of Counselors */
require('../connect.php');
include_once('../includes/functions.php');
    
$users = [];
$sql = "SELECT * FROM users WHERE access_level=3 AND active=1 ORDER BY TRIM(lastName) ASC, TRIM(firstName) ASC";

if($result = mysqli_query($con,$sql)) {
  	$cr = 0;
  	while($row = mysqli_fetch_assoc($result)) {
    	$users[$cr]['id'] = $row['id'];
    	$users[$cr]['firstName'] = $row['firstName'];
    	$users[$cr]['lastName'] = $row['lastName'];
		$users[$cr]['username'] = $row['username'];
		$users[$cr]['auth_level'] = $row['auth_level'];
		$users[$cr]['bunk'] = $row['bunk'];
    	$cr++;
  	}
    echo json_encode(['data'=>$users]);
} else {
  	http_response_code(404);
}