class BorrowingRecordController {
    constructor() {
    }

    createRecord(recordId, borrowedBook, borrower, borrowDate, dueDate, returnDate, status) {
        const record = new BorrowingRecord(recordId, borrowedBook, borrower, borrowDate, dueDate, returnDate, status);
        this.borrowingRecords.push(record.createRecord());
    }
    updateRecord(recordId, updates) {
        const record = this.borrowingRecords.find(record => record.recordId === recordId);
        if (record) {
            record.updateRecord(updates);
        } else {
            throw new Error('Record not found');
        }
        
    }
}    