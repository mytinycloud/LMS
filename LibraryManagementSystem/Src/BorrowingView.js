class RecordsView {
    constructor() {
        this.notifications = document.querySelector('#notifications');
        if (!this.notifications) {
            console.warn('Notifications wont load on this page')
        }
        window.RecordsView = this;
    }

    updateNotifications(borrowingRecords) {
        if (!this.notifications) {
            console.log("Element not found");
            return;
        }

        this.notifications.innerHTML = "";

        if (borrowingRecords.length === 0) {
            this.notifications.innerHTML = "<p>No current borrowing records or notifications.</p>";
            return;
        }

        const today = new Date();
        //today.setHours(0, 0, 0, 0);

        const sortedRecords = [...borrowingRecords].sort((a, b) => {
            const aOverdue = a.dueDate < today && a.status === 'borrowed';
            const bOverdue = b.dueDate < today && b.status === 'borrowed';
            const areturned = a.status === 'returned';
            const breturned = b.status === 'returned';

            if (aOverdue && !bOverdue){
                return -1;
            } else if (!aOverdue && bOverdue) {
                return 1;
            } else {
                    if (areturned && !breturned) {
                        return 1; // Returned records come last
                    }else if (!areturned && breturned) {
                        return -1; // Returned records come last
                    }
            return a.dueDate - b.dueDate; // Sort by due date if both are overdue or returned
            }
            

        });

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