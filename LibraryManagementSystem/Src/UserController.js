class UserManagementController{
    constructor(model, view) {
    this.model = model;
    this.view = view;

    // DOM Elements
    this.searchInput = document.getElementById('search');
    

    // Bind event listeners to the correct form IDs
    document.getElementById("add-user-button").addEventListener("click", () => {this.view.showForm("add-user-form")});
    document.getElementById('add-user-form').addEventListener('submit', this.handleAddUser.bind(this));
    //document.getElementById('edit-user-form').addEventListener('submit', this.handleEditUser.bind(this));
    //this.searchInput.addEventListener('input', this.handleSearch.bind(this));

    this.view.updateUserTable(this.model.getUsers());  // Initial render
    this.addEventListenersToButtons();  // Add event listeners to buttons
    }

    handleAddUser(event) {
        event.preventDefault();
        let userId = this.model.getusers().length + 1;
        
        // Get values from the add form
        const addForm = document.getElementById('add-user-form');
        const name = addForm.querySelector('input[name="name"]').value;
        const email = addForm.querySelector('input[name="email"]').value;
        const password = addForm.querySelector('input[name="password"]').value;
        const role = addForm.querySelector('input[name="role"]').value;

        if (role === "Member") {
            membershipId = this.model.getMembers().length + 1 + Math.floor(Math.random() * 10000);
        }

        const newUser = new user(userId, name, email, password, role, membershipId);
        
        this.model.adduser(newUser);
        
        // Update view
        this.view.clearForm('add-user-form');
        this.view.hideForm('add-user-form');
        this.view.updateUserTable(this.model.getUsers());
        this.addEventListenersToButtons();  // Re-add event listeners as the table has been refreshed
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
                const users = this.model.searchUser(userId);
                const user = users[0];

                this.view.showForm('edit-user-form'); // show  the form 

                const form = document.getElementById('edit-user-form');
                form.setAttribute('data-editing-id', userId);
                console.log(user)
                this.view.setplaceholder(user, 'edit-user-form');
            });
        });

        const viewButtons = document.querySelectorAll('.view-btn'); // Link edit button 
        viewButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const userId = event.currentTarget.getAttribute('data-user-id');  // Gets userId of the user linked to the edit button 
                console.log (userId)

                // gets the rest of the user details to send to view.setplaceholder 
                const users = this.model.searchUser(userId);
                const user = users[0];

                this.view.showForm('view-user-form'); // show  the form 

                const form = document.getElementById('view-user-form');
                form.setAttribute('data-editing-id', userId);
                this.view.setplaceholder(user, 'view-user-form');
            });
        });

        const borrowButtons = document.querySelectorAll('.borrow-btn'); // Link edit button 
        borrowButtons.forEach(button => {
            button.addEventListener('click', (event) => { 
                const userId = event.currentTarget.getAttribute('data-user-id');  // Gets userId of the user linked to the edit button 
                console.log (userId)


            });
        });

    }
}
        // Initialize the MVC components
document.addEventListener('DOMContentLoaded', () => {
    const model = new UserManagement();
    const view = new UserView();
    new UserManagementController(model, view);
});