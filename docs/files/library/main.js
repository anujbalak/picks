const bookList = document.querySelector('ul')

const myLib = [];

class Book {
    constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    }

    get book() {
        this._title = title;
        this._author = author;
        this._pages = pages;
    }
}

function showOutput(titleValue, authorValue, pagesValue) {
    const newBook = document.createElement('li');
    const removeBtn = document.createElement('button')
    const bookInfo = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const status = document.createElement('label');
    const readValue = document.createElement('select');
    const didNotRead = document.createElement('option');
    const reading = document.createElement('option');
    const finished = document.createElement('option');
    removeBtn.textContent = '×';
    title.textContent = `Title: ${titleValue}`;
    author.textContent = `Author: ${authorValue}`;
    pages.textContent = `Page: ${pagesValue}`;
    status.textContent = `Status: `;
    didNotRead.textContent = `Didn't Read`;
    reading.textContent = 'Reading';
    finished.textContent = 'Finished';
    newBook.className = 'card';
    bookInfo.className = 'bookInfo';
    removeBtn.className = 'removeBtn'
    title.className = 'title';
    author.className = 'author';
    pages.className = 'pages';
    status.className = 'status';
    status.setAttribute('id' ,'status');
    status.setAttribute('for', 'statusValue');
    readValue.setAttribute('id', 'statusValue');
    didNotRead.setAttribute('value', 'DidNotRead');
    reading.setAttribute('value', 'reading');
    finished.setAttribute('value', 'finished');
    bookList.appendChild(newBook);
    newBook.appendChild(removeBtn);
    newBook.appendChild(bookInfo);
    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);
    bookInfo.appendChild(status);
    status.appendChild(readValue);
    readValue.appendChild(didNotRead);
    readValue.appendChild(reading);
    readValue.appendChild(finished);
    removeBtn.addEventListener('click', (e) => {
        removeBook(newBook, titleValue);
    })
}
 
function removeBook(newBook, title) {
    removeBookFromLib(title);
    removeBookFromStorage();
    newBook.remove()
}

function removeBookFromLib(titleValue) {
    let book = myLib.find(({title}) => title === titleValue);
    let bookIndex = myLib.indexOf(book)
    myLib.splice(bookIndex, 1)
}

function removeBookFromStorage() {
    const availableBooks = JSON.parse(localStorage.getItem('lib'));
    if (availableBooks != null) {
    for (let i in availableBooks) {
        let book = availableBooks[i];
        let title = book.title;
        let author = book.author;
        let pages = book.pages;
        localStorage.removeItem('lib');
        saveInStorage();
    }
}
}

//////////////////////////////// dialog //////////////////////////

const addBookButton = document.querySelector('div.custom-list button.custom-list-button');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form.form');
const confirmBtn = document.querySelector('#confirmButton');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookStatus = document.querySelector('#status');
const closeBtn = document.querySelector('#closeButton')

const titleError = document.querySelector('.title-error');
const authorError = document.querySelector('.author-error');
const pagesError = document.querySelector('.pages-error');


addBookButton.addEventListener('click', () => {
    dialog.showModal()
})

function showError() {
    if (bookTitle.validity.valueMissing) {
        titleError.textContent = 'You need to a enter book name.'
    }
    if (bookAuthor.validity.valueMissing) {
        authorError.textContent = 'Enter the book author name.'
    }
    if (bookPages.validity.valueMissing) {
        pagesError.textContent = 'Enter book pages number.'
    }
}

bookTitle.addEventListener('input', ()=> {
    if (bookTitle.validity.valueMissing) {
        titleError.textContent = 'You need to a enter book name.'
    } else {
        titleError.textContent = '';
    }
})

bookAuthor.addEventListener('input', () => {
    if (bookAuthor.validity.valueMissing) {
        authorError.textContent = 'You need to a enter book name.'
    } else {
        authorError.textContent = '';
    }
})

bookPages.addEventListener('input', () => {
    if (bookPages.validity.valueMissing) {
        pagesError.textContent = 'You need to a enter book name.'
    } else {
        pagesError.textContent = '';
    }
})

function clearDialogValues () {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
}

closeBtn.addEventListener('click', () => {
    dialog.close();
    clearDialogValues();
})

/////////////////////////////////////////////////////////////

function addInMyLib() {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value)
    myLib.push(newBook)
}

function saveInStorage() {
    localStorage.setItem('lib', JSON.stringify(myLib));
}

function addInDOM() {
    let lastBookIndex = myLib.length-1
    let lastBook = myLib[lastBookIndex];
    let title = lastBook.title;
    let author = lastBook.author;
    let pages = lastBook.pages;
    showOutput(title, author, pages);
}

const availableBooks = JSON.parse(localStorage.getItem('lib'));
if (availableBooks != null) {
    for (let i in availableBooks) {
        let book = availableBooks[i];
        let title = book.title;
        let author = book.author;
        let pages = book.pages;
        let newBook = new Book(title, author, pages);
        myLib.push(newBook);
        addInDOM();
    }
}

form.addEventListener('submit', (e) => {
    let error = bookTitle.validity.valueMissing || bookAuthor.validity.valueMissing || bookPages.validity.valueMissing; 
    e.preventDefault();
    if (error) {
        showError();
    } else {
        addInMyLib()
        saveInStorage();
        addInDOM();
        dialog.close()
        clearDialogValues();
    }

})