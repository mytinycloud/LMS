describe("Borrowing", () => {

    describe("Borrow Book Functionality", () => {
        let bookModel, userModel, borrowModel, catalogueController, catalogueView, user1, book1, mockEvent;

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
            Object.defineProperty(window, "localStorage", { value: localStorageMock });

            bookModel = new CatalogueModel();
            userModel = new UserManagement();
            borrowModel = new RecordsModel();
            catalogueView = new CatalogueView();
            catalogueController = new CatalogueController(bookModel, catalogueView);

            user1 = new User("1","Alice Smith", "alice.smith@example.com", "password123", "member", []);
            book1 = new Book("1", "JavaScript: The Good Parts", "Douglas Crockford", "instructional", "9780596517748", true, "Library", "A book about JavaScript best practices.");

            window.UserModel = userModel;
            window.CatalogueModel = bookModel;
            window.RecordsModel = borrowModel;

            mockEvent = {
                currentTarget: {
                    getAttribute: jasmine.createSpy("getAttributeSpy").and.callFake((attributeName) => {
                        if (attributeName === "data-book-id") {
                            return book1.bookId;
                        }
                        return null;
                    })
                }
            };
        });
    
        it("Should make Borrowed book unavalible", () => {
            bookModel.addBook(book1);
            userModel.addUser(user1); 

            userModel.saveLoggedInUser(user1); // Simulate login
            
            catalogueController.handleBorrowBook(mockEvent);

            //Verify book’s availability
            const borrowedBookFromModel = bookModel.findBookById(book1.bookId);
            expect(borrowedBookFromModel.availability).toBe(false);
        });
        it("Should update the users borrowing status", () => {
            bookModel.addBook(book1);
            userModel.addUser(user1); 

            userModel.saveLoggedInUser(user1); // Simulate login
            
            catalogueController.handleBorrowBook(mockEvent);
            // Get the status of user borrowing 
            const userAfterBorrow = userModel.getLoggedInUser();
            expect(userAfterBorrow.borrowedBooks.length).toBe(1, "Should be 1 borrowed book");
            expect(userAfterBorrow.borrowedBooks[0].bookId).toBe(book1.bookId, "Should be book1s bookid");
            expect(userAfterBorrow.borrowedBooks[0].availability).toBe(false, "The availability should be false.");
        });
    });
    describe("Overdue Notifications Functionality", () => {
        let bookModel, userModel, borrowModel, catalogueController, catalogueView, borrowView, mockEvent, user1, book1;

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
            Object.defineProperty(window, "localStorage", { value: localStorageMock });

            // Mock Notifications element so notification test has somthing to attach to
            mockNotificationElement = document.createElement('div');
            mockNotificationElement.id = 'notifications';
            document.body.appendChild(mockNotificationElement);
            // Initialise Classes 
            bookModel = new CatalogueModel();
            userModel = new UserManagement();
            borrowModel = new RecordsModel();
            catalogueView = new CatalogueView();
            borrowView = new RecordsView();
            catalogueController = new CatalogueController(bookModel, catalogueView);
            // create user and book
            user1 = new User("1","Alice Smith", "alice.smith@example.com", "password123", "member", []);
            book1 = new Book("1", "JavaScript: The Good Parts", "Douglas Crockford", "instructional", "9780596517748", true, "Library", "A book about JavaScript best practices.");

            window.UserModel = userModel;
            window.CatalogueModel = bookModel;
            window.RecordsModel = borrowModel;

            // Mock event to 
            mockEvent = {
                currentTarget: {
                    getAttribute: jasmine.createSpy("getAttributeSpy").and.callFake((attributeName) => {
                        if (attributeName === "data-book-id") {
                            return book1.bookId;
                        }
                        return null;
                    })
                }
            };
        });
        it("Should identify a borrowed book as overdue for notification generation", () => { 
            bookModel.addBook(book1);
            userModel.addUser(user1); 
            userModel.saveLoggedInUser(user1); 

            catalogueController.handleBorrowBook(mockEvent); 

            const records = borrowModel.getCurrentUserRecords();
            expect(records.length).toBe(1, "A borrowing record should have been created.");
            const createdRecord = records[0]; 
            expect(createdRecord.borrowedBook.bookId).toBe(book1.bookId);

            createdRecord.dueDate = new Date(Date.now() - 1);

            const overdueRecords = borrowModel.checkOverdue();
            expect(overdueRecords.length).toBe(1, "should be 1 overdue book"); 
            if (overdueRecords.length > 0) {
                expect(overdueRecords[0].borrowedBook.bookId).toBe(book1.bookId);
                expect(overdueRecords[0].borrower.userId).toBe(user1.userId);
                expect(overdueRecords[0].status).toBe("borrowed");
            };
        });
        it("should create a div notification of the Overdue type if book is overdue", () => {
            bookModel.addBook(book1);
            userModel.addUser(user1); 
            userModel.saveLoggedInUser(user1); 

            catalogueController.handleBorrowBook(mockEvent); 

            const records = borrowModel.getCurrentUserRecords();
            expect(records.length).toBe(1, "A borrowing record should have been created.");
            const createdRecord = records[0]; 
            expect(createdRecord.borrowedBook.bookId).toBe(book1.bookId);
            
            createdRecord.dueDate = new Date(Date.now() - 60 * 1000);
            
            borrowView.updateNotifications(records)
            const notificationDiv = mockNotificationElement.querySelector(".notification-overdue");

            if(notificationDiv){
                expect(notificationDiv.textContent).toContain(book1.title)
                expect(notificationDiv.textContent).toContain("OVERDUE")
            }
        });
        it("should Not create a div notification of the Overdue type if book is not overdue", () => {
            bookModel.addBook(book1);
            userModel.addUser(user1); 
            userModel.saveLoggedInUser(user1); 

            catalogueController.handleBorrowBook(mockEvent); 

            const records = borrowModel.getCurrentUserRecords();
            expect(records.length).toBe(1, "A borrowing record should have been created.");
            const createdRecord = records[0]; 
            expect(createdRecord.borrowedBook.bookId).toBe(book1.bookId);
            
            createdRecord.dueDate = new Date(Date.now() + 60 * 1000);
            
            borrowView.updateNotifications(records)
            const notificationDiv = mockNotificationElement.querySelector(".notification-normal");

            if(notificationDiv){
                expect(notificationDiv.textContent).toContain(book1.title)
                expect(notificationDiv.textContent).toContain("Book Due")
            }
        });
    });
});
