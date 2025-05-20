class UserView {
    constructor() {
        this.userTableBody = document.querySelector('tbody');
        window.userView = this;
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
        const nameField = form.querySelector('input[name="name"]');
        const emailField = form.querySelector('input[name="email"]');
        const passwordField = form.querySelector('input[name="password"]');
        const roleField = form.querySelector('select[name="role"]');
  
        // Set values if fields exist
        if (nameField) nameField.value = user.userName;
        if (emailField) emailField.value = user.email;
        if (passwordField) passwordField.value = user.password;
        if (roleField) roleField.value ? "Member" : "Librarian";
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
                <td>${user.membershipId || ''}</td> 
                <td>${user.userName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td class="btn-group">
                    <button class="edit-btn" data-user-id="${user.userId}"><img class="btnimg" src="../assets/Edit.png"></button>
                    <button class="delete-btn" data-user-id="${user.userId}"><img class="btnimg" src="../assets/Delete.png"></button>
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
