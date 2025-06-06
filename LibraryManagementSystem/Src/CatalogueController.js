class CatalogueController { 
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Bind event listeners to the correct form IDs
        if (document.getElementById('book-search')){
            this.searchInput = document.getElementById('book-search');
            this.searchInput.addEventListener('input', this.handleSearch.bind(this));
            this.view.updateBookTable(this.model.getBooks());  // Initial render
            this.addEventListenersToButtons();  // Add event listeners to buttons
        }

        if (document.getElementById("add-book-form")) {
            document.getElementById('add-book-form').addEventListener('submit', this.handleAddBook.bind(this));
        }

        if (document.getElementById("edit-book-form")) {
            document.getElementById('edit-book-form').addEventListener('submit', this.handleEditBook.bind(this));
        };
        
        
    }

    // handle add-book-form input and creates a new book to send to model.addBook()
    handleAddBook(event) {
        event.preventDefault();
        let bookId = this.model.randomId(); 
        
        // Get values from the add-book-form
        const addForm = document.getElementById('add-book-form');

        // 
        const title = addForm.querySelector('input[name="title"]').value;
        const author = addForm.querySelector('input[name="author"]').value;
        const genre = addForm.querySelector('input[name="genre"]').value;
        const ISBN = addForm.querySelector('input[name="ISBN"]').value;
        const availability = true;
        const location = addForm.querySelector('input[name="location"]').value;
        const description = addForm.querySelector('textarea[name="description"]').value || '';

        const newBook = new Book(bookId, title, author, genre, ISBN, availability, location, description);  // New book from user input. 
        
        this.model.addBook(newBook);  // Add to model
        
        // Update view
        this.view.clearForm('add-book-form');
        this.view.hideForm('add-book-form');
        this.view.updateBookTable(this.model.getBooks());
        this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
    }

    // 
    handleEditBook(event) {
        event.preventDefault();
        const editForm = document.getElementById('edit-book-form');
        const bookId = editForm.getAttribute('data-editing-id');
        const title = editForm.querySelector('input[name="title"]').value;
        const author = editForm.querySelector('input[name="author"]').value;
        const genre = editForm.querySelector('input[name="genre"]').value;
        const ISBN = editForm.querySelector('input[name="ISBN"]').value;
        const availability = editForm.querySelector('select[name="availability"]').value === "Available";
        const location = editForm.querySelector('input[name="location"]').value;
        const description = editForm.querySelector('textarea[name="description"]').value || '';

        const updatedBook = new Book(bookId, title, author, genre, ISBN, availability, location, description);  // update book for model
 
        this.model.editBook(bookId, updatedBook);  // Send updated book to model

        // Update view
        this.view.hideForm('edit-book-form');
        this.view.updateBookTable(this.model.getBooks());
        this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
    }

    handleDeleteBook(event) {
        console.log("delete clicked")
        const bookId = event.currentTarget.getAttribute('data-book-id'); 
        const book = this.model.findBookById(bookId)
        if (confirm(`are you sure you want to delete ${book.title}`)) {
            console.log('got id')
            this.model.deleteBook(bookId);
            this.view.updateBookTable(this.model.getBooks());
        }
        this.addEventListenersToButtons();
    }

    handleBorrowBook(event){
        const bookId = event.currentTarget.getAttribute('data-book-id'); 
        const book = this.model.findBookById(bookId);
        const loggedInUser = window.UserModel.getLoggedInUser();
        if (book.availability === false) {
            alert("This book is currently unavailable for borrowing.");
            return;
        }
        if (loggedInUser.borrowedBooks.some(book => book.bookId === bookId)) {
            alert("You cant borrow the same book twice.");
            return;
        }

        if (!loggedInUser || !loggedInUser.userId) {
            return;
        }

        // Mark book as unavailable in the catalogue
        book.availability = false;
        this.model.editBook(bookId, book);
        
        window.UserModel.borrowBook(book, loggedInUser); // Update the user's borrowed books
        window.RecordsModel.createRecord(book, loggedInUser); // Create a borrowing record
        this.view.updateBookTable(this.model.getBooks()); // Refresh the catalogue table
        this.addEventListenersToButtons(); // Re-add event listeners
    }

    // Sends books array to update book table
    handleSearch() {
        const query = this.searchInput.value
        if (query === '') {
            this.view.updateBookTable(this.model.getBooks());
        } else {
            const filteredBooks = this.model.searchBooks(query);  
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

        // Adds listners to edit buttons gets book details and sends them to view.setplaceholder to display current changable details.
        const editButtons = document.querySelectorAll('.edit-btn'); // Link edit button 
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const bookId = event.currentTarget.getAttribute('data-book-id');  // Gets bookId of the book linked to the edit button 
                console.log (bookId)

                // gets the rest of the book details to send to view.setplaceholder 
                const book = this.model.findBookById(bookId);
                this.view.showForm('edit-book-form'); // show  the form 

                const form = document.getElementById('edit-book-form');
                form.setAttribute('data-editing-id', bookId);
                this.view.setplaceholder(book, 'edit-book-form');
            });
        });

        // adds listners forr view buttions getting all book details and displaying them via view.setplaceholders
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const bookId = event.currentTarget.getAttribute('data-book-id');  // Gets bookId of the book linked to the edit button  
                const book = this.model.findBookById(bookId)   // gets the rest of the book details to send to view.setplaceholder
                this.view.showForm('view-book-form'); 

                const form = document.getElementById('view-book-form');
                form.setAttribute('data-editing-id', bookId);
                this.view.setplaceholder(book, 'view-book-form');
            });
        });

        // Adds listners for borrow buttons 
        const borrowButtons = document.querySelectorAll('.borrow-btn');
        borrowButtons.forEach(button => {
            button.addEventListener('click', (event) => {this.handleBorrowBook(event);
            });
        });
    }
}



