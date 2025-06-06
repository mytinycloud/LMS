describe("Books", () => {
    
    describe("Book Class", () => {
        let book;

        beforeEach(() => {
            book = new Book(1, "JavaScript: The Good Parts", "Douglas Crockford", "instructional", "9780596517748", true, "Library", "A book about JavaScript best practices.");
        });

        it("Should create a book with bookId, title, author, genre, ISBN, available status, location, and description", () => {
            expect(book.bookId).toBe(1);
            expect(book.title).toBe("JavaScript: The Good Parts");
            expect(book.author).toBe("Douglas Crockford");
            expect(book.ISBN).toBe("9780596517748");
            expect(book.genre).toBe("instructional");
            expect(book.availability).toBe(true);
            expect(book.location).toBe("Library");
            expect(book.description).toBe("A book about JavaScript best practices.");
        });

        it("Should mark the book as unavailable when checked out", () => {
            book.available = false;  // simulating checkout
            expect(book.available).toBe(false);
        });

        it("Should mark the book as available when returned", () => {
            book.available = false;
            book.available = true;  // simulating return
            expect(book.available).toBe(true);
        });
    });
    describe("Book Addition Functionality", () => {
        let model, book1, book2, book3;

        // Mocking localStorage before each test
        beforeEach(() => {
            // Mock localStorage with an empty object
            const localStorageMock = (() => {
                let store = {};
                return {
                    getItem(key) {
                        return store[key] || null;
                    },
                    setItem(key, value) {
                        store[key] = value.toString();
                    },
                    clear() {
                        store = {};
                    },
                    removeItem(key) {
                        delete store[key];
                    }
                };
            })();
            Object.defineProperty(window, 'localStorage', { value: localStorageMock });

            model = new CatalogueModel();
            book1 = new Book("1", "JavaScript: The Good Parts", "Douglas Crockford", "instructional", "9780596517748", true, "Library", "A book about JavaScript best practices.");
            book2 = new Book("2", "Eloquent JavaScript", "Marijn Haverbeke", "instructional", "9781593279509", true, "Programming", "A modern introduction to programming.");
            book3 = new Book("3", "JavaScript: The Definitive Guide", "David Flanagan", "instructional", "9780596517748", true, "Library", "A comprehensive guide to JavaScript."); //same ISBN as book1
        });

        it("Should add books to the library model.", () => {
            model.addBook(book1);
            model.addBook(book2);

            expect(model.books.length).toBe(2);
            expect(model.books[0].title).toBe("JavaScript: The Good Parts");
            expect(model.books[0].author).toBe("Douglas Crockford");
            expect(model.books[0].ISBN).toBe("9780596517748");
            expect(model.books[0].genre).toBe("instructional");
            expect(model.books[0].availability).toBe(true);
            expect(model.books[0].location).toBe("Library");
            expect(model.books[0].description).toBe("A book about JavaScript best practices.");
            expect(model.books[1].title).toBe("Eloquent JavaScript");
            expect(model.books[1].author).toBe("Marijn Haverbeke");
            expect(model.books[1].ISBN).toBe("9781593279509");
            expect(model.books[1].genre).toBe("instructional");
            expect(model.books[1].availability).toBe(true);
            expect(model.books[1].location).toBe("Programming");
            expect(model.books[1].description).toBe("A modern introduction to programming.");
        });
        it("Should not add a book if it is a duplicate.", () => {
            model.addBook(book1);
            model.addBook(book1); // Attempt to add the same book again
            model.addBook(book3); // Attempt to add a book with the same ISBN

            expect(model.books.length).toBe(1); // Should still be 1 book
            expect(model.books[0].title).toBe("JavaScript: The Good Parts");
        });

        it("Should edit a book in the library model.", () => {
            model.addBook(book1);
            const updatedBook = new Book(1, "JavaScript: The Good Parts", "Douglas Crockford", "instructional", "9780596517748", true, "Library", "Updated description.");
            model.editBook(book1.bookId, updatedBook);

            expect(model.books[0].description).toBe("Updated description.");
        });

        it("Should remove a book from the library model.", () => {
            model.addBook(book1);
            model.addBook(book2);
            
            model.deleteBook(book1.bookId);

            expect(model.books.length).toBe(1); // Only one book should remain
            expect(model.books[0].bookId).toBe("2"); // The remaining book should be book2 id's arnt changed if books are deleted
        });
    });
    describe("Book Search Functionality", () => {
        let model, book1, book2;

        // Mocking localStorage before each test
        beforeEach(() => {
            // Mock localStorage with an empty object
            const localStorageMock = (() => {
                let store = {};
                return {
                    getItem(key) {
                        return store[key] || null;
                    },
                    setItem(key, value) {
                        store[key] = value.toString();
                    },
                    clear() {
                        store = {};
                    },
                    removeItem(key) {
                        delete store[key];
                    }
                };
            })();
            Object.defineProperty(window, 'localStorage', { value: localStorageMock });

            model = new CatalogueModel();
            book1 = new Book(1, "JavaScript: The Good Parts", "Douglas Crockford", "instructional", "9780596517748", true, "Library", "A book about JavaScript best practices.");
            book2 = new Book(2, "Eloquent JavaScript", "Marijn Haverbeke", "instructional", "9781593279509", true, "Programming", "A modern introduction to programming.");
            book3 = new Book(3, "JavaScript: The Definitive Guide", "David Flanagan", "instructional", "9780596517748", true, "Library", "A comprehensive guide to JavaScript."); //same ISBN as book1
        });
        it("Should search books by title or author or genre.", () => {
            model.addBook(book1);
            model.addBook(book2);

            const search = model.searchBooks("JavaScript");
            expect(search.length).toBe(2, "search by title");

        });
        it("Should search books by title or author or genre. with an error", () => {
            model.addBook(book1);
            model.addBook(book2);

            const search = model.searchBooks("Jabascript");
            expect(search.length).toBe(2, "search by title");

            const searchResultsAuthor = model.searchBooks("Douglas");
            expect(searchResultsAuthor.length).toBe(1,"search by author");
            expect(searchResultsAuthor[0].author).toBe("Douglas Crockford");

            const searchResultsGenre = model.searchBooks("iNsTrectional");
            expect(searchResultsGenre.length).toBe(2);
        });
        it("Should not find a book if its too different", () => {

            const searchResults = model.searchBooks("Python Book");
            expect(searchResults.length).toBe(0);
            expect(model.calculateLevenshteinDistance("Python Book", "JavaScript: The Good Parts")).toBeGreaterThan(3);
        });
        it("Should search books by ISBN.", () => {
            model.addBook(book1);
            model.addBook(book2);

            const searchResults = model.findBookByISBN("9780596517748");
            expect(searchResults.title).toBe("JavaScript: The Good Parts");
        });
        it("Should search books by bookId.", () => {
            model.addBook(book1);
            model.addBook(book2);

            const searchResults = model.findBookById(1);
            expect(searchResults.title).toBe("JavaScript: The Good Parts");
        });       
    });
});
