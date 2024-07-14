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

function showOutput() {
    const recentBook = myLib[myLib.length-1]
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
    title.textContent = `Title: ${recentBook.title}`;
    author.textContent = `Author: ${recentBook.author}`;
    pages.textContent = `Page: ${recentBook.pages}`;
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
        newBook.remove();
    })
}

const addBookButton = document.querySelector('div.custom-list button.custom-list-button');
const dialog = document.querySelector('dialog');
const confirmBtn = document.querySelector('#confirmButton');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookStatus = document.querySelector('#status');
const closeBtn = document.querySelector('#closeButton')


addBookButton.addEventListener('click', (e) => {
    dialog.showModal()
})


confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value)
    myLib.push(newBook)
    showOutput()
    dialog.close()
})