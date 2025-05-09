export default class Book{
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

