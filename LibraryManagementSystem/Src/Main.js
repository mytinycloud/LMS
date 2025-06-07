// Initialize the MVC components
document.addEventListener('DOMContentLoaded', () => {

    window.UserModel = new UserManagement();
    window.CatalogueModel = new CatalogueModel();
    window.RecordsModel = new RecordsModel();
    window.UserView = new UserView();
    window.RecordsView = new RecordsView();
    const catalogueView = new CatalogueView();

    new UserManagementController(window.UserModel, window.UserView);
    new CatalogueController(window.CatalogueModel, catalogueView);
    window.RecordsController = new RecordsController(window.RecordsModel, window.RecordsView);


    // Creates a dynaimc update of profile link and notifications giving real time overdue notifications. 
    const initialLoggedInUser = window.UserModel.getLoggedInUser();
    const sec = 10; // 10s interval
    if (initialLoggedInUser) {
        window.UserView.updateProfileLink(initialLoggedInUser);
        setInterval(() => {
            const loggedInUser = window.UserModel.getLoggedInUser();
            if (loggedInUser) {
                window.UserView.updateProfileLink(loggedInUser);
                window.RecordsView.updateNotifications(window.RecordsModel.getCurrentUserRecords());
                window.RecordsController.addEventListenersToButtons();
            }
        },sec * 1000);
    }
});


