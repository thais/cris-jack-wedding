const gothicNames = [
    // The Addams Family
    "Wednesday Addams", "Morticia Addams", "Gomez Addams", "Fester Addams", "Pugsley Addams",
    "Lurch", "Cousin Itt", "Grandmama Addams", "Thing T. Thing",
    
    // Classic Gothic Literature
    "Count Dracula", "Frankenstein's Monster", "Victor Frankenstein", "Carmilla Karnstein", "Abraham Van Helsing",
    "Mina Harker", "Count Orlok", "Dr. Henry Jekyll", "Edward Hyde", "Dorian Gray",
    
    // Tim Burton Films
    "Edward Scissorhands", "Jack Skellington", "Sally Finkelstein", "Betelgeuse", "Lydia Deetz",
    "Emily", "Sweeney Todd", "Mrs. Lovett", "Ichabod Crane", "Victor Van Dort",
    
    // The Munsters
    "Herman Munster", "Lily Munster", "Grandpa Munster", "Eddie Munster",
    
    // Stephen King
    "Carrie White", "Pennywise the Dancing Clown", "Regan MacNeil", "Samara Morgan",
    
    // Horror Icons (Film)
    "Norman Bates", "Jason Voorhees", "Freddy Krueger", "Michael Myers", "Charles Lee Ray",
    "Tiffany Valentine", "Damien Thorn", "Elvira, Mistress of the Dark", "Vampira",
    
    // Vampire Chronicles (Anne Rice)
    "Lestat de Lioncourt", "Louis de Pointe du Lac", "Claudia",
    
    // The Crow
    "Eric Draven",
    
    // Coraline
    "Coraline Jones", "The Beldam",
    
    // Teen Titans / DC
    "Rachel Roth",
    
    // Blade (Marvel)
    "Eric Brooks",
    
    // Underworld
    "Selene Corvinus",
    
    // Hotel Transylvania
    "Mavis Dracula",
    
    // Dark Shadows
    "Barnabas Collins",
    
    // Buffy & Angel Series
    "William the Bloody", "Drusilla", "Angelus", "Buffy Summers", "Willow Rosenberg", "Cordelia Chase",
    
    // Sandman (Neil Gaiman)
    "Death of the Endless", "Dream of the Endless", "Morpheus", "Delirium of the Endless", "Desire of the Endless", "Despair of the Endless",
    "Destiny of the Endless", "Destruction of the Endless", "Lucienne", "Johanna Constantine",
    
    // Sabrina Series
    "Lucifer Morningstar", "Sabrina Spellman", "Ambrose Spellman", "Prudence Blackwood", "Zelda Spellman",
    "Hilda Spellman", "Lilith", "Hecate",
    
    // Harry Potter
    "Bellatrix Lestrange", "Severus Snape", "Sirius Black", "Remus Lupin", "Luna Lovegood",
    "Helena Ravenclaw", "The Bloody Baron", "Moaning Myrtle",
    
    // Alice in Wonderland
    "The Mad Hatter",
    
    // Sherlock Holmes Stories
    "Sherlock Holmes", "Professor James Moriarty", "Irene Adler", "Mycroft Holmes", "Mrs. Hudson",
    
    // Edgar Allan Poe Characters
    "Lenore", "Ligeia", "Morella", "Annabel Lee", "Roderick Usher",
    "Madeline Usher", "Montresor", "Fortunato",
    
    // The Phantom of the Opera
    "Erik Destler", "Christine Daaé", "Raoul de Chagny",
    
    // Gothic Musicians (Real People)
    "Nick Cave", "Siouxsie Sioux", "Robert Smith", "Peter Murphy", "Rozz Williams",
    
    // Classic Horror Actors (Real People)
    "Bela Lugosi", "Boris Karloff", "Vincent Price", "Christopher Lee", "Peter Cushing",
    "Lon Chaney", "Max Schreck", "Theda Bara", "Conrad Veidt", "Udo Kier"
];

const idToPseudonym = {
    "1": "Wednesday Addams",
    "2": "Anabel Lee"
};
let nextNameIndex = 0;

function getPseudonymForId(stringId) {
    if (idToPseudonym[stringId]) {
        return idToPseudonym[stringId];
    }
    
    if (nextNameIndex >= gothicNames.length) {
        const baseIndex = nextNameIndex % gothicNames.length;
        const suffix = Math.floor(nextNameIndex / gothicNames.length) + 1;
        const pseudonym = `${gothicNames[baseIndex]} ${suffix}`;
        idToPseudonym[stringId] = pseudonym;
        nextNameIndex++;
        return pseudonym;
    }
    
    const pseudonym = gothicNames[nextNameIndex];
    idToPseudonym[stringId] = pseudonym;
    nextNameIndex++;
    
    return pseudonym;
}

const donations = [];

function addDonation(stringId, amount, currency) {
    const pseudonym = getPseudonymForId(stringId);
    
    const donation = {
        id: stringId,
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
    
    console.log(`Added donation from ID ${stringId} as ${pseudonym}: ${currency} ${amount}`);
    
    return donation;
}

addDonation("1", 150, "EUR");
addDonation("2", 300, "BRL");

