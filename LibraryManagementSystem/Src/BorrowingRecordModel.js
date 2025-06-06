class RecordsModel { 
    constructor(){
        this.allRecords = this.loadRecords()
    }

    // Loads  all Records from local storage
    loadRecords() {
    const recordJSON = localStorage.getItem('records');
    const record = recordJSON ? JSON.parse(recordJSON) : [];
        return record.map(record => new BorrowingRecord(
            record.recordId, 
            record.borrowedBook, 
            record.borrower, 
            new Date(record.borrowDate), 
            new Date(record.dueDate), 
            record.returnDate ? new Date(record.returnDate) : null, 
            record.status
        ));
    } 
 
    saveRecords() {
        localStorage.setItem('records', JSON.stringify(this.allRecords));
    }

    createRecord(borrowedBook, borrower) {
        const recordId = crypto.randomUUID().substring(0, 9);
        const borrowDate = new Date();
        let dueDate = new Date(borrowDate);
        dueDate.setDate(borrowDate.getDate() + 7); // due date 7 days 

        // TEST : uncomment for 30 second due date
        // this.checkOverdue() and RecordsView.updateNotifications() will need to be updated to reflect this change
        // as they check for overdue records based on midnight of the current day
        //--------------------------------------------------------
        dueDate = new Date(borrowDate.getTime() + 30 * 1000); // due date 30 secs
        //----------------------------------------------------------

        const returnDate = null;
        const status = 'borrowed';

        const record = new BorrowingRecord(recordId, borrowedBook, borrower, borrowDate, dueDate, returnDate, status);
        this.allRecords.push(record);
        this.saveRecords();
        console.log(`Record created: ${record}`);
    }
    // Checks overdue books each default set for midnight duedate
    checkOverdue() {
        const today = new Date();
        //today.setHours(0, 0, 0, 0);  // sets time to midnnight to line up with a due date being the whole day. 

        return this.getCurrentUserRecords().filter(record => record.dueDate < today && record.status === 'borrowed');  // Filters only 
    }

    findRecordById(query) {
    return this.allRecords.find(record => record.recordId === query);
    } 

    getRecords() {
        return this.allRecords;
    }
    getCurrentUserRecords() {
        const currentUser = window.UserModel.loadLoggedInUser();
        if (!currentUser) {
            return [];
        }
        return this.allRecords.filter(record => record.borrower.userId === currentUser.userId);
        
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