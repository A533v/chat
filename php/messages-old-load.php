<?php

if (isset($_COOKIE['user']))   {  

    $messageID = $_POST['msgid'];

	require "bd-start.php";

	$result = $mysqli->query("SELECT messages.id as mid, messages.idauthor as idauthor, messages.idchat as idchat, messages.text as text,
	users.login as login, users.avatar as avatar, 
    chatusers.iduser as iuser 
	FROM `messages`
	LEFT JOIN `users` ON messages.idauthor = users.id
	RiGHT JOIN chatusers ON chatusers.idchat = messages.idchat AND chatusers.iduser = $_COOKIE['user']
	WHERE messages.idchat = ( 
        SELECT messages.idchat FROM messages WHERE messages.id = $messageID 
    ) AND messages.id < $messageID ORDER BY messages.id DESC LIMIT 2");
	
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