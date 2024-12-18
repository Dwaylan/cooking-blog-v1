console.log("now connected");

db.collection("recipes")
  .get()
  .then((snapshot) => {
    // When we have the data
    console.log(snapshot);
  })
  .catch((err) => {
    console.log(err);
  });
