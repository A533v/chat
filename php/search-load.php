<?php

if (isset($_COOKIE['user']))   { 
	
	$input = $_POST['input'];

    $userID = $_COOKIE['user'];	
		
	$data = [];

	require "bd-start.php";
	if ($input != '') {
		$result = $mysqli->query("SELECT users.id, users.login, users.avatar, users.name, contacts.idcontact as incontacts
		FROM `users` 
		LEFT JOIN contacts ON users.id = contacts.idcontact AND contacts.iduser = 1
		WHERE users.id != $userID AND `login` LIKE '%".$input."%'");
	
		while($dat = mysqli_fetch_array($result)) {
    		$data[] = $dat;
		}
	}

}

require "bd-end.php";

header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
?>