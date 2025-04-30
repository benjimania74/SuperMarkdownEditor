<?php
$replaceMap = [
    "JSON_FILES" => json_encode(selectFilesByProject($conn, 17))
];

$pageContent = getHTMLPage("templates.html");
echo replaceMap($pageContent, $replaceMap);
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Templates</title>
    <link rel="stylesheet" href="./css/templates.css">
</head>

