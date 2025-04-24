// Parse a MarkDown String to a Tokens list
function toToken(markdown) {
    while(/^\n/.test(markdown)) {
        markdown = markdown.slice(1);
    }
    var tokens = [];
    var lines = markdown.split("\n");

    for(var i = 0 ; i < lines.length ; i++) {
        if(lines[i] == "") {
            lines[i] = "\n";
        }
    }

    var lineNumber = 0;
    const totalLines = lines.length;

    while(lineNumber < totalLines) {
        var line = lines[lineNumber];
        var token;
        var treatedLines = 1;

        if(isStructure(line)) {
            var structureTag = line.split(" ")[0];
            var structureModel = getStructure( structureTag );
            var value = line;

            if(structureModel["multiline"]) {
                var identifier = structureModel["identifier"]
                while(
                    lineNumber + treatedLines < totalLines &&
                    structureMatch(identifier, lines[lineNumber + treatedLines].split(" ")[0])
                ) {
                    value += "\n" + lines[lineNumber + treatedLines];
                    treatedLines++;
                }
            }
            
            token = {
                "treat": structureModel.treat,
                "value": value
            }
        } else {
            var complexStructureInfo = getComplexStructureInfo(lines, lineNumber);
            
            if(complexStructureInfo["lines"] == 0) {
                // just a paragraph
                var value = line;
                while(
                    lineNumber + treatedLines < totalLines &&
                    !isStructure( lines[lineNumber + treatedLines] )
                ) {
                    value += lines[lineNumber + treatedLines];
                    treatedLines++;
                }
                
                token = {
                    "treat": paragraphDomizer,
                    "value": value
                }
            } else {
                // a complex structure
                var value = line;
                for(var i = 1 ; i < complexStructureInfo["lines"] ; i++) {
                    value += "\n" + lines[lineNumber + i];
                }

                treatedLines = complexStructureInfo["lines"];
                token = {
                    "treat": complexStructureInfo.treat,
                    "value": value,
                }
            }
        }

        tokens.push(token);
        lineNumber += treatedLines;
    }

    return tokens;
}

function isStructure(line) {
    var strucutreTag = line.split(" ")[0];
    return !strucutreTag.startsWith("\\") && getStructure(strucutreTag) != undefined;
}

function getComplexStructureInfo(lines, lineNumber) {
    const complexStructures = getComplexStructures();
    var res = { "lines": 0 }
    var i = 0;

    while(i < complexStructures.length && res["lines"] == 0) {
        var complexStructure = complexStructures[i];
        var structureLineNumber = complexStructure.selector(lines, lineNumber);

        if(structureLineNumber != 0) {
            res["lines"] = structureLineNumber;
            res["treat"] = complexStructure.treat;
        }
        i++;
    }
    return res;
}
/*
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

function listTokenizer(lines, lineNumber, totalLines, level = 0) {
    var value = {};
    var n = 0;
    var i = 0;
    var canContinue = true;
    var line = lines[lineNumber];
    
    while(
        lineNumber + i < totalLines &&
        line.slice(0, level).replaceAll(" ", "") == "" &&
        canContinue
    ) {
        var treatedLineNumber = 0;
        
        var newLine = line.slice(level);
        if(isListStart(newLine)) {
            value[n] = newLine.slice(2);
            n++;
            treatedLineNumber = 1;
        } else if(newLine[0] == " ") {
            newLine = newLine.slice(1)
            if(isListStart(newLine)) {
                var tokenized = listTokenizer(lines, lineNumber+i, totalLines, level + 1);
                value[n] = tokenized["token"];
                treatedLineNumber = tokenized["parsedLineCount"];
            } else if(isOrdonatedListStart(newLine)) {
                var tokenized = ordonatedListTokenizer(lines, lineNumber+i, totalLines, level + 1);
                value[n] = tokenized["token"];
                treatedLineNumber = tokenized["parsedLineCount"];
                n++;
            } else {
                canContinue = false;
            }
        } else {
            canContinue = false;
        }
        
        i += treatedLineNumber;

        if(lineNumber + i < totalLines) {
            line = lines[lineNumber + i];
        }
    }
    return {
        "parsedLineCount": i,
        "token": {
            "type": "list",
            "treat": listDomizer,
            "info": {
                "value": value
            }
        }
    }
}

function ordonatedListTokenizer(lines, lineNumber, totalLines, level = 0) {
    var value = {};
    var n = 0;
    var i = 0;
    var canContinue = true;
    var line = lines[lineNumber];
    
    while(
        lineNumber + i < totalLines &&
        line.slice(0, level).replaceAll(" ", "") == "" &&
        canContinue
    ) {
        var treatedLineNumber = 0;
        
        var newLine = line.slice(level);
        if(isOrdonatedListStart(newLine)) {
            value[n] = newLine.slice(2);
            n++;
            treatedLineNumber = 1;
        } else if(newLine[0] == " ") {
            newLine = newLine.slice(1)
            if(isListStart(newLine)) {
                var tokenized = listTokenizer(lines, lineNumber+i, totalLines, level + 1);
                value[n] = tokenized["token"];
                treatedLineNumber = tokenized["parsedLineCount"];
            } else if(isOrdonatedListStart(newLine)) {
                var tokenized = ordonatedListTokenizer(lines, lineNumber+i, totalLines, level + 1);
                value[n] = tokenized["token"];
                treatedLineNumber = tokenized["parsedLineCount"];
                n++;
            } else {
                canContinue = false;
            }
        } else {
            canContinue = false;
        }
        
        i += treatedLineNumber;

        if(lineNumber + i < totalLines) {
            line = lines[lineNumber + i];
        }
    }
    
    return {
        "parsedLineCount": i,
        "token": {
            "type": "ordonatedList",
            "treat": ordinatedListDomizer,
            "info": {
                "value": value
            }
        }
    }
}*/