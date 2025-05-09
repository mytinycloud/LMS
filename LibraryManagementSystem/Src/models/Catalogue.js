const fs = require('fs');
const path = './Data/library_books.json';

// The Catalogue class manages the collection of books in the library. It handles loading, saving, adding, updating, deleting and searching books from the collection.
class Catalogue{
    constructor() {
        this.books = this.loadBooks()       
    }
    
    // loadBooks loads the books from local storage and converts them to a Book object using the constructor ready to be sent to the view.
    loadBooks() {
        if (!fs.existsSync(path)) {
            console.warn('File not found, returning empty book list.');
            return [];
        }
        const booksJSON = fs.readFileSync(path, 'utf8');
        const books = booksJSON ? JSON.parse(booksJSON) : [];

        return books.map(bookData => new Book (bookData.bookId, bookData.title, bookData.author, bookData.genre, bookData.ISBN, bookData.availability, bookData.location, bookData.description));
    }

    // saveBooks takes the books from the toJSON method and saves them to local storage in a JSON format
    saveBooks() {
        const JSONData = JSON.stringify(this.books.map(book =>book.toJSON()), null , 2);
        fs.writeFile(path, JSONData, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Data written to file successfully');
            }
        });
    }
    // addBook takes a book object from the controller and adds it to the books array, then saves the books to local storage.
    addBook(book) {
        if (this.search(book.bookId)){
            return console.log(`A book with ID ${book.bookId} already exists.`);
        }else{
        this.books.push(book);
        this.saveBooks();
        return console.log(`Book "${book.title}" added successfully.`)
        }
    }
    // updateBook uses the setters to update the book object with the new values from the controller, then saves the books
    updateBook(bookId, update) {
        let book = this.searchByBookId(bookId);
        if (book) {
            if (update.title) book.setTitle(update.title);
            if (update.author) book.setAuthor(update.author);
            if (update.genre) book.setGenre(update.genre);
            if (update.ISBN) book.setISBN(update.ISBN);
            if (update.hasOwnProperty("availability")) book.setAvailability(update.availability);
            if (update.location) book.setLocation(update.location);
            if (update.description) book.setDescription(update.description);
            this.saveBooks()
            console.log(`Book with ID ${bookId} updated successfully.`);
        } else {
            console.log(`Book with ID ${bookId} not found. Could not update Book`);
        }
    }

    deleteBook(bookId) {
        let book = this.searchByBookId(bookId);
        if (book){
            const removedBook = book.getTitle();
            this.books = this.books.filter(book => book.getBookId() !== bookId)
            this.saveBooks()
            console.log(`"${removedBook}" was removed.`)
        }else{
            console.log(`Book with ID ${bookId} not found. could not delete book.`)
        }
    }
    searchByBookId(search) {
        return this.books.find(book => book.getBookId() === search);
    }
    
}