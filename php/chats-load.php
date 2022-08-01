<?php

if (isset($_COOKIE['user']))   {  

    $userID = $_COOKIE['user'];

	require "bd-start.php";

	$result = $mysqli->query("SELECT 
	chats.id as IDchat, chats.private as privatech, chats.namechat, chats.avatarchat,
	m1.id as m1ID, m1.idauthor as m1Auth, m1.idchat as m1IDch, m1.text as m1TXT,
	m2.id as m2ID, m2.idauthor as m2Auth, m2.idchat as m2IDch, m2.text as m2TXT,
	auth.id as authid, auth.login as auth, 
	sobes.id as sobesid, sobes.login as login, sobes.avatar
	FROM `chatsuser`
	LEFT JOIN chats ON chats.id = chatsuser.idchat
	LEFT JOIN chatusers ON chatusers.idchat = chatsuser.idchat
	LEFT JOIN messages AS m1 ON chats.id = m1.idchat
	LEFT JOIN (
		SELECT MAX(messages.id) AS id, messages.idauthor, messages.idchat, messages.text 
		FROM messages GROUP BY messages.idchat
	) AS m2 ON m1.idchat = m2.idchat AND m1.id = m2.id
	LEFT JOIN users AS auth ON m1.idauthor = auth.id
	LEFT JOIN users AS sobes ON sobes.id = chatusers.iduser
	WHERE sobes.id != $userID
	GROUP BY m2.idchat HAVING m2.idchat >=1
	ORDER BY m1.id DESC");
	
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