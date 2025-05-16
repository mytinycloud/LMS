
class User {
    #userId;
    #name;
    #email;
    #password;
    #role;
    constructor(userId, userName, email, password, role, ){
        this.#userId = userId;
        this.#name = userName;
        this.#email = email;
        this.#password = password;
        this.#role = role;
    }
    registerUser(){

    }

    updateUser(){

    }

    removeUser(){

    }
}

class Member extends User {
    #membershipId
    #borrowedBooks
    constructor(membershipId, borrowedBooks, ){
        super(userId, name, email, password, role,);
        this.#membershipId = membershipId;
        this.#borrowedBooks = borrowedBooks;
    }
    borrowBook(){

    }
    returnBook(){

    }
    checkBorrowingStatus(){
        
    }
}

class Libraian extends User {
    constructor(){
        super(userId, name, email, password, role,);
    }
    addBook(){

    }
    updateBook(){

    }
    deleteBook(){
        
    }
    registerUser(){

    }

    updateUser(){

    }

    removeUser(){
        
    }
}
