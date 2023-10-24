// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

function executeSearch() {
    var input = document.getElementById("search");
    if (!input) {
        console.error("Input element with ID 'search' not found.");
        return;
    }

    var filter = input.value.toUpperCase();
    var ul = document.getElementById("list");
    if (!ul) {
        console.error("UL element with ID 'list' not found.");
        return;
    }

    var li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        var aElements = li[i].getElementsByTagName("a");
        if (aElements.length === 0) {
            // This <li> doesn't contain an <a> element, so skip it
            continue;
        }
        var a = aElements[0];
        var txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    console.log("Search completed!");
}


search();