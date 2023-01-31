//fetch data frothe api
/**TASK1: fetch the name & temperament from the cat api**/
async function fetchCatInformation() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();

  // Select 10 random items from the data object
  const randomBreeds = data.sort(() => 0.5 - Math.random()).slice(0, 10);

  const breedNames = randomBreeds.map((breed) => breed.name);

  createBreedList(breedNames);
  createBreedBoxes(randomBreeds);

  //   for (const breed of randomBreeds) {
  //     console.log(breed.name);
  //     createBreedList(breed.name);
  //   }

  // for (const breed of randomBreeds) {
  //   console.log("Cat Breed Name: ", breed.name);
  //     console.log("Cat Breed Temperament: ", breed.temperament);
  //     console.log("---");
  //   }

  selectCat();
}

fetchCatInformation();

/** TASK2: create breed list **/
function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
 
  ${breedList.map((name) => `<option>${name}</option>`).join("")}

  `;
}

/** TASK3: push in  fo for each cat into div box **/
function createBreedBoxes(breeds) {
  const breedContainer = document.getElementById("breed-container");
  const uniqueTemperaments = Array.from(
    new Set(
      breeds.flatMap((b) =>
        b.temperament.split(", ").map((word) => word.replace(/,$/, ""))
      )
    )
  );
  console.log(uniqueTemperaments);

  for (const breed of breeds) {
    const breedDiv = document.createElement("div");
    breedDiv.className = "cat-info";

    const breedName = document.createElement("h2");
    breedName.className = "cat-name";
    breedName.textContent = breed.name;
    breedDiv.appendChild(breedName);

    const breedTemperament = document.createElement("p");
    breedTemperament.className = "cat-temperament";
    breedTemperament.textContent = breed.temperament;

    breedDiv.appendChild(breedTemperament);

    breedContainer.appendChild(breedDiv);
  }

  /**TASK4: temperament make to array without duplication and push it to the list **/ //
  const checkList = document.getElementById("select-feature");
  for (const temperament of uniqueTemperaments) {
    const option = document.createElement("option");
    option.textContent = temperament;
    checkList.appendChild(option);
  }
}

/**TASK5: TMR: game theory **/
let selectedCat = null;

// Randomly select one cat from the breed container div
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

  console.log("Selected temperament:", selectedTemperament);

  // Cross out the cats which don't have the selected temperament
  const catInfoCards = document.querySelectorAll(".cat-info");

  //   for (const catInfoCard of catInfoCards) {
  //     const catTemperaments =
  //       catInfoCard.querySelector("p.cat-temperament").textContent;
  //     if (catTemperaments.includes(selectedTemperament)) {
  //       if (!catInfoCard.classList.contains("crossed-out")) {
  //         catInfoCard.classList.add("crossed-out");
  //       }
  //     }
  //   }

  if (
    selectedCat
      .querySelector(".cat-temperament")
      .textContent.includes(selectedTemperament)
  ) {
    alert("YES");

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
    alert("Nope");
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

//Submit final guess
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
