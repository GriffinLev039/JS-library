const content = document.getElementById("content");

const myLibrary = [];

class Book {
    constructor(bookName, bookAuthor, bookGenre, isRead) {
        this.name = bookName;
        this.author = bookAuthor;
        this.genre = bookGenre;
        this.isRead = isRead;
    }

}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}




function display() {
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        displayBook(myLibrary[i], i);
    }
}



function displayBook(targetBook, index) {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("book");

    const bookTitle = document.createElement("h1");
    bookTitle.textContent = targetBook.name;
    parentDiv.appendChild(bookTitle);

    const bookAuthor = document.createElement("h3");
    bookAuthor.textContent = targetBook.author;
    parentDiv.appendChild(bookAuthor);

    const bookInfo = document.createElement("p");
    bookInfo.textContent = targetBook.genre + (targetBook.isRead ? " Read" : " Unread");
    parentDiv.appendChild(bookInfo);

    const readBtn = document.createElement('button');
    readBtn.textContent = "toggle read";
    readBtn.addEventListener('click',()=>{
        targetBook.isRead = !targetBook.isRead;
        bookInfo.textContent = targetBook.genre + (targetBook.isRead ? " Read" : " Unread");
    });
    parentDiv.appendChild(readBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "delete";
    deleteBtn.dataset.indexValue = index;
    deleteBtn.addEventListener('click',()=>{

        myLibrary.splice(deleteBtn.dataset.indexValue, 1);
        content.removeChild(parentDiv);
    });
    parentDiv.appendChild(deleteBtn);

    content.appendChild(parentDiv);
}


//Dialog DOM stuff
const dialog = document.getElementById("dialog");
const form = document.getElementById("form");
const dialogBtn = document.getElementById("dialogBtn");
const closeBtn = document.getElementById("closeBtn");

dialogBtn.addEventListener('click',()=>{
    dialog.showModal();
})
closeBtn.addEventListener('click',()=>{

    const bookName = form.elements["bookName"].value;
    const bookAuthor = form.elements["authorName"].value;
    const bookGenre = form.elements["bookGenre"].value;
    const isRead = form.elements["isRead"].value;
    const newBook = new Book(bookName, bookAuthor, bookGenre, isRead);
    addBookToLibrary(newBook);
    display();
    dialog.close();
});