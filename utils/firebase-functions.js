import { collection, getDocs } from "firebase/firestore";
import db from "@/firebase.js"

// Function to load flashcards for a specific user and flashcard set
const loadAllFlashcardSets = async (userId) => {
    try {
      const flashcardSetsRef = collection(db, "users", userId, "flashcardSets");
      const querySnapshot = await getDocs(flashcardSetsRef);
  
      const flashcardSets = querySnapshot.docs.map(doc => ({
        id: doc.id, // Name of the set (e.g., "Logic and Proofs")
        ...doc.data() // Flashcard data (e.g., array of front/back fields)
      }));
      console.log(flashcardSets)
      return flashcardSets;
    } catch (error) {
      console.error("Error fetching flashcard sets:", error);
      return [];
    }
};

export default loadAllFlashcardSets;