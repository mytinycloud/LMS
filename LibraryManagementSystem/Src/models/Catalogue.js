const fs = require('fs');
const path = require('./Data/library_books.json');

class Catalogue{
    constructor() {
        this.books = this.loadBooks()       
    }
    // loadBooks loads the books from local storage and converts them to a Book object using the constructor ready to be sent to the view.
    loadBooks() {
        const booksJSON = localStorage.getItem('library_books');
        const books = booksJSON ? JSON.parse(booksJSON) : [];
        return books.map(bookData => new Book (bookData.bookId, bookData.title, bookData.author, bookData.genre, bookData.ISBN, bookData.availability, bookData.location, bookData.description));
    }

    // saveBooks takes the books from the toJSON method and saves them to local storage in a JSON format
    saveBooks() {
        localStorage.setItem('library_books', JSON.stringify(this.books.map(book =>book.toJSON())));
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
  // 
    updateBook(bookId, update) {
        let book = this.searchByBookId(bookId);
        if (book) {
            if (update.title) book.setTitle(update.title);
            if (update.author) book.setAuthor(update.author);
            if (update.genre) book.setGenre(update.genre);
            if (update.ISBN) book.setISBN(update.ISBN);
            if (update.hasOwnProperty("avalilability")) book.setAvailability(update.availability);
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

    // toJSON converts the object to a JSON format, converting the private properties to a JSON object makes it avaliable to be stored in local storage
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