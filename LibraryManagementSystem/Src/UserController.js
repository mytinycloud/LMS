class UserManagementController{
    constructor(model, view) {
    this.model = model;
    this.view = view;

    // DOM Elements
    this.searchInput = document.getElementById('search');
    

    // Bind event listeners to the correct form IDs
    document.getElementById("add-user-button").addEventListener("click", () => {this.view.showForm("add-user-form")});
    document.getElementById('add-user-form').addEventListener('submit', this.handleAddUser.bind(this));
    document.getElementById('edit-user-form').addEventListener('submit', this.handleEditUser.bind(this));

    this.searchInput.addEventListener('input', this.handleSearch.bind(this));

    this.view.updateUserTable(this.model.getUsers());  // Initial render
    this.addEventListenersToButtons();  // Add event listeners to buttons
    }
    randomId() {
        const randomnumber = Math.random().toString(36).substring(2, 15);
        console.log(randomnumber)
        exisitngIds = userIds.findUserById(randomnumber);
        if (userIds) {this.randomId()}
        return randomnumber;
        

    }
    handleAddUser(event) {
        event.preventDefault();

        // Get values from the add form
        const addForm = document.getElementById('add-user-form');
        const name = addForm.querySelector('input[name="name"]').value;
        const email = addForm.querySelector('input[name="email"]').value;
        const password = addForm.querySelector('input[name="password"]').value;
        const roleField = addForm.querySelector('select[name="role"]')
        const selectedRole = roleField.options[roleField.selectedIndex].value; 
        
        


        let membershipId = null;

        if  (selectedRole === "Member") {
             membershipId = this.model.getMembers().length + 1;
        }
        const newUser = new User(userId, name, email, password, selectedRole, membershipId);
        
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

        let updatedUser;
        if (selectedRole === "Member") {
            const membershipId = this.model.findUserById(userId).membershipId;
            updatedUser = new User(userId, name, email, password, selectedRole, membershipId);
        }else if (selectedRole === "Librarian") {
            updatedUser = new User(userId, name, email, password, selectedRole); 
        }
        this.model.editUser(userId, updatedUser);  // update model  
    
        // Update view
        this.view.hideForm('edit-user-form');
        this.view.updateUserTable(this.model.getUsers());
        this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
    }
    
    handleDeleteUser(event) {
        const userId = event.currentTarget.getAttribute('data-user-id');  // Gets userId of the user linked to the delete button
        const user = findUserById(userId)
        if (confirm(`Are you sure you want to delete ${user.name} ?`)) {
            this.model.deleteUser(userId);  // delete user from model
            this.view.updateUserTable(this.model.getUsers());  // update view
            this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
        }   
    }

    handleSearch() {
        const query = this.searchInput.value.trim()
        if (query === '') {
            this.view.updateUserTable(this.model.getUsers());
        } else {
            const filteredUsers = this.model.searchUsers(query);  
            this.view.updateUserTable(filteredUsers);
        }
        this.addEventListenersToButtons();
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
    }
}
        // Initialize the MVC components
document.addEventListener('DOMContentLoaded', () => {
    const model = new UserManagement();
    const view = new UserView();
    new UserManagementController(model, view);
});
