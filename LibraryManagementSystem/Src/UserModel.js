
class UserManagement { 
    constructor() {
        this.allUsers = this.loadUsers();
    }
    
    loadUsers() {
        const userJSON = localStorage.getItem('users');
        const user = userJSON ? JSON.parse(userJSON) : [];
            return user.map(user => new User(user.userId, user.userName, user.email, user.password, user.role, user.borrowedBooks));
    } 
 
    saveUsers() {
        console.log("user saved as", this.allUsers)
        localStorage.setItem('users', JSON.stringify(this.allUsers));
    }

    saveLoggedInUser(user) {
        console.log('saved user') 
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    loadLoggedInUser() {
        const userJSON = localStorage.getItem('currentUser');
        let user = userJSON ? JSON.parse(userJSON): '';
            return user = new User(user.userId, user.userName, user.email, user.password, user.role, user.borrowedBooks);
    }

    randomId() {
        const randomnumber = Math.random().toString(36).substring(2, 15);
        console.log(randomnumber)
        let existingIds = this.findUserById(randomnumber);
        if (existingIds) {return randomId()}
            return randomnumber;
    }

    addUser(user) {
        const existingEmail = this.findUserByEmail(user.email);
        if (existingEmail) {
            console.log("User already exists");
            return;
        }
        let userId = this.randomId() 
        let borrowedBooks = []
        let newUser = new User(userId, user.userName, user.email, user.password, user.role, borrowedBooks);
        this.allUsers.push(newUser);
        this.saveUsers();
    }
          
    editUser(userId, updates) {
        Object.assign(userId, updates);
        this.saveUsers();
    }

    deleteUser(userId) {
        let user = this.findUserById(userId);
        let removedUser = user.userName;
        this.allUsers = this.allUsers.filter(user => user.userId !== userId);
        this.saveUsers();
        console.log(`"${removedUser}" was removed.`);
        
    }

    // levenshtein distance algorithm 
    calculateLevenshteinDistance(searchTerm, bookIdentifier) {

        const searchTermLength = searchTerm.length;
        const bookIdentifierLength = bookIdentifier.length;

        let distanceMatrix = Array(searchTermLength + 1);

        for (let row = 0; row <= searchTermLength; row++) {
            distanceMatrix[row] = Array(bookIdentifierLength + 1);
        }

        for (let row = 0; row <= searchTermLength; row++) {
            distanceMatrix[row][0] = row;
        }

        for (let column = 0; column <= bookIdentifierLength; column++) {
            distanceMatrix[0][column] = column;
        }

        for (let row = 1; row <= searchTermLength; row++) {
            for (let column = 1; column <= bookIdentifierLength; column++) {
                if (searchTerm[row - 1] === bookIdentifier[column - 1]) {

                    distanceMatrix[row][column] = distanceMatrix[row - 1][column - 1];
                } else {
                    distanceMatrix[row][column] = Math.min(
                        distanceMatrix[row - 1][column] + 1, 
                        distanceMatrix[row][column - 1] + 1, 
                        distanceMatrix[row - 1][column - 1] + 1 
                    );
                }
            }
        }
        return distanceMatrix[searchTermLength][bookIdentifierLength];
    }

    searchUsers(query) {
        const fuzinessness = 5
        const queryWords = String(query).toLowerCase().replace(/[^\w\s]/g, '').trim().split(/\s+/)

        let  fliteredUsers = this.allUsers

        queryWords.forEach((word, index) => {
            fliteredUsers = fliteredUsers.filter(user => {

                if (!isNaN(query) && Number(query) === Number(user.userId)) {
                    return true;
                }

                const names = user.userName.toLowerCase().split(/\s+/);  
                const emailparts = user.email.toLowerCase().split(/\s+/);

                if (index === 0 && (names.toLowerCase().includes(query) || emailparts.toLowerCase().includes(query))) { 
                    return true
                }
                return names.includes(word) || 
                email.includes(word) || 
                Math.min(...names.map(name => this.calculateLevenshteinDistance(word, name))) <= fuzinessness || 
                Math.min(...emailparts.map(emailpart => this.calculateLevenshteinDistance(word, emailpart))) <= fuzinessness
            });
 
        });
        return fliteredUsers;
    }

    findUserById(query) {
        let user =  this.allUsers.find(user => user.userId === query);
        if (user) {
            return user;
        } else {
            console.log(`User with ID ${query} not found.`);
            return false;
        }
    }

    findUserByEmail(query) {
        let user = this.allUsers.find(user => user.email === query);
        if (user) {
            return user;
        } else {
            console.log(`User with email ${query} not found.`);
            return false;
        }
    }

    getUsers() {
        return this.allUsers;
    }
    getLoggedInUser() {
        return this.loadLoggedInUser();
    }
}

class User {
    constructor(userId, userName, email, password, role, borrowedBooks ){
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.borrowedBooks = borrowedBooks;
    }
}

