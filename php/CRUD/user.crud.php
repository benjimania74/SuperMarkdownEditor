<?php

function createUser($conn, $pseudo, $name, $firstName, $mail, $pswd) {
    $hashPsw = hash("sha256", $pswd);
    $sql = "INSERT INTO `user`(`pseudo`, `name`, `firstName`, `mail`, `pswd`) VALUES ('$pseudo', '$name', '$firstName', '$mail', '$hashPsw')";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function updateUser($conn, $id, $pseudo, $name, $firstName, $mail, $pswd) {
    $sql = "UPDATE `user` SET `pseudo`='$pseudo', `name`='$name', `firstName`='$firstName', `mail`='$mail', `pswd`='$pswd' WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function deleteUser($conn, $id) {
    $sql = "DELETE FROM `user` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function selectUser($conn, $id) {
    $sql = "SELECT * FROM `user` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_assoc($ret);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

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
    if(loginSource($login)) {
        $query = "SELECT `id` FROM `user` WHERE `mail`='$login' AND `pswd`='$hashPsw'";
    } else {
        $query = "SELECT `id` FROM `user` WHERE `pseudo`='$login' AND `pswd`='$hashPsw'";
    }
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
    print_r($res);
    return $res;
}
?>