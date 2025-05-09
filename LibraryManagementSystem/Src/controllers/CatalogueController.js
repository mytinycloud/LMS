// catalougeController is responsible for input and updates of the model and view
class CatalougeController { 
    constructor(model, view) {
        this.model = model
        this.view = view;

        // DOM Elements
        this.bookForm = document.getElementById('book-form');
        this.searchInput = document.getElementById('search');

        // Bind event listeners
        this.bookForm.addEventListener('submit', this.handleAddBook.bind(this));
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));

        // Initial render
        this.view.updateBookTable(this.model.getBooks());
        this.addRemoveButtonListeners();
    }

    handleAddBook(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const genre = document.getElementById('genre').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;

        const newBook = new Book(title, author, isbn, location, description);
        this.model.addBook(newBook);

        this.view.clearForm();
        this.view.updateBookTable(this.model.getBooks());
        this.addRemoveButtonListeners();
    }

    handleSearch() {
        const query = this.searchInput.value;
        const filteredBooks = this.model.searchBooks(query);
        this.view.updateBookTable(filteredBooks);
        this.addRemoveButtonListeners();
    }

    addRemoveButtonListeners() {
        const removeButtons = document.querySelectorAll('.remove-btn');
        const updateButtons = document.querySelectorAll('.update-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', this.handleRemoveBook.bind(this));
        });
    }

    handleRemoveBook(event) {
        const bookId = event.target.getAttribute('data-book-id');
        this.model.removeBook(bookId);

        this.view.updateBookTable(this.model.getBooks());
        this.addRemoveButtonListeners();
    }
    

}

// Initialize the MVC components
document.addEventListener('DOMContentLoaded', () => {
    const model = new LibraryModel();
    const view = new LibraryView();
    new LibraryController(model, view);
});