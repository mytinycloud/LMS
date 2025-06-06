class UserView {
    constructor() {
        this.userTableBody = document.querySelector('tbody');
        window.UserView = this;
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
    updateProfileLink(user) {
        const loggedInUser = user;
        const profileLink = document.getElementById('profileLink');
        
        if (user) {
            profileLink.style.display = "flex";
            let imgSrc

            const overdueCount = window.RecordsModel.checkOverdue().length; // Get the count of overdue books
            const notifyBellSrc = overdueCount > 0 ? "../assets/notification-Red.png" : "../assets/notification-empty.png";
            if (loggedInUser.userName === "Hadley Clark") { 
                imgSrc = "../assets/easteregg.jpg"
            }else{
                imgSrc = "../assets/user.png"
            }
        

            profileLink.innerHTML = `
                <div class="notify-icon-container">
                    <img class="notify-bell ${overdueCount > 0 ? "notify-belljiggle" : ""}" src="${notifyBellSrc}" alt="Notifications">
                    ${overdueCount > 0 ? `<span class="notification-badge">${overdueCount}</span>` : ''}
                </div>
                
                <span>${loggedInUser.userName}</span>
                <img class="profileimg" src=${imgSrc} alt="Profile Picture">
                
            `;
        } else {
            if (profileLink) {
                profileLink.style.display = "none";
            }
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
        if (roleField) roleField.value = user.role;
    }

    updateUserTable(users) {
        if (!this.userTableBody) {
            console.log("Element not found");
            return;
        }
        this.userTableBody.innerHTML = "";
        if (users.length === 0) {
            const empty = document.createElement("tr")
            empty.innerHTML = "<td colspan='5'>No Users found</td>";
            this.userTableBody.appendChild(empty)
        }else{users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.userId}</td> 
                <td>${user.userName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td class="btn-group">
                    <button class="edit-btn" data-user-id="${user.userId}"><img class="btnimg" src="../assets/Edit.png"></button>
                    <button class="delete-btn" data-user-id="${user.userId}"><img class="btnimg" src="../assets/Delete.png"></button>
                    <button class="login-btn" data-user-id="${user.userId}">Login</button>
                </td>
            `;
            this.userTableBody.appendChild(row);
            });
        }
    }
    
    clearForm(formId) {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.value = '';
        });
    }
}
