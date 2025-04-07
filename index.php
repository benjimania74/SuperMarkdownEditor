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
<?php  
include("html/header.html");
?>
<body>
    <?php
    include("php/pages/editor.php");
    ?>
</body>
<?php
include("html/footer.html");
?>
</html>