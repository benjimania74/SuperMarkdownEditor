document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".navigation a");
    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            menuLinks.forEach(link => link.classList.remove("active"));
            event.target.classList.add("active");
        });
    });
});


/**
 * MESSAGE BIENVENUE (en partenariat avec le groupe 14 )
 */

function add_message_bienvenue() {
    let message = get_message_bienvenue();
    let h1 = html_message_bienvenue(message);
    
    let div_titre = document.querySelector(".titregrp14");
    div_titre.appendChild(h1);
}

function html_message_bienvenue(message) {
    let text = document.createTextNode(message);
    let h1 = document.createElement("h1");

    h1.appendChild(text);
    return h1
}

function remove_message_bienvenue() {
    let div_bienvenue = document.querySelector(".titre")
    div_bienvenue.children["0"].remove();
}

function get_message_bienvenue() {
    let messages = [
        "EsT-cE qUe cE sItE eST cOnvErtIt eN PdF ?!?",
        "Gerbus Maxima !",
        "Eve a tenté d'intercepter la connexion 🫨",
        "Padolu Padolu",
        "Potato Pc",
        "Responsive ?",
        "Eddy pourquoi t'as ta capuche ?",
        "Eddy : 'Chépa comme ça.'",
        "Aline was here",
        "mdp : ADMIN1234 (non)",
        ":3",
        "Message de malvenue.md",
        "Google 'en passant'.",
        "Minecraft 2.0 is out !",
        "Made with love !",
        "echo 'bonjour {$user}'",
        "Il est ou le 20/20?",
        "The lie is a cake?",
        "The cake is a lie.",
        "Veni Vidi Vici.",
        "Always wanna play, never wanna lose",
        "Tricher ?!? Nous ?",
        "Perdre ? C'est du passé.",
        "Vous allez aimer gagner.",
        "La gloire est uniquement dans la victoire!",
        "Jouer c'est bien, Gagner c'est mieux!",
        "Jouer. Pour. Être. Gagnant.",
        "J.P.E.G.",
    ];

    let index_message_random = Math.floor(Math.random() * messages.length);

    if (debug) {
        console.log(index_message_random, messages[index_message_random]);
    };

    return messages[index_message_random];
}