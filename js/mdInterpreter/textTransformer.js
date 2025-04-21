function textTransformer(text) {
    var textLength = text.length;
    var generatedDOMList = [];
    
    var i = 0;
    var isEscaped = false;
    var actualText = "";
    while(i < textLength) {
        var step = 1;
        var caracter = text[i];

        if(caracter == "*") {
            if(isEscaped) {
                actualText += caracter;
                isEscaped = false;
            } else {
                if(text[i + 1] == "*") {
                    var trtBold = parseType(text, i, "**", toBold);
                    //var trtBold = parseBold(text, i);
                    if(trtBold["valid"]) {
                        if(actualText != "") {
                            generatedDOMList.push( toSpan(actualText) );
                            actualText = "";
                        }

                        step = trtBold["treated_size"];
                        generatedDOMList.push(trtBold["dom"]);
                    } else {
                        actualText += caracter;
                    }
                } else {
                    var trtItalic = parseType(text, i, "*", toItalic);
                    //var trtItalic = parseItalic(text, i);
                    if(trtItalic["valid"]) {
                        if(actualText != "") {
                            generatedDOMList.push( toSpan(actualText) );
                            actualText = "";
                        }

                        step = trtItalic["treated_size"];
                        generatedDOMList.push(trtItalic["dom"]);
                    } else {
                        actualText += caracter;
                    }
                }
            }
        } else if(caracter == "_") {
            if(isEscaped) {
                actualText += caracter;
                isEscaped = false;
            } else {
                if(text[i + 1] == "_") {
                    var trtUnderline = parseType(text, i, "__", toUnderline);
                    //var trtUnderline = parseUnderline(text, i);
                    if(trtUnderline["valid"]) {
                        if(actualText != "") {
                            generatedDOMList.push( toSpan(actualText) );
                            actualText = "";
                        }
                        
                        step = trtUnderline["treated_size"];
                        generatedDOMList.push(trtUnderline["dom"]);
                    } else {
                        actualText += caracter;
                    }
                } else {
                    actualText += caracter;
                }
            }
        } else if(caracter == "~") {
            if(isEscaped) {
                actualText += caracter;
                isEscaped = false;
            } else {
                if(text[i + 1] == "~") {
                    var trtStrike = parseType(text, i, "~~", toStrike);
                    //var trtStrike = parseStrike(text, i);
                    if(trtStrike["valid"]) {
                        if(actualText != "") {
                            generatedDOMList.push( toSpan(actualText) );
                            actualText = "";
                        }

                        step = trtStrike["treated_size"];
                        generatedDOMList.push(trtStrike["dom"]);
                    } else {
                        actualText += caracter;
                    }
                } else {
                    actualText += caracter;
                }
            }
        } else {
            if(caracter == "\\") {
                if(isEscaped) {
                    actualText += caracter;
                    isEscaped = false;
                } else {
                    isEscaped = true;
                }
            } else {
                actualText += caracter;
            }
        }
        i += step;
    }
    if(actualText != "") {
        generatedDOMList.push( toSpan(actualText) );
    }
    return generatedDOMList;
}

function parseType(text, start, tag, transformer) {
    var res = {"valid": true};
    var tagLength = tag.length;
    var endOf = text.indexOf(tag, start + tagLength);

    if(endOf == -1) {
        res["valid"] = false;
    } else {
        res["treated_size"] = endOf + tagLength - start;
        res["dom"] = transformer( text.slice(start + tagLength, endOf));
    }

    return res;
}

function textTransformerToParent(parent, text) {
    var domList = textTransformer(text);
    domList.forEach(dom => {
        parent.appendChild(dom);
    });
}

function toSpan(text) {
    var span = document.createElement("span");
    span.innerHTML = text;
    return span;
}

function toBold(text) {
    var b = document.createElement("b");
    b.innerHTML = text;
    return b;
}

function toItalic(text) {
    var i = document.createElement("i");
    i.innerHTML = text;
    return i;
}

function toUnderline(text) {
    var u = document.createElement("u");
    u.innerHTML = text;
    return u;
}

function toStrike(text) {
    var s = document.createElement("s");
    s.innerHTML = text;
    return s;
}