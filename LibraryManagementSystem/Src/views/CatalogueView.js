import catalogueController from "./CatalogueController.js";  // Import the controller

function populateCatalogue(books) {
    const tbody = document.getElementById("catalogue-body");
    tbody.innerHTML = ""; // Clear previous entries

    books.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.ISBN}</td>
            <td>${book.isAvailable ? "Available" : "Borrowed"}</td>
            <td>${book.location}</td>
            <td><button onclick="showDetails('${book.bookId}')">Details</button></td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Call function when catalogue loads
document.addEventListener("DOMContentLoaded", function() {
    const books = catalogueController.getAllBooks();  // Fetch books
    populateCatalogue(books); // Update UI
});