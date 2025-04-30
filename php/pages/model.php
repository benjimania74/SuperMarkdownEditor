<?php
$models = selectFilesByProject($conn, 17) ?? [];
$replaceMap = [
    "JSON_PROJECTS" => json_encode($models)
];

$pageContent = getHTMLPage("model.html");
print replaceMap($pageContent, $replaceMap);
?>