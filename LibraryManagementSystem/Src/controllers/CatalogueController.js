import { Catalouge } from "../models/Catalogue";
import { Book } from "../models/Book";

class CatalougeController { 
    constructor(){
        this.catalogue = new Catalouge();
    }

    addBook(bookId, title, author, genre, ISBN, availability, location, description) {
        const book = new Book(bookId, title, author, genre, ISBN, availability, location, description);
        this.catalogue.addBook(book);
    }

    updateBook(bookId, updates){
        this.catalogue.updateBook(bookId, updates);
    }
    deleteBook(bookId){
        this.catalogue.deleteBook(bookId);
    }
    search(bookId){
        let book = this.catalogue.search(bookId)
        if (book) {
            return book.viewBookDetails();
        }else{
            return `Book not found`
        }
    }
}

export {CatalougeController};