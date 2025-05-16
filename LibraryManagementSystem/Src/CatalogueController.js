// Initialize the MVC components
document.addEventListener('DOMContentLoaded', () => {
    const model = new CatalogueModel();
    const view = new CatalogueView();
    new CatalogueController(model, view);
});

class CatalogueController { 
    constructor(model, view) {
    this.model = model;
    this.view = view;

    // DOM Elements
    this.searchInput = document.getElementById('search');
    this.searchButton = document.getElementById('search-button');

    // Bind event listeners to the correct form IDs
    document.getElementById('add-book-form').addEventListener('submit', this.handleAddBook.bind(this));
    document.getElementById('edit-book-form').addEventListener('submit', this.handleEditBook.bind(this));
    this.searchInput.addEventListener('input', this.handleSearch.bind(this));
    this.searchButton.addEventListener('click', this.handleSearchButton.bind(this));

    this.view.updateBookTable(this.model.getBooks());  // Initial render
    this.addEventListenersToButtons();  // Add event listeners to buttons
}

    handleAddBook(event) {
    event.preventDefault();
    let bookId = this.model.getBooks().length + 1;
    
    // Get values from the add form
    const addForm = document.getElementById('add-book-form');
    const title = addForm.querySelector('input[name="title"]').value;
    const author = addForm.querySelector('input[name="author"]').value;
    const genre = addForm.querySelector('input[name="genre"]').value;
    const ISBN = addForm.querySelector('input[name="ISBN"]').value;
    const location = addForm.querySelector('input[name="location"]').value;
    const description = addForm.querySelector('textarea[name="description"]').value || '';

    const newBook = new Book(bookId, title, author, genre, ISBN, location, description);
    
    this.model.addBook(newBook);  // Add to model
    
    // Update view
    this.view.clearForm('add-book-form');
    this.view.hideForm('add-book-form');
    this.view.updateBookTable(this.model.getBooks());
    this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
}

    handleEditBook(event) {
        event.preventDefault();
        console.log('handleeditbook callled ')
        const editForm = document.getElementById('edit-Book-form');
        const bookId = editForm.getAttribute('data-editing-id');
        console.log("bookid: ", bookId)
        
        const title = editForm.querySelector('input[name="title"]').value;
        const author = editForm.querySelector('input[name="author"]').value;
        const genre = editForm.querySelector('input[name="genre"]').value;
        const ISBN = editForm.querySelector('input[name="ISBN"]').value;
        const availability = editForm.querySelector('select[name="availability"]').value;
        const location = editForm.querySelector('input[name="location"]').value;
        const description = editForm.querySelector('textarea[name="description"]').value || '';

        const updatedBook = new Book(bookId, title, author, genre, ISBN, availability, location, description);  // update book for model
 
        this.model.EditBook(bookId, updatedBook);  // Send updated book to model

        // Update view
        this.view.clearForm('edit-book-form');
        this.view.hideForm('edit-book-form');
        this.view.updateBookTable(this.model.getBooks());
        this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
    }

    handleDeleteBook(event) {
        event.preventDefault();
        const bookId = event.target.getAttribute('data-book-id'); 
        if (bookId) {
            this.model.deleteBook(bookId);
            this.view.updateBookTable(this.model.getBooks());
        }
        this.addEventListenersToButtons();
    }

    handleSearchButton() {
        this.handleSearch()
    }

    handleSearch() {
        
        const query = this.searchInput.value.toLowerCase().trim();
        
        if (query === '') {  // If search is empty, show all books
            this.view.updateBookTable(this.model.getBooks());
        } else {
            const filteredBooks = this.model.searchBook(query);  
            this.view.updateBookTable(filteredBooks);
        }
        this.addEventListenersToButtons();
    }
    

    addEventListenersToButtons() {
        // Add listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {this.handleDeleteBook(event);
            });
        });
        
        // Add listeners to edit buttons
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
            const bookId = event.target.getAttribute('data-book-id');
            document.getElementById('edit-book-form').setAttribute('data-editing-id', bookId);
            const books = this.model.searchBook(bookId)
            const book = books[0]
            this.view.showForm('edit-book-form');  // Show the form
            this.view.setplaceholder(book); 
            console.log("book = ", book)
            });
        });
    }
}
