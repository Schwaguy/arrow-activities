<?php
/* Returns the list of Activities */
require('../connect.php');
include_once('../includes/functions.php');
    
$activities = [];
$sql = "SELECT * FROM activities WHERE active=1";

if($result = mysqli_query($con,$sql)) {
  	$cr = 0;
  	while($row = mysqli_fetch_assoc($result)) {
    	$activities[$cr]['id']    = $row['id'];
    	$activities[$cr]['name'] = $row['name'];
    	$activities[$cr]['description'] = $row['description'];
    	$cr++;
  	}
    echo json_encode(['data'=>$activities]);
} else {
  	http_response_code(404);
}