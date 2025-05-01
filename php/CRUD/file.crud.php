<?php

function createFile($conn, $nameFile, $idProject, $content,$type) {
    $sql = "INSERT INTO `file`(`nameFile`, `idProject`, `content`,`type`) VALUES ('$nameFile', '$idProject', '$content','$type')";
    $ret = mysqli_query($conn, $sql);
    if (!$ret) {
        return "Error: " . mysqli_error($conn);
    }
    return $ret;
}

function updateFileContent($conn, $id, $content) {
    $sql = "UPDATE `file` SET `content`='$content' WHERE `id`=$id";
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

function deleteFileByProject($conn, $projectID) {
    $sql = "DELETE FROM `file` WHERE `idProject`=$projectID";
    $ret = mysqli_query($conn, $sql);
    if(!$ret) {
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

function selectFilesByProject($conn, $idProject) {
    $sql = "SELECT * FROM `file` WHERE `idProject`=$idProject";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_all($ret, MYSQLI_ASSOC);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}

function selectScriptsByProject($conn, $idProject) {
    $sql = "SELECT * FROM `file` WHERE `idProject`=$idProject AND `type`='script'";
    $ret = mysqli_query($conn, $sql);
    if ($ret) {
        return mysqli_fetch_all($ret, MYSQLI_ASSOC);
    } else {
        return "Error: " . mysqli_error($conn);
    }
}
?>