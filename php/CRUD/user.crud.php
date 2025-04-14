<?php

function createUser($conn, $pseudo, $name, $firstName, $mail, $pswd) {
    $sql = "INSERT INTO `user`(`pseudo`, `name`, `firstName`, `mail`, `pswd`) VALUES ('$pseudo', '$name', '$firstName', '$mail', '$pswd')";
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
?>