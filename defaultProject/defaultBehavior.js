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

function toHighlight(value) {
    var mark = document.createElement("mark");
    textTransformerToParent(mark, value);
    return mark;
}

function toQuote(value) {
    var firstLine = value.split("\n")[0];
    value = value.slice(2);
    var quote = document.createElement("div");
    
    quote.style.marginLeft = "15px";
    quote.style.marginRight = "15px";
    quote.style.padding = "5px";
    quote.style.borderRadius = "5px";
    quote.style.backgroundColor = "gray";
    quote.style.opactiy = "0.8";

    if(/^\> \!\[[a-zA-Z0-9]*\]*\]$/.test(firstLine) && getQuoteType(firstLine.slice(4, firstLine.length - 1)) != undefined) {
        getQuoteType( firstLine.slice(4, firstLine.length - 1) ).treat(quote, value.slice(firstLine.length).replaceAll("\n> ", "\n"))
    } else {
        var quoteContent = document.createElement("p");
        textTransformerToParent(quoteContent, value.replaceAll("\n> ", "<br>"));
        quote.appendChild(quoteContent);
    }

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

// HIGHLIGH

addTag("==", toHighlight);

/*
    SINGLE TAGS
    ------------------------------
*/

// LINKS
addSingleTag(/^\[[^\[\]\(\)]{1,}\]\([^\[\]\(\)]{1,}\)$/, (tag) => {
    var text = tag.slice(1, tag.indexOf("]"));
    var link = tag.slice(tag.indexOf("(") + 1, tag.length - 1);

    var a = document.createElement("a");
    a.innerHTML = text;
    a.setAttribute("href", link);
    return a;
});

// IMAGES
addSingleTag(/^\!\[[^\[\]\(\)]{1,}\]\([^\[\]\(\)]{1,}\)$/, (tag) => {
    var alternativText = tag.slice(2, tag.indexOf("]"));
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
addStructure(">", true, toQuote);


/*
    COMPLEX STRUCTURES
    ------------------------------
*/

// CODE
addComplexStructure(codeSelector, codeTreatment);

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

/*
    QUOTES
    ------------------------------
*/

const quotesType = {};

function addQuoteType(name, treatFunction) {
    quotesType[name] = {"treat": treatFunction};
}

function getQuoteType(name) {
    return quotesType[name];
}

addQuoteType("danger", (quoteTag, value) => {
    quoteTag.style.backgroundColor = "#b3191e";

    var headerTag = document.createElement("p");
    headerTag.style.fontSize = "large";
    headerTag.style.color = "#fb464c"

    textTransformerToParent(headerTag, "**❗ Danger**");

    var quoteContent = document.createElement("p");
    textTransformerToParent(quoteContent, value.replaceAll("\n", "<br>"));

    quoteTag.appendChild(headerTag);
    quoteTag.appendChild(quoteContent);
});