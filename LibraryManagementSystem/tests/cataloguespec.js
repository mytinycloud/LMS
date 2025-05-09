import Book from '..Src/models/Book.js';
import CatalogueModel from '../Src/models/CatalogueModel.js';

describe("catalogueModel Class", () => {
    let catalogueModel, book1, book2;

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

        catalogueModel = new CatalogueModel();
        book1 = new Book("JavaScript: The Good Parts", "Douglas Crockford", "coding", "9780596517748","some location", "some description");
        book2 = new Book("Eloquent JavaScript", "Marijn Haverbeke", "somegenre", "9781593279509", "some location", "some description");
    });

    it("should add books to the catalogue", () => {
        catalogueModel.addBook(book1);
        catalogueModel.addBook(book2);

        expect(catalogueModel.books.length).toBe(2);
        expect(catalogueModel.books[0].title).toBe("JavaScript: The Good Parts");
        expect(catalogueModel.books[1].title).toBe("Eloquent JavaScript");
    });

    it("should save books to localStorage", () => {
        catalogueModel.addBook(book1);
        catalogueModel.addBook(book2);

        const savedBooks = JSON.parse(localStorage.getItem('library_books'));
        expect(savedBooks.length).toBe(2);
        expect(savedBooks[0].title).toBe("JavaScript: The Good Parts");
        expect(savedBooks[1].title).toBe("Eloquent JavaScript");
    });
    it("should load books from localStorage", () => {
        const initialBooks = [
            { bookId: 1, title: "JavaScript: The Good Parts", author: "Douglas Crockford", genre: "coding", ISBN: "9780596517748", availability: true, location: "some location", description: "some description" },
            { bookId: 2, title: "Eloquent JavaScript", author: "Marijn Haverbeke", genre: "somegenre", ISBN: "9781593279509", availability: true, location: "some location", description: "some description" }
        ];
        localStorage.setItem('library_books', JSON.stringify(initialBooks));
        catalogueModel = new CatalogueModel();

        expect(catalogueModel.books.length).toBe(2);
        expect(catalogueModel.books[0].title).toBe("JavaScript: The Good Parts");
        expect(catalogueModel.books[1].title).toBe("Eloquent JavaScript");
    });
});