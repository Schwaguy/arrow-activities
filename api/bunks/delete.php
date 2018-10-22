<?php
require('../connect.php');
include_once('../includes/functions.php');

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id) {
  	return http_response_code(400);
}

// Delete.
$sql = "UPDATE `bunks` SET `display`=0 WHERE `id`='{$id}'";

if(mysqli_query($con, $sql)) {
  	http_response_code(204);
} else {
  	return http_response_code(422);
}
