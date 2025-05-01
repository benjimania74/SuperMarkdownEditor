<?php

function getProject(mysqli $conn, int $projectID) {
    $project = selectProject($conn, $projectID);
    $project["nameProject"] = decodeDecrompress($project["nameProject"]);
    return $project;
}

function getProjectsByUser($conn, int $userID) {
    $projects = selectProjectsByUser($conn, $userID);
    for($i = 0 ; $i < count($projects) ; $i++) {
        $projects[$i]["nameProject"] = decodeDecrompress($projects[$i]["nameProject"]);
    }
    return $projects;
}

function abc() {
    echo "abc";
}

function createRawProject(mysqli $conn, int $userID, string $name, bool $isPublic) {
    createProject($conn, compressEncode($name), $userID, $isPublic);
    return mysqli_insert_id($conn);

}

function createNewProject(mysqli $conn, int $userID, string $name, bool $isPublic) {
    $projectID = createRawProject($conn, $userID, $name, $isPublic);

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

function delProject(mysqli $conn, int $projectID) {
    deleteProject($conn, $projectID);
    deleteFileByProject($conn, $projectID);
}

function getProjectFiles(mysqli $conn, int $projectID) {
    $files = selectFilesByProject($conn, $projectID);
    for($i = 0 ; $i < count($files) ; $i++) {
        $files[$i]["content"] = decodeDecrompress( $files[$i]["content"] );
    }
    return $files;
}

function getScripts(mysqli $conn, int $projectID) {
    $files = selectScriptsByProject($conn, $projectID);
    for($i = 0 ; $i < count($files) ; $i++) {
        $files[$i]["content"] = decodeDecrompress( $files[$i]["content"] );
    }
    return $files;
}

function copyTemplate(mysqli $conn, int $templateID, int $userID) {
    $res = -1;
    $file = selectFile($conn, $templateID);
    if(gettype($file) != "string" && $file != null && count($file) != 0) {
        $projectID = createRawProject($conn, $userID, $file["nameFile"], false);
        $templateScripts = selectScriptsByProject($conn, $file["idProject"]);
        foreach($templateScripts as $script) {
            createFile(
                $conn,
                $script["nameFile"],
                $projectID,
                $script["content"],
                "script"
            );
        }

        createFile(
            $conn,
            $file["nameFile"],
            $projectID,
            $file["content"],
            "txt"
        );

        $res = mysqli_insert_id($conn);   
    }
    return $res;
}

function updateFile(mysqli $conn, int $fileID, string $content) {
    updateFileContent($conn, $fileID, compressEncode($content));
}

function compressEncode(string $value) {
    return base64_encode( gzcompress($value,9) );
}

function decodeDecrompress(string $value) {
    return gzuncompress( base64_decode($value) );
}

?>