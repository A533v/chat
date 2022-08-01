<?php

$data = '';
if (isset($_COOKIE['user']))   {  

	require "bd-start.php";

    setcookie('user', $user['id'], time() - 3600 * 9);
	$data = 'Досвидания...';
	
	require "bd-end.php";

}

header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
?>