<?php

function createProject($conn, $nameProject, $idAuthor) {
    $sql = "INSERT INTO `project`(`nameProject`, `idAuthor`) VALUES ('$nameProject', '$idAuthor')";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function updateProject($conn, $id, $nameProject, $idAuthor) {
    $sql = "UPDATE `project` SET `nameProject`='$nameProject', `idAuthor`='$idAuthor' WHERE `id`=$id";
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
?>