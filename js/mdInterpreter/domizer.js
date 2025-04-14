const codeParser = []

function addCodeParser(language, fct) {
    codeParser.push( (language, fct) );
}

function getCodeParser(language) {
    return codeParser[language];
}

function getDOM(md) {
    return toDOM( toToken(md) );
}

function convert() {
    var ta = document.getElementById("ta");
    var dom = getDOM(ta.value);
    document.body.appendChild(dom);
}

// Convert tokens to DOM
function toDOM(tokens) {
    var domDiv = document.createElement("div");
    domDiv.classList.add("md");

    tokens.forEach(token => {
        var treated = token.treat(token.info);

        if(treated == null) {
            treated = paragraphDomizer(token.info);
        }

        domDiv.appendChild( treated ); 
    });
    return domDiv;
}

function titleDomizer(info) {
    var level = parseInt( info["level"] );
    var value = info["value"];

    var titleDiv = document.createElement("div");
    titleDiv.classList.add("titleDiv");

    var title = document.createElement("h" + level);
    title.innerHTML = value;

    titleDiv.appendChild(title);

    if(level <= 3) {
        titleDiv.appendChild( document.createElement("hr") );
    }
    return titleDiv;
}

function horizontalLineDomizer(info) {
    return document.createElement("hr");
}

function codeDomizer(info) {
    var codeParser = getCodeParser(info["language"]);
    var codePreTag = document.createElement("pre");
    var value = info["value"];
    
    if(codeParser != undefined) {
        codePreTag.appendChild( codeParser( value ) );
    } else {
        codePreTag.innerHTML = value;
    }
    return codePreTag;
}

function lineReturnDomizer(info) {
    return document.createElement("br");
}

function quoteDomizer(info) {
    var quoteTag = document.createElement("p");
    quoteTag.classList.add("quote");
    quoteTag.innerHTML = info["value"];
    return quoteTag;
}

function listDomizer(info) {
    var list = document.createElement("ul");
    var value = info["value"];

    for(var i = 0 ; value[i] != undefined ; i++) {
        var line = value[i];
        if(typeof line == "string") {
            var element = document.createElement("li");
            element.innerHTML = line;
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
            element.innerHTML = line;
            list.appendChild(element);
        } else {
            list.appendChild( line.treat( line.info ) );
        }
    }
    return list;
}

function paragraphDomizer(info) {
    var p = document.createElement("p");
    p.innerHTML = info["value"];
    return p;
}