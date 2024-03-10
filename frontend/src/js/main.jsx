// Import our custom CSS
import '../scss/styles.scss'
import Swal from 'sweetalert2'
import ClientMonitor from 'skywalking-client-js';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Transition, CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../components/App.jsx';
import Fade from 'react-reveal/Fade';




// function MainComponent() {
//     const [inPropPasswords, setInPropPasswords] = useState(false);
//     const [inPropCreditCard, setInPropCreditCard] = useState(false);
//   return (
//     <div>
//       <button className='btn btn-primary' onClick={() => setInPropPasswords(!inPropPasswords)}>Passwords</button>
//       <Transition in={inPropPasswords} timeout={300}>
//         {(state) => (
//           <div
//             style={{
//               ...defaultStyle,
//               ...transitionStyles[state]
//             }}
//           >
//             {/* a form to submit password to be encrypted  */}
//             <form>
//                 <div class="mb-3">
//                     <label for="exampleInputPassword1" class="form-label">Password</label>
//                     <input type="password" class="form-control" id="exampleInputPassword1" />
//                 </div>
//             </form>
//           </div>
//         )}
//       </Transition>

//       <button className='btn btn-danger' onClick={() => setInPropCreditCard(!inPropCreditCard)}>Credit Cards </button>
//       <Transition in={inPropCreditCard} timeout={300}>
//         {(state) => (
//           <div
//             style={{
//               ...defaultStyle,
//               ...transitionStyles[state]
//             }}
//           >
//             I am Loki of asgard and i am burdened with glorious purpose
//           </div>
//         )}
//       </Transition>
//     </div>
//   );
// }


// export default function main() {
//     return(
//         <section>
//             <Transition />
//         </section>
    
//     )}


console.log("Script running");


document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector(".d-flex");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();
        performSearch();
        
    });
    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    root.render(<App/>);
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
        const href = link.getAttribute('href');
        if(!href.startsWith('#') && href !== window.location.pathname) {
            e.preventDefault(); 
            fadeOut(); 
            setTimeout(() => {
                window.location.href = href; 
            }, 500);
        }
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

var form = document.getElementById('test');
console.log(form);