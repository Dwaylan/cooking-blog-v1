import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEZw_aa293GOnZMQy2HKSEoKmGCKVcVY8",
  authDomain: "first-project-a81c0.firebaseapp.com",
  projectId: "first-project-a81c0",
  storageBucket: "first-project-a81c0.firebasestorage.app",
  messagingSenderId: "816395632076",
  appId: "1:816395632076:web:128d0da2548095b57f7169",
  measurementId: "G-WTJY5S17CC",
};

// Initializing app
initializeApp(firebaseConfig);

// Initializing services and database

const db = getFirestore();

// Collection reference
const colRef = collection(db, "recipes");

// real time collection data
onSnapshot(colRef, (snapshot) => {
  let recipes = [];
  snapshot.docs.forEach((recipe) => {
    recipes.push({ ...recipe.data(), id: recipe.id });
  });
  console.log(recipes);
});

// Adding recipes
// Adding a query selector and event listener to the '.add' class
const addRecipe = document.querySelector(".add");
addRecipe.addEventListener("submit", (e) => {
  e.preventDefault();

  // adding recipes via the addDoc method
  addDoc(colRef, {
    title: addRecipe.title.value,
    author: addRecipe.author.value,
    ingredients: addRecipe.ingredients.value,
  })
    // reset the form after submission
    .then(() => {
      addRecipe.reset();
    });
});

// Deleting recipes
const deleteRecipe = document.querySelector(".delete");
deleteRecipe.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "recipes", deleteRecipe.id.value);

  deleteRecipe(docRef).then(() => {
    deleteRecipe.reset();
  });
});
