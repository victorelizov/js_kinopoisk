
const searchForm = document.querySelector('#search-form');

const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {

    event.preventDefault();
    
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=c2388c2b1dae50b4409c8ed48914c075&language=ru&query=' + searchText;
    movie.innerHTML = "Loading..."

    fetch(server)
        .then(function(value){
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then(function(output) {
            let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let dateItem = item.first_air_date || item.release_date;
                let posterItem = item.poster_path ? (urlPoster + item.poster_path) : 'https://kinomaiak.ru/wp-content/uploads/2018/02/noposter.png';
                inner += `
                    <div class="col-12 col-md-4 col-xl-3 item">
                        <img src="${posterItem}" alt="${nameItem}">
                        <h5>${nameItem}</h5>
                        <p><em>(${dateItem})</em></p>
                    </div>
                    `;
             });
            movie.innerHTML = inner; 
        })
        .catch(function(reason){
            movie.innerHTML = 'Oops, something wrong';
            console.error('error: ' + reason.status);
        });

}


searchForm.addEventListener('submit', apiSearch);
