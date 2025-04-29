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
        if(caracter == "\\") {
            isEscaped = true;
            i++;
            continue;
        }

        var step = 1;

        var actualPortion = text.slice(i);
        const singleTags = getSingleTags();

        var j = 0;
        var treated = false;
        while(j < singleTags.length && !treated) {
            var singleTag = singleTags[j];
            var endsOfTag = getEndsOfSingleTagMatch(singleTag["pattern"], actualPortion);
            if(endsOfTag != -1) {
                var tag = actualPortion.slice(0, endsOfTag);
                var treatedTag = singleTag.treat( actualPortion.slice(0, endsOfTag) );
                if(treatedTag instanceof Element) {
                    if(actualText != "") {
                        generatedDOMList.push( generateSpan(actualText) );
                        actualText = "";
                    }

                    generatedDOMList.push( treatedTag );
                    step = endsOfTag;
                    treated = true;
                }
            }
            j++;
        }

        var tagsLevel = Object.keys(tags).reverse();
        j = 0;
        while(j < tagsLevel.length && !treated) {
            var level = tagsLevel[j];
            var levelTags = tags[level];

            var w = 0;
            while(w < levelTags.length && !treated) {
                var tagInfo = levelTags[w];
                var tag = tagInfo["tag"];

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