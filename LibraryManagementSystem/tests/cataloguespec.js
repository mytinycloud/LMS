describe("Library Management System", () => {
    
    describe("Book Class", () => {
        let book;

        beforeEach(() => {
            book = new Book(1, "JavaScript: The Good Parts", "Douglas Crockford", "instructional", "9780596517748", true, "Library", "A book about JavaScript best practices.");
        });

        it("should create a book with bookId, title, author, genre, ISBN, available status, location, and description", () => {
            expect(book.bookId).toBe(1);
            expect(book.title).toBe("JavaScript: The Good Parts");
            expect(book.author).toBe("Douglas Crockford");
            expect(book.ISBN).toBe("9780596517748");
            expect(book.genre).toBe("instructional");
            expect(book.availability).toBe(true);
            expect(book.location).toBe("Library");
            expect(book.description).toBe("A book about JavaScript best practices.");
        });

        it("should mark the book as unavailable when checked out", () => {
            book.available = false;  // simulating checkout
            expect(book.available).toBe(false);
        });

        it("should mark the book as available when returned", () => {
            book.available = false;
            book.available = true;  // simulating return
            expect(book.available).toBe(true);
        });
    });

    describe("CatalogueModel Class", () => {
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
        });

        it("should add books to the library model.", () => {
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

        it("should edit a book in the library model.", () => {
            model.addBook(book1);
            const updatedBook = new Book(1, "JavaScript: The Good Parts", "Douglas Crockford", "instructional", "9780596517748", true, "Library", "Updated description.");
            model.editBook(book1.bookId, updatedBook);

            expect(model.books[0].description).toBe("Updated description.");
        });

        it("should remove a book from the library model.", () => {
            model.addBook(book1);
            model.addBook(book2);
            
            model.deleteBook(book1.bookId);

            expect(model.books.length).toBe(1); // Only one book should remain
            expect(model.books[0].bookId).toBe(2); // The remaining book should be book2 id's arnt changed if books are deleted
        });

        it("should search books by title or author or genre. with an error", () => {
            model.addBook(book1);
            model.addBook(book2);

            const search = model.searchBook("Jaba");
            expect(search.length).toBe(2, "search by title");

            const searchResultsAuthor = model.searchBook("Doug");
            expect(searchResultsAuthor.length).toBe(1,"search by author");
            expect(searchResultsAuthor[0].author).toBe("Douglas Crockford");

            const searchResultsGenre = model.searchBook("iNsTrectional");
            expect(searchResultsGenre.length).toBe(2,"search by genre");
        });
    
        
    
    
    
    
    
    
    });
});
