<?php

if (isset($_COOKIE['user']))   {  

	$userID = $_COOKIE['user'];
    $messageID = $_POST['msgid'];

	require "bd-start.php";

	$result = $mysqli->query("SELECT *
	FROM `messages`
	LEFT JOIN `users` ON messages.idauthor = users.id
	RIGHT JOIN chatusers ON chatusers.idchat = messages.idchat AND chatusers.iduser = $userID
	WHERE messages.idchat = ( 
        SELECT messages.idchat FROM messages WHERE messages.id = $messageID 
    ) AND messages.id > $messageID ORDER BY messages.id ASC");
	
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