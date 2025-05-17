
class UserManagement { 
    constructor() {
        this.allUsers = [];
        this.allMembers = [];
        this.allLibrarians = [];

    }
    loadUsers() {
        const allUsersJSON = localStorage.getItem('Users');
        const allMembersJSON = localStorage.getItem('Members');
        const allLibrariansJSON = localStorage.getItem('Librarians');   
        const allUsers = allUsersJSON ? JSON.parse(allUsersJSON) : [];
        const allMembers = allMembersJSON ? JSON.parse(allMembersJSON) : [];
        const allLibrarians = allLibrariansJSON ? JSON.parse(allLibrariansJSON) : [];

        const users = allUsers.map(user=> new User(user.userId, user.userName, user.email, user.password, user.role ));
        const members = allMembers.map(member => new Member(member.userId, member.userName, member.email, member.password, member.role, member.membershipId, member.borrowedBooks));
        const librarians = allLibrarians.map(librarian => new Librarian(librarian.userId, librarian.userName, librarian.email, librarian.password, librarian.role));
        
        return {
            allUsers: users,
            allMembers: members,
            allLibrarians: librarians
        }
    }
 
    saveUsers() {
        localStorage.setItem('Users', JSON.stringify(this.allUsers));
    }
    saveMembers() {
        localStorage.setItem('Members', JSON.stringify(this.allMembers));
    }
    saveLibrarians() {
        localStorage.setItem('Librarians', JSON.stringify(this.allLibrarians));
    }
    addUser(user) {
        let newUser = new User(user.userId, user.userName, user.email, user.password, user.role);
        this.allUsers.push(newUser);
        this.saveUsers();
        if (user.role == "Member") {
            let membershipId = this.allMembers.length + 1 + Math.floor(Math.random() * 10000);
            let member = new Member(user.userId, user.userName, user.email, user.password, user.role, membershipId);
            this.allMembers.push(member);
            this.saveMembers()
        }
        if (user.role == "Librarian") {
            this.allLibrarians.push(user);
            this.allUsers.push(user);
            this.saveUsers();
        }else{
            console.log("User is undefined");
        };
        }
          
    editUser(userId, update) {
        let user = this.findUserById(userId);
        Object.assign(user, update)
    }
    findUserById(query) {
        return this.allUsers.find(user => user.userId === query)
    }
    getUsers() {
        return this.allUsers
    }
    getMembers() {
        return this.allMembers
    } 
    getLibrarians() {
        return this.allLibrarians
    }
}

class User {
    constructor(userId, userName, email, password, role ){
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

class Member extends User {
    constructor(userId, userName, email, password, role, membershipId, borrowedBooks= [], ){
        super(userId, userName, email, password, role);
        this.membershipId = membershipId;
        this.borrowedBooks = borrowedBooks;
    }
}

class Librarian extends User {
    constructor(userId, userName, email, password, role){
        super(userId, userName, email, password, role,);
    }
}

