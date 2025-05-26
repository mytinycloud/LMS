class RecordsModel { 
    constructor(){
        this.allRecords = this.loadRecords()
    }
    loadRecords() {
    const recordJSON = localStorage.getItem('records');
    const record = recordJSON ? JSON.parse(recordJSON) : [];
        return record.map(record => new BorrowingRecord(record.recordId, record.borrowedBook, record.borrower, record.borrowDate, record.dueDate, record.returnDate, record.status));
    } 
 
    saveRecords() {
        localStorage.setItem('records', JSON.stringify(this.allUsers));
    }

    createRecord(recordId, borrowedBook, borrower, borrowDate, dueDate, returnDate, status) {
        const record = new BorrowingRecord(recordId, borrowedBook, borrower, borrowDate, dueDate, returnDate, status);
        this.borrowingRecords.push(record.createRecord());
    }
    
    updateRecord(recordId, updates) {
        
    }
    checkOverdue() {
   
    }
    findRecordById(query) {
    return record = this.borrowingRecords.find(record => record.recordId === query);
    }  

}
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
     
}
