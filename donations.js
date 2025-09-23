const gothicNames = [
    "Dracula", "Carmilla", "Dorian Gray", "Victor Frankenstein", "The Raven",
    "Lenore", "Ligeia", "Morella", "Annabel Lee", "Roderick Usher",
    "Madeline Usher", "Emily Grierson", "Heathcliff", "Catherine Earnshaw",
    "Edward Rochester", "Bertha Mason", "Count Orlok", "Mina Harker",
    "Jonathan Harker", "Van Helsing", "Lucy Westenra", "Renfield",
    "Elizabeth Lavenza", "The Creature", "Dr. Jekyll", "Mr. Hyde",
    "Sweeney Todd", "Mrs. Lovett", "Erik (Phantom)", "Christine Daaé",
    "Raoul de Chagny", "Quasimodo", "Esmeralda", "Claude Frollo",
    "Rebecca de Winter", "Mrs. Danvers", "Maxim de Winter", "The Woman in Black",
    "Arthur Kipps", "Jennet Humfrye", "Norman Bates", "Carrie White",
    "Jack Torrance", "Danny Torrance", "Pennywise", "Regan MacNeil",
    "Father Merrin", "Damien Thorn", "Rosemary Woodhouse", "Guy Woodhouse",
    "Morticia Addams", "Gomez Addams", "Wednesday Addams", "Pugsley Addams",
    "Uncle Fester", "Lurch", "Thing", "Cousin Itt", "Herman Munster",
    "Lily Munster", "Eddie Munster", "Grandpa Munster", "Marilyn Munster",
    "Elvira", "Vampira", "Lydia Deetz", "Beetlejuice", "Edward Scissorhands",
    "Sally (Nightmare)", "Jack Skellington", "Oogie Boogie", "Dr. Finkelstein",
    "Emily (Corpse Bride)", "Victor Van Dort", "Victoria Everglot", "Lord Barkis",
    "Coraline Jones", "Other Mother", "Other Father", "Wybie Lovat",
    "Miss Spink", "Miss Forcible", "Mr. Bobinsky", "The Cat",
    "Norman Babcock", "Aggie Prenderghast", "Neil Downe", "Courtney Babcock",
    "Winnie Portley-Rind", "Eggs Trubshaw", "Fish", "Wheels", "Bucket"
];

let usedNames = [];

function getRandomGothicName() {
    const availableNames = gothicNames.filter(name => !usedNames.includes(name));
    
    if (availableNames.length === 0) {
        usedNames = [];
        return getRandomGothicName();
    }
    
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const selectedName = availableNames[randomIndex];
    usedNames.push(selectedName);
    
    return selectedName;
}

const donations = [
    /*
    {
        pseudonym: "Dracula",
        amount: 100.00,
        currency: "EUR",
        date: "2024-01-15"
    },
    {
        pseudonym: "Morticia Addams",
        amount: 500.00,
        currency: "BRL",
        date: "2024-01-16"
    },
    {
        pseudonym: "Jack Skellington",
        amount: 75.00,
        currency: "EUR",
        date: "2024-01-17"
    }
    */
];

function addDonation(realName, amount, currency) {
    const pseudonym = getRandomGothicName();
    const donation = {
        realName: realName,
        pseudonym: pseudonym,
        amount: amount,
        currency: currency,
        date: new Date().toISOString().split('T')[0]
    };
    
    donations.push(donation);
    
    if (typeof updateDonationDisplay === 'function') {
        updateDonationDisplay();
    }
    if (typeof displayDonors === 'function') {
        displayDonors();
    }
    
    console.log(`Added donation from ${realName} as ${pseudonym}: ${currency} ${amount}`);
    
    return donation;
}

// addDonation("John Doe", 100, "EUR");
// addDonation("Maria Silva", 500, "BRL");
// addDonation("Peter Schmidt", 150, "EUR");
// addDonation("Ana Costa", 300, "BRL");
// addDonation("Michael Brown", 200, "EUR");
// addDonation("Juliana Santos", 750, "BRL");

