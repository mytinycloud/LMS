class CatalogueModel {
    constructor() {
        this.books = this.loadBooks()       
    }
    
    loadBooks() {
        const booksJSON = localStorage.getItem('library_books');
        const books = booksJSON ? JSON.parse(booksJSON) : [];
            return books.map(book => new Book(book.bookId, book.title, book.author, book.genre, book.ISBN, book.availability, book.location, book.description));
    }
 
    saveBooks() {
        localStorage.setItem('library_books', JSON.stringify(this.books));
    }

    // addBook takes a book object from the controller and adds it to the books array, then saves the books to local storage.
    addBook(book) {
        if (book){
            console.log("Adding book: ", book);
            this.books.push(book);
            this.saveBooks();
        }else{
            console.log("Book is undefined");
        }
    }
    // updateBook uses the setters to update the book object with the new values from the controller, then saves the books.
    editBook(bookId, update) {
        let books = this.searchBook(bookId);
        let book = books[0]
        if (book) {
            Object.assign(book, update);
            this.saveBooks()
            console.log('tis book was saved: ', update)
            console.log(`Book with ID ${book.bookId} updated successfully.`);
        } else {
            console.log(`Book with ID ${book.bookId} not found. Could not update Book`);
        }
    }
    // deleteBook uses the searchBook method to find the book in the books array, then removes it from the array and saves.
    deleteBook(bookId) {
        console.log(`bookID ${bookId}`);
        console.log("bookId type  ", typeof bookId);
        let book = this.searchBook(bookId);
        if (book) {          
            const removedBook = book.title;
            this.books = this.books.filter(book => Number(book.bookId) !== Number(bookId));
            this.saveBooks();
            console.log(`"${removedBook}" was removed.`);
        } else {
            console.log(`Book with ID ${bookId} not found. Could not delete book.`);
        }
    }
    // Filter books based on query
    searchBook(query) {
        const adjustedQuery = query.toLowerCase().trim()
        return this.books.filter(book => 
            (!isNaN(query) && Number(book.bookId) === Number(query)) ||
            book.author.toLowerCase().trim() === adjustedQuery ||
            book.title.toLowerCase().trim() === adjustedQuery ||
            (isNaN(query) && Number(book.ISBN) === Number (query))
        );
    }

    getBooks() {
        return this.books
    }
    
}

class Book{
    constructor(bookId, title, author, genre, ISBN, availability = true, location, description){
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.ISBN = ISBN;
        this.availability = availability;
        this.location = location;
        this.description = description;
    }
}
