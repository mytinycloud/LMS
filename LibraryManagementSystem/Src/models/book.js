class Book{
    constructor(bookId, title, author, genre, ISBN, availability, location, description){
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.ISBN = ISBN;
        this.availability = availability;
        this.location = location;
        this.description = description;
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

