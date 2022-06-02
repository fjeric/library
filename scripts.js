function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        if (isRead) {
            return (title + ' by ' + author + ', ' + pages + ' pages, already read');
        }
        else {
        return (title + ' by ' + author + ', ' + pages + ' pages, not read yet');
        }
    }
}


var library = [];

const bookForm = document.getElementById('bookForm');
const tableBody = document.getElementById('tableInfo');


const book1 = new Book('Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 341, true);
library.push(book1);


const $form = document.querySelector("form").addEventListener("submit", (e) => {
e.preventDefault();
submitClicked();
populateTable();
clearFields();
});

function addBook() {
const bookTitle = document.getElementById('title').value;
const bookAuthor = document.getElementById('author').value;
const pages = document.getElementById('pages').value;
const readStatus = document.getElementById('isRead').checked;
if (readStatus.checked) {
return new Book (bookTitle, bookAuthor, pages, true)
}
return new Book (bookTitle, bookAuthor, pages, false)
}

function submitClicked() {
library.push(addBook());
return;
}

function clearFields() {
document.getElementById('title').value = "";
document.getElementById('author').value = "";
document.getElementById('pages').value = "";
document.getElementById('isRead').checked = false;
}


function populateTable() {
const bookList = document.querySelector('#tableInfo');
bookList.textContent = '';
for(let i = 0; i < library.length; i += 1) {
    const bookRow = document.createElement('tr');
    bookRow.classList.add('book-info');
    bookList.appendChild(bookRow);

    const title = document.createElement('td');
    title.textContent = library[i].title;
    bookRow.appendChild(title);

    const author = document.createElement('td');
    author.textContent = library[i].author;
    bookRow.appendChild(author);

    const pages = document.createElement('td');
    pages.textContent = library[i].pages;
    bookRow.appendChild(pages);

    const status = document.createElement('td');
    const symbol = document.createElement('button');
    if (library[i].isRead === false) {
        symbol.innerHTML = 'Not Read';
    } else {
        symbol.innerHTML = 'Read';
    }
    status.appendChild(symbol);
    bookRow.appendChild(status);

    const bookDelete = document.createElement('td');
    const delSymbol = document.createElement('button');
    delSymbol.innerHTML = 'Remove';
    bookDelete.appendChild(delSymbol);
    bookRow.appendChild(bookDelete);
}
}

const $table = document.querySelector("table").addEventListener("click", (e) => {
const { target } = event;
const currentTarget = e.target.parentNode.parentNode.rowIndex - 1;
if (e.target.innerHTML == 'Remove') {
    library.splice(currentTarget, 1);
}
if (e.target.innerHTML == 'Not Read') {
    library[currentTarget].isRead = true;
}
if (e.target.innerHTML == 'Read') {
    library[currentTarget].isRead = false;
}
populateTable();
})

populateTable();
