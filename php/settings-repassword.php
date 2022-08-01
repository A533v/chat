<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];
	$password1 = $_POST['password1'];
	$password2 = $_POST['password2'];

	$password1 = md5($password1.navsyakiy);
	$password2 = md5($password2.navsyakiy);

	require "bd-start.php";

	$result = $mysqli->query("SELECT * FROM `users` WHERE `id` = '$userID' AND `password` = '$password1'");

	$user = $result->fetch_assoc();
	
	if(count($user) == 0) {
		$data = 'Не верно введен старый пароль!';
	}else{
		
		$mysqli->query("UPDATE `users` SET `password` = '$password2' WHERE id = '$userID'");
		$data = 'Пароль изменен!';
	}
	
	require "bd-end.php";

}
header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;

?>