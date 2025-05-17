
class UserManagement { 
    constructor() {
        this.allMembers = [];
        this.allLibrarians = [];

    }
    loadUsers() {
        const allUsersJSON = localStorage.getItem('Users');
        const allUsers = allUsersJSON ? JSON.parse(allUsersJSON) : [];
            return allUsers.map(user=> new User(user.userId, user.userName, user.email, user.password, user.role ));
    }
 
    saveUsers() {
        localStorage.setItem('Users', JSON.stringify(this.allUsers));
    }
    addUser(user) {
        if (user.role == "Member") {
            this.allMembers.push(user);
            this.saveUsers();
        }else{}
    }
    editUser(userId, update) {
        let user = this.findUserById(userId)
        Object.assign(user, update)
    }
    findUserById(query) {
        return this.allUsers.find(user => user.userId === query)
    }
}

class User {
    constructor(userId, userName, email, password, role ){
        this.userId = userId;
        this.name = userName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

class Member extends User {
    constructor(userId, name, email, password, role, membershipId, borrowedBooks= [], ){
        super(userId, name, email, password, role);
        this.membershipId = membershipId;
        this.borrowedBooks = borrowedBooks;
    }
}

class Librarian extends User {
    constructor(userId, name, email, password, role){
        super(userId, name, email, password, role,);
    }
}

