/**TASK1: Fetch data from the cat api**/
async function fetchCatInformation() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();

  // Select 10 random items from the data object
  const randomBreeds = data.sort(() => 0.5 - Math.random()).slice(0, 10);
  const breedNames = randomBreeds.map((breed) => breed.name);

  //call functions
  createBreedBoxes(randomBreeds);
  selectCat();
}

//Start
fetchCatInformation();

/** TASK2: create contents **/
function createBreedBoxes(breeds) {
  const breedContainer = document.getElementById("breed-container");

  //make the temperament list no duplication: loop through all temperament descriptions, cut off duplication and keep unique temperament for the select-list
  const uniqueTemperaments = Array.from(
    new Set(
      breeds.flatMap((breed) =>
        breed.temperament.split(", ").map((word) => word.replace(/,$/, ""))
      )
    )
  );

  //create cat-info-card
  for (const breed of breeds) {
    //container
    const breedDiv = document.createElement("div");
    breedDiv.className = "cat-info";
    breedContainer.appendChild(breedDiv);

    //cat name
    const breedName = document.createElement("h2");
    breedName.className = "cat-name";
    breedName.textContent = breed.name;
    breedDiv.appendChild(breedName);

    //cat temperament
    const breedTemperament = document.createElement("p");
    breedTemperament.className = "cat-temperament";
    breedTemperament.textContent = breed.temperament;
    breedDiv.appendChild(breedTemperament);
  }

  // Create check list: push unique temperament without duplication  to the select list(check list)
  const checkList = document.getElementById("select-feature");
  for (const temperament of uniqueTemperaments) {
    const temOption = document.createElement("option");
    temOption.textContent = temperament;
    checkList.appendChild(temOption);
  }

  //Create answer list: push breed name to the select list(answer list)
  const ansList = document.getElementById("breed");
  for (const breed of breeds) {
    const nameOption = document.createElement("option");
    nameOption.textContent = breed.name;
    ansList.appendChild(nameOption);
  }
}

/**TASK3: game theory **/
let selectedCat = null;

// Computer's choice: randomly select one cat from the breed container div
function selectCat() {
  const breedContainer = document.getElementById("breed-container");
  const cats = breedContainer.getElementsByClassName("cat-info");
  selectedCat = cats[Math.floor(Math.random() * cats.length)];
  console.log("Selected cat:", selectedCat);
}

// Listen to the click event on the "ask" button
document.getElementById("btn-ask").addEventListener("click", () => {
  const selectedTemperament = document.querySelector(
    "select.select-feature"
  ).value;

  // Cross out the cats that don't fit the guess
  const catInfoCards = document.querySelectorAll(".cat-info");

  if (
    selectedCat
      .querySelector(".cat-temperament")
      .textContent.includes(selectedTemperament)
  ) {
    alert(`Yes, my cat is ${selectedTemperament}`);

    catInfoCards.forEach((catInfoCard) => {
      if (
        !catInfoCard
          .querySelector(".cat-temperament")
          .textContent.includes(selectedTemperament)
      ) {
        if (!catInfoCard.classList.contains("crossed-out")) {
          catInfoCard.classList.add("crossed-out");
        }
      }
    });
  } else {
    alert(`No, my cat is not ${selectedTemperament}`);
    catInfoCards.forEach((catInfoCard) => {
      if (
        catInfoCard
          .querySelector(".cat-temperament")
          .textContent.includes(selectedTemperament)
      ) {
        if (!catInfoCard.classList.contains("crossed-out")) {
          catInfoCard.classList.add("crossed-out");
        }
      }
    });
  }
});

//Submit final answer
const btnGuess = document.querySelector(".btn-guess");

btnGuess.addEventListener("click", () => {
  const selectedBreed = document.querySelector("#breed").value;

  console.log("selectedBreed:", selectedBreed);

  const selectedCatName = selectedCat.querySelector(".cat-name").textContent;

  if (selectedBreed === selectedCatName) {
    alert(`Congrats! Correct Guess! The Cat is ${selectedCatName}`);
  } else {
    alert("Oops, wrong guess:(");
  }
});

//refresh quit game
const refresh = document.querySelector(".refresh");
refresh.addEventListener("click", function () {
  window.location.reload();
});
