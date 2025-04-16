class Book{
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

    /* Search redundant? 

    search(bookId) {
        return this.books.find(book => book.bookId === bookId);
    }

    */

    viewBookDetails(){
        return `
        Book ID: ${this.#bookId}
        Title: ${this.#title}
        Author: ${this.#author}
        Genre: ${this.#genre}
        ISBN: ${this.#ISBN}
        Availability: ${this.#availability ? "Available" : "Unavailable"}
        Location: ${this.#location}
        Description: ${this.#description}
    `;
    }
}

export {Book};