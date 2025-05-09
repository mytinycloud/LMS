export default class CatalogueModel {
    constructor() {
        this.books = this.loadBooks()       
    }
    
    loadBooks() {
        const booksJSON = localStorage.getItem('library_books');
        const books = booksJSON ? JSON.parse(booksJSON) : [];
            return books.map(bookData => new Book(bookData.bookId, bookData.title, bookData.author, bookData.genre, bookData.isbn, bookData.availability, bookData.location, bookData.description));
    }
 
    saveBooks() {
        localStorage.setItem('library_books', JSON.stringify(this.books.map(book => book.toJSON())));
    }

    // addBook takes a book object from the controller and adds it to the books array, then saves the books to local storage.
    addBook(book) {
        book.setBookId(this.books.length + 1); // cheap and dirty way to get a unique ID for the book.
        book.setAvailability(true); // Set the availability to true by default.
        this.books.push(book);
        this.saveBooks();
        console.log(`Book "${book.getTitle()}" added successfully.`);
    }
    // updateBook uses the setters to update the book object with the new values from the controller, then saves the books.
    updateBook(bookId, update) {
        let book = this.searchByBookId(bookId);
        if (book) {
            if (update.title) book.setTitle(update.title);
            if (update.author) book.setAuthor(update.author);
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

class Book{
    // Private properties to encapsulate the book objects
    #bookId;
    #title;
    #author;
    #genre;
    #ISBN;
    #availability;
    #location;
    #description;
    constructor(bookId, title, author, genre, ISBN, availability, location, description){
        this.#bookId = bookId;
        this.#title = title;
        this.#author = author;
        this.#genre = genre;
        this.#ISBN = ISBN;
        this.#availability = availability;
        this.#location = location;
        this.#description = description;
    }
    // Getters create a way to access the private properties
    getBookId() { return this.#bookId; }
    getTitle() { return this.#title; }
    getAuthor() { return this.#author; }
    getGenre() { return this.#genre; }
    getISBN() { return this.#ISBN; }
    getAvailability() { return this.#availability; }
    getLocation() { return this.#location; }
    getDescription() { return this.#description; }

    // Setters create a way to modify the private properties
    setBookId(bookId) { this.#bookId = bookId; }
    setTitle(title) { this.#title = title; }
    setAuthor(author) { this.#author = author; }
    setGenre(genre) { this.#genre = genre; }
    setISBN(ISBN) { this.#ISBN = ISBN; }
    setAvailability(availability) { this.#availability = availability; }
    setLocation(location) { this.#location = location; }
    setDescription(description) { this.#description = description; }

    // toJSON creates an object converting the private properties to an object makes it avaliable to be stored
    toJSON() {
        return {
            bookId: this.getBookId(),
            title: this.getTitle(),
            author: this.getAuthor(),
            genre: this.getGenre(),
            ISBN: this.getISBN(),
            availability: this.getAvailability(),
            location: this.getLocation(),
            description: this.getDescription()
        }
    }

    // viewBookDetails displays the book details in a readable format
    viewBookDetails() {
        return `
        Book ID: ${this.getBookId()}
        Title: ${this.getTitle()}
        Author: ${this.getAuthor()}
        Genre: ${this.getGenre()}
        ISBN: ${this.getISBN()}
        Availability: ${this.getAvailability() ? "Available" : "Unavailable"}
        Location: ${this.getLocation()}
        Description: ${this.getDescription()}
    `;
    }
}
