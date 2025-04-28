var model = [
    ["Rn", "Nn", "Bn", "Kn", "Qn", "Bn", "Nn", "Rn"],
    ["n", "n", "n", "n", "n", "n", "n", "n"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    ["Rb", "Nb", "Bb", "Kb", "Qb", "Bb", "Nb", "Rb"]
];

var mvts = [
    { "piece": "b", "xi": 2, "yi": 6, "xf": 2, "yf": 4 },
    { "piece": "n", "xi": 2, "yi": 1, "xf": 2, "yf": 3 }
];

function paire(n) {
    if (n % 2 == 0) {
        return true;
    }
    else {
        return false
    }
}

function case_blanche(x, y) {
    if ((!paire(x) && !paire(y)) || (paire(x) && paire(y))) {
        return true;
    }
    else {
        return false;
    }
}

function create_image(m, x, y) {
    cara = m[x][y];
    if (cara != " ") {
        return cara;
    }
}

function create_chessboard_vue(m) {
    const table = document.createElement("table");
    let div = document.querySelector("#chess");
    div.appendChild(table);
    tr_td(m, table);
}

function tr_td(m, table) {
    for (l = 0; l < m.length; l++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);

        for (e = 0; e < m.length; e++) {
            if (case_blanche(l, e) && create_image(m, l, e)) {
                const td_b_i = document.createElement("td");
                td_b_i.className = 'blanc';
                tr.appendChild(td_b_i);
                const img = document.createElement("img");
                img.src = "images/" + m[l][e] + ".png";
                td_b_i.appendChild(img);
            }
            else if (case_blanche(l, e)) {
                const td_b = document.createElement("td");
                td_b.className = 'blanc';
                tr.appendChild(td_b);
            }
            else if (create_image(m, l, e)) {
                const td_n_i = document.createElement("td");
                td_n_i.className = 'noir';
                tr.appendChild(td_n_i);
                const img_n = document.createElement("img");
                img_n.src = "images/" + m[l][e] + ".png";
                td_n_i.appendChild(img_n);
            }
            else {
                const td_n = document.createElement("td");
                td_n.className = 'noir';
                tr.appendChild(td_n);
            }
        }
    }
}

function update_chessboard_model(mvt, m, suivant_precedent) {
    let trouver = false;
    let a = 0;
    while (trouver != true && a < mvt.length) {
        if (!mvt[a]){
            console.error('Mouvement indefini');
            break;
        }
        for (let i = 0; i < m.length; i++) {
            for (let e = 0; e < m.length; e++) {
                if (suivant_precedent == "suivant") {
                    if ((m[i][e] == mvt[a]["piece"]) && (i == mvt[a]["yi"]) && (e == mvt[a]["xi"])) {
                        m[i][e] = " ";
                        m[mvt[a]["yf"]][mvt[a]["xf"]] = mvt[a]["piece"];
                        trouver = true;
                    }
                    else {
                        m[i][e] = m[i][e];
                    }
                }
                else {
                    if (a!=0){
                        if((m[i][e] == mvt[a]["piece"]) && (i == mvt[a]["yf"]) && (e == mvt[a]["xf"])) {
                            m[i][e] = " ";
                            m[mvt[a]["yi"]][mvt[a]["xi"]] = mvt[a]["piece"];
                            trouver = true;
                        }
                        else {
                            m[i][e] = m[i][e];
                        }
                    }
                }
            }
        }
        a++;
    }
    return m;
}


function update_chessboard_vue(mvt, m,suivant_precedent) {
    let div = document.querySelector("#chess");
    let tab = document.querySelector("table");
    div.removeChild(tab); // suppression de l'echequier
    create_chessboard_vue(update_chessboard_model(mvt, m,suivant_precedent)); // creation du nouvel echequier
}

function coup_suivant(mvt, m) {
    suivant_precedent = "suivant";
    update_chessboard_vue(mvt, m,suivant_precedent);
}

function coup_precedent(mvt,m){
    suivant_precedent = "precedent";
    update_chessboard_vue(mvt,m,suivant_precedent);
}