document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const monsterForm = document.getElementById('monster-form');
    const loadMoreButton = document.getElementById('load-more');
  
    let currentPage = 1;
  
    function fetchMonsters(page) {
      fetch(`http://localhost:3000/monsters?page=${page}&limit=50`)
        .then(response => response.json())
        .then(data => {
          const monsters = data;
  
          monsters.forEach(monster => {
            const monsterElement = document.createElement('div');
            monsterElement.innerHTML = `
              <h2>${monster.name}</h2>
              <p>Age: ${monster.age}</p>
              <p>Description: ${monster.description}</p>
            `;
  
            monsterContainer.appendChild(monsterElement);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    fetchMonsters(currentPage);
  
    monsterForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      // Retrieve the values from the form fields
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const description = document.getElementById('description').value;
  
      // Create a new monster object
      const newMonster = {
        name,
        age,
        description
      };
  
      // Add the new monster to the list and save it to the API
      addMonster(newMonster);
  
      // Reset the form fields
      monsterForm.reset();
    });
  
    function addMonster(monster) {
      // Send a POST request to the API endpoint to save the new monster
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(monster)
      })
      .then(response => response.json())
      .then(data => {
        // Add the new monster to the list
        const monsterElement = document.createElement('div');
        monsterElement.innerHTML = `
          <h2>${data.name}</h2>
          <p>Age: ${data.age}</p>
          <p>Description: ${data.description}</p>
        `;
  
        monsterContainer.appendChild(monsterElement);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  
    loadMoreButton.addEventListener('click', () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  });