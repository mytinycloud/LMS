
class UserManagement { 
    constructor() {
        this.allUsers = this.loadUsers();
    }
    
    loadUsers() {
        try{
            const userJSON = localStorage.getItem('users');
            const user = userJSON ? JSON.parse(userJSON) : [];
            return user.map(user => new User(user.userId, user.userName, user.email, user.password, user.role, user.borrowedBooks));
        } catch { 
            alert(`Error Loading from localStorage: ${error}`);
        }
    } 
 
    saveUsers() {
        try{
            localStorage.setItem('users', JSON.stringify(this.allUsers));
        } catch { 
            alert(`Error saving to localStorage: ${error}`);
        }
    }

    saveLoggedInUser(user) {
        try{
            localStorage.setItem('currentUser', JSON.stringify(user || null));
        } catch {
            alert(`Error saving currentUser in localStorage: ${error}`);
        }
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
            alert("Error parsing currentUser from localStorage:", error);
        }
        if (!user) {
            return null;
        }
        return user = new User(user.userId, user.userName, user.email, user.password, user.role, user.borrowedBooks);
    }

    randomId() {
        const randomnumber = crypto.randomUUID().substring(0, 8);
        let existingIds = this.findUserById(randomnumber);
        if (existingIds) {return this.randomId()}
            return randomnumber;
    }

    addUser(user) {
        const existingEmail = this.findUserByEmail(user.email);
        if (existingEmail) {
            alert("User email already exists");
            return;
        }
        let userId = this.randomId() 
        let borrowedBooks = []
        let newUser = new User(userId, user.userName, user.email, user.password, user.role, borrowedBooks);
        this.allUsers.push(newUser);
        this.saveUsers();
        alert(`user ${user.userName} was added successfully.`)
    }
          
    editUser(userID, updates) {
        let user = this.findUserById(userID);
        Object.assign(user, updates);
        this.saveUsers();
    }

    deleteUser(userId) {
        let user = this.findUserById(userId);
        let removedUser = user.userName;
        this.allUsers = this.allUsers.filter(user => user.userId !== userId);
        this.saveUsers();
        alert(`user ${removedUser} was removed.`);
        
    }

    borrowBook(book , user) {
        user.borrowedBooks.push(book);
        this.saveUsers();
        this.saveLoggedInUser(user);
    
    }
    returnBook(bookId) {
        let user = this.loadLoggedInUser();
        user.borrowedBooks = user.borrowedBooks.filter(book => book.bookId !== bookId);
        this.saveUsers();
        this.saveLoggedInUser(user);
        window.UserView.updateProfileLink(user);
    }

    // The levinstein distance algorithm is a 2d matrix that compares a "cost" of changeing one word into another
    // doing this by adding subtracting or subsituting a letter from the search term to match the target word.
    // this algorithm is from https://www.30secondsofcode.org/js/s/levenshtein-distance/ except the variables have been made more verbose for understanding. 

    // this should be in another file and used between user and catalogue instead of copy and pasted. 
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

    // Same as the the catalouge search, probably also could have been one generic search with enough thought. 
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
        }
    }

    findUserByEmail(query) {
        let user = this.allUsers.find(user => user.email === query);
        if (user) {
            return user;
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

