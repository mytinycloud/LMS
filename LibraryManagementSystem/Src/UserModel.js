
class UserManagement { 
    constructor() {
        this.allUsers = this.loadUsers();
        this.allMembers = this.loadMembers();
        this.allLibrarians = this.loadLibrarians();
    }
    loadData(key, type) {
        const dataJSON = localStorage.getItem(key);
        const ParsedData = dataJSON ? JSON.parse(dataJSON) : [];
        return ParsedData.map(item => new type(...Object.values(item)));
    }
    loadUsers() {
        return this.loadData('Users', User);
        //const userJSON = localStorage.getItem('users');
        //const user = userJSON ? JSON.parse(userJSON) : [];
            //return user.map(user => new User(user.userId, user.userName, user.email, user.password, user.role));
    }
    loadMembers() {
       return this.loadData('Members', Member);
        //const memberJSON = localStorage.getItem('members');
        //const member = memberJSON ? JSON.parse(memberJSON) : [];
            //return member.map(member => new Member(member.userId, member.userName, member.email, member.password, member.role, member.membershipId));
    }
    loadLibrarians() {
       return this.loadData('Librarians', Librarian);
       // const librarianJSON = localStorage.getItem('librarians');
        //const librarian = librarianJSON ? JSON.parse(librarianJSON) : [];
         //   return librarian.map(librarian => new Librarian(librarian.userId, librarian.userName, librarian.email, librarian.password, librarian.role));
    }
 
    saveUsers() {
        console.log("user saved as", this.allUsers)
        localStorage.setItem('Users', JSON.stringify(this.allUsers));
    }
    saveMembers() {
        console.log("member saved")
        localStorage.setItem('Members', JSON.stringify(this.allMembers));
    }
    saveLibrarians() {
        console.log("librarian saved")
        localStorage.setItem('Librarians', JSON.stringify(this.allLibrarians));
    }
    addUser(user) {
        const existingUser = this.findUserById(user.userId);
        const existingEmail = this.findUserByEmail(user.email);
        if (existingUser || existingEmail) {
            console.log("User already exists");
            return;
        }
        let newUser = new User(user.userId, user.userName, user.email, user.password, user.role);
        this.allUsers.push(newUser);
        this.saveUsers();
        if (user.role === "Member") {
            let membershipId = this.allMembers.length + 1;
            console.log("adding member with id", membershipId);
            let member = new Member(user.userId, user.userName, user.email, user.password, user.role, membershipId);
            this.allMembers.push(member);
            this.saveMembers()
        }
        if (user.role === "Librarian") {
            this.allLibrarians.push(newUser);
            this.saveLibrarians();
        }
    }
          
    editUser(userId, updates) {
        let user = this.findUserById(userId);
        Object.assign(user, updates)
        if (user.membershipId) {
            this.saveMembers();
        }else if (user.role === "Librarian") {
            this.saveLibrarians();
        }
        let newUser = new User(user.userId, user.userName, user.email, user.password, user.role);
        Object.assign(user, newUser);
        this.saveUsers();
    }

    deleteUser(userId) {
        let user = this.findUserById(userId);
        let removedUser = user.userName;
        if (user) {        
            //remove removed user from members
            if (user.role === "Member") {
                this.allMembers = this.allMembers.filter(member => Number(member.userId) !== Number(userId));
                this.saveMembers();
            }
            // remove removed user from librarians
            if (user.role === "Librarian") {
                this.allLibrarians = this.allLibrarians.filter(librarian => Number(librarian.userId) !== Number(userId));
                this.saveLibrarians();
            }
            this.allUsers = this.allUsers.filter(user => Number(user.userId) !== Number(userId));
            this.saveUsers();
            console.log(`"${removedUser}" was removed.`);
        }
    }

    calculateLevenshteinDistance(searchTerm, bookIdentifier) {

        // Levenstein distance algorithm 
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

        return this.allUsers.filter(user => {
            const userName = user.userName.toLowerCase().replace(/[^\w\s]/g, '').trim()
            const email = user.email.toLowerCase().replace(/[^\w\s]/g, '').trim()

            if (!isNaN(query) && Number(query) === Number(user.userId)) {
                return true;
            }
            if (queryWords.some(word =>
                userName.includes(word) ||
                email.includes(word)
            )) {
                return true
            }
            return queryWords.some(word => {
                const names = user.userName.split(/\s+/);  
                const emailparts = user.email.split(/\s+/);

                const nameDistance = Math.min(...names.map(name => this.calculateLevenshteinDistance(word, name)));
                const emailDistance = Math.min(...emailparts.map(emailpart => this.calculateLevenshteinDistance(word, emailpart)));
                
                return nameDistance <= fuzinessness || emailDistance <= fuzinessness;
            });
        });
    }

    findUserById(query) {
        return this.allUsers.find(user => Number(user.userId) === Number(query));
    }

    findUserByEmail(query) {
        return this.allUsers.find(user => user.email === query);
    }

    getUsers() {
        return this.allUsers;
    }

    getMembers() {
        return this.allMembers;
    } 

    getLibrarians() {
        return this.allLibrarians;
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
    constructor(userId, userName, email, password, role, membershipId, borrowedBooks= []){
        super(userId, userName, email, password, role);
        this.membershipId = membershipId;
        this.borrowedBooks = borrowedBooks;
    }
}

class Librarian extends User {
    constructor(userId, userName, email, password, role){
        super(userId, userName, email, password, role);
    }
}
