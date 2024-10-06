
const loadAllPhones = async (status, brandName) => {
    console.log(brandName);
    document.getElementById('loading-spinner').style.display='none';

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:'iphone'}`);
    const data = await res.json();
    
    if(status){
        displayAllPhone(data.data);
    } else{
        displayAllPhone(data.data.slice(0,6));
    }
}

const displayAllPhone = (phones) => {
    const phoneContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        const { brand, image, slug } = phone;
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card m-2 bg-base-100 w-96 shadow-xl">
            <figure class="px-10 pt-10">
                <img
                src="${image}"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${brand}</h2>
                <p>${slug}</p>
                <div class="card-actions">
                <button class="btn btn-primary">Show Details</button>
                </div>
            </div>
        </div>
        `
        phoneContainer.appendChild(div);
    });
}

const handleShowAll = () => {
    loadAllPhones(true);
}

const handleSearch = () => {
    document.getElementById('loading-spinner').style.display='block';
    const searchText = document.getElementById('search-field').value;
    setTimeout(function () {
        loadAllPhones(false, searchText);
    }, 3000);
}

loadAllPhones(false);

// const obj = {
//     brand: 'Apple ', 
//     phone_name: 'iPhone 13 mini', 
//     slug: 'apple_iphone_13_mini-11104', 
//     image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg'
// }

