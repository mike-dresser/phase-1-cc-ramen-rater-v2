const ramenMenu = document.querySelector("#ramen-menu");

// Callbacks
const handleClick = (bowl) => {
  let ramenImg = document.querySelector(".detail-image");
  ramenImg.src = bowl.image;
  let ramenName = document.querySelector(".name");
  ramenName.textContent = bowl.name;
  let ramenRestaurant = document.querySelector(".restaurant");
  ramenRestaurant.textContent = bowl.restaurant;
  let ramenRating = document.querySelector("#rating-display");
  ramenRating.textContent = bowl.rating;
  let ramenComment = document.querySelector("#comment-display");
  ramenComment.textContent = bowl.comment;
};

const addSubmitListener = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    let newRamenObj = {
      name: e.target[0].value,
      restaurant: e.target[1].value,
      image: e.target[2].value,
      rating: e.target[3].value,
      comment: e.target[4].value,
    };
    displayRamens(newRamenObj);
  });
};

const fetchRamen = (newRamen, method) => {
  fetch(`http://localhost:3000/ramens`, {
    method: `${method}`,
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
    div.remove();
    console.log("click achieved");
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
    });
  const ramenForm = document.querySelector("#new-ramen");
  addSubmitListener(ramenForm);
};

main();

// Export functions for testing
// export { displayRamens, addSubmitListener, handleClick, main };
