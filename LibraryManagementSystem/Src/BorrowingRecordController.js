class RecordsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        if (document.getElementById('notifications')) {
            this.view.updateNotifications(this.model.getCurrentUserRecords());  // Initial render
            this.addEventListenersToButtons();  // Add event listeners to buttons
        };
    }    
    
    handleReturnBook(event) {
        const recordId = event.target.getAttribute('data-record-id');
        const record = this.model.findRecordById(recordId);
        const book = record.borrowedBook;
        
        if (record) {
            record.returnDate = new Date();
            record.status = 'returned';
            this.model.saveRecords();
            book.availability = true;
            window.CatalogueModel.editBook(book.bookId, book);
            window.UserModel.returnBook(book.bookId); // Update the user's borrowed books
            this.view.updateNotifications(this.model.getCurrentUserRecords());
            this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
        } else {
            throw new Error(`Record with ID ${recordId} not found.`);
        }
    }

    addEventListenersToButtons() {
        const returnButtons = document.querySelectorAll('.return-button');
        returnButtons.forEach(button => {
            button.addEventListener('click', this.handleReturnBook.bind(this));
        });
    }   
}    
