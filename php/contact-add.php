<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];
	$contactID = $_POST['iduser'];


require "bd-start.php";
	
	$result = $mysqli->query("SELECT *
	FROM chatusers 
    LEFT JOIN chatsuser ON chatusers.idchat = chatsuser.idchat
    LEFT JOIN chats ON chatusers.idchat = chats.id
	WHERE chatusers.iduser = $userID AND chatsuser.iduser = $contactID AND chats.private = 1");

	$data = [];
	while($dat = mysqli_fetch_array($result)) {
		$data[] = $dat;
	}

	if (isset($data)) {

		$Chat = $mysqli->query("INSERT INTO `chats`(`private`) VALUES (1)");
		$idChat = $mysqli->insert_id;

		$chatsUser = $mysqli->query("INSERT INTO `chatsuser`(`iduser`, `idchat`) VALUES ($userID ,$idChat)");
		$chatUsers = $mysqli->query("INSERT INTO `chatusers`(`idchat`, `iduser`) VALUES ($idChat, $userID)");

		$chatsContact = $mysqli->query("INSERT INTO `chatsuser`(`iduser`, `idchat`) VALUES ($contactID ,$idChat)");
		$chatContacts = $mysqli->query("INSERT INTO `chatusers`(`idchat`, `iduser`) VALUES ($idChat, $contactID)");

	}
	
	$addContacts = $mysqli->query("INSERT INTO `contacts`(`iduser`, `idcontact`) VALUES ($userID, $contactID)");
	
require "bd-end.php";

}

header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
?>