<head>
    <link rel="stylesheet" href="css/account.css">
    <script src="js/front/editor.js" defer></script>
</head>
<div class="profileContainer">
    <div class="profileHeader">
        <div class="profileInfo">
            <img src="img/user_01.png" alt="Avatar" class="profileAvatar">
            <div class="profileDetails">
                <h1 id="profileName">Nom de l'utilisateur</h1>
                <p id="profileEmail">email@example.com</p>
                <button id="editProfileButton" class="button">Modifier le profil</button>
            </div>
        </div>
    </div>

    <!-- à changé pour du dom qui génère en fonction du nombre de projet -->
    <section class="projectsSection">
        <h2>Mes Projets</h2>
        <div class="projectsList">
            <div class="projectCard">
                <h3>Projet 1</h3>
                <p>Dernière modification : 12/04/2025</p>
                <a href="" class="button">Ouvrir</a>
            </div>
            <div class="projectCard">
                <h3>Projet 2</h3>
                <p>Dernière modification : 10/04/2025</p>
                <a href="" class="button">Ouvrir</a>
            </div>
            <div class="projectCard">
                <h3>Projet 3</h3>
                <p>Dernière modification : 08/04/2025</p>
                <a href="" class="button">Ouvrir</a>
            </div>
        </div>
    </section>
</div>