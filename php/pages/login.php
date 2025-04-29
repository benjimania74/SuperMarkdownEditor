<?php
if (isset($_POST["usernameLogin"]) && isset($_POST["passwordLogin"])) {
    $t = connect($conn, $_POST["usernameLogin"], $_POST["passwordLogin"]);
    if ($t["correct"]) {
        $_SESSION["user"] = $t["id"];
        header("Location: ./account");

    } else {
        echo "<script>alert('Identifiant ou mot de passe incorrect');</script>";
    }
}
if (isset($_POST["usernameSignup"]) && isset($_POST["passwordSignup"]) && isset($_POST["emailSignup"])) {
    createUser($conn, $_POST["usernameSignup"], $_POST["usernameSignup"], $_POST["usernameSignup"], $_POST["emailSignup"], $_POST["passwordSignup"]);
    $t = connect($conn, $_POST["usernameSignup"], $_POST["passwordSignup"]);
    if ($t["correct"]) {
        $_SESSION["user"] = $t["id"];
        header("Location: ./account");
    } else {
        echo "<script>alert('echec de la création de compte');</script>";
    }
}

print getHTMLPage("login.html");
?>