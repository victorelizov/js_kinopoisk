
const searchForm = document.querySelector('#search-form');

const movie = document.querySelector('#movies');

function apiSearch(event) {

    event.preventDefault();
    
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=c2388c2b1dae50b4409c8ed48914c075&language=ru&query=' + searchText;

    requestApi('GET', server)
        .then(function(result){
            const output = JSON.parse(result);
            let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let dateItem = item.first_air_date || item.release_date;
                inner += `<div class="col-6 col-md-4 col-xl-3"><div class="card" style="height: 10rem;"><div class="card-body"><h5 class="card-title">${nameItem}</h5><h6 class="card-subtitle mb-2 text-muted"><em>(${dateItem})</em></h6></div></div></div>`;
             });
            movie.innerHTML = inner; 
        })
        .catch(function(reason){
            movie.innerHTML = 'Oops, something wrong';
            console.log('error: ' + reason.status);
        });
}


searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    return new Promise (function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open(method, url);

        request.addEventListener('load', function() {
            if (request.status !== 200) {
                reject({status: request.status});
                return;
            }
            resolve(request.response);
        });

        request.addEventListener('error', function() {
            reject({status: request.status});
        });

        request.send();
    });
}

    // request.addEventListener('readystatechange', () => {
    //     if (request.readyState !== 4) {
    //         movie.innerHTML = 'Загрузка...';
    //         return;
    //     }
    //     if (request.status !== 200) {

    //         return;
    //     }
        
     
    // });
