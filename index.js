const fetchData = async(url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data
}

// category Button
const categoryButton = async () =>{
    const data = await fetchData('https://openapi.programming-hero.com/api/peddy/categories');

    document.getElementById("spinner").style.display="block";
    setTimeout(() => {
        document.getElementById("spinner").style.display="none";
        show();
    },2000);

    
            const categoryContainer = document.getElementById('category-containers');


            let show = () => {
                data.categories.forEach(items => {
                    const div = document.createElement("div");
                    div.classList="lg:p-0 p-4"
                    div.innerHTML = `
                    <button id="btn-${items.category}" onclick="categoryPats('${items.category}')" class="btn w-[100px] h-[80px] md:h-[50px] lg:h-[110px] md:w-full bg-white category-btn">
                        <img class="h-[40px] lg:h-auto" src='${items.category_icon}'>
                        <h2 class="text-[16px] lg:text-2xl">${items.category}</h2>
                    </button>
                    `
                    categoryContainer.appendChild(div)
                });
            }
}
categoryButton()


// load All Card
const loadAllCard = async () => {
    const data = await fetchData('https://openapi.programming-hero.com/api/peddy/pets');

    const cardContainer = document.getElementById('card-container');
    document.getElementById("spinner").style.display="block";

    let empty = document.getElementById("empty");
    empty.classList.remove("border");
    setTimeout(() => {
        document.getElementById("spinner").style.display="none";
        empty.classList.add("border");
        show();
    },2000);

    let show = () => {
        data.pets.forEach(pats => {
            const card = document.createElement("div");
            card.innerHTML = `
    
            <div class="border p-4 rounded-xl ">
                    <div>
                        <img class="rounded" src=${pats.image}>
                    </div>
    
                    <div class="space-y-1 my-5">
                            <h1 class="text-2xl font-bold">${pats.category?`${pats.category}`:"not available"}</h1>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-border-all"></i>
                            <p>Breed:${pats.breed?`${pats.breed}`:"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-calendar"></i>
                            <p>Birth: ${pats.date_of_birth?`${pats.date_of_birth}` :"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-venus"></i>
                            <p>Gender:${pats.gender?`${pats.gender}`:"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <p>Price :${pats.price?`${pats.price}`:"not available"}</p>
                        </div>
                    </div>
                <hr>
    
    
                    <div class="mt-5 flex justify-between">
                        <button onclick="likeBtn('${pats.image}')" class="btn bg-white border rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>

                     <button class="hover:bg-[#0E7A81] hover:text-white btn bg-white font-bold text-[#0E7A81] " id="adopt" onclick="adopt(5)">Adopt</button>
    
    
                        <button class="hover:bg-[#0E7A81] hover:text-white   btn bg-white font-bold text-[#0E7A81]" onclick="patDetails('${pats.petId}')">Details</button>
                        
                    </div>
                
            </div>
            `
            cardContainer.appendChild(card);
        });
    }

}
loadAllCard()

// right image
const likeBtn = (img) =>{
    const like = document.getElementById("likeArea");
    like.innerHTML += `
    <img class = "rounded lg:rounded-xl lg:border p-[2px] lg:p-2" src=${img}>
`
}


// adopt
let adopt = () => {
    let modal  = document.getElementById("my_modal_10");
    modal.showModal();

    let timeChanger = document.getElementById("timerChanger");
    modal.showModal();

    time= 3;
    timeChanger.innerText = time;

    let intevalId = setInterval(() => {
        time--;
        timeChanger.innerText = time;

        if (time <= 0) {
            clearInterval(intevalId);
        }
    },1200)

    setTimeout(()=>{
        modal.close();
        clearInterval(intevalId)
    },3000)
}

let sortBtn = document.getElementById("sort");
sortBtn.addEventListener("click", () => {
    sort()
})

let sort = async () => {
    let data = await fetchData("https://openapi.programming-hero.com/api/peddy/pets")
    data.pets.sort((a, b) => b.price - a.price);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    let show = () => {
        data.pets.forEach(pats => {
            const card = document.createElement("div");
            card.innerHTML = `
    
            <div class="border p-4 rounded-xl">
                    <div>
                        <img class="rounded" src=${pats.image}>
                    </div>
    
                    <div class="space-y-1 my-5">
                            <h1 class="text-2xl font-bold">${pats.category?`${pats.category}`:"not available"}</h1>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-border-all"></i>
                            <p>Breed:${pats.breed?`${pats.breed}`:"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-calendar"></i>
                            <p>Birth: ${pats.date_of_birth?`${pats.date_of_birth}` :"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-venus"></i>
                            <p>Gender:${pats.gender?`${pats.gender}`:"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <p>Price :${pats.price?`${pats.price}`:"not available"}</p>
                        </div>
                    </div>
                <hr>
    
    
                    <div class="mt-5 flex justify-between">
                        <button onclick="likeBtn('${pats.image}')" class="btn bg-white border rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>

                        <button class="hover:bg-[#0E7A81] hover:text-white btn bg-white font-bold text-[#0E7A81] " id="adopt" onclick="adopt(5)">Adopt</button>
    
    
                        <button class="hover:bg-[#0E7A81] hover:text-white   btn bg-white font-bold text-[#0E7A81]" onclick="patDetails('${pats.petId}')">Details</button>
                        
                    </div>
                
            </div>
            `
            cardContainer.appendChild(card);
        });
    }

    document.getElementById("spinner").style.display="block";
    empty.classList.remove("border");
    setTimeout(() => {
        document.getElementById("spinner").style.display="none";
        empty.classList.add("border");
        
        show();
    },2000);
}

// details modal fun
const patDetails = async(pets)=>{
    let pats = await fetchData(`https://openapi.programming-hero.com/api/peddy/pet/${pets}`);
    const modalContainer = document.getElementById("modal-Container");
    modalContainer.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box w-11/12 mx-auto lg:w-full">
            <div>
                <div>
                        <img class="w-full rounded" src="${pats.petData.image}" alt="">
                        </div>
                            
                            <div class="my-3">
                                <h1 class="text-2xl lg:text-3xl font-bold mb-3">${pats.petData.pet_name?`${pats.petData.pet_name}`:"not available"}</h1>
                                <div class="grid grid-cols-2">
                                    <div class="flex items-center gap-2">
                                        <i class="fa-solid fa-border-all"></i>
                                        <p>Breed:${pats.petData.breed?`${pats.petData.breed}`:"not available"}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i class="fa-regular fa-calendar"></i>
                                        <p>Birth:${pats.petData.date_of_birth?`${pats.petData.date_of_birth}`:"not available"}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i class="fa-solid fa-venus"></i>
                                        <p>Gender:${pats.petData.gender?`${pats.petData.gender}`:"not available"}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i class="fa-solid fa-dollar-sign"></i>
                                        <p>Price:${pats.petData.price?`${pats.petData.price}`:"not available"}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <i class="fa-solid fa-venus"></i>
                                        <p>Vaccinated status:${pats.petData.vaccinated_status?`${pats.petData.vaccinated_status}`:"not available"}</p>
                                    </div>
                                </div>
                                
                            </div>
                            <hr>
                            <div class="my-3">
                                <h2 class="text-xl font-semibold">Details Information</h2>
                                <p class="text-sm mt-3">${pats.petData.pet_details?`${pats.petData.pet_details}`:"not available"}<p>
                            </div>
                        </div>
                    <form method="dialog">
                        <button class="btn hover: w-full text-[#0E7A81]">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    `;

    my_modal_5.showModal()
}



const categoryPats = async(Id)=>{
    empty.classList.remove("border");
    const data = await fetchData(`https://openapi.programming-hero.com/api/peddy/category/${Id}`);
    document.getElementById("spinner").style.display="block";
    
    setTimeout(() => {
        document.getElementById("spinner").style.display="none";
        empty.classList.add("border");
        
        show();
    },2000);

    let show  = () =>{
        data.data.forEach(pats => {
            const card = document.createElement("div");
            card.innerHTML = `
            <div class="border p-6 rounded-xl">
                    <div>
                        <img class="rounded" src=${pats.image}>
                    </div>
    
                    <div class="space-y-1 my-5">
                            <h1 class="text-2xl font-bold">${pats.category?`${pats.category}`:"not available"}</h1>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-border-all"></i>
                            <p>Breed:${pats.breed ? pats.breed :"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-calendar"></i>
                            <p>Birth: ${pats.date_of_birth?`${pats.date_of_birth}`:"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-venus"></i>
                            <p>Gender:${pats.gender?`${pats.gender}`:"not available"}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-dollar-sign"></i>
                            <p>Price :${pats.price?`${pats.price}`:"not available"}</p>
                        </div>
                    </div>
                <hr>
    
                <!-- button -->
                    <div class="mt-5 flex justify-between">
                        <button onclick="likeBtn('${pats.image}')" class="btn bg-white border rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button class="hover:bg-[#0E7A81] hover:text-white  btn bg-white font-bold text-[#0E7A81]" onclick="adopt()">Adopt</button>
                        <button class="hover:bg-[#0E7A81] hover:text-white   btn bg-white font-bold text-[#0E7A81]" onclick="patDetails('${pats.petId}')">Details</button>
                        
                    </div>
                
            </div>
            `
            cardContainer.appendChild(card);
        });
    }
    // Active button remove fun col
    removeActiveClass()
    // active button style
    const activeBtn = document.getElementById(`btn-${Id}`);
    activeBtn.classList.add("bg-[#0e79814b]",'rounded-full','border-[#0E7A81]');

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if(data.data.length == 0){
        cardContainer.classList.remove("grid");
        setTimeout(() => {
            cardContainer.innerHTML = `
                <div class="text-center  bg-base-200 rounded-xl">
                    <div class=" px-auto py-10 lg:py-24">
                        <img class="mx-auto w-5/12 md:w-auto" src="./images/error.webp" alt="">
                        <div class="max-w-screen-md mx-auto">
                            <h1 class="lg:text-3xl font-bold text-xl">No Information Available</h1>
                            <p class="py-3 px-2 text-sm">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                                its layout. The point of using Lorem Ipsum is that it has a.</p>
                        </div>
                    </div>
                </div>
        `;
            
        },2000);
        return;
    }
    else{
        cardContainer.classList.add("grid")
    }
}

//Active button remove 
const removeActiveClass=()=>{
    const buttons = document.getElementsByClassName('category-btn');
    for(let button of buttons){
        button.classList.remove("bg-[#0e79814b]",'rounded-full','border-[#0E7A81]');
    }
}