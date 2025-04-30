<?php
include __DIR__ . "/../lib/projectManager.php";
if (isset($_GET["fileID"])) {
    $fileID = $_GET["fileID"];
    $file = selectFile($conn, $fileID);
} else {
    $file = ""; // Valeur par défaut si fileID n'est pas défini
}
print_r($_POST);
if (isset($_POST["content"]) && ($_POST["id"])) {
    $content = compressEncode($_POST["content"]);
    $id = $_POST["id"];
    updateFileContent($conn, $id, $content);
    echo "bbbo";
    //exit(0);
}

if(isset($_GET["truc"])) {
    updateFileContent($conn, 6, compressEncode("coucou"));
    echo "boibboi";
}

$replaceMap = [
    "FILE_ID" => $_GET["fileID"],
    "FILE_CONTENT" => $file["content"]
];

$pageContent = getHTMLPage("editor.html");
echo replaceMap($pageContent, $replaceMap);

?>