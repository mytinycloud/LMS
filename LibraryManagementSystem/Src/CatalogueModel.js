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
        let books = this.searchBook(bookId);
        let book = books[0]
        if (book) {   
            console.log(book)       
            const removedBook = book.title;
            this.books = this.books.filter(book => Number(book.bookId) !== Number(bookId));
            this.saveBooks();
            console.log(`"${removedBook}" was removed.`);
        } else {
            console.log(`Book with ID ${bookId} not found. Could not delete book.`);
        }
    }
    calculateLevenshteinDistance(searchTerm, bookIdentifier) {
        const searchTermLength = searchTerm.length;
        const bookIdentifierLength = bookIdentifier.length;

        let distanceMatrix = Array(searchTermLength + 1);

        for (let row = 0; row <= searchTermLength; row++) {
            distanceMatrix[row] = Array(bookIdentifierLength + 1);
        }

        for (let row = 0; row <= searchTermLength; row++) {
            distanceMatrix[row][0] = row;
        }

        for (let column = 0; column <= bookIdentifierLength; column++) {
            distanceMatrix[0][column] = column;
        }

        for (let row = 1; row <= searchTermLength; row++) {
            for (let column = 1; column <= bookIdentifierLength; column++) {
                if (searchTerm[row - 1] === bookIdentifier[column - 1]) {

                    distanceMatrix[row][column] = distanceMatrix[row - 1][column - 1];
                } else {
                    distanceMatrix[row][column] = Math.min(
                        distanceMatrix[row - 1][column] + 1, 
                        distanceMatrix[row][column - 1] + 1, 
                        distanceMatrix[row - 1][column - 1] + 1 
                    );
                }
            }
        }
        return distanceMatrix[searchTermLength][bookIdentifierLength];
    }

    // Filter books based on query
    searchBook(query) {
        const fuzinessness = 2
        const queryWords = query.toLowerCase().split(/\s+/)
    
        return this.books.filter(book => {
            if (!isNaN(query) && Number(query) === Number(book.ISBN) || !isNaN(query) && Number(query) === Number(book.bookId) ) {
                return true;
            }
            else if (queryWords.some(word =>
                book.title.toLowerCase().includes(word) ||
                book.author.toLowerCase().includes(word) ||
                book.genre.toLowerCase().includes(word)
            )) {
                return true
            }
            return queryWords.some(word => {
                let titleDistance = this.calculateLevenshteinDistance(word, book.title)
                let authorDistance = this.calculateLevenshteinDistance(word, book.author)
                let genreDistance = this.calculateLevenshteinDistance(word, book.genre)

                return titleDistance <= fuzinessness || authorDistance <= fuzinessness || genreDistance <= fuzinessness;
            });
        });
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
