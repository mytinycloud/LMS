class BorrowingRecord {
    constructor(recordId, borrowedBook, borrower, borrowDate, dueDate, returnDate, status) {
        this.recordId = recordId;
        this.borrowedBook = borrowedBook;
        this.borrower = borrower;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.status = status;
    }
    createRecord(recordId, borrowedBook, borrower, borrowDate, dueDate, returnDate, status) {
        const record = new BorrowingRecord(recordId, borrowedBook, borrower, borrowDate, dueDate, returnDate, status);
        this.borrowingRecords.push(record.createRecord());
    }
    updateRecord(recordId, updates) {
        
        if (recordId) {
            record.updateRecord(updates);
        } else {
            throw new Error('Record not found');
        }
        
    }
    checkOverdue() {
   
    }
    findRecordById(query) {
    return record = this.borrowingRecords.find(record => record.recordId === query);
    }   
}
