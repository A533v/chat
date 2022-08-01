<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];

	require "bd-start.php";

	$result = $mysqli->query("SELECT users.avatar, users.name
	FROM `users` 
	WHERE users.id = $userID");
	
	$data = [];
	while($dat = mysqli_fetch_array($result)) {
    	$data[] = $dat;
	}
}

require "bd-end.php";

header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
?>