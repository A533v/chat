<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];


require "bd-start.php";

	$Chat = $mysqli->query("INSERT INTO `chats`(`private`) VALUES (0)");
	$idChat = $mysqli->insert_id;

	$chatsUser = $mysqli->query("INSERT INTO `chatsuser`(`iduser`, `idchat`) VALUES ($userID ,$idChat)");
	$chatUsers = $mysqli->query("INSERT INTO `chatusers`(`idchat`, `iduser`) VALUES ($idChat, $userID)");

	$message = $mysqli->query("INSERT INTO `messages`(`idauthor`, `idchat`, `text`) VALUES ($userID, $idChat, 'Вы создали групповой чат, назовите его, загрузите аватар и пригласите новых участников!')");

	$data = $userID;
	
require "bd-end.php";

}

header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
?>