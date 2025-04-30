<?php

function createNewProject(mysqli $conn, int $userID, string $name, bool $isPublic) {
    createProject($conn, $name, $userID, $isPublic);
    $projectID = mysqli_insert_id($conn);

    $defaultProjectLocation = __DIR__ . "/../../defaultProject/";

    $defaultBehaviorCompressEncode = compressEncode( file_get_contents($defaultProjectLocation . "defaultBehavior.js") );
    $welcomeMDCompressEncode = compressEncode(file_get_contents($defaultProjectLocation . "welcome.md"));
    $smeLogoCompressEncode = compressEncode(file_get_contents($defaultProjectLocation . "sme.png"));

    createFile(
        $conn,
        "script/defaultBehavior.js",
        $projectID,
        $defaultBehaviorCompressEncode,
        "script"
    );
    
    createFile(
        $conn,
        "welcome.md",
        $projectID,
        $welcomeMDCompressEncode,
        "txt"
    );

    createFile(
        $conn,
        "sme.png",
        $projectID,
        $smeLogoCompressEncode,
        "img"
    );

    return $projectID;
}

function compressEncode(string $value) {
    return base64_encode( gzcompress($value,9) );
}

function decodeDecrompress(string $value) {
    return gzdecode( base64_decode($value) );
}

?>