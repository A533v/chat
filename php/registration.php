<?php

$login = $_POST['login'];
$pass = $_POST['password'];
$data = '';

if (preg_match("/^[a-zA-Z0-9_]{2,21}$/", $login)) { } else {
	echo 'Каким то не ведомым образом, вы отправили не подходящий логин...<br>Дам вам еще обну попытку!<br><br>';
	exit();
}

if (preg_match("/^[a-zA-Z0-9]{0,21}$/", $pass)) {
    $pass = md5($pass.navsyakiy);
} else {
	echo 'Каким то не ведомым образом, вы отправили не подходящий пароль...<br>Дам вам еще обну попытку!<br><br>';
	exit();
}

require "bd-start.php";

$result = $mysqli->query("SELECT * FROM `users` WHERE `login` = 'login'");

$user = $result->fetch_assoc();

if(count($user) == 0) {
	$mysqli->query("INSERT INTO `users` (`login`, `password`) VALUES('$login', '$pass')");
    $data = 'Вы успешно зарегистрировались, теперь войдите в свой аккаунт!';
}else{
	$data = 'Введенный вами логин уже занят другим пользователем!';
}

require "bd-end.php";

header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
?>