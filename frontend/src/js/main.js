// Import our custom CSS
import '../scss/styles.scss'
import Swal from 'sweetalert2'
import ClientMonitor from 'skywalking-client-js';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

console.log("Script running");


document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector(".d-flex");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();
        performSearch();
    });
});


let currentHighlightIndex = 0;
let matchingRanges = [];
let lastSearchedWord = null;
// navbar scroll effect
$(document).ready(function () {
    $(document).scroll(function () {
        let $nav = $("#navigation");
        let scrollPosition = $(this).scrollTop();
        let navHeight = $nav.height();

        console.log("Scroll Position:", scrollPosition);
        console.log("Navbar Height:", navHeight);

        if (scrollPosition > navHeight) {
            $nav.addClass('scrolled');
            console.log("Scrolled class added!");
        } else {
            $nav.removeClass('scrolled');
            console.log("Scrolled class removed!");
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    // Fade in the page when it's fully loaded
    document.body.classList.add('fade-in');
});

function fadeOut() {
    document.body.classList.add('fade-out');
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        const href = link.getAttribute('href');
        fadeOut();
        setTimeout(() => {
            window.location.href = href;
        }, 500); 
    });
});
//-----------------
// search bar highlight
function performSearch() {
    clearHighlight();

    let word = document.getElementById('search').value;
    console.log("Word:", word);

    if (!word) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a search term',
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

// find matching ranges
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

// highlight range
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

// clear highlight
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
// clear highlight
document.addEventListener('click', function () {
    clearHighlight();
});