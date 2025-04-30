<?php
include __DIR__ . "/../lib/projectManager.php";

$replaceMap = [
    "JSON_FILES" => json_encode(getProjectFiles($conn, 17))
];

$pageContent = getHTMLPage("templates.html");
echo replaceMap($pageContent, $replaceMap);
?>