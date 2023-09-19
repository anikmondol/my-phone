const loadPhone = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones,isShowAll)
}


const displayPhone = (phones, isShowAll) => {
    // get the parent id
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = "";

    // display show all button are if there are more then 12 phones
    const showAllContainer =  document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')

    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('isShow all',isShowAll);

    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12)
    }

    // clear phone container cards before adding new cards
    // console.log(phones)
    phones.forEach(phone => {
        // console.log(phone)
        // 2 create a div
        const phoneCard = document.createElement('div');
        // set innerText and innerHTML
        phoneCard.classList = `card p-4 bg-gray-200 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
          <h2 class="card-title mx-auto">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <p class="text-3xl font-medium">$999</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>

        `
        // append child
        phoneContainer.appendChild(phoneCard);

    });
    // hide progress spinner
    toggleLoadingSpinner(false);
}

// Show Details Modal

const handleShowDetails = async(id) =>{
    // console.log('anik',id);
    // load single phone data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}

// show Phone details 

const showPhoneDetails = (phone) =>{
    console.log(phone);
    // const phoneName = document.getElementById('phone-name');
    // phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img class="mx-auto" src="${phone.image}" alt="">
        <h2 class="text-center text-2xl mt-3 font-medium">"${phone.name}"</h2>
        <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>


        <p class="mt-4"><span class="font-bold">Storage: </span>"${phone?.mainFeatures?.storage}"</p>
        <p class="mt-3"><span class="font-bold">Display Size: </span>"${phone?.mainFeatures?.displaySize
        }"</p>
        <p class="mt-3"><span class="font-bold">ChipSet: </span>"${phone?.mainFeatures?.chipSet}"</p>
        <p class="mt-3"><span class="font-bold">Memory: </span>"${phone?.mainFeatures?.memory}"</p>
        <p class="mt-3"><span class="font-bold">Slug: </span>"${phone?.slug}"</p>
        <p class="mt-3"><span class="font-bold">releaseDate: </span>"${phone?.releaseDate}"</p>
        <p class="mt-3"><span class="font-bold">Brand: </span>"${phone?.brand}"</p>
        <p class="mt-3"><span class="font-bold">GPS: </span>"${phone?.others?.GPS || "NO GPS"}"</p>
    
    `
    // show the modal
    show_details_modal.showModal()
}





// handle search button

const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    console.log(searchText);
    loadPhone(searchText, isShowAll);
}




const toggleLoadingSpinner = (isProgress) =>{
    const loadingProgress = document.getElementById('loading-progress');
    if(isProgress){
        loadingProgress.classList.remove('hidden');
    }  
 
    else{
        loadingProgress.classList.add('hidden');
    }

}

// handle show all

const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();