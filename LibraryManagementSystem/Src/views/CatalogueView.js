class LibraryView {
    constructor() {
        this.bookTableBody = document.querySelector('#book-table tbody');
    }

    updateBookTable(books) {
        this.bookTableBody.innerHTML = '';
        
        books.forEach(book => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.getBookId}</td>
                <td>${book.getTitle}</td>
                <td>${book.getAuthor}</td>
                <td>${book.getGenre}</td>
                <td>${book.getisbn}</td>
                <td>${book.getAvailability ? "Available" : "Borrowed"}</td>
                <td>${book.getLocation}</td>    
                <td>
                    <button class="edit-btn" edit-data-book-id="${book.getBookId()}">Edit</button>
                    <button class="remove-btn" remove-data-book-id="${book.getBookId()}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
    clearForm() {
        document.getElementById('books').reset();
    }
}
