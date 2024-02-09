// Callbacks
document.addEventListener("DOMContentLoaded", () => {
  const handleClick = (bowl) => {
    document.querySelector("img.detail-image").src = bowl.image;
    document.querySelector("h2.name").textContent = bowl.name;
    document.querySelector("h3.restaurant").textContent = bowl.restaurant;
    document.querySelector("span#rating-display").textContent = bowl.rating;
    document.querySelector("p#comment-display").textContent = bowl.comment;
  };

  const addSubmitListener = () => {
    const ramenForm = document.querySelector("#new-ramen");
    ramenForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let newRamenObj = {
        name: e.target[0].value,
        restaurant: e.target[1].value,
        image: e.target[2].value,
        rating: e.target[3].value,
        comment: e.target[4].value,
      };
      postNewRamen(newRamenObj);
      ramenForm.reset();
    });
  };

  const postNewRamen = (newRamen) => {
    fetch(`http://localhost:3000/ramens`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newRamen),
    })
      .then((res) => res.json())
      .then((newRamenRepsonse) => {
        displayRamens(newRamenRepsonse);
      });
  };
  const displayRamens = (bowl) => {
    const ramenMenu = document.querySelector("#ramen-menu");
    let ramenDiv = document.createElement("div");
    ramenDiv.id = bowl.id;
    let ramenImg = document.createElement("img");
    ramenImg.src = bowl.image;
    let ramenDelete = buildDelete(ramenDiv);
    ramenDiv.append(ramenImg, ramenDelete);
    ramenMenu.append(ramenDiv);
    ramenImg.addEventListener("click", () => {
      handleClick(bowl);
    });
  };

  const buildDelete = (div) => {
    let deleteButton = document.createElement("span");
    deleteButton.textContent = "⨉";
    deleteButton.addEventListener("click", () => {
      // !   Deletions do not post to the db.json with the following
      // !   code commented out; this is so I don't have to recreate
      // !   my json.db for testing. A parenthesis and a bracket need
      // !   to be moved, as well, after uncommenting this.

      // fetch(`http://localhost:3000/ramens/${div.id}`, {
      //   method: "DELETE",
      //   "content-type": "application/json",
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      div.remove();
    });

    return deleteButton;
  };

  const main = () => {
    // Invoke displayRamens here
    // Invoke addSubmitListener here
    fetch(`http://localhost:3000/ramens`)
      .then((res) => res.json())
      .then((bowls) => {
        for (let bowl of bowls) {
          displayRamens(bowl);
        }
        handleClick(bowls[0]);
      });
    addSubmitListener();
  };

  main();
});
// Export functions for testing
// export { displayRamens, addSubmitListener, handleClick, main };
