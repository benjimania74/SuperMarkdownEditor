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