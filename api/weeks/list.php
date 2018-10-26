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
		//$weeks[$cr]['startDate'] = ((!is_null($row['startDate']) && $row['startDate']!='0000-00-00') ? date("m/d/Y", strtotime($row['startDate'])) : '');
		//$weeks[$cr]['endDate'] = ((!is_null($row['endDate']) && $row['endDate']!='0000-00-00') ? date("m/d/Y", strtotime($row['endDate'])) : '');
		
		$weeks[$cr]['startDate'] = $row['startDate'];
		$weeks[$cr]['endDate'] = $row['endDate'];
		
    	$cr++;
  	}
    echo json_encode(['data'=>$weeks]);
} else {
  	http_response_code(404);
}