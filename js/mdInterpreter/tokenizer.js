tmp = "```test\nprint();\n```\n\n# Welcome to StackEdit!\nHi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.\ntest\n";

// Parse a MarkDown String to a Tokens list
function toToken(markdown) {
    var tokens = [];
    var lines = markdown.split("\n");

    var lineNumber = 0;
    const totalLines = lines.length;

    while(lineNumber < totalLines) {
        var line = lines[lineNumber];
        var tokenized;
        
        if(isTitleStart(line)) {
            tokenized = titleTokenizer(line);
        } else if(line == "---") {
            tokenized = horizontalLineTokenizer();
        } else if(line.startsWith("```") && line.length != 3 && !line.includes(" ")) {
            tokenized = codeTokenizer(lines, lineNumber, totalLines);
        } else if(line == "") {
            if(tokens.length != 0) {
                tokenized = lineReturnTokenizer();
            }
        } else if(line.startsWith("> ")) {
            tokenized = quoteTokenizer(lines, lineNumber, totalLines);
        } else if(isListStart(line)) {
            tokenized = listTokenizer(lines, lineNumber, totalLines);
        } else if(isOrdonatedListStart(line)) {
            tokenized = ordonatedListTokenizer(lines, lineNumber, totalLines);
        } else {
            tokenized = paragraphTokenizer(lines, lineNumber, totalLines);
        }
        tokens.push( tokenized["token"] );
        lineNumber += tokenized["parsedLineCount"];
    }
    return tokens;
}

// Check if a line is a possible title
function isTitleStart(line) {
    if(line.startsWith("#")) {
        var words = line.split(" ");
        // It has to start with a maximum of 7 '#' and followed by a space and caracters
        if(1 < words.length && words[0].replaceAll("#", "") == "" && words[0].length <= 6) {
            return true;
        }
    }
    return false;
}

function isListStart(line) {
    return line.startsWith("- ") || line.startsWith("* ")
}

// Check if a line is an ordonated list
function isOrdonatedListStart(line) {
    var words = line.split(" ");

    // A list have something in, isn't it ?
    if(1 < words.length) {
        // An ordonated list start by a number, a point and a space (e.g: "12. My 12")
        if(words[0].endsWith(".") && parseInt(words[0].slice(0, words[0].length - 1))!= NaN) {
            return true;
        }
    }
    return false;
}

// Transform MarkDown into a title token
function titleTokenizer(line) {
    var titleLevel = line.split(" ")[0].length;
    // The title
    var value = line.slice(titleLevel + 1);

    return {
        "parsedLineCount": 1,
        "token": {
            "type": "title",
            "treat": function (info) {return null;},
            "info": {
                "level": titleLevel,
                "value": value
            }
        }
    }
}

// Returns an horizontal line token
function horizontalLineTokenizer() {
    return {
        "parsedLineCount": 1,
        "token": {
            "type": "hr",
            "treat": function (info) {return null;},
            "info": {}
        }
    }
}

// Transform a MarkDown code tag into a token
function codeTokenizer(lines, lineNumber, totalLines) {
    var codeLanguage = lines[lineNumber].slice(3);
    var value = "";
    var i = 1;
    var line = lines[lineNumber + 1];
    // the tag ends at the next "```" or at the end of the text
    while(lineNumber + i < totalLines && line != "```") {
        value += line + "\n";
        i++;
        line = lines[lineNumber + i];
    }
    // Make the end of the code tag count
    i++;

    return {
        "parsedLineCount": i,
        "token": {
            "type": "code",
            "treat": function (info) {return null;},
            "info": {
                "language": codeLanguage,
                "value": value
            }
        }
    }
}

function lineReturnTokenizer() {
    return {
        "parsedLineCount": 1,
        "token": {
            "type": "br",
            "treat": function (info) {return null;},
            "info": {}
        }
    }
}

function quoteTokenizer(lines, lineNumber, totalLines) {
    var value = "";
    var i = 0;
    var line = lines[lineNumber]
    while(lineNumber + i < totalLines && line != "") {
        value += line + "\n";
        i++;
        line = lines[lineNumber + i];
    }

    return {
        "parsedLineCount": i,
        "token": {
            "type": "quote",
            "treat": function (info) {return null;},
            "info": {
                "value": value
            }
        }
    }
}

function listTokenizer(lines, lineNumber, totalLines, offset = 0) {
    /*var value = {};
    var i = 0;
    var line = lines[lineNumber];
    while(
        lineNumber + i < totalLines &&
        line != "" &&
        (
            line.slice(0, offset).replaceAll(" ", "") == "" &&
            (isListStart(line.slice(offset)) || isOrdonatedListStart(line.slice(offset)))
        )
    ) {
        
    }*/
   // TODO
   return {}
}

function ordonatedListTokenizer(lines, lineNumber, totalLines, offset = 0) {
    // TODO
    return {}
}

function paragraphTokenizer(lines, lineNumber, totalLines) {
    var value = "";
    var i = 0;
    var line = lines[lineNumber];
    while(lineNumber + i < totalLines && line != "") {
        value += line;
        i++;
        line = lines[lineNumber + i];
    }

    return {
        "parsedLineCount": i,
        "token": {
            "type": "paragraph",
            "treat": function (info) {return null;},
            "info": {
                "value": value
            }
        }
    }
}