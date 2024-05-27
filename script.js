const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.textContent = inputBox.value; // Use textContent for text nodes
        listContainer.appendChild(li);

        let span = document.createElement('span');
        span.textContent = "\u00d7"; // Use textContent instead of innerHTML for plain text
        li.appendChild(span);

        span.addEventListener('click', function () {
            li.remove();
            saveData();
        });
    }
    inputBox.value = '';
    saveData();
}

// Example of adding an event listener to a button (assuming there is a button with id 'add-button')
document.getElementById('add-button').addEventListener('click', addTask);

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    const data = localStorage.getItem('data');
    if (data) {
        listContainer.innerHTML = data;
        // Re-attach event listeners to spans after loading from localStorage
        const spans = listContainer.querySelectorAll('li span');
        spans.forEach(span => {
            span.addEventListener('click', function() {
                span.parentElement.remove();
                saveData();
            });
        });
    }
}

showTask();
