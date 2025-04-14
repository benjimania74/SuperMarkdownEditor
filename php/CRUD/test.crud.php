<html>

<head>
    <meta charset="utf8">
</head>

<body>
    <?php
    include("../db/db_connect.php");
    include("user.crud.php");
    include("project.crud.php");
    include("folder.crud.php");
    include("file.crud.php");
    ?>

    <!-- User Create -->
    <form method="post" action="test.crud.php">
        <h2>User Create</h2>
        pseudo <input type="text" name="pseudo">
        name <input type="text" name="name">
        firstName <input type="text" name="firstName">
        mail <input type="text" name="mail">
        pswd <input type="text" name="pswd">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (
        isset($_POST["pseudo"]) &&
        isset($_POST["name"]) &&
        isset($_POST["firstName"]) &&
        isset($_POST["mail"]) &&
        isset($_POST["pswd"])
    ) {
        $pseudo = $_POST["pseudo"];
        $name = $_POST["name"];
        $firstName = $_POST["firstName"];
        $mail = $_POST["mail"];
        $pswd = $_POST["pswd"];
        createUser($conn, $pseudo, $name, $firstName, $mail, $pswd);
    }
    ?>

    <!-- User Update -->
    <form method="post" action="test.crud.php">
        <h2>User Update</h2>
        id <input type="int" name="id">
        pseudo <input type="text" name="pseudo">
        name <input type="text" name="name">
        firstName <input type="text" name="firstName">
        mail <input type="text" name="mail">
        pswd <input type="text" name="pswd">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (
        isset($_POST["id"]) &&
        isset($_POST["pseudo"]) &&
        isset($_POST["name"]) &&
        isset($_POST["firstName"]) &&
        isset($_POST["mail"]) &&
        isset($_POST["pswd"])
    ) {
        $id = $_POST["id"];
        $pseudo = $_POST["pseudo"];
        $name = $_POST["name"];
        $firstName = $_POST["firstName"];
        $mail = $_POST["mail"];
        $pswd = $_POST["pswd"];
        updateUser($conn, $id, $pseudo, $name, $firstName, $mail, $pswd);
    }
    ?>

    <!-- User Delete -->
    <form method="post" action="test.crud.php">
        <h2>User Delete</h2>
        id <input type="int" name="id">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        deleteUser($conn, $id);
    }
    ?>

    <!-- User Select -->
    <form method="post" action="test.crud.php">
        <h2>User Select</h2>
        id <input type="int" name="id">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        selectUser($conn, $id);
    }
    ?>

    <!-- Project Create -->
    <form method="post" action="test.crud.php">
        <h2>Project Create</h2>
        nameProject <input type="text" name="nameProject">
        idAuthor <input type="int" name="idAuthor">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (
        isset($_POST["nameProject"]) &&
        isset($_POST["idAuthor"])
    ) {
        $nameProject = $_POST["nameProject"];
        $idAuthor = $_POST["idAuthor"];
        createProject($conn, $nameProject, $idAuthor);
    }
    ?>

    <!-- Project Update -->
    <form method="post" action="test.crud.php">
        <h2>Project Update</h2>
        id <input type="int" name="id">
        nameProject <input type="text" name="nameProject">
        idAuthor <input type="int" name="idAuthor">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (
        isset($_POST["id"]) &&
        isset($_POST["nameProject"]) &&
        isset($_POST["idAuthor"])
    ) {
        $id = $_POST["id"];
        $nameProject = $_POST["nameProject"];
        $idAuthor = $_POST["idAuthor"];
        updateProject($conn, $id, $nameProject, $idAuthor);
    }
    ?>

    <!-- Project Delete -->
    <form method="post" action="test.crud.php">
        <h2>Project Delete</h2>
        id <input type="int" name="id">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        deleteProject($conn, $id);
    }
    ?>

    <!-- Project Select -->
    <form method="post" action="test.crud.php">
        <h2>Project Select</h2>
        id <input type="int" name="id">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        selectProject($conn, $id);
    }
    ?>

    <!-- Folder Create -->
    <form method="post" action="test.crud.php">
        <h2>Folder Create</h2>
        nameFolder <input type="text" name="nameFolder">
        idProject <input type="int" name="idProject">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (
        isset($_POST["nameFolder"]) &&
        isset($_POST["idProject"])
    ) {
        $nameFolder = $_POST["nameFolder"];
        $idProject = $_POST["idProject"];
        createFolder($conn, $nameFolder, $idProject);
    }
    ?>

    <!-- Folder Update -->
    <form method="post" action="test.crud.php">
        <h2>Folder Update</h2>
        id <input type="int" name="id">
        nameFolder <input type="text" name="nameFolder">
        idProject <input type="int" name="idProject">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (
        isset($_POST["id"]) &&
        isset($_POST["nameFolder"]) &&
        isset($_POST["idProject"])
    ) {
        $id = $_POST["id"];
        $nameFolder = $_POST["nameFolder"];
        $idProject = $_POST["idProject"];
        updateFolder($conn, $id, $nameFolder, $idProject);
    }
    ?>

    <!-- Folder Delete -->
    <form method="post" action="test.crud.php">
        <h2>Folder Delete</h2>
        id <input type="int" name="id">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        deleteFolder($conn, $id);
    }
    ?>

    <!-- Folder Select -->
    <form method="post" action="test.crud.php">
        <h2>Folder Select</h2>
        id <input type="int" name="id">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        selectFolder($conn, $id);
    }
    ?>

    <!-- File Create -->
    <form method="post" action="test.crud.php">
        <h2>File Create</h2>
        nameFile <input type="text" name="nameFile">
        idFolder <input type="int" name="idFolder">
        content <input type="text" name="content">
        type <input type="text" name="type">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (
        isset($_POST["nameFile"]) &&
        isset($_POST["idFolder"]) &&
        isset($_POST["content"])&&
        isset($_POST["type"])
    ) {
        $nameFile = $_POST["nameFile"];
        $idFolder = $_POST["idFolder"];
        $content = $_POST["content"];
        $type = $_POST["type"];
        createFile($conn, $nameFile, $idFolder, $content, $type);
    }
    ?>

    <!-- File Update -->
    <form method="post" action="test.crud.php">
        <h2>File Update</h2>
        id <input type="int" name="id">
        nameFile <input type="text" name="nameFile">
        idFolder <input type="int" name="idFolder">
        content <input type="text" name="content">
        type <input type="text" name="type">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (
        isset($_POST["id"]) &&
        isset($_POST["nameFile"]) &&
        isset($_POST["idFolder"]) &&
        isset($_POST["content"]) &&
        isset($_POST["type"])
    ) {
        $id = $_POST["id"];
        $nameFile = $_POST["nameFile"];
        $idFolder = $_POST["idFolder"];
        $content = $_POST["content"];
        $type = $_POST["type"];
        updateFile($conn, $id, $nameFile, $idFolder, $content, $type);
    }
    ?>

    <!-- File Delete -->
    <form method="post" action="test.crud.php">
        <h2>File Delete</h2>
        id <input type="int" name="id">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        deleteFile($conn, $id);
    }
    ?>

    <!-- File Select -->
    <form method="post" action="test.crud.php">
        <h2>File Select</h2>
        id <input type="int" name="id">
        <input type="submit" value="Envoyer">
    </form>
    <?php
    if (isset($_POST["id"])) {
        $id = $_POST["id"];
        selectFile($conn, $id);
    }
    ?>

</body>
</html>