<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];
	$chatID = $_POST['chatid'];

	require "bd-start.php";

	$result = $mysqli->query("SELECT * FROM (
		SELECT chats.id as idchat, 
		chatsuser.iduser, 
		messages.id as mid, messages.idauthor, messages.text, 
		users.login, users.avatar
		FROM chats
		LEFT JOIN chatsuser ON chats.id = chatsuser.idchat
		LEFT JOIN messages ON messages.idchat = chats.id
		LEFT JOIN users ON messages.idauthor = users.id
		WHERE chats.id = $chatID AND chatsuser.iduser = $userID 
		ORDER BY mid DESC LIMIT 2 
		) T1 ORDER BY mid ASC");
	
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