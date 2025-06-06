
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
        localStorage.setItem('users', JSON.stringify(this.allUsers));
    }

    saveLoggedInUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user || null));
    }

    loadLoggedInUser() {
        const userJSON = localStorage.getItem('currentUser');
        let user = null;
        try {
            if (userJSON) {
                const parsed = JSON.parse(userJSON);
                if (parsed !== null) {
                    user = parsed;
                    
                }
            }
        } catch (error) {
            console.error("Error parsing currentUser from localStorage:", error);
        }
        if (!user) {
            console.log("No user is currently logged in.");
            return null;
        }
        return user = new User(user.userId, user.userName, user.email, user.password, user.role, user.borrowedBooks);
        
    }

    randomId() {
        const randomnumber = crypto.randomUUID().substring(0, 8);
        console.log(randomnumber)
        let existingIds = this.findUserById(randomnumber);
        if (existingIds) {return this.randomId()}
            return randomnumber;
    }

    addUser(user) {
        const existingEmail = this.findUserByEmail(user.email);
        if (existingEmail) {
            console.warn("User already exists");
            return;
        }
        let userId = this.randomId() 
        let borrowedBooks = []
        let newUser = new User(userId, user.userName, user.email, user.password, user.role, borrowedBooks);
        this.allUsers.push(newUser);
        this.saveUsers();
    }
          
    editUser(userID, updates) {
        let user = this.findUserById(userID);
        if (!user) {
            console.log(`UserId ${userID} not found. Could not update user.`);
            return;
        }
        Object.assign(user, updates);
        this.saveUsers();
    }

    deleteUser(userId) {
        let user = this.findUserById(userId);
        let removedUser = user.userName;
        this.allUsers = this.allUsers.filter(user => user.userId !== userId);
        this.saveUsers();
        console.log(`"${removedUser}" was removed.`);
        
    }

    borrowBook(book , user) {
        user.borrowedBooks.push(book);
        this.saveUsers();
        this.saveLoggedInUser(user);
        console.log("borrowed books: ", user.borrowedBooks)
    
    }
    returnBook(bookId) {
        let user = this.loadLoggedInUser();
        user.borrowedBooks = user.borrowedBooks.filter(book => book.bookId !== bookId);
        this.saveUsers();
        this.saveLoggedInUser(user);
        window.UserView.updateProfileLink(user);
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
        const fuzinessness = 3
        const queryWords = String(query).toLowerCase().replace(/[^\w\s]/g, '').trim().split(/\s+/)
        const scoredUsers = [];
        this.allUsers.forEach(user => {
            let score = 0;
            const lowername = user.userName.toLowerCase();
            const loweremail = user.email.toLowerCase();

            if (String(query) === user.userId) {
                score += 1000; // Exact match on userId
            }
            if (lowername.includes(query) || loweremail.includes(query)) {
                score += 1000; // Exact match on name or email
            }

            queryWords.forEach((word) => {
                const names = user.userName.toLowerCase().split(/\s+/);  
                const emailparts = user.email.toLowerCase().split(/[@.]+/);

                if (names.includes(word)){
                    score += 5; 
                } else if (Math.min(...names.map(name => this.calculateLevenshteinDistance(word, name))) <= fuzinessness) {
                    score += 3; // Fuzzy match on name
                }
                if (emailparts.includes(word)) {
                    score += 5; 
                } else if (Math.min(...emailparts.map(emailpart => this.calculateLevenshteinDistance(word, emailpart))) <= fuzinessness) {
                    score += 3; // Fuzzy match on email
                }
            });
            if (score > 0) {
                scoredUsers.push({ user: user, score: score });
            }
        });
        scoredUsers.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score; // Sort by score in descending order
            }
            return a.user.userName.localeCompare(b.user.userName); // Sort by name if scores are equal
        });
        return scoredUsers.map(item => item.user);
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

