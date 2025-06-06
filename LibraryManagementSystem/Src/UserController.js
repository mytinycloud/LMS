class UserManagementController{
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Bind event listeners to the correct form IDs
        if (document.getElementById('user-search')) {
        this.searchInput = document.getElementById('user-search');
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.view.updateUserTable(this.model.getUsers());  // Initial render
        this.addEventListenersToButtons();  // Add event listeners to buttons
        }
        if (document.getElementById("add-user-button")) {
            document.getElementById("add-user-button").addEventListener("click", () => {this.view.showForm("add-user-form")});
        }
        if (document.getElementById("add-user-form")) {
            document.getElementById('add-user-form').addEventListener('submit', this.handleAddUser.bind(this));
        }
        if (document.getElementById('edit-user-form')) {
            document.getElementById('edit-user-form').addEventListener('submit', this.handleEditUser.bind(this));
        }
        if (this.model.getLoggedInUser()) {
            this.view.updateProfileLink(this.model.getLoggedInUser());  // Update profile link in the view
        }
        
    }

    handleAddUser(event) {
        event.preventDefault();

        // Get values from the add form
        const addForm = document.getElementById('add-user-form');

        const userName = addForm.querySelector('input[name="name"]').value;
        const email = addForm.querySelector('input[name="email"]').value;
        const password = addForm.querySelector('input[name="password"]').value;
        const roleField = addForm.querySelector('select[name="role"]')
        const selectedRole = roleField.options[roleField.selectedIndex].value; 
        
        const newUser = {userName:userName, email:email, password:password, role:selectedRole}
        
        this.model.addUser(newUser);
    
        // Update view
        this.view.clearForm('add-user-form');
        this.view.hideForm('add-user-form');
        this.view.updateUserTable(this.model.getUsers());
        this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
        }

    handleEditUser(event) {
        event.preventDefault();
        const editForm = document.getElementById('edit-user-form');
        const userId = editForm.getAttribute('data-editing-id');

        const name = editForm.querySelector('input[name="name"]').value;
        const email = editForm.querySelector('input[name="email"]').value;
        const password = editForm.querySelector('input[name="password"]').value;
        const roleField = editForm.querySelector('select[name="role"]')
        const selectedRole = roleField.options[roleField.selectedIndex].value;

        const updatedUser = {userName: name, email: email, password: password, role: selectedRole};  // update user for model

        this.model.editUser(userId, updatedUser);  // update model  
    
        // Update view
        this.view.hideForm('edit-user-form');
        this.view.updateUserTable(this.model.getUsers());
        this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
    }
    
    handleDeleteUser(event) {
        const userId = event.currentTarget.getAttribute('data-user-id');  // Gets userId of the user linked to the delete button
        const user = this.model.findUserById(userId)
        if (confirm(`Are you sure you want to delete ${user.userName} ?`)) {
            this.model.deleteUser(userId);  // delete user from model
            this.view.updateUserTable(this.model.getUsers());  // update view
            this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
        }   
    }

    handleSearch() {
        const query = this.searchInput.value.trim() // Get the search query from the input field
        if (query === '') {
            this.view.updateUserTable(this.model.getUsers()); // If the search query is empty show all users
        } else {
            const filteredUsers = this.model.searchUsers(query);  // Search users based on the query

            console.log('filtered users', filteredUsers)
            this.view.updateUserTable(filteredUsers);
        }
        this.addEventListenersToButtons();
    }

    handleLogin(event) {
        let userId;
        let user;

        if (event) {
            userId = event.currentTarget.getAttribute('data-user-id');  // Gets userId of the user linked to the login button
            user = this.model.findUserById(userId)
            this.model.saveLoggedInUser(user)
        }else {
            user = this.model.getLoggedInUser(); // If no event, get the logged in user
        }
        console.log('found user')
        this.view.updateProfileLink(user);  // Update the profile link in the view          
    }
    

    addEventListenersToButtons() {
        // Add listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {this.handleDeleteUser(event);
            });
        });
        
        const editButtons = document.querySelectorAll('.edit-btn'); // Link edit button 
        editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.currentTarget.getAttribute('data-user-id');  // Gets userId of the user linked to the edit button 
                console.log (userId)

                // gets the rest of the user details to send to view.setplaceholder 
                const user = this.model.findUserById(userId);

                this.view.showForm('edit-user-form'); // show  the form 

                const form = document.getElementById('edit-user-form');
                form.setAttribute('data-editing-id', userId);
                console.log(user)
                this.view.setplaceholder(user, 'edit-user-form');
            });
        })
        const loginButtons = document.querySelectorAll('.login-btn');
        loginButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                console.log('login clicked'); 
                this.handleLogin(event);
            });
        })
    }
}

