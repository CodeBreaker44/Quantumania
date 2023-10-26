// Import our custom CSS
import '../scss/styles.scss'
import Swal from 'sweetalert2'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

console.log("Script running");

document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector(".d-flex");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        event.stopPropagation(); 
        performSearch();
    });
});


let currentHighlightIndex = 0;
let matchingRanges = [];
let lastSearchedWord = null;

function performSearch() {
    clearHighlight();

    let word = document.getElementById('search').value;
    console.log("Word:", word); 

    if (!word) {
       Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a serach term',
          }) 
       return;
    }

    let regex = new RegExp(word, 'gi');
    console.log("Regex:", regex);  

    if (currentHighlightIndex === 0 || word !== lastSearchedWord) {
        matchingRanges = [];
        findMatchingRanges(document.body, regex);
    }

    console.log("Number of matches:", matchingRanges.length);  

    if (matchingRanges.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No match Found',
          }) 
        return;
    }

    highlightRange(matchingRanges[currentHighlightIndex]);
    currentHighlightIndex = (currentHighlightIndex + 1) % matchingRanges.length;

    lastSearchedWord = word;
}

function findMatchingRanges(node, regex) {
    if (node.nodeType === 3) {
        let match;
        while (match = regex.exec(node.textContent)) {
            if (match.index === 0 || match.index + match[0].length === node.textContent.length || 
                !/\w/.test(node.textContent[match.index - 1]) || !/\w/.test(node.textContent[match.index + match[0].length])) {
                let range = document.createRange();
                range.setStart(node, match.index);
                range.setEnd(node, match.index + match[0].length);
                matchingRanges.push(range);
            }
        }
    } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
        node.childNodes.forEach(child => findMatchingRanges(child, regex));
    }
}


function highlightRange(range) {
    if (!range) return;

    let span = document.createElement('span');
    span.className = 'highlighted-text';
    try {
        range.surroundContents(span);
    } catch (e) {
        console.error("Failed to surround range:", e);
    }
}


function clearHighlight() {
    let highlightedElems = document.querySelectorAll('.highlighted-text');
    highlightedElems.forEach(elem => {
        let parent = elem.parentNode;
        while (elem.firstChild) {
            parent.insertBefore(elem.firstChild, elem);
        }
        parent.removeChild(elem);
    });
}

document.addEventListener('click', function() {
    clearHighlight();
});
