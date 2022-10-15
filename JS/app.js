// Class BOOK: handle books
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Class UI: Handle UI tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(book => {
            UI.addBookToList(book)
            return book;
        });
    }

    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(tr);
    }

    static showAlert(message, clasnme) {
        const div = document.createElement('div');
        div.className = `p-2 ${clasnme}`;
        div.id = "remove";
        // div.setAttribute('role', 'alert')
        div.appendChild(document.createTextNode(message));
        const form = document.querySelector("#book-form");
        form.parentNode.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector("#remove").remove()
        }, 3000);
    }

    static clearInputs() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

    static removebook(e) {
        if (e.classList.contains("delete")) {
            e.parentElement.parentElement.remove();
        }
    }

}

// // Class store:  handle storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))
    }

    static removeBooks(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books))
    }
}


// display books
document.querySelector("#book-form").addEventListener("DOMcontentLoaded", UI.displayBooks())

// add book event

document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Add all feilds", "alert-danger");
    } else {
        // creating object of Book class
        const book = new Book(title, author, isbn);

        // adding book to list
        UI.addBookToList(book);

        Store.addBooks(book);

        UI.showAlert("Book added", "alert-success");

        // clearing inputs
        UI.clearInputs();
    }


})
// remove book event
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.removebook(e.target);

    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)

    UI.showAlert("Book removed", "alert-success", "alert");
})
