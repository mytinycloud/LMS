class Catalogue{
    constructor(){
        this.books = []       
    }
    addBook(book){
        if (this.search(book.bookId)){
            return console.log(`A book with ID ${book.bookId} already exists.`);
        }else{
        this.books.push(newBook);
        return console.log(`Book "${book.title}" added successfully.`)
        }
    }

    updateBook(bookId, title, author, genre, ISBN, availability, location, description) {
        let book = this.search(bookId);
        if (book) {
            Object.assign(book, updates)
        } else {
            console.log(`Book with ID ${bookId} not found. Could not update Book`);
        }
    }

    deleteBook(bookId){
        let book = this.search(bookId)
        if (book){
        let index = this.books.indexOf(book)
        let removedbook = this.books.splice(index, 1)
        console.log(`${removedbook.title} was removed`)
        }else{
            console.log(`Book with ID ${bookId} not found. could not delete book.`)
        }
    }
    search(bookId) {
        return this.books.find(book => book.bookId === bookId);
    }
}

export {Catalogue}