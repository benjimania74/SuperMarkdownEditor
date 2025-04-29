<?php

function createFolder($conn, $nameFolder, $idProject) {
    $sql = "INSERT INTO `folder`(`nameFolder`, `idProject`) VALUES ('$nameFolder', '$idProject')";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function updateFolder($conn, $id, $nameFolder, $idProject) {
    $sql = "UPDATE `folder` SET `nameFolder`='$nameFolder', `idProject`='$idProject' WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function deleteFolder($conn, $id) {
    $sql = "DELETE FROM `folder` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function selectFolder($conn, $id) {
    $sql = "SELECT * FROM `folder` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_assoc($ret);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

function selectFoldersByProject($conn, $idProject) {
    $sql = "SELECT * FROM `folder` WHERE `idProject`=$idProject";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_all($ret, MYSQLI_ASSOC);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}
?>