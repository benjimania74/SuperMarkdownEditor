<?php
include __DIR__ . "/../lib/projectManager.php";
$admin = $_SESSION["admin"];
if (!($admin == 1)) {
    header("Location: ./account");
    exit(0);
}

$replaceMap = [
    "PSEUDO" => $user["pseudo"],
    "MAIL" => $user["mail"],
];

$pageContent = getHTMLPage("admin.html");
echo replaceMap($pageContent, $replaceMap);

?>