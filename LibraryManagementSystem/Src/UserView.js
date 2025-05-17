class UserView {
    constructor() {
        this.userTableBody = document.querySelector('tbody');
        window.catalogueView = this;
    }

    showForm(modalId) {
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.style.display = "block";
        } else {
            console.error(`Modal with ID ${modalId} not found`);
        }
    }

    hideForm(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    }
    
    setplaceholder(user, modalId) {
        const form = document.getElementById(modalId)
        const userIdField = form.querySelector('input[name="userId"]');
        const nameField = form.querySelector('input[name="Name]');
        const emailField = form.querySelector('input[name="Email"]');
        const roleField = form.querySelector('input[name="Role"]');
        const membershipIdField = form.querySelector('input[name="membershipId"]');
        
        // Set values if fields exist
        if (userIdField) userIdField.value = user.userId
        if (nameField) titleField.value = user.name || "";
        if (emailField) authorField.value = user.email;
        if (roleField) genreField.value = user.role;
        if (membershipIdField) membershipIdField.value = Member.membershipId;
    
    }


    updateuserTable(users) {
        if (!this.userTableBody) {
            console.log("Element not found");
            return;
        }
        this.userTableBody.innerHTML = "";
        
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.title}</td>
                <td>${user.author}</td>
                <td>${user.genre}</td>
                <td>${user.availability ? "Available" : "Unavailable"}</td>   
                <td class="btn-group">
                    <button class="view-btn" data-user-id="${user.userId}"><img src="../assets/View.png"></button>
                    <button class="edit-btn" data-user-id="${user.userId}"><img src="../assets/Edit.png"></button>
                    <button class="borrow-btn" data-user-id="${user.userId}"><img src="../assets/Borrow.png"></button>
                    <button class="delete-btn" data-user-id="${user.userId}"><img src="../assets/Delete.png"></button>
                </td>

            `;
            this.userTableBody.appendChild(row);
        });
    }
    
    clearForm(formId) {
        const form = document.getElementById(formId);  // Get the form by ID
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.value = '';
        });
    }
}
