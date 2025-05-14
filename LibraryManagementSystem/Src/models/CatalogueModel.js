import fs from 'fs';
const path = "../../data/library_books.json";


class CatalogueModel {
    constructor() {
        this.books = this.loadBooks()       
    }
    
    loadBooks() {
        const booksJSON = fs.readFileSync(path, 'utf-8');
        const books = booksJSON ? JSON.parse(booksJSON) : [];
            return books.map(book => new Book(book.bookId, book.title, book.author, book.genre, book.isbn, book.availability, book.location, book.description));
    }
 
    saveBooks() {
        fs.writeFileSync( path, JSON.stringify(this.books.map(this.books)));
    }

    // addBook takes a book object from the controller and adds it to the books array, then saves the books to local storage.
    addBook(book) {
        this.books.push(book);
        this.saveBooks();
        console.log(`Book "${book.getTitle()}" added successfully.`);
    }
    // updateBook uses the setters to update the book object with the new values from the controller, then saves the books.
    updateBook(bookId, update) {
        let book = this.searchByBookId(bookId);
        if (book) {
            if (update.title) book.title;
            if (update.author) book.author(update.author);
            if (update.genre) book.setGenre(update.genre);
            if (update.isbn) book.setisbn(update.isbn);
            if (update.hasOwnProperty("availability")) book.setAvailability(update.availability);
            if (update.location) book.setLocation(update.location);
            if (update.description) book.setDescription(update.description);
            this.saveBooks()
            console.log(`Book with ID ${bookId} updated successfully.`);
        } else {
            console.log(`Book with ID ${bookId} not found. Could not update Book`);
        }
    }
    // deleteBook uses the searchByBookId method to find the book in the books array, then removes it from the array and saves.
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
    getBooks() {
        return this.books.map(book => book.toJSON());
    }
    
}
