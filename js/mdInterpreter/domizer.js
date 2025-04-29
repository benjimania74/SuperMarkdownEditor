function getDOM(md) {
    return toDOM( toToken(md) );
}

// Convert tokens to DOM
function toDOM(tokens) {
    var domDiv = document.createElement("div");
    domDiv.classList.add("md");

    tokens.forEach(token => {
        var treated = token.treat(token.value);
        if(treated == null) {
            treated = paragraphDomizer(token.value);
        }
        domDiv.appendChild( treated );
    });
    return domDiv;
}

function paragraphDomizer(value) {
    var p = document.createElement("p");
    textTransformerToParent(p, value);
    return p;
}

/*function listDomizer(info) {
    var list = document.createElement("ul");
    var value = info["value"];

    for(var i = 0 ; value[i] != undefined ; i++) {
        var line = value[i];
        if(typeof line == "string") {
            var element = document.createElement("li");
            textTransformerToParent(element, line);
            //element.innerHTML = line;
            list.appendChild(element);
        } else {
            list.appendChild( line.treat( line.info ) );
        }
    }
    return list;
}

function ordinatedListDomizer(info) {
    var list = document.createElement("ol");
    var value = info["value"];

    for(var i = 0 ; value[i] != undefined ; i++) {
        var line = value[i];
        if(typeof line == "string") {
            var element = document.createElement("li");
            textTransformerToParent(element, line);
            //element.innerHTML = line;
            list.appendChild(element);
        } else {
            list.appendChild( line.treat( line.info ) );
        }
    }
    return list;
}*/
