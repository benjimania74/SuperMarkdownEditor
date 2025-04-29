<?php
function getHTMLPage(string $pageName) {
    return file_get_contents(__DIR__ . "/../../html/" . $pageName);
}

function replaceMap(string $content, array $replaceMap): string {
    foreach(array_keys($replaceMap) as $key) {
        $content = str_replace("$" . $key . "$", $replaceMap[$key], $content);
    }
    return $content;
}

?>