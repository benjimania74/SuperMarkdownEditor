// TAGS

const tags = {};

function addTag(tag, treatFunction) {
    var tagPriority = tag.length;
    if(tags[tagPriority] == undefined) {
        tags[tagPriority] = [];
    }
    tags[tagPriority].push({
        "tag": tag,
        "treat": treatFunction
    });
}

function getTags() {
    return tags;
}

// STRUCTURES

const structures = [];

function addStructure(structureTagOrRegex, isMultiLine, treatFunction) {
    structures.push({
        "identifier": structureTagOrRegex,
        "multiline": isMultiLine,
        "treat": treatFunction
    });
}

function getStructure(structureTag) {
    var res = undefined;

    var i = 0;
    while(i < structures.length) {
        var structure = structures[i];
        var identifier = structure["identifier"];

        if(structureMatch(identifier, structureTag)) {
            res = structure;
            break;
        }
        i++;
    }

    return res;
}

function getStructures() {
    return structures;
}

function structureMatch(structureTagOrRegex, tag) {
    var res = false;
    if(typeof structureTagOrRegex == "string") {
        if(structureTagOrRegex == tag) {
            res = true;
        }
    } else { // it is a regex
        if(structureTagOrRegex.test(tag)) {
            res = true;
        }
    }
    return res;
}

// COMPLEX STRUCTURES

const complexStructures = [];

function addComplexStructure(lineSelector, treatFunction) {
    complexStructures.push({
        "selector": lineSelector,
        "treat": treatFunction
    });
}

function getComplexStructures() {
    return complexStructures;
}