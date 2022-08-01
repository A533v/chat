<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];
	$name = $_POST['name'];

	require "bd-start.php";

	$mysqli->query("UPDATE `users` SET `name` = '$name' WHERE id = '$userID'");
	$data = $name;
	
	require "bd-end.php";

}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;

?>