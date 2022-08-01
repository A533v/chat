<?php

if (isset($_COOKIE['user']))   {   
    $data = $_COOKIE['user'];  
}else{
	$data = false;
}

header('Content-Type: application/json');
$data = json_encode ($data, JSON_UNESCAPED_UNICODE);
echo $data;
?>