<?php
/* Returns the list of Bunks. */
require('../connect.php');
include_once('../includes/functions.php');
    
$bunks = [];
$sql = "SELECT * FROM bunks WHERE display=1";

if($result = mysqli_query($con,$sql)) {
  	$cr = 0;
  	while($row = mysqli_fetch_assoc($result)) {
    	$bunks[$cr]['id']    = $row['id'];
    	$bunks[$cr]['name'] = $row['name'];
    	$bunks[$cr]['groupID'] = $row['groupID'];
		$bunks[$cr]['counselor'] = $row['counselor'];
    	$cr++;
  	}
    echo json_encode(['data'=>$bunks]);
} else {
  	http_response_code(404);
}