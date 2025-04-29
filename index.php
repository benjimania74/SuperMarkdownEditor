<?php
session_start();
include "./php/lib/env.php";
include "./php/db/db_connect.php";
include "./php/CRUD/file.crud.php";
include "./php/CRUD/folder.crud.php";
include "./php/CRUD/project.crud.php";
include "./php/CRUD/user.crud.php";
include "./php/lib/pageManager.php";
if (isset($_GET["action"])) {
    $action = $_GET["action"];
    if ($action == "disconnect") {
        unset($_SESSION["action"]);
        unset($_SESSION["admin"]);
    }
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SuperMarkdownEditor</title>
    <link rel="stylesheet" href="./css/global.css">
    <link rel="icon" type="image/png" href="./img/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="./img/favicon/favicon.svg" />
    <link rel="shortcut icon" href="./img/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="./img/favicon/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="MyWebSite" />
    <link rel="manifest" href="./img/favicon/site.webmanifest" />
    <script src="./js/front/front.js"></script>
</head>

<body>
    <?php
    include("html/header.html");
    ?>
    <?php
    $page = isset($_GET['page']) && $_GET['page'] != "" ? basename($_GET['page']) : 'index';

    $filepath = "php/pages/" . $page . ".php";

    if (file_exists($filepath)) {
        include($filepath);
    } else {
        include("php/pages/404.php");
    }
    ?>
    <?php
    include("html/footer.html");
    ?>
</body>


</html>
<?php
include "./php/db/db_disconnect.php";
?>