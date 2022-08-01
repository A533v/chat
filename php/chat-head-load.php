<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];
	$chatID = $_POST['chatid'];

	require "bd-start.php";

	$result = $mysqli->query("SELECT chats.id, chats.private as privatech, chats.namechat, chats.avatarchat, 
	GROUP_CONCAT(userall.login SEPARATOR ', ') as logins, userall.avatar,
	userone.login, userone.avatar
	FROM chats
	LEFT JOIN chatusers ON chats.id = chatusers.idchat
	LEFT JOIN users AS userall ON userall.id = chatusers.iduser
	LEFT JOIN users AS userone ON userone.id = chatusers.iduser
	WHERE userone.id != $userID AND chats.id = $chatID");
	
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