<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];

	require "bd-start.php";

	$result = $mysqli->query("SELECT 
	contacts.idcontact, users.name, users.login, users.avatar, chatusers.idchat
	FROM `contacts` 
	LEFT JOIN `users` ON contacts.idcontact = users.id
    LEFT JOIN chatusers ON contacts.idcontact = chatusers.iduser
    LEFT JOIN chats ON chats.id = chatusers.idchat
	WHERE contacts.iduser = $userID AND chats.private = 1");
	
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