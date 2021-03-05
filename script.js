const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
let searchInputTxt = document.getElementById('search-input');

// add event listeners 
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', function(){
    mealDetailsContent.parentElement.classList.remove('show-recipe')
})

// get search meal list 
function getMealList(e){
    e.preventDefault()
    const term = searchInputTxt.value;

    // check for Empty
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                  <div class="meal-item text-center" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe </a>
                    </div>
                  </div>
                    `;
                    mealList.classList.remove('not-found')
                });
            } else{
                html = "Sorry, We don't find any meal";
                mealList.classList.add('not-found');
            }
  
            mealList.innerHTML = html;
        });
    }


    // fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}')
    //   .then(response => response.json())
    //   .then(data => {
    //       let html = "";
    //       if (data.meals) {
    //           data.meals.forEach(meal => {
    //               html += `
    //             div class="meal-item text-center data-id="${meal.idMeal}" ">
    //               <div class="meal-img">
    //                   <img src="${meal.strMealThumb}" alt="">
    //               </div>
    //               <div class="meal-name">
    //                   <h3>${meal.strMeal}</h3>
    //                   <a href="#" class="recipe-btn">Get Recipe </a>
    //               </div>
    //             </div>
    //               `;
    //           });
    //       }

    //       mealList.innerHTML = html;
    //   });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModel(data.meals))
    } 
}


// create a model 
function mealRecipeModel(meal){
    meal = meal[0];
    let html = `
    <div class="inner-food-details justify-content-center">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="food">
        <div class="food-details-content">
                <h2 class="recipe-title  text-center">${meal.strMeal}</h2>
                <h3 class="recipe-category  text-center">${meal.strCategory}</h3>
            <div class="recipe-instruct">
                <h4>Instructions: </h4>
                <p>${meal.strInstructions}</p>
            </div>
        </div>
    </div>
    `;
    mealDetailsContent.innerHTML= html;
    mealDetailsContent.parentElement.classList.add('show-recipe');
}