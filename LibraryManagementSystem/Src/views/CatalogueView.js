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
            <button style="background-color: #2ecc71; padding: 5px 10px; margin-right: 5px;">Edit</button>
            <button style="background-color: #e74c3c; padding: 5px 10px;">Delete</button>
        `;
        tbody.appendChild(row);
    });
}

// Call function when catalogue loads
document.addEventListener("DOMContentLoaded", function() {
    const books = catalogueController.getAllBooks();  // Fetch books
    populateCatalogue(books); // Update UI
});