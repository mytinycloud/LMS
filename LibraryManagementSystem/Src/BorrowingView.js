class RecordsView {
    constructor() {
        this.notifications = document.querySelector('#notifications');
        window.RecordsView = this;
    }
    // updates Div sections on the profile page where it sorts over due to the top and returned records to the bottom, 
    // it then displays a different div for each respective record type.
    updateNotifications(borrowingRecords) {

        this.notifications.innerHTML = "";

        if (borrowingRecords.length === 0) {
            this.notifications.innerHTML = "<p>No current borrowing records or notifications.</p>";
            return;
        }

        // gets the current date and sets time to midnight to reflect a day, so overdue book are only overdue the day after their due date
        const today = new Date();
        //today.setHours(0, 0, 0, 0);  // comment this out when testing 

        // Sorts records based on status
        const sortedRecords = [...borrowingRecords].sort((a, b) => {
            const aOverdue = a.dueDate < today && a.status === 'borrowed';
            const bOverdue = b.dueDate < today && b.status === 'borrowed';
            const areturned = a.status === 'returned';
            const breturned = b.status === 'returned';
            
            // overdue records come first 
            if (aOverdue && !bOverdue){
                return -1;
            } else if (!aOverdue && bOverdue) {
                return 1;
            } else {
                    // returned recorrds come last
                    if (areturned && !breturned) {
                        return 1; 
                    }else if (!areturned && breturned) {
                        return -1; 
                    }
            return a.dueDate - b.dueDate; // Sort by due date if both are overdue or returned
            }
            

        });
        
        // Display records by there status.
        sortedRecords.forEach(record => {
            const row = document.createElement("div");
            row.className = "notification";

            // Add class based on record status
            if (record.status === 'returned') {
                row.className += "-returned";
                row.innerHTML = `
                <div>
                    <h3 class="notification-title">The Book ${record.borrowedBook.title} was Returned: ${record.returnDate}</h3>
                    <p class="notification-date">Borrowed on: ${record.borrowDate}</p>
                    <button class="return-button" data-record-id="${record.recordId}">Return Book</button>
                </div>
            `;
            }else if (record.dueDate < today && record.status === 'borrowed') {
                row.className += "-overdue";
                row.innerHTML = `
                <div>
                    <h3 class="notification-title">Book was Due: ${record.dueDate}</h3>
                    <p class="notification-text">Your book "<span class="notification-book-title">${record.borrowedBook.title}</span>" is <b>OVERDUE</b> on ${record.dueDate}. Please return it to avoid late fees.</p>
                    <p class="notification-date">Borrowed on: ${record.borrowDate}</p>
                    <button class="return-button" data-record-id="${record.recordId}">Return Book</button>
                </div>
            `;
            }else{
                row.className += "-normal"; 
                row.innerHTML = `
                <div>
                    <h3 class="notification-title">Book Due: ${record.dueDate}</h3>
                    <p class="notification-text">Your book "<span class="notification-book-title">${record.borrowedBook.title}</span>" is due on ${record.dueDate}. Please return it to avoid late fees.</p>
                    <p class="notification-date">Borrowed on: ${record.borrowDate}</p>
                    <button class="return-button" data-record-id="${record.recordId}">Return Book</button>
                </div>
            `;
            }
            
            this.notifications.appendChild(row);
        });
        
    }

}