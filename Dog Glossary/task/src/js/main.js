function clearContent() {
    const contentSection = document.getElementById('content');
    contentSection.innerHTML = ' ';
    return contentSection
}
function fetchImage(url) {
    const contentSection = clearContent();
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.onerror = () => {
                contentSection.innerHTML = '<p>Breed not found!</p>';
            };
            contentSection.appendChild(imageElement);
        })
        .catch(error => {
            console.log(error);
        });
}

function getRandomDogImage() {
    fetchImage('https://dog.ceo/api/breeds/image/random');
}

function getRandomDogBreedImage() {
    const breed = document.getElementById('input-breed').value.toLowerCase();
    fetchImage(`https://dog.ceo/api/breed/${breed}/images/random`);
}

function getSubBreedList() {
    const contentSection = clearContent();
    const breed = document.getElementById('input-breed').value.toLowerCase();
    fetch(`https://dog.ceo/api/breed/${breed}/list`)
        .then(response => response.json())
        .then(data => {
            const subBreedArray = data.message;
            if (subBreedArray.length === 0) {
                contentSection.innerHTML = '<p>No sub-breeds found!</p>';
            } else {
                const subBreedList = document.createElement('ol');
                subBreedArray.forEach(subBreed => {
                    const listItem = document.createElement('li');
                    listItem.textContent = subBreed;
                    subBreedList.appendChild(listItem);
                });
                contentSection.appendChild(subBreedList);
            }
        })
        .catch(error => {
            contentSection.innerHTML = '<p>Breed not found!</p>';
            console.log(error);
        });
}

function getAllBreedsList() {
    const contentSection = clearContent();
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const allBreedsList = document.createElement('ol');
            for (const breed in data.message) {
                const breedItem = document.createElement('li');
                breedItem.textContent = breed;
                const subBreeds = data.message[breed];
                if (subBreeds.length > 0) {
                    const subBreedsList = document.createElement('ul');
                    subBreeds.forEach(subBreed => {
                        const subBreedItem = document.createElement('li');
                        subBreedItem.textContent = subBreed;
                        subBreedsList.appendChild(subBreedItem);
                    });
                    breedItem.appendChild(subBreedsList);
                }
                allBreedsList.appendChild(breedItem);
            }
            contentSection.appendChild(allBreedsList);
        })
        .catch(error => {
            contentSection.innerHTML = '<p>Error!</p>';
            console.log(error);
        });
}


document.getElementById('button-random-dog').addEventListener('click', getRandomDogImage);
document.getElementById('button-show-breed').addEventListener('click', getRandomDogBreedImage);
document.getElementById('button-show-sub-breed').addEventListener('click', getSubBreedList);
document.getElementById('button-show-all').addEventListener('click', getAllBreedsList);
document.getElementById('input-breed').placeholder = "Enter a breed";