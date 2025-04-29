<?php

function createFile($conn, $nameFile, $idFolder, $content,$type) {
    $sql = "INSERT INTO `file`(`nameFile`, `idFolder`, `content`,`type`) VALUES ('$nameFile', '$idFolder', '$content','$type')";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function updateFile($conn, $id, $nameFile, $idFolder, $content, $type) {
    $sql = "UPDATE `file` SET `nameFile`='$nameFile', `idFolder`='$idFolder', `content`='$content',`type`='$type' WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function deleteFile($conn, $id) {
    $sql = "DELETE FROM `file` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function selectFile($conn, $id) {
    $sql = "SELECT * FROM `file` WHERE `id`=$id";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_assoc($ret);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

function selectFilesByFolder($conn, $idFolder) {
    $sql = "SELECT * FROM `file` WHERE `idFolder`=$idFolder";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_all($ret, MYSQLI_ASSOC);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}
?>