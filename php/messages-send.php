<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];
	$chatID = $_POST['chatid'];
	$text = $_POST['text'];


require "bd-start.php";

	if (!isset($chatID)) {
		$mysqli->query("INSERT INTO `chatusers` (`iduser`, `idchat`, `text`) VALUES('$userID', '$chatID', '$text')");

	$usersInChat = $mysqli->query("SELECT * FROM `chatusers` WHERE `iduser` = $userID AND id = $chatID");

	if(count($usersInChat) > 0) {
		$mysqli->query("INSERT INTO `messages` (`idauthor`, `idchat`, `text`) VALUES('$userID', '$chatID', '$text')");
	}
	
require "bd-end.php";

}

?>