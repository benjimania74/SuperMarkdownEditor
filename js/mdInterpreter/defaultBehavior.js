/* 
    USEFULL FONCTIONS
    ------------------------------

*/

function toCodeTag(text) {
    var code = document.createElement("code");
    code.innerHTML = text;
    return code;
}


function toTitle(value) {
    var titleLevel = value.split(" ")[0].length;
    var title = document.createElement("h" + titleLevel);
    textTransformerToParent(title, value.slice(titleLevel + 1));
    return title;
}

function toLineBreak() {
    return document.createElement("br");
}

function toHorizontalBar() {
    return document.createElement("hr");
}

function toQuote(value) {
    value = value.slice(2).replaceAll("\n> ", "\n");
    var quote = document.createElement("pre");
    textTransformerToParent(quote, value);
    return quote;
}


function codeSelector(lines, startLineNumber) {
    var lineNumber = 0;
    if(/^`{3}[a-z]{1,}$/.test(lines[startLineNumber])) {
        var i = 1;
        var foundEnd = false;
        while(startLineNumber + i < lines.length && !foundEnd) {
            if(/^`{3}$/.test(lines[startLineNumber + i])) {
                foundEnd = true;
            }
            i++;
        }
        if(foundEnd) {
            lineNumber = i;
        }
    }
    return lineNumber;
}

function codeTreatment(value) {
    var language = value.split("\n")[0].slice(3);
    value = value.slice(value.indexOf("\n") + 1, value.length - 4);

    var codeParser = getCodeParser(language);
    var codePreTag = document.createElement("pre");
    
    if(codeParser != undefined) {
        codeParser( codePreTag, value );
    } else {
        codePreTag.innerText = value;
    }
    return codePreTag;
}

function listSelector(lines, startLineNumber) {
    var lineNumber = 0;
    
    var listRegex = /^ *[-*] /;

    while( startLineNumber + lineNumber < lines.length && listRegex.test(lines[startLineNumber + lineNumber]) ) {
        lineNumber++;
    }

    return lineNumber;
}

function listTreatment(value) {
    // TODO
}

/*
    TAGS
    ------------------------------
*/

// ITALIC
addTag("*", (text) => {
    var italic = document.createElement("i");
    textTransformerToParent(italic, text);
    return italic;
});

// BOLD
addTag("**", (text) => {
    var bold = document.createElement("b");
    textTransformerToParent(bold, text);
    return bold;
});

// STRIKE
addTag("~~", (text) => {
    var strike = document.createElement("s");
    textTransformerToParent(strike, text);
    return strike;
});

// UNDERLINE
addTag("__", (text) => {
    var underline = document.createElement("u");
    textTransformerToParent(underline, text);
    return underline;
});

// CODE
addTag("``", toCodeTag);
addTag("`", toCodeTag);

/*
    SINGLE TAGS
    ------------------------------
*/

// LINKS
addSingleTag(/^\[[^\[\]\(\)]{1,}\]\([^\[\]\(\)]{1,}\)$/, (tag) => {
    var text = tag.slice(1, tag.indexOf("]") - 1);
    var link = tag.slice(tag.indexOf("(") + 1, tag.length - 1);

    var a = document.createElement("a");
    a.innerHTML = text;
    a.setAttribute("href", link);
    return a;
});

// IMAGES
addSingleTag(/^\!\[[^\[\]\(\)]{1,}\]\([^\[\]\(\)]{1,}\)$/, (tag) => {
    var alternativText = tag.slice(1, tag.indexOf("]") - 1);
    var image = tag.slice(tag.indexOf("(") + 1, tag.length - 1);

    var img = document.createElement("img");

    img.setAttribute("alt", alternativText);
    img.setAttribute("src", image);

    return img;
});

/*
    STRUCTURES
    ------------------------------
*/

// LINE BREAK
addStructure(/^\n$/, false, toLineBreak);

// TITLES
addStructure(/^#{1,6}$/, false, toTitle);

// HORIZONTAL BAR
addStructure(/^-{3}$/, false, toHorizontalBar);

// QUOTE
addStructure(">", true, toQuote); // TODO -> add the possibility of a personnal quote type [it's not that hard] : /^!\[[a-z]{1,}\]$/ on first line


/*
    COMPLEX STRUCTURES
    ------------------------------
*/

// CODE
addComplexStructure(codeSelector, codeTreatment);
addComplexStructure(listSelector, listTreatment);

/*
    CODE PARSERS
    ------------------------------
*/
const codeParser = []

function addCodeParser(language, parser) {
    codeParser[language] = parser;
}

function getCodeParser(language) {
    return codeParser[language];
}

// add some parsers I guess ?