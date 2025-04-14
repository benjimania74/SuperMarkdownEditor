<?php

function loginSource($login) {
    $res = false;
    for($i=0;$i<strlen($login);$i++){
        if($login[$i]=="@"){
            $res = true;
        }
    }
    return $res;
}

function connect(mysqli $conn, string $login, string $password): array {
    $hashPsw = hash("sha256", $password);
    $query = "SELECT `id` FROM `user` WHERE `login`='$login' AND `mdp`='$hashPsw'";
    $ret = mysqli_query($conn, $query);

    $id = null;
    $isCorrect = false;
    
    if($ret != false) {
        while($r = mysqli_fetch_assoc($ret)) {
            $id = $r["id"];
            $isCorrect = true;
            break;
        }
    }

    $res = [
        "id" => $id,
        "correct" => $isCorrect
    ];
    return $res;
}

function addUser(mysqli $conn, string $login, $name, $firstName, $mail, string $password) {
    if($login == "" || $password == "") { return false; }
    $hashPsw = md5($password);
    $query = "INSERT INTO `user` VALUES ('0', `$login`,`$name` , `$firstName`, `$mail`, `$hashPsw`)";
    $ret = mysqli_query($conn, $query);
    return $ret;
}

function deleteUser(mysqli $conn, int $id) {
    if($id == 0) { return false; }
    $query = "DELETE FROM `user` WHERE `id`='$id'";
    $ret = mysqli_query($conn, $query);
    return $ret;
}

?>