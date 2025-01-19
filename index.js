
// create loadCategories
const loadCategories = () => {


    // fetch the data
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.error(error));


 document.getElementById('spinner').style.display="block";

    setTimeout(function(){
        loadAllPets()
    },3000);
};
 // create loadCategories
const loadAllPets = () => {
    document.getElementById('spinner').style.display="none";
    console.log('wow 3 second')

    // fetch the data
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayPets(data.pets))
    .catch((error) => console.error(error));
}

// Function to sort pets by price
const sortPetsByPrice = () => {
    const sortedPets =[...allPets].sort((a, b) => b.price - a.price); // Descending order
    displayPets(sortedPets); // Display sorted pets
};



const loadCategoryPets = (categoryName) =>{
    // alert(categoryName);
     // fetch the data
     fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
     .then(res => res.json())
     .then(data => {
        removeActiveClass();
        const activBtn = document.getElementById(`btn-${categoryName}`);
        activBtn.classList.add("active");
        console.log(activBtn)
        console.log(activBtn)
        displayPets(data.data);
        console.log(activBtn);
     })
     .catch((error) => console.error(error));
}

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove("active");
    }
}

const loadDetails = async (petId) => {
  console.log(petId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data);
}
const displayDetails = (pet) => {
console.log(pet);
const detailsContainer = document.getElementById('modal-content');

const card = document.createElement('div');
card.innerHTML = `<div class=" p-4 md:my-4 lg:my-0 rounded-xl shadow-md mb-2">
                    <img src="${pet.image}" alt="${pet.name}" class="w-[100%] h-[50%] object-cover mb-2 rounded-xl">
                    <h3 class="text-xl font-bold pl-3">${pet.pet_name}</h3>
                    <p class="text-[#1313139a] pl-3">Breed: ${pet.breed}</p>
                    <h3 class="text-[#1313139a] pl-3">Gender: ${pet.gender}</h3>
                    <h3 class="text-[#1313139a] pl-3">Date: ${pet.date_of_birth}</h3>
                    <h3 class="text-[#1313139a] pl-3">Price: $${pet.price}</h3>
                    <br>
                    <hr class="w-[98%] mx-auto">

                    <div class="mt-1 flex justify-between items-center px-2">
                        <button class="like-btn border border-[#0E7A81] pl-3 text-[#0E7A81] mt-2 rounded-lg px-2 py-1 mr-2">Like</button>
                    </div>
                </div>`;
                detailsContainer.append(card);
document.getElementById('customModal').showModal();
// document.getElementById('showModalData').click();
 
}

// Close modal on Cancel button click
document.querySelector('#customModal .modal-action button').addEventListener('click', () => {
    const modal = document.getElementById('customModal');
    modal.close();
});

// Adopt pet function
const adoptPet = (petId) => {
    
    const adoptButton = document.querySelector(`button[onclick="adoptPet('${petId}')"]`);
    adoptButton.disabled = true; // Disable the adopt button to prevent multiple clicks
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        if (countdown > 0) {
            adoptButton.textContent = `Adopting in ${countdown}...`;
            countdown--;
        } else {
            clearInterval(countdownInterval);
            adoptButton.textContent = "Adopted!";
            showAdoptedModal(); // Show adopted modal
        }
    }, 1000);
}

// Show adopted modal
const showAdoptedModal = () => {
    const adoptedModal = document.getElementById('adopted-modal');
    adoptedModal.showModal();
}


//   create displayPets 
const displayPets = (pets) => {
const petContainer = document.getElementById('left-div');
petContainer.innerHTML = "";

if(pets.length == 0){
    petContainer.classList.remove("grid", "lg:grid-cols-3", "md:grid-cols-4");
    petContainer.innerHTML = `
    <div class="bg-[#F4F4F4] w-full p-5 rounded-xl">
    <div class="flex justify-center items-center"><img class="w-[30%] h-[30%]" src="./images/error.webp" /></div>
  
    <p class="text-3xl font-bold text-center">No Information Available</p>
    <p class="text-lg font-normal mt-1 text-center">Currently, there is no information available to display. Please check back later or try a different category to see more options.</p>
    </div>
    `;
    return;
}else{
    petContainer.classList.add("grid", "lg:grid-cols-3", "md:grid-cols-4", "gap-6");
}

 pets.forEach((pet) => {
//   console.log(pet);
  const card = document.createElement('div');
  card.innerHTML = `<div class=" py-2 md:my-4 lg:my-0 rounded-xl shadow-md mb-2">
                    <img src="${pet.image}" alt="${pet.name}" class="w-[100%] h-[50%] object-cover mb-2 rounded-xl">
                    <h3 class="text-xl font-bold pl-3">${pet.pet_name}</h3>
                    <p class="text-[#1313139a] pl-3">Breed: ${pet.breed}</p>
                    <h3 class="text-[#1313139a] pl-3">Gender: ${pet.gender}</h3>
                    <h3 class="text-[#1313139a] pl-3">Date: ${pet.date_of_birth}</h3>
                    <h3 class="text-[#1313139a] pl-3">Price: $${pet.price}</h3>
                    <br>
                    <hr class="border my-2">

                    <div class="mt-1 flex justify-between items-center mb-6 px-2">
                        <button class="like-btn border hover:border-[#0E7A81] pl-3 text-[#0E7A81] mt-2 rounded-lg px-2 py-1 mr-2"  onclick="likePet(${pet.id}, '${pet.image}')"><svg width="20" height="20" viewBox="0 0 17.75 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<desc>
			Created with Pixso.
	</desc>
	<defs/>
	<path id="Vector" d="M4.4 7.62C5.07 7.62 5.68 7.25 6.09 6.72C6.74 5.89 7.55 5.21 8.47 4.72C9.08 4.4 9.6 3.92 9.85 3.29C10.03 2.85 10.12 2.37 10.12 1.9L10.12 1.37C10.12 1.2 10.19 1.05 10.3 0.93C10.42 0.81 10.58 0.75 10.75 0.75C11.24 0.75 11.72 0.94 12.07 1.29C12.42 1.65 12.62 2.12 12.62 2.62C12.62 3.58 12.4 4.49 12.02 5.3C11.8 5.77 12.11 6.37 12.62 6.37L15.23 6.37C16.08 6.37 16.85 6.95 16.94 7.8C16.98 8.15 17 8.51 17 8.87C17 11.15 16.22 13.36 14.79 15.14C14.46 15.54 13.97 15.75 13.45 15.75L10.1 15.75C9.7 15.75 9.3 15.68 8.92 15.55L6.32 14.69C5.94 14.56 5.54 14.49 5.14 14.5L3.79 14.5C3.86 14.67 3.93 14.83 4.02 15C4.18 15.33 3.95 15.75 3.58 15.75L2.82 15.75C2.08 15.75 1.4 15.31 1.18 14.61C0.89 13.66 0.74 12.67 0.75 11.68C0.75 10.39 0.99 9.15 1.44 8.02C1.69 7.37 2.34 7 3.04 7L3.91 7C4.31 7 4.54 7.46 4.33 7.8C3.62 8.97 3.24 10.31 3.25 11.68C3.25 12.68 3.44 13.63 3.79 14.5L3.79 14.5M12.62 6.37L10.75 6.37" stroke="#131313" stroke-opacity="0.600000" stroke-width="1.500000" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
</button>
                        <button id=${pet.petId} class="adopt-btn border pl-3 hover:border-[#0E7A81] text-[#0E7A81] mt-2 rounded-lg px-4 py-1 mr-2" onclick="adoptPet('${pet.petId}')">Adopt</button>
                        <button class="details-btn border pl-3 hover:border-[#0E7A81] text-[#0E7A81] mt-2 rounded-lg px-4 py-1" onclick="loadDetails('${pet.petId}')">Details</button>
                    </div>
                </div>`;
     petContainer.append(card);
 })
}

  
  //  Liking a Pet
  const likePet = (petId, petImage) => {
    const rightDiv = document.getElementById('right-div');
    const likedImage = `<img src="${petImage}" alt="Liked Pet" class="border p-2 w-[100%] h-30 object-cover rounded-md shadow-lg mt-2" />`;
    rightDiv.innerHTML += likedImage;
  };

// create displayCategories
const displayCategories = (categories) => {
 const categoryContainer = document.getElementById("categories");


   categories.forEach((item) => {
console.log(item)
     // create a button
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
    
    <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="  
    category-btn btn w-full h-full bg-white font-bold border-2 border-[#0E7A81] "> 
     <img src="${item.category_icon}" alt="nahian" class="w-6 h-6"/>
     ${item.category}
    </button> 
    
    `
    
     // add button to category container
    categoryContainer.append(buttonContainer);

   });
   
}

document.getElementById('viewMoreBtn').addEventListener('click', function() {
    // Adopt Your Best Friend section
    const adoptSection = document.getElementById('adoptSection');
    adoptSection.scrollIntoView({ behavior: 'smooth' });
  });


loadCategories();
loadAllPets();