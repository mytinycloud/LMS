const users = [
  new User(
    "b2d9e0f1",
    "Alex Smith",
    "alex.smith@example.com",
    "password123",
    "Member",
    []
  ),
  new User(
    "c3a0b1c2",
    "Maria Garcia",
    "maria.g@example.com",
    "securepass",
    "Member",
    []
  ),
  new User(
    "d4e1f2a3",
    "James Brown",
    "j.brown@example.net",
    "anotherpass",
    "Librarian",
    []
  ),
  new User(
    "e5f2a3b4",
    "Linda Jones",
    "linda.j@example.org",
    "userpass5",
    "Member",
    []
  ),
  new User(
    "f6a3b4c5",
    "Robert Wilson",
    "r.wilson@example.com",
    "mysecretpass",
    "Member",
    []
  ),
  new User(
    "g7b4c5d6",
    "Patricia Miller",
    "patricia.m@example.com",
    "miller_pw",
    "Member",
    []
  ),
  new User(
    "h8c5d6e7",
    "Michael Davis",
    "michael.d@example.org",
    "davispass",
    "Librarian",
    []
  ),
  new User(
    "i9d6e7f8",
    "Barbara Rodriguez",
    "barbara.r@example.net",
    "rodriguezpw",
    "Member",
    []
  ),
  new User(
    "j0e7f8g9",
    "William Martinez",
    "william.m@example.com",
    "martinez_w",
    "Member",
    []
  ),
  new User(
    "k1f8g9h0",
    "Elizabeth Hernandez",
    "elizabeth.h@example.com",
    "hernandez_e",
    "Member",
    []
  ),
  new User(
    "l2g9h0i1",
    "David Lopez",
    "david.l@example.org",
    "lopezdavid",
    "Member",
    []
  ),
  new User(
    "m3h0i1j2",
    "Jennifer Gonzalez",
    "jennifer.g@example.net",
    "gonzalez_j",
    "Librarian",
    []
  ),
  new User(
    "n4i1j2k3",
    "Richard Perez",
    "richard.p@example.com",
    "perezrich",
    "Member",
    []
  ),
  new User(
    "o5j2k3l4",
    "Susan Sanchez",
    "susan.s@example.com",
    "sanchez99",
    "Member",
    []
  ),
  new User(
    "afc789c9",
    "Hadley Clark",
    "Hadley@email.com",
    "anflina",
    "Member",
    []
  ),
  new User(
    "p6k3l4m5",
    "Joseph Torres",
    "joseph.t@example.org",
    "torrespass",
    "Member",
    []
  ),
  new User(
    "q7l4m5n6",
    "Jessica Ramirez",
    "jessica.r@example.net",
    "ramirez_j",
    "Member",
    []
  ),
  new User(
    "r8m5n6o7",
    "Charles Flores",
    "charles.f@example.com",
    "flores123",
    "Librarian",
    []
  ),
  new User(
    "s9n6o7p8",
    "Karen Rivera",
    "karen.r@example.com",
    "riverakaren",
    "Member",
    []
  ),
  new User(
    "t0o7p8q9",
    "Thomas Gomez",
    "thomas.g@example.org",
    "gomezpass",
    "Member",
    []
  ),
  new User(
    "5184477c",
    "af",
    "af@failjl.co",
    "af",
    "Member",
    []
  ),
];

function initLoadUsers() { 
  localStorage.setItem('users', JSON.stringify(users));
}