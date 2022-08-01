<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];
	$contactID = $_POST['idcontact'];


	require "bd-start.php";

	
	$result = $mysqli->query("SELECT 
	contacts.idcontact, users.login
	FROM `contacts` 
	LEFT JOIN `users` ON contacts.idcontact = users.id
	WHERE contacts.iduser = $userID AND contacts.idcontact = $contactID");
	
	$data = [];
	while($dat = mysqli_fetch_array($result)) {
    	$data[] = $dat;
	}

	$mysqli->query("DELETE FROM `contacts` WHERE contacts.iduser = $userID AND contacts.idcontact = $contactID");

	header('Content-Type: application/json');
	$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
	echo $data;

	require "bd-end.php";

}
?>