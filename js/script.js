window.onload = init;
window.onkeyup = displayWordCharacter;
// - functions:

// 1. Initialization

// - get a random element set from the template
//   - p with .hint and .riddle

function getLanguage() {
    return document.querySelector('option:checked').value;
}

function init() {
    var language = getLanguage();
    var id = getRandomId(language);
    setHintText(id, language);
    setRiddle(id, language);
}

function getRandomId(langKey) {
    // Math.random() returns a value between 0 and 1
    // editors-playground
    var randomId = Math.floor(
        Array.from(document
            // getElementById('id-attribute-value') returns 1 element
            //.getElementById('editors-playground')
            // getElementsByClassName('class-attribute-value')
            // returns a list
            // of all elements
            // having the class
            .querySelectorAll('#editors-playground .riddle[lang="' + langKey + '"]'))
            // attribute 'length' returns the item count of the elements
            .length * Math.random());
    // the return keyword is the last
    // statement within a function
    // and provides any variable as a result
    // of the function call.
    return randomId;
    // any code after a return statement is never executed
    // console.log('never shown');
}
function getRandomRiddle(index, langKey) {
    var riddle = Array.from(document
        .querySelectorAll('.riddle[lang="' + langKey + '"]'))[index];
    return riddle;

}
//       - get the .hint text content of the random element
//         and display it to the user as hint to guess the solution
//         by typing characters on the keyboard
function setHintText(randomId, langKey) {
    var riddle = getRandomRiddle(randomId, langKey);
    var riddleHint = riddle.getElementsByClassName('hint-text')[0].firstChild.nodeValue;
    // console.info(riddleHint);
    document.getElementById('hint').innerText = riddleHint;
}

function setRiddle(randomId, langKey) {
    var riddle = getRandomRiddle(randomId, langKey);
    var riddleText = riddle.getElementsByClassName('riddle-text')[0]
        .firstChild.nodeValue.toUpperCase();
    console.log(riddleText, riddleText.length);
    // var html should be a string buffer variable to be created
    // within the for loop,
    // and later assigned to the Element with
    // the id 'guess-the-words'
    var html = '';
    var styleWidth = 100 / riddleText.length - 1;

    styleWidth = styleWidth + '%';
    console.log(styleWidth);
    //  - get the length of the riddle string
    for (i = 0; i < riddleText.length; i++) {

        // - for the length in the string we create
        // a div with the character of the riddleText at current index 'i'
        // and append it to the 'html' variable
        html = html + '<div style="width: calc(' + styleWidth + ' - 6px);">' + riddleText[i] + '</div>';
        // console.log(html);
    }

    // guess-the-words
    // set boxes in the #guess-the-words
    document.getElementById('guess-the-words').innerHTML = html;
}

//          empty/reset the #guess-the-words target div element
function reset() {
    init()
}

function solve() {
    var nodeList = Array.from(document.querySelectorAll('#guess-the-words div'));
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].style.textIndent = '0'
    }
}

function displayWordCharacter(keyboard_event) {
    // use a regular expression match on the typed key value.
    // key value is a string, depending on which key we press on the keyboard

    // \u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df
    // are the unicode characters of german umlauts
    var value = '';
    // match for all umlauts
    switch (keyboard_event.key) {
        case "\u00c4": ;
        case "\u00e4": ;
        case "\u00d6": ;
        case "\u00f6": ;
        case "\u00dc": ;
        case "\u00fc": ;
        case "\u00df": value = keyboard_event.key;
            break;
        default:
            value = keyboard_event.key.match(/([a-z])/gi);
    }

    // console.log(value)
    // if we have a alphabetical character and the string length equals 1
    if (value && value.length == 1) {
        // log the key
        // console.info(keyboard_event.key);
        value = keyboard_event.key.toLowerCase();
        var solution = document.getElementById('guess-the-words').innerText.toLowerCase();
        for (var i = 0; i < solution.length; i++) {
            if (solution[i] == value) {
                console.info('Character found!', solution[i]);
                document.getElementById('guess-the-words')
                    .getElementsByTagName('div')[i].style.textIndent = 0;
            }
        }

    }
    else
        // otherwise log a warning
        console.warn('you did not have typed an alphabetical character ...');
}