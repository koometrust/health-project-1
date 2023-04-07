document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const bmiResult = document.getElementById('bmi-result');
  const healthStatus = document.getElementById('health-status'); // added new element
  
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent form submission
    const height = heightInput.value;
    const weight = weightInput.value;
    const bmi = calculateBMI(height, weight);
    bmiResult.innerText = `Your BMI is ${bmi.toFixed(2)}.`;

    // Determine health status based on BMI value
    let status;
    if (bmi < 18.5) {
      status = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      status = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      status = 'Overweight';
    } else {
      status = 'Obese';
    }
    healthStatus.innerText = `Based on your BMI, your health status is ${status}.`; // added new line
    
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
        const mealPlanDiv = document.getElementById('meal-plan');
        mealPlanDiv.innerHTML = '';
        mealPlanDiv.appendChild(foodList);
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
