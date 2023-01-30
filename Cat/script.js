//fetch data frothe api
/**TASK1: fetch the name & temperament from the cat api**/
async function fetchCatInformation() {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();

  // Select 10 random items from the data object
  const randomBreeds = data.sort(() => 0.5 - Math.random()).slice(0, 10);

  const breedNames = randomBreeds.map((breed) => breed.name);

  createBreedList(breedNames);

  //   for (const breed of randomBreeds) {
  //     console.log(breed.name);
  //     createBreedList(breed.name);
  //   }

  // for (const breed of randomBreeds) {
  //   console.log("Cat Breed Name: ", breed.name);
  //     console.log("Cat Breed Temperament: ", breed.temperament);
  //     console.log("---");
  //   }
}

fetchCatInformation();

/** TASK2: create breed list **/
function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <label>Your cat is</label>
  <select>
  <option>Cat breed</option>
  ${breedList.map((name) => `<option>${name}</option>`).join("")}
</select>
  `;
}

/** TASK3: push info for each cat into div box **/

/**TASK4: temperament make to array without duplication and push it to the list **/

/**TASK5: TMR: game theory **/
