<head>
    <link rel="stylesheet" href="css/login.css">
    <script src="js/front/login.js" defer></script>
</head>
<div id="loginContainer">
    <div id="loginBox">
        <h1>Connexion</h1>
        <form id="loginForm" method="post" action="./login.php">
            <div class="input" id="identifiant">
                <img src="./css/img/user_01.png" class="icone" alt="user">
                <input type="identifiant" placeholder="Identifiant" name="username_login">
            </div>
            <div class="input" id="password">
                <img src="./css/img/lock.png" class="icone" alt="lock">
                <input type="password" placeholder="Mot de passe" name="password_login" class="password">
                <img src="./css/img/hide.png" class="toggle-eye" alt="hide">
            </div>
            <input type="submit" value="Connexion" class="submit_button">
        </form>
    </div>
</div>