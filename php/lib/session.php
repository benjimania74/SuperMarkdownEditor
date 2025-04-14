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
    $query = "SELECT `id` FROM `user` WHERE `pseudo`='$login' AND `pswd`='$hashPsw'";
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

?>