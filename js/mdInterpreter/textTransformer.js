function textTransformerToParent(parent, text) {
    var domList = textTransformer(text);
    domList.forEach(dom => {
        parent.appendChild(dom);
    });
}

function textTransformer(text) {
    var textLength = text.length;
    var generatedDOMList = [];

    const tags = getTags();
    
    var i = 0;
    var actualText = "";
    var isEscaped = false;
    while(i < textLength) {
        var caracter = text[i];

        if(isEscaped) {
            actualText += caracter;
            isEscaped = false;
            i++;
            continue;
        }

        var step = 1;

        var tagsLevel = Object.keys(tags).reverse();
        var j = 0;
        var treated = false;
        while(j < tagsLevel.length && !treated) {
            var level = tagsLevel[j];
            var levelTags = tags[level];

            var w = 0;
            while(w < levelTags.length && !treated) {
                var tagInfo = levelTags[w];
                var tag = tagInfo["tag"];
                console.log(tagInfo);
                console.log(text.slice(i, i + parseInt(level) ));
                console.log("tt");

                if(text.slice(i, i + parseInt(level)) == tag) {
                    var endsOfTag = nextValidTag(text, tag, i + parseInt(level));
                    if(endsOfTag != -1) {
                        var treatedTag = tagInfo.treat( text.slice(i + parseInt(level), endsOfTag) );
                        if(treatedTag instanceof Element) {
                            if(actualText != "") {
                                generatedDOMList.push( generateSpan(actualText) );
                                actualText = "";
                            }

                            generatedDOMList.push( treatedTag );
                            step = endsOfTag + parseInt(level) - i;
                            treated = true;
                        }
                    }
                }

                w++;
            }

            j++;
        }

        if(!treated) {
            actualText += caracter;
        }

        i += step;
    }

    if(actualText != "") {
        generatedDOMList.push( generateSpan(actualText) );
    }

    return generatedDOMList;
}

function nextValidTag(text, tag, offset) {
    var next = text.indexOf(tag, offset);
    if(next == -1) {
        return next;
    }
    if(text[next - 1] == "\\") {
        return nextValidTag(text, tag, next + 1);
    }
    return next;
}

function generateSpan(text) {
    var p = document.createElement("span");
    p.innerHTML = text;
    return p;
}

/*

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
}*/