document.getElementById('randomize-btn').addEventListener('click', randomizeCharacter);

function randomizeCharacter() {
  const randomId = Math.floor(Math.random() * 82) + 1; // Random character ID from 1 to 82

  fetch(`https://swapi.dev/api/people/${randomId}/`)
    .then(response => response.json())
    .then(data => {
      updateCharacterInfo(data);
    })
    .catch(error => console.log("Error fetching data:", error));
}

function updateCharacterInfo(data) {
  // Apply fade-out effect for smooth transition
  document.getElementById('character-info').classList.add('fade-out');

  // Wait for fade-out to finish before updating the content
  setTimeout(() => {
    // Constructing image URL from the SWAPI character ID
    const characterImage = `https://starwars-visualguide.com/assets/img/characters/${data.url.split('/')[5]}.jpg`;

    // Log the image URL to the console to verify it
    console.log("Character Image URL: ", characterImage);

    // Setting the image source
    const characterImageElement = document.getElementById('character-image');
    characterImageElement.src = characterImage;

    // Check if image loads, else display a default placeholder
    characterImageElement.onerror = () => {
      characterImageElement.src = 'https://via.placeholder.com/200x200?text=No+Image+Available'; // Placeholder image if fails
    };

    // Update character details
    document.getElementById('name').textContent = `Name: ${data.name}`;
    document.getElementById('height').textContent = `${data.height} cm`;
    document.getElementById('eye-color').textContent = data.eye_color;
    document.getElementById('home-planet').textContent = data.homeworld; // This will be a URL, we'll need to fetch more details for the planet
    document.getElementById('birth-year').textContent = data.birth_year;
    document.getElementById('gender').textContent = data.gender;
    document.getElementById('hair-color').textContent = data.hair_color;
    document.getElementById('weight').textContent = data.mass; // Assuming 'mass' is the weight of the character

    // Fetch the home planet details
    fetch(data.homeworld)
      .then(response => response.json())
      .then(planetData => {
        document.getElementById('home-planet').textContent = planetData.name;
      })
      .catch(error => console.log("Error fetching planet data:", error));

    // Show the character information
    document.getElementById('character-info').style.display = 'block'; // Make the content visible
    document.getElementById('character-info').classList.remove('fade-out');
    document.getElementById('character-info').classList.add('fade-in');
  }, 500); // Delay to wait for fade-out transition before updating content
}
