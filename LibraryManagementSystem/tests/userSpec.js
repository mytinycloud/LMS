describe("UserModel.js", () => {
    
    describe("User Class", () => {
        let user1;

        beforeEach(() => {
            user1 = new User('1','Alice Smith', 'alice.smith@example.com', "password123", "member");
        });

        it("should create a user with userName, email, password, and role", () => {
                expect(user1.userName).toBe('Alice Smith');
                expect(user1.email).toBe('alice.smith@example.com');
        });
    });
    describe("User Registration Functionality ", () => {
        let model, user1, user2, user3;

        // Mocking localStorage before each test
        beforeEach(() => {
            // Mock localStorage with an empty object
            const localStorageMock = (() => {
                let store = {};
                return {
                    getItem(key) {
                        return store[key] || null;
                    },
                    setItem(key, value) {
                        store[key] = value.toString();
                    },
                    clear() {
                        store = {};
                    },
                    removeItem(key) {
                        delete store[key];
                    }
                };
            })();
            Object.defineProperty(window, 'localStorage', { value: localStorageMock });

            model = new UserManagement();
            user1 = new User('1','Alice Smith', 'alice.smith@example.com', "password123", "member");
            user2 = new User('2','Bob Johnson', 'bobj@example.com', "password456", "librarian" );
            user3 = new User('3','Charlie Brown', 'alice.smith@example.com', "password789", "member" );
        });
        it("Should add a user with userName, email, password, and role", () => {
            model.addUser(user1);
            expect(model.allUsers[0].userName).toBe('Alice Smith');
            expect(model.allUsers[0].email).toBe('alice.smith@example.com');
            expect(model.allUsers[0].password).toBe('password123');
            expect(model.allUsers[0].role).toBe('member');
        });
        it("Should add a user to the allUsers array", () => {
            model.addUser(user1);
            expect(model.allUsers.length).toBe(1);
            expect(model.allUsers[0].userName).toBe('Alice Smith');
        });
        it("Should not add a user with an existing email", () => {
            model.addUser(user1);
            model.addUser(user3); // Attempt to add a user with the same email
            expect(model.allUsers.length).toBe(1);
        });
    });
})