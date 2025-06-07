const books = [
  new Book(
    "a1b2c3d4e5f6",
    "To Kill a Mockingbird",
    "Harper Lee",
    "Classic Fiction",
    "9780061120084",
    true,
    "Fiction - Shelf A1",
    "A powerful story of racial injustice and loss of innocence in the American South through the eyes of young Scout Finch."
  ),
  new Book(
    "b2c3d4e5f6a1",
    "1984",
    "George Orwell",
    "Dystopian Fiction",
    "9780451524935",
    true,
    "Fiction - Shelf B3",
    "A chilling portrayal of a totalitarian society where government surveillance, propaganda, and mind control rule citizens' lives."
  ),
  new Book(
    "c3d4e5f6a1b2",
    "Pride and Prejudice",
    "Jane Austen",
    "Classic Romance",
    "9780141439518",
    true,
    "Fiction - Shelf A2",
    "The timeless love story of Elizabeth Bennet and Mr. Darcy set against the social constraints of 19th-century England."
  ),
  new Book(
    "d4e5f6a1b2c3",
    "The Great Gatsby",
    "F. Scott Fitzgerald",
    "Classic Fiction",
    "9780743273565",
    false,
    "Fiction - Shelf A1",
    "A tale of wealth, love, and tragedy in the Jazz Age, exploring the American Dream through Jay Gatsby's story."
  ),
  new Book(
    "e5f6a1b2c3d4",
    "The Hobbit",
    "J.R.R. Tolkien",
    "Fantasy",
    "9780547928227",
    true,
    "Fantasy - Shelf D2",
    "The adventure of Bilbo Baggins as he journeys with dwarves to reclaim their treasure from the dragon Smaug."
  ),
  new Book(
    "f6a1b2c3d4e5",
    "The Catcher in the Rye",
    "J.D. Salinger",
    "Coming-of-Age Fiction",
    "9780316769488",
    true,
    "Fiction - Shelf B1",
    "Holden Caulfield's rebellious journey through New York City, dealing with adolescent alienation and identity."
  ),
  new Book(
    "a7b8c9d0e1f2",
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling",
    "Fantasy",
    "9780747532743",
    true,
    "Fantasy - Shelf D1",
    "The beginning of Harry Potter's magical journey at Hogwarts School of Witchcraft and Wizardry."
  ),
  new Book(
    "b8c9d0e1f2a7",
    "The Lord of the Rings",
    "J.R.R. Tolkien",
    "Fantasy",
    "9780618640157",
    true,
    "Fantasy - Shelf D2",
    "Epic fantasy following Frodo Baggins's quest to destroy the One Ring and defeat the Dark Lord Sauron."
  ),
  new Book(
    "c9d0e1f2a7b8",
    "Jane Eyre",
    "Charlotte Brontë",
    "Gothic Fiction",
    "9780141441146",
    true,
    "Fiction - Shelf A2",
    "The story of Jane's growth from an abused orphan to an independent woman who finds love with the brooding Mr. Rochester."
  ),
  new Book(
    "d0e1f2a7b8c9",
    "The Alchemist",
    "Paulo Coelho",
    "Philosophical Fiction",
    "9780062315007",
    false,
    "Fiction - Shelf C3",
    "A shepherd boy's journey to find a treasure near the Egyptian pyramids becomes a quest for self-discovery."
  ),
  new Book(
    "e1f2a7b8c9d0",
    "Brave New World",
    "Aldous Huxley",
    "Dystopian Fiction",
    "9780060850524",
    true,
    "Fiction - Shelf B3",
    "A disturbing vision of a future society where humans are genetically engineered and conditioned for happiness at the cost of freedom."
  ),
  new Book(
    "f2a7b8c9d0e1",
    "Crime and Punishment",
    "Fyodor Dostoevsky",
    "Psychological Fiction",
    "9780143107637",
    true,
    "Fiction - Shelf B2",
    "The psychological journey of Raskolnikov after he commits murder and his path to redemption."
  ),
  new Book(
    "a3b4c5d6e7f8",
    "The Chronicles of Narnia",
    "C.S. Lewis",
    "Fantasy",
    "9780066238500",
    true,
    "Fantasy - Shelf D1",
    "A series of adventures in the magical land of Narnia, where animals talk and battles between good and evil unfold."
  ),
  new Book(
    "b4c5d6e7f8a3",
    "One Hundred Years of Solitude",
    "Gabriel García Márquez",
    "Magical Realism",
    "9780060883287",
    true,
    "Fiction - Shelf C2",
    "The multi-generational story of the Buendía family in the fictional town of Macondo."
  ),
  new Book(
    "c5d6e7f8a3b4",
    "Wuthering Heights",
    "Emily Brontë",
    "Gothic Fiction",
    "9780141439556",
    true,
    "Fiction - Shelf A2",
    "The passionate and destructive love between Heathcliff and Catherine Earnshaw on the Yorkshire moors."
  ),
  new Book(
    "d6e7f8a3b4c5",
    "The Divine Comedy",
    "Dante Alighieri",
    "Epic Poetry",
    "9780142437223",
    true,
    "Poetry - Shelf E1",
    "Dante's journey through Hell, Purgatory, and Paradise, exploring themes of sin, redemption, and divine love."
  ),
  new Book(
    "e7f8a3b4c5d6",
    "Don Quixote",
    "Miguel de Cervantes",
    "Satire",
    "9780142437230",
    true,
    "Fiction - Shelf A1",
    "The adventures of an aging nobleman who becomes a knight-errant after reading too many chivalric romances."
  ),
  new Book(
    "f8a3b4c5d6e7",
    "The Odyssey",
    "Homer",
    "Epic Poetry",
    "9780140268867",
    true,
    "Poetry - Shelf E1",
    "Odysseus's ten-year journey home after the Trojan War, facing mythical creatures and divine challenges."
  ),
  new Book(
    "a9b0c1d2e3f4",
    "Fahrenheit 451",
    "Ray Bradbury",
    "Dystopian Fiction",
    "9781451673319",
    true,
    "Fiction - Shelf B3",
    "A future society where books are banned and 'firemen' burn any found, until one begins to question everything."
  ),
  new Book(
    "b0c1d2e3f4a9",
    "The Brothers Karamazov",
    "Fyodor Dostoevsky",
    "Philosophical Fiction",
    "9780374528379",
    true,
    "Fiction - Shelf B2",
    "A passionate philosophical novel that enters deeply into questions of God, free will, and morality."
  ),
  new Book(
    "c1d2e3f4a9b0",
    "Moby-Dick",
    "Herman Melville",
    "Adventure Fiction",
    "9780142437247",
    true,
    "Fiction - Shelf A1",
    "Captain Ahab's obsessive quest for the white whale, exploring themes of vengeance, nature, and madness."
  ),
  new Book(
    "d2e3f4a9b0c1",
    "The Picture of Dorian Gray",
    "Oscar Wilde",
    "Gothic Fiction",
    "9780141439570",
    false,
    "Fiction - Shelf B1",
    "A man remains young while his portrait ages, revealing the corruption of his soul through his immoral actions."
  ),
  new Book(
    "e3f4a9b0c1d2",
    "War and Peace",
    "Leo Tolstoy",
    "Historical Fiction",
    "9781400079988",
    true,
    "Fiction - Shelf A3",
    "An epic depicting Russian society during the Napoleonic Era through the interconnected stories of five families."
  ),
  new Book(
    "f4a9b0c1d2e3",
    "The Hunger Games",
    "Suzanne Collins",
    "Dystopian Fiction",
    "9780439023481",
    true,
    "Fiction - Shelf C1",
    "In a dystopian future, teenagers are forced to fight to the death in an annual televised event."
  ),
  new Book(
    "a5b6c7d8e9f0",
    "The Kite Runner",
    "Khaled Hosseini",
    "Historical Fiction",
    "9781594631931",
    true,
    "Fiction - Shelf C3",
    "A story of friendship, betrayal, and redemption set against the backdrop of Afghanistan's tumultuous history."
  ),
  new Book(
    "b6c7d8e9f0a5",
    "Anna Karenina",
    "Leo Tolstoy",
    "Tragedy",
    "9780143035008",
    true,
    "Fiction - Shelf A3",
    "A complex exploration of love, marriage, and society through the experiences of Anna and other characters in 19th-century Russia."
  ),
  new Book(
    "c7d8e9f0a5b6",
    "A Tale of Two Cities",
    "Charles Dickens",
    "Historical Fiction",
    "9780141439600",
    true,
    "Fiction - Shelf A1",
    "Set in London and Paris before and during the French Revolution, exploring themes of resurrection and sacrifice."
  ),
  new Book(
    "d8e9f0a5b6c7",
    "The Iliad",
    "Homer",
    "Epic Poetry",
    "9780140275360",
    true,
    "Poetry - Shelf E1",
    "The story of the Trojan War and the rage of Achilles against King Agamemnon."
  ),
  new Book(
    "e9f0a5b6c7d8",
    "The Handmaid's Tale",
    "Margaret Atwood",
    "Dystopian Fiction",
    "9780385490818",
    true,
    "Fiction - Shelf B3",
    "In the Republic of Gilead, Offred is valued only for her fertility in this chilling dystopian vision."
  ),
  new Book(
    "f0a5b6c7d8e9",
    "Frankenstein",
    "Mary Shelley",
    "Gothic Fiction",
    "9780141439471",
    true,
    "Fiction - Shelf B1",
    "The story of Victor Frankenstein and his creation, exploring themes of ambition, responsibility, and what it means to be human."
  ),
  new Book(
    "1a2b3c4d5e6f",
    "The Count of Monte Cristo",
    "Alexandre Dumas",
    "Adventure Fiction",
    "9780140449266",
    true,
    "Fiction - Shelf A3",
    "Edmond Dantès's elaborate revenge plot against those who betrayed him, after escaping from prison."
  ),
  new Book(
    "2b3c4d5e6f1a",
    "The Grapes of Wrath",
    "John Steinbeck",
    "Historical Fiction",
    "9780143039433",
    true,
    "Fiction - Shelf A3",
    "The Joad family's struggle to survive during the Great Depression and Dust Bowl era."
  ),
  new Book(
    "3c4d5e6f1a2b",
    "Dracula",
    "Bram Stoker",
    "Gothic Horror",
    "9780141439846",
    true,
    "Horror - Shelf F1",
    "The classic vampire tale told through letters and journal entries as Count Dracula attempts to move from Transylvania to England."
  ),
  new Book(
    "4d5e6f1a2b3c",
    "Les Misérables",
    "Victor Hugo",
    "Historical Fiction",
    "9780451419439",
    true,
    "Fiction - Shelf A3",
    "The epic story of ex-convict Jean Valjean and his pursuit of redemption in post-revolutionary France."
  ),
  new Book(
    "5e6f1a2b3c4d",
    "The Wind in the Willows",
    "Kenneth Grahame",
    "Children's Literature",
    "9780143039099",
    true,
    "Children - Shelf G1",
    "The adventures of anthropomorphic animals Mole, Rat, Toad, and Badger along the river and Wild Wood."
  ),
  new Book(
    "6f1a2b3c4d5e",
    "Gone with the Wind",
    "Margaret Mitchell",
    "Historical Fiction",
    "9781451635621",
    false,
    "Fiction - Shelf A3",
    "Scarlett O'Hara's life journey through the American Civil War and Reconstruction period."
  ),
  new Book(
    "7g8h9i0j1k2l",
    "The Color Purple",
    "Alice Walker",
    "Literary Fiction",
    "9780156028356",
    true,
    "Fiction - Shelf C3",
    "Celie's journey from abuse to independence and self-discovery in the early 20th-century American South."
  ),
  new Book(
    "8h9i0j1k2l7g",
    "The Old Man and the Sea",
    "Ernest Hemingway",
    "Literary Fiction",
    "9780684801223",
    true,
    "Fiction - Shelf B2",
    "An aging Cuban fisherman's epic battle with a giant marlin far out at sea."
  ),
  new Book(
    "9i0j1k2l7g8h",
    "A Clockwork Orange",
    "Anthony Burgess",
    "Dystopian Fiction",
    "9780393312836",
    true,
    "Fiction - Shelf B3",
    "A disturbing exploration of free will and psychological conditioning through the violent exploits of Alex and his droogs."
  ),
  new Book(
    "0j1k2l7g8h9i",
    "The Bell Jar",
    "Sylvia Plath",
    "Semi-Autobiographical",
    "9780060837020",
    true,
    "Fiction - Shelf C3",
    "Esther Greenwood's descent into mental illness paralleling Plath's own experiences."
  ),
  new Book(
    "1k2l7g8h9i0j",
    "Catch-22",
    "Joseph Heller",
    "Satirical Fiction",
    "9781451626650",
    true,
    "Fiction - Shelf B2",
    "A satirical critique of military bureaucracy and the absurdity of war through the experiences of Captain John Yossarian."
  ),
  new Book(
    "2l7g8h9i0j1k",
    "Great Expectations",
    "Charles Dickens",
    "Bildungsroman",
    "9780141439563",
    true,
    "Fiction - Shelf A1",
    "Pip's journey from a humble blacksmith's apprentice to a gentleman through a mysterious benefactor."
  ),
  new Book(
    "3m4n5o6p7q8r",
    "The Road",
    "Cormac McCarthy",
    "Post-Apocalyptic Fiction",
    "9780307387899",
    true,
    "Fiction - Shelf C1",
    "A father and son's journey through a devastated America, clinging to hope and humanity."
  ),
  new Book(
    "4n5o6p7q8r3m",
    "Slaughterhouse-Five",
    "Kurt Vonnegut",
    "Science Fiction",
    "9780385333849",
    true,
    "Science Fiction - Shelf F2",
    "Billy Pilgrim's experiences in World War II and his abduction by aliens from Tralfamadore."
  ),
  new Book(
    "5o6p7q8r3m4n",
    "The Secret Garden",
    "Frances Hodgson Burnett",
    "Children's Literature",
    "9780142437056",
    true,
    "Children - Shelf G1",
    "Mary Lennox discovers a locked garden and helps her sickly cousin Colin heal through nature."
  ),
  new Book(
    "6p7q8r3m4n5o",
    "The Scarlet Letter",
    "Nathaniel Hawthorne",
    "Historical Fiction",
    "9780142437261",
    true,
    "Fiction - Shelf A1",
    "Hester Prynne's public shame and private redemption in Puritan New England."
  ),
  new Book(
    "7q8r3m4n5o6p",
    "Beloved",
    "Toni Morrison",
    "Historical Fiction",
    "9781400033416",
    true,
    "Fiction - Shelf C3",
    "The ghost of Sethe's daughter returns to haunt her, exploring the psychological effects of slavery."
  ),
  new Book(
    "8r3m4n5o6p7q",
    "The Stranger",
    "Albert Camus",
    "Existentialist Fiction",
    "9780679720201",
    true,
    "Fiction - Shelf B2",
    "Meursault's indifference to his mother's death leads to his own moral and legal judgment."
  ),
  new Book(
    "9s0t1u2v3w4x",
    "Alice's Adventures in Wonderland",
    "Lewis Carroll",
    "Children's Literature",
    "9780141439761",
    true,
    "Children - Shelf G1",
    "Alice falls down a rabbit hole into a fantasy world populated by peculiar creatures."
  ),
  new Book(
    "0t1u2v3w4x9s",
    "Lord of the Flies",
    "William Golding",
    "Allegorical Fiction",
    "9780399501487",
    true,
    "Fiction - Shelf B1",
    "A group of schoolboys stranded on an uninhabited island descend into savagery."
  ),
  new Book(
    "1u2v3w4x9s0t",
    "Dune",
    "Frank Herbert",
    "Science Fiction",
    "9780441172719",
    true,
    "Science Fiction - Shelf F2",
    "The desert planet Arrakis is the center of power struggles in an interstellar feudal society."
  ),
  new Book(
    "2v3w4x9s0t1u",
    "The Road Less Traveled",
    "M. Scott Peck",
    "Self-Help",
    "9780743243155",
    true,
    "Non-Fiction - Shelf H2",
    "A guide to spiritual growth through discipline, love, religion, and grace."
  ),
  new Book(
    "3w4x9s0t1u2v",
    "The Name of the Rose",
    "Umberto Eco",
    "Historical Mystery",
    "9780156001311",
    true,
    "Mystery - Shelf F3",
    "A murder mystery set in a 14th-century Italian monastery, blending literary theory, biblical analysis, and medieval history."
  ),
  new Book(
    "4x9s0t1u2v3w",
    "Things Fall Apart",
    "Chinua Achebe",
    "Historical Fiction",
    "9780385474542",
    true,
    "Fiction - Shelf C3",
    "The story of Okonkwo and the influence of British colonialism on traditional Igbo society."
  ),
  new Book(
    "5y6z7a8b9c0d",
    "The Outsiders",
    "S.E. Hinton",
    "Young Adult Fiction",
    "9780140385724",
    true,
    "Young Adult - Shelf G2",
    "The conflict between two rival gangs, the Greasers and the Socs, told from the perspective of Ponyboy Curtis."
  ),
  new Book(
    "6z7a8b9c0d5y",
    "Sapiens: A Brief History of Humankind",
    "Yuval Noah Harari",
    "Non-Fiction",
    "9780062316097",
    true,
    "Non-Fiction - Shelf H1",
    "A survey of the history of humankind from the evolution of Homo sapiens to the present."
  ),
  new Book(
    "7a8b9c0d5y6z",
    "The Little Prince",
    "Antoine de Saint-Exupéry",
    "Children's Literature",
    "9780156012195",
    true,
    "Children - Shelf G1",
    "A poetic tale of a young prince who visits various planets, addressing themes of loneliness and friendship."
  ),
  new Book(
    "8b9c0d5y6z7a",
    "The Metamorphosis",
    "Franz Kafka",
    "Absurdist Fiction",
    "9780553213690",
    true,
    "Fiction - Shelf B2",
    "Gregor Samsa wakes one morning to find himself transformed into a giant insect."
  ),
  new Book(
    "9c0d5y6z7a8b",
    "Hamlet",
    "William Shakespeare",
    "Tragedy",
    "9780743477123",
    true,
    "Drama - Shelf E2",
    "The tragic story of the Prince of Denmark and his quest for revenge against his uncle."
  ),
  new Book(
    "0d5y6z7a8b9c",
    "A Brief History of Time",
    "Stephen Hawking",
    "Science",
    "9780553380163",
    false,
    "Non-Fiction - Shelf H3",
    "An exploration of cosmology, including the Big Bang, black holes, and the nature of time."
  ),
  new Book(
    "1e2f3g4h5i6j",
    "The Art of War",
    "Sun Tzu",
    "Military Strategy",
    "9780140455526",
    true,
    "Non-Fiction - Shelf H1",
    "Ancient Chinese text on military strategy and tactics that has influenced Eastern and Western philosophy."
  ),
  new Book(
    "2f3g4h5i6j1e",
    "The Martian",
    "Andy Weir",
    "Science Fiction",
    "9780553418026",
    true,
    "Science Fiction - Shelf F2",
    "An astronaut's fight for survival after being left behind on Mars."
  ),
  new Book(
    "3g4h5i6j1e2f",
    "The Shining",
    "Stephen King",
    "Horror",
    "9780307743657",
    true,
    "Horror - Shelf F1",
    "Jack Torrance's descent into madness while serving as winter caretaker at the isolated Overlook Hotel."
  ),
  new Book(
    "4h5i6j1e2f3g",
    "The Diary of a Young Girl",
    "Anne Frank",
    "Autobiography",
    "9780553577129",
    true,
    "Non-Fiction - Shelf H2",
    "Anne Frank's writings while in hiding during the Nazi occupation of the Netherlands."
  ),
  new Book(
    "5i6j1e2f3g4h",
    "Macbeth",
    "William Shakespeare",
    "Tragedy",
    "9780743477109",
    true,
    "Drama - Shelf E2",
    "A Scottish general's murderous path to the throne, spurred by ambition and supernatural prophecies."
  ),
  new Book(
    "6j1e2f3g4h5i",
    "The Giver",
    "Lois Lowry",
    "Dystopian Fiction",
    "9780544336261",
    true,
    "Young Adult - Shelf G2",
    "Jonas lives in a seemingly ideal world of conformity until he is given his life assignment as the Receiver of Memory."
  ),
  new Book(
    "7k8l9m0n1o2p",
    "The Republic",
    "Plato",
    "Philosophy",
    "9780872201361",
    true,
    "Non-Fiction - Shelf H1",
    "Plato's exploration of justice, order, and character through discussions led by Socrates."
  ),
  new Book(
    "8l9m0n1o2p7k",
    "The Call of the Wild",
    "Jack London",
    "Adventure Fiction",
    "9780141321059",
    true,
    "Fiction - Shelf A3",
    "Buck, a domesticated dog, is stolen and sold into service as a sled dog during the Klondike Gold Rush."
  ),
  new Book(
    "9m0n1o2p7k8l",
    "The Odyssey",
    "Homer (translated by Emily Wilson)",
    "Epic Poetry",
    "9780393356250",
    true,
    "Poetry - Shelf E1",
    "A modern translation of Odysseus's journey home from the Trojan War."
  ),
  new Book(
    "0n1o2p7k8l9m",
    "The Three Musketeers",
    "Alexandre Dumas",
    "Historical Adventure",
    "9780140449266",
    true,
    "Fiction - Shelf A3",
    "D'Artagnan joins the three musketeers in defending the queen against the schemes of Cardinal Richelieu."
  ),
  new Book(
    "1o2p7k8l9m0n",
    "The Fault in Our Stars",
    "John Green",
    "Young Adult Fiction",
    "9780142424179",
    true,
    "Young Adult - Shelf G2",
    "Hazel Grace Lancaster and Augustus Waters, two teens with cancer, fall in love after meeting at a support group."
  ),
  new Book(
    "2p7k8l9m0n1o",
    "The Origin of Species",
    "Charles Darwin",
    "Science",
    "9780451529060",
    true,
    "Non-Fiction - Shelf H3",
    "Darwin's groundbreaking work on evolutionary biology and natural selection."
  ),
  new Book(
    "3q4r5s6t7u8v",
    "Romeo and Juliet",
    "William Shakespeare",
    "Tragedy",
    "9780743477116",
    true,
    "Drama - Shelf E2",
    "The tragic love story of two young lovers from feuding families."
  ),
  new Book(
    "4r5s6t7u8v3q",
    "The Girl with the Dragon Tattoo",
    "Stieg Larsson",
    "Mystery Thriller",
    "9780307454546",
    true,
    "Mystery - Shelf F3",
    "Journalist Mikael Blomkvist and hacker Lisbeth Salander investigate a wealthy family's dark secrets."
  ),
  new Book(
    "5s6t7u8v3q4r",
    "Thinking, Fast and Slow",
    "Daniel Kahneman",
    "Psychology",
    "9780374533557",
    true,
    "Non-Fiction - Shelf H2",
    "An exploration of the two systems that drive the way we think: fast, intuitive thinking and slow, rational thinking."
  ),
  new Book(
    "6t7u8v3q4r5s",
    "The Canterbury Tales",
    "Geoffrey Chaucer",
    "Poetry",
    "9780140424386",
    true,
    "Poetry - Shelf E1",
    "A collection of stories told by pilgrims on their way to Canterbury Cathedral."
  ),
  new Book(
    "7u8v3q4r5s6t",
    "The Importance of Being Earnest",
    "Oscar Wilde",
    "Comedy",
    "9780486264783",
    true,
    "Drama - Shelf E2",
    "A farcical comedy in which the protagonists maintain fictitious personas to escape social obligations."
  ),
  new Book(
    "8v3q4r5s6t7u",
    "The Time Machine",
    "H.G. Wells",
    "Science Fiction",
    "9780141439976",
    true,
    "Science Fiction - Shelf F2",
    "A scientist travels far into the future and discovers the divided descendants of humanity."
  ),
  new Book(
    "9w0x1y2z3a4b",
    "Educated",
    "Tara Westover",
    "Memoir",
    "9780399590504",
    true,
    "Non-Fiction - Shelf H2",
    "Westover's journey from her isolated upbringing in the mountains of Idaho to earning a PhD from Cambridge University."
  ),
  new Book(
    "0x1y2z3a4b9w",
    "Norwegian Wood",
    "Haruki Murakami",
    "Literary Fiction",
    "9780375704024",
    true,
    "Fiction - Shelf C2",
    "Toru Watanabe's nostalgic story of his college years in Tokyo and his relationships with two very different women."
  ),
  new Book(
    "1y2z3a4b9w0x",
    "The Tempest",
    "William Shakespeare",
    "Comedy/Romance",
    "9780743482837",
    true,
    "Drama - Shelf E2",
    "Prospero uses magic to conjure a storm and torment the survivors of a shipwreck, including the King of Naples."
  ),
  new Book(
    "2z3a4b9w0x1y",
    "A Game of Thrones",
    "George R.R. Martin",
    "Fantasy",
    "9780553593716",
    true,
    "Fantasy - Shelf D2",
    "The first book in the A Song of Ice and Fire series, featuring noble families fighting for control of the Seven Kingdoms."
  ),
  new Book(
    "3a4b9w0x1y2z",
    "The Unbearable Lightness of Being",
    "Milan Kundera",
    "Philosophical Fiction",
    "9780571135394",
    true,
    "Fiction - Shelf C2",
    "The lives of artists and intellectuals in Prague during the 1968 Soviet invasion of Czechoslovakia."
  ),
  new Book(
    "4b9w0x1y2z3a",
    "Meditations",
    "Marcus Aurelius",
    "Philosophy",
    "9780140449334",
    true,
    "Non-Fiction - Shelf H1",
    "Personal writings of the Roman Emperor Marcus Aurelius on Stoic philosophy."
  ),
  new Book(
    "5c6d7e8f9g0h",
    "The Jungle",
    "Upton Sinclair",
    "Political Fiction",
    "9780140390315",
    true,
    "Fiction - Shelf B1",
    "The harsh conditions and exploitation faced by immigrants in the U.S. meatpacking industry."
  ),
  new Book(
    "6d7e8f9g0h5c",
    "Animal Farm",
    "George Orwell",
    "Political Satire",
    "9780451526342",
    true,
    "Fiction - Shelf B3",
    "An allegorical novella reflecting events leading up to the Russian Revolution and the Stalinist era."
  ),
  new Book(
    "7e8f9g0h5c6d",
    "The Curious Incident of the Dog in the Night-Time",
    "Mark Haddon",
    "Mystery",
    "9781400032716",
    true,
    "Mystery - Shelf F3",
    "Christopher, a teenager with autism, investigates the death of a neighbor's dog."
  ),
  new Book(
    "8f9g0h5c6d7e",
    "Foundation",
    "Isaac Asimov",
    "Science Fiction",
    "9780553293357",
    true,
    "Science Fiction - Shelf F2",
    "The first novel in Asimov's Foundation series about the decline and rebirth of a galactic empire."
  ),
  new Book(
    "9g0h5c6d7e8f",
    "Heart of Darkness",
    "Joseph Conrad",
    "Novella",
    "9780141441672",
    true,
    "Fiction - Shelf B1",
    "Marlow's journey up the Congo River and his encounter with the enigmatic Kurtz."
  ),
  new Book(
    "0h5c6d7e8f9g",
    "The God of Small Things",
    "Arundhati Roy",
    "Literary Fiction",
    "9780679457312",
    true,
    "Fiction - Shelf C2",
    "The childhood experiences of fraternal twins whose lives are destroyed by the 'Love Laws'."
  ),
  new Book(
    "1i2j3k4l5m6n",
    "Murder on the Orient Express",
    "Agatha Christie",
    "Mystery",
    "9780062073501",
    false,
    "Mystery - Shelf F3",
    "Detective Hercule Poirot investigates a murder on the famous Orient Express train."
  ),
  new Book(
    "2j3k4l5m6n1i",
    "The Prince",
    "Niccolò Machiavelli",
    "Political Philosophy",
    "9780140449150",
    true,
    "Non-Fiction - Shelf H1",
    "A 16th-century political treatise addressing how to acquire and maintain political power."
  ),
  new Book(
    "3k4l5m6n1i2j",
    "The Hitchhiker's Guide to the Galaxy",
    "Douglas Adams",
    "Science Fiction Comedy",
    "9780345391803",
    true,
    "Science Fiction - Shelf F2",
    "Arthur Dent's space adventures after Earth is demolished to make way for a hyperspace bypass."
  ),
  new Book(
    "4l5m6n1i2j3k",
    "Siddhartha",
    "Hermann Hesse",
    "Philosophical Fiction",
    "9780142437186",
    true,
    "Fiction - Shelf C2",
    "A spiritual journey of self-discovery during the time of the Gautama Buddha."
  ),
  new Book(
    "5m6n1i2j3k4l",
    "The Remains of the Day",
    "Kazuo Ishiguro",
    "Historical Fiction",
    "9780679731726",
    true,
    "Fiction - Shelf C3",
    "Stevens, an English butler, reflects on his life and service during a road trip through the countryside."
  )
];

// Prepopulate Books
let localbooks = localStorage.getItem('library_books')
if (!localbooks) {
  console.log("books not loaded")
  localStorage.setItem('library_books', JSON.stringify(books));
  console.log("books loaded to local storage")
}