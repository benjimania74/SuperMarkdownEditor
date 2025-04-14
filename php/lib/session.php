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
    echo "a";
    $query = "SELECT `id` FROM `user` WHERE `pseudo`='$login' AND `pswd`='$hashPsw'";
    $ret = mysqli_query($conn, $query);
    echo "b";

    $id = null;
    $isCorrect = false;
    
    if($ret != false) {
        echo "c";
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
    print_r($res);
    return $res;
}

function addUser(mysqli $conn, string $login, $name, $firstName, $mail, string $password) {
    if($login == "" || $password == "") { return false; }
    $hashPsw = hash("sha256", $password);
    $query = "INSERT INTO `user`(`pseudo`,`name`,`firstName`,`mail`,`pswd`) VALUES ('$login','$name' , '$firstName', '$mail', '$hashPsw')";
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