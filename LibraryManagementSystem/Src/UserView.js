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
        const nameField = form.querySelector('input[name="Name"]');
        const emailField = form.querySelector('input[name="Email"]');
        const roleField = form.querySelector('input[name="Role"]');
        const membershipIdField = form.querySelector('input[name="membershipId"]');
        
        // Set values if fields exist
        if (userIdField) userIdField.value = user.userId
        if (nameField) nameField.value = user.userName || "";
        if (emailField) emailField.value = user.email;
        if (roleField) roleField.value = user.role;
        if (membershipIdField) {
            membershipIdField.value = user.role === "Member" ? user.membershipId || "" : "";}
    
    }

    updateUserTable(users) {
        if (!this.userTableBody) {
            console.log("Element not found");
            return;
        }
        this.userTableBody.innerHTML = "";
        
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.userId}</td>
                <td>${user.userName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>   
                <td class="btn-group">
                    <button class="view-btn" data-user-id="${user.userId}"><img src="../assets/View.png"></button>
                    <button class="edit-btn" data-user-id="${user.userId}"><img src="../assets/Edit.png"></button>
                    <button class="delete-btn" data-user-id="${user.userId}"><img src="../assets/Delete.png"></button>
                </td>

            `;
            this.userTableBody.appendChild(row);
        });
    }
    
    clearForm(formId) {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.value = '';
        });
    }
}
