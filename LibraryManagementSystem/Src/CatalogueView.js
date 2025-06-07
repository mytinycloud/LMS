class CatalogueView {
    constructor() {
        this.bookTableBody = document.querySelector('tbody');
        window.catalogueView = this;
    }

    showForm(modalId) {
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.style.display = "block";
        } else {
            console.error(`Modal with ID ${modalId} not found`);
        }
    }

    hideForm(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    }
    
    // Sets a placeholder of the existing book information 
    setplaceholder(book, modalId) {
        if (!book) {
            console.error("Book data not found in setplaceholder.");
            return; // Exit early to prevent errors
        }
        const form = document.getElementById(modalId)
        const bookIdField = form.querySelector('input[name="bookId"]');
        const titleField = form.querySelector('input[name="title"]');
        const authorField = form.querySelector('input[name="author"]');
        const genreField = form.querySelector('input[name="genre"]');
        const isbnField = form.querySelector('input[name="ISBN"]');
        const availabilityField = form.querySelector('select[name="availability"]');  // dropdown to set availability in edit form
        const availabilityTextField = form.querySelector('#view-availability'); // static text field to set availability in view form
        const locationField = form.querySelector('input[name="location"]');
        const descriptionField = form.querySelector('textarea[name="description"]');
        
        // Set values if fields exist
        if (bookIdField) bookIdField.value = book.bookId;
        if (titleField) titleField.value = book.title || "";
        if (authorField) authorField.value = book.author;
        if (genreField) genreField.value = book.genre;
        if (isbnField) isbnField.value = book.ISBN;
        if (availabilityField) availabilityField.value = book.availability ? "Available" : "Unavailable"; // Set dropdown value for edit form
        if (availabilityTextField) availabilityTextField.value = book.availability ? "Available" : "Unavailable"; // Set static text for view form
        if (locationField) locationField.value = book.location || "";
        if (descriptionField) descriptionField.value = book.description || "";
    }

    // creates a table of book with buttons for user interaction. 
    updateBookTable(books) {
        if (!this.bookTableBody) {
            console.log("Element not found");
            return;
        }
        this.bookTableBody.innerHTML = "";  // Clears innerHTML

        if (books.length === 0) {
            const empty = document.createElement("tr")
            empty.innerHTML = "<td colspan='5'>No books found</td>";  // Creates a line denoting "no books"
            this.bookTableBody.appendChild(empty)
        }else{
            books.forEach(book => {
                const row = document.createElement("tr");  // Creates list of books
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.availability ? "Available" : "Unavailable"}</td>   
                    <td class="btn-group">
                        <button class="view-btn" data-book-id="${book.bookId}"><img class="btnimg" src="../.assets/View.png" ></button>
                        <button class="edit-btn" data-book-id="${book.bookId}"><img class="btnimg" src="../.assets/Edit.png"></button>
                        <button class="borrow-btn ${book.availability ? 'borrow-available' : 'borrow-unavailable'}" data-book-id="${book.bookId}"><img class="btnimg" src="../.assets/Borrow.png"></button>
                        <button class="delete-btn" data-book-id="${book.bookId}"><img class="btnimg" src="../.assets/Delete.png"></button>
                    </td>

                `;
                this.bookTableBody.appendChild(row);
            });
        };
    }
    
    clearForm(formId) {
        const form = document.getElementById(formId);  // Get the form by ID
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.value = '';
        });
    }
}
