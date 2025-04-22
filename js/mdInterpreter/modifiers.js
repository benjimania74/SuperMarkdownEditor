// CODE

const codeParser = []

function addCodeParser(language, parser) {
    codeParser[language] = parser;
}

function getCodeParser(language) {
    return codeParser[language];
}


// TAGS

const tags = {};

function addTag(tag, treatFunction) {
    var tagLength = tag.length;
    if(tags[tagLength] == undefined) {
        tags[tagLength] = [];
    }
    tags[tagLength].push({
        "tag": tag,
        "treat": treatFunction
    });
}

function getTags() {
    return tags;
}


addTag("~~", (text) => {
    var strike = document.createElement("s");
    textTransformerToParent(strike, text);
    return strike;
});

addTag("__", (text) => {
    var underline = document.createElement("u");
    textTransformerToParent(underline, text);
    return underline;
});