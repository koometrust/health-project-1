document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent form submission
    const height = heightInput.value;
    const weight = weightInput.value;
    const bmi = calculateBMI(height, weight);
    alert(`Your BMI is ${bmi.toFixed(2)}.`);

    // Determine appropriate nutrient content based on BMI category
    let nutrient;
    if (bmi < 18.5) {
      nutrient = 'PROCNT'; // protein
    } else if (bmi >= 18.5 && bmi < 25) {
      nutrient = 'FAT'; // fat
    } else {
      nutrient = 'CHOCDF'; // carbohydrates
    }

    // Make request to USDA FoodData Central API
    const apiKey = 'lMRHsJKRaSKpTgoyPY6VGZpT41BVnfLWUJ7sgv9p';
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&nutrients=${nutrient}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Handle the data returned from the API
        console.log(data);
        
        // Display list of foods on website
        const foodList = document.createElement('ul');
        data.foods.forEach(food => {
          const foodItem = document.createElement('li');
          foodItem.innerText = food.description;
          foodList.appendChild(foodItem);
        });

        // Remove any existing food list and display new one
        const existingFoodList = document.getElementById('food-list');
        if (existingFoodList) {
          existingFoodList.remove();
        }
        const contentDiv = document.querySelector('.content');
        const heading = document.createElement('h2');
        heading.innerText = 'Recommended Foods';
        foodList.setAttribute('id', 'food-list');
        contentDiv.appendChild(heading);
        contentDiv.appendChild(foodList);
      })
      .catch(error => {
        // Handle any errors that occur
        console.error(error);
      });
  });

  function calculateBMI(height, weight) {
    const heightMeters = height / 39.37;
    const bmi = weight / (heightMeters * heightMeters);
    return bmi;
  }
});
