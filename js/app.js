const result =  document.querySelector('#resultado');
const form = document.querySelector('#formulario');
const pagDiv = document.querySelector('#paginacion');
const registersPerPage = 50;
let totalPages;
let iterator;
let actualPage = 1;

window.onload = () => {
    formulario.addEventListener('submit', validateForm);

}

function validateForm(e){
    e.preventDefault();
    
    const searchValue = document.querySelector('#termino').value;

    // Validating the input
    if(searchValue === ''){
        showAlert('Agrega un término de busqueda');
        return;
    }

    searchImages();

}

function searchImages(){
    const value = document.querySelector('#termino').value;

    const key = '33141089-a0e8cb8e9582191227f5efcc9';
    const url = `https://pixabay.com/api/?key=${key}&q=${value}&lang=es&per_page=${registersPerPage}&page=${actualPage}`;
    
    fetch(url)
        .then(result => result.json())
        .then(data => {
           totalPages = pages(data.totalHits);
            
            showImages(data.hits);
        })


}


function showImages(images){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }

    images.forEach(image => {
        const { previewURL, views, likes, largeImageURL } = image;

        result.innerHTML += `
            <div class=" target w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4 transform hover:scale-110 transition ease-in duration-300 ">
                <div class="bg-white rounded ">
                    <img class="w-full h-56 rounded  " src="${previewURL}" />

                    <div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light"> Me Gusta </span> </p>
                        <p class="font-bold">${views} <span class="font-light"> Veces vistas </span> </p>

                        <a  class=" block text-center mt-5 text-xl hover:bg-blue-700 hover:text-white rounded p-1 transition ease-in duration-200 "
                            href="${largeImageURL}" target="_blank" rel="noopener noreferr">
                                Ver Imágen
                        </a>
                    
                    </div>
                </div>
            </div>
        `

        showPags();
    
    });


    const img = document.querySelectorAll('.target');
    img.forEach(image => {
        image.addEventListener('mouseover', function(){
            image.classList.add('z-10')
        })
        image.addEventListener('mouseout', function(){
            image.classList.remove('z-10')
        })
    })
   
}

function pages(total){
    return parseInt(Math.ceil(total / registersPerPage))
}


// Generator pages

function *createPages(total){
    for(let i = 1; i <= total; i++){
        yield i;
    }
}

function showPags(){
    
    while(pagDiv.firstChild){
        pagDiv.firstChild.remove(pagDiv.firstChild)
    }

    iterator = createPages(totalPages);
    while(true){
        const {value, done} = iterator.next();
        if(done) return;

        const btn = document.createElement('a');
        btn.href = '#';
        btn.dataset.pagina = value;
        btn.textContent = value;
        btn.classList.add('next', 'bg-white', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-10', 'uppercase', 'rounded', 'hover:bg-blue-700');

        btn.onclick = () => {
            actualPage = value;
            searchImages();
        }

        pagDiv.appendChild(btn);
    }
}

function showAlert(message){

    if(form.childNodes.length <= 3 ){
        const alert = document.createElement('P');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto',
        'mt-6', 'text-center');
        alert.innerHTML = `
            <strong class="font-bold">Ha ocurrido un error</strong>
            <span class="block">${message}</span>    
        `
        form.appendChild(alert)
        setTimeout(() => {
            alert.remove();
        }, 2000);
    }

  
}

