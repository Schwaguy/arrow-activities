<?php
/* Returns the list of Weeks */
require('../connect.php');
include_once('../includes/functions.php');
    
$weeks = [];
$sql = "SELECT * FROM weeks WHERE active=1";

if($result = mysqli_query($con,$sql)) {
  	$cr = 0;
  	while($row = mysqli_fetch_assoc($result)) {
    	$weeks[$cr]['id'] = $row['id'];
    	$weeks[$cr]['name'] = $row['name'];
		//$weeks[$cr]['start'] = $row['start'];
		//$weeks[$cr]['end'] = $row['end'];
		$weeks[$cr]['start'] = ((!is_null($row['start']) && $row['start']!='0000-00-00') ? date("m/d/Y", strtotime($row['start'])) : '');
		$weeks[$cr]['end'] = ((!is_null($row['end']) && $row['end']!='0000-00-00') ? date("m/d/Y", strtotime($row['end'])) : '');
    	$cr++;
  	}
    echo json_encode(['data'=>$weeks]);
} else {
  	http_response_code(404);
}