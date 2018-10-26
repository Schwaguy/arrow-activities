<?php
/* Returns the list of Weeks */
require('../connect.php');
include_once('../includes/functions.php');
    
$periods = [];
$sql = "SELECT * FROM periods WHERE active=1";

if($result = mysqli_query($con,$sql)) {
  	$cr = 0;
  	while($row = mysqli_fetch_assoc($result)) {
    	$periods[$cr]['id'] = $row['id'];
    	$periods[$cr]['name'] = $row['name'];
		$periods[$cr]['startTime'] = $row['startTime'];
		$periods[$cr]['endTime'] = $row['endTime'];
		$periods[$cr]['ageGroup'] = $row['ageGroup'];
		$periods[$cr]['monday'] = $row['monday'];
		$periods[$cr]['tuesday'] = $row['tuesay'];
		$periods[$cr]['wednsday'] = $row['wednsday'];
		$periods[$cr]['thursday'] = $row['thursday'];
		$periods[$cr]['friday'] = $row['friday'];
    	$cr++;
  	}
    echo json_encode(['data'=>$periods]);
} else {
  	http_response_code(404);
}