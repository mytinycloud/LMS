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

    randomId() {
        const randomnumber = crypto.randomUUID().substring(0, 12);
        console.log(randomnumber)
        let existingBook = this.findBookById(randomnumber);
        if (existingBook) {return this.randomId()}
            return randomnumber;
    }

    // addBook takes a book object from the controller and adds it to the books array, then saves the books to local storage.
    addBook(book) {
        if (!book || !book.ISBN || !book.bookId) {
            console.log("Book is undefined");
            return;
        }
        const existingBookISBN = this.findBookByISBN(book.ISBN);
        const existingBookId = this.findBookById(book.bookId);
        
        if (existingBookISBN || existingBookId) {
            console.log("Book already exists in the library.");
            return;
        }
        console.log("Adding book: ", book);
        this.books.push(book);
        this.saveBooks();
        
    }
    // updateBook uses the setters to update the book object with the new values from the controller, then saves the books.
    editBook(bookId, updates) {
        let book = this.findBookById(bookId);
        if (book) {
            Object.assign(book, updates);
            this.saveBooks()
            console.log('tis book was saved: ', updates)
            console.log(`Book with ID ${book.bookId} updated successfully.`);
        } else {
            console.log(`Book with ID ${book.bookId} not found. Could not update Book`);
        }
    }
    // deleteBook uses the searchBook method to find the book in the books array, then removes it from the array and saves.
    deleteBook(bookId) {
        console.log(`bookID ${bookId}`);
        console.log("bookId type  ", typeof bookId);
        let book = this.findBookById(bookId);
        if (book) {   
            console.log(book)       
            const removedBook = book.title;
            this.books = this.books.filter(book => book.bookId !== bookId);
            this.saveBooks();
            console.log(`"${removedBook}" was removed.`);
        } else {
            console.log(`Book with ID ${bookId} not found. Could not delete book.`);
        }
    } 

    calculateLevenshteinDistance(searchTerm, bookIdentifier) {

        // Levenstein distance algorithm 
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
    searchBooks(query) {
        const fuzinessness = 2;
        const queryWords = String(query).toLowerCase().replace(/[^\w\s]/g, '').trim().split(/\s+/);

        const scoredBooks = [];
        this.books.forEach(book => {
            let score = 0;
            const lowerTitle = book.title.toLowerCase();
            const lowerAuthor = book.author.toLowerCase();
            const lowerGenre = book.genre.toLowerCase();

            if (String(query) === String(book.bookId) || String(query) === String(book.ISBN)) {
                score += 100; // Exact match for bookId or ISBN
            }
            if (lowerTitle.includes(query) || lowerAuthor.includes(query) || lowerGenre.includes(query)) {
                score += 1000; // Exact match
            }

            queryWords.forEach((word) => {
                const titleWords = book.title.toLowerCase().split(/\s+/);
                const authorWords = book.author.toLowerCase().split(/\s+/);
                const genreWords = book.genre.toLowerCase().split(/\s+/);

                if (titleWords.includes(word)) {
                    score += 5; 
                } else if (Math.min(...titleWords.map(titleWord => this.calculateLevenshteinDistance(word, titleWord))) <= fuzinessness) {
                    score += 3; 
                }
                if (authorWords.includes(word) ) {
                    score += 5; 
                } else if (Math.min(...authorWords.map(authorWord => this.calculateLevenshteinDistance(word, authorWord))) <= fuzinessness) {
                    score += 3; 
                }
                if (genreWords.includes(word) ) {
                    score += 5; 
                } else if (Math.min(...genreWords.map(genreWord => this.calculateLevenshteinDistance(word, genreWord))) <= fuzinessness) {
                    score += 3; 
                }
            });
            if (score > 0) {
                scoredBooks.push({ book: book, score: score });
            }
        });
        scoredBooks.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score; // Sort by score in descending order
            }
            return a.book.title.localeCompare(b.book.title); // Sort by title if scores are equal
        });

        return scoredBooks.map(item => item.book);
    }

    findBookById(query) {
        return this.books.find(book => String(book.bookId) === String(query));
    }
    findBookByISBN(query) {
        return this.books.find(book =>String(book.ISBN) === String(query));
    }

    getBooks() {
        return this.books;
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
