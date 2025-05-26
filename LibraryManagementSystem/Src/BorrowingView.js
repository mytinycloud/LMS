class borrowingView {
    constructor() {
        this.notifications = document.querySelector('#notifications');
        window.borrowingView = this;
    }

    updateNotifications(borrowingRecords) {
        if (!this.notifications) {
            console.log("Element not found")
            return;
        }
        this.notifications.innerHTML = "";

            borrowingRecords.forEach(record => {
                const row = document.createElement("div");
                row.innerHTML = `
                    <div style="margin-bottom: 20px;">
                        <div style="background-color: #f8f9fa; padding: 10px; margin-bottom: 10px; border-left: 4px solid #3498db; border-radius: 3px;">
                        <h3 style="margin-bottom: 5px;">Book Due ${record.dueDate}</h3>
                        <p>Your book "${record.borrowedBook.title}" is due ${record.dueDate}. Please return it to avoid late fees.</p>
                        <p style="color: #7f8c8d; font-size: 14px; margin-top: 5px;">${record.borrowDate}</p>
                        </div>
                    </div>

                `;
                this.notifications.appendChild(row);
            });
        };
}