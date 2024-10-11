// Global variable to store the current search term
let currentSearchTerm = "";
let allFoodData = []; // Global variable to hold all food data

// Fetch and display foods based on the search term or default to the first 6 items
const loadAllFoods = async (status, searchText = "") => {
    // Show the loading spinner
    document.getElementById("loading-spinner").style.display = "block";
    
    // If no search term is provided and status is true, use the current search term
    if (status && !searchText) {
        searchText = currentSearchTerm;
    }

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
        const data = await res.json();

        // Hide the loading spinner
        document.getElementById("loading-spinner").style.display = "none";

        // Check if the meals data is returned
        if (data.meals) {
            allFoodData = data.meals; // Store meals data globally
            if (status) {
                displayAllFoods(data.meals); // Display all search results
            } else {
                displayAllFoods(data.meals.slice(0, 6)); // Display first 6 results by default
            }
        } else {
            document.getElementById("box-container").innerHTML = `<p class="text-center text-red-500">No results found</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("loading-spinner").style.display = "none";
        document.getElementById("box-container").innerHTML = `<p class="text-center text-red-500">Error fetching data. Please try again later.</p>`;
    }
};

const showDetails = (index) => {
    const data = allFoodData[index]; // Access the data object using the index
    const modal = document.getElementById("my_modal");
    const container = document.getElementById("modal-container");
    container.innerHTML = `
        <h1 class="text-xl font-bold">${data.strMeal}</h1>
        <hr>
        <img class="w-[200px] rounded-xl " src="${data.strMealThumb}" alt="" class="rounded-xl">
        <p class="font-bold">Category:${data.strCategory}<p>
        <p>${data.strInstructions}</p>
        <p ><span class="font-bold">Youtube:</span>${data.strYoutube}</p>
        <button onclick="document.getElementById('my_modal').close()" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
    `;
    modal.showModal(); // Show the modal
};

// Display the fetched food items dynamically
const displayAllFoods = (datas) => {
    const boxContainer = document.getElementById("box-container");
    boxContainer.innerHTML = ""; // Clear the container

    datas.forEach((data, index) => {
        boxContainer.innerHTML += `
            <div class="box flex justify-center items-center gap-4 w-[90%] shadow-xl rounded-xl p-2">
                <div class="box-left w-[40%]">
                    <img class="w-full h-full rounded-xl" src="${data.strMealThumb}" alt="${data.strMeal}">
                </div>
                <div class="box-right space-y-2 w-[60%]">
                    <h1 class="text-lg font-bold">${data.strMeal}</h1>
                    <p class="truncate-text">${data.strInstructions.slice(0, 100)}...</p> <!-- Limit description to 100 characters -->
                    <button onclick="showDetails(${index})" class="text-yellow-400 font-bold cursor-pointer">View Details</button>
                </div>
            </div>
        `;
    });
};

// Handle "View All" functionality (show all foods)
const handleViewAll = () => {
    loadAllFoods(true, currentSearchTerm); // Pass the current search term
};

// Handle the search functionality
const handleSearch = () => {
    const input = document.getElementById("input").value.trim(); // Get the search input
    if (input) {
        currentSearchTerm = input; // Store the current search term
        loadAllFoods(false, input); // Search for the input text
    } else {
        document.getElementById("box-container").innerHTML = `<p class="text-center text-red-500">Please enter a search term</p>`;
    }
};

// Load initial foods
loadAllFoods(false);
