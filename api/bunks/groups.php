<?php
/* Returns the list of Bunk Age Groups. */
require('../connect.php');
include_once('../includes/functions.php');
    
$groups = [];
$sql = "SELECT id, name, description, age_min, age_max FROM bunk_age_groups WHERE display=1";

if($result = mysqli_query($con,$sql)) {
  	$cr = 0;
  	while($row = mysqli_fetch_assoc($result)) {
    	$groups[$cr]['id']    = $row['id'];
    	$groups[$cr]['name'] = $row['name'];
    	$groups[$cr]['description'] = $row['description'];
		$groups[$cr]['age_min'] = $row['age_min'];
		$groups[$cr]['age_min'] = $row['age_min'];
    	$cr++;
  	}
    echo json_encode(['data'=>$groups]);
} else {
  	http_response_code(404);
}