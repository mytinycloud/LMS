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
    
    setplaceholder(book) {
        console.log("Populating fields with book: ", book);

        if (!book) {
        console.error("Book data not found in setplaceholder.");
        return; // Exit early to prevent errors
}
        const editForm = document.getElementById('edit-book-form')

        const titleField = editForm.querySelector('input[name="title"]');
        const authorField = editForm.querySelector('input[name="author"]');
        const genreField = editForm.querySelector('input[name="genre"]');
        const isbnField = editForm.querySelector('input[name="ISBN"]');
        const availabilityField = editForm.querySelector('select[name="availability"]');

        const locationField = editForm.querySelector('input[name="location"]');
        const descriptionField = editForm.querySelector('textarea[name="description"]');
        
        console.log("Title field in edit form:", titleField);
        
        // Set values if fields exist
        if (titleField) {
            console.log("Title before setting:", titleField.value);
            titleField.value = book.title || "";
            console.log("Title after setting:", titleField.value);
        }
        
        if (authorField) authorField.value = book.author;
        if (genreField) genreField.value = book.genre;
        if (isbnField) isbnField.value = book.ISBN;
        if (availabilityField) availabilityField.value ? true : false;
        if (locationField) locationField.value = book.location || "";
        if (descriptionField) descriptionField.value = book.description || "";
    }


    updateBookTable(books) {
        if (!this.bookTableBody) {
            console.log("Element not found");
            return;
        }
        this.bookTableBody.innerHTML = "";
        
        books.forEach(book => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.availability ? "Available" : "Unavailable"}</td>   
                <td class="btn-group">
                    <button class="view-btn" data-book-id="${book.bookId}">View</button>
                    <button class="edit-btn" data-book-id="${book.bookId}">Edit</button>
                    <button class="borrow-btn" data-book-id="${book.bookId}">Borrow</button>
                    <button class="delete-btn" data-book-id="${book.bookId}">Delete</button>
                </td>

            `;
            this.bookTableBody.appendChild(row);
        });
    }
    
    clearForm(formId) {
        const form = document.getElementById(formId);  // Get the form by ID
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.value = '';
        });
    }
}
