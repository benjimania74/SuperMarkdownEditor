<?php

function createProject($conn, $nameProject, $idAuthor, bool $public) {
    $sql = "INSERT INTO `project`(`nameProject`, `idAuthor`,`public`) VALUES ('$nameProject', '$idAuthor','" . ($public == false ? "0" : "1") . "')";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function updateProject($conn, $id, $nameProject, $idAuthor, $public) {
    $sql = "UPDATE `project` SET `nameProject`='$nameProject', `idAuthor`='$idAuthor', `public`='$public' WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function deleteProject($conn, $id) {
    $sql = "DELETE FROM `project` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function selectProject($conn, $id) {
    $sql = "SELECT * FROM `project` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_assoc($ret);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

function selectProjectsByUser($conn, $idUser) {
    $sql = "SELECT * FROM `project` WHERE `idAuthor`=$idUser";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_all($ret, MYSQLI_ASSOC);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

function addPublicProject($conn, $id, $public) {
    $sql = "UPDATE `project` SET `public`='$public' WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

?>