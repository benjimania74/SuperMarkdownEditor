const codeParser = []

function addCodeParser(language, parser) {
    codeParser[language] = parser;
}

function getCodeParser(language) {
    return codeParser[language];
}