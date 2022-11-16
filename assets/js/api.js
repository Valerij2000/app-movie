// массивы с месяцами
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];
const monthsRu = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
  'Ноябрь', 'Декабрь'
];

// склонение числительных
const declOfNum = (number, titles) => {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

// API
const API_KEY = "4360dfd4-1413-43a7-b5a6-626e1fe9713d";
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentMonthText = months[currentMonth].toUpperCase();
const currentMonthRu = monthsRu[currentMonth];
const appReleasesFilms = document.querySelector('#render-swipes');
const appListTopFilms = document.querySelector('#render-top-films');
const appListAwaitFilms = document.querySelector('#render-await-films');
const appListBestFilms = document.querySelector('#render-premieres-films');

function fetchReleasesFilms() {
  const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${currentYear}&month=${currentMonthText}`;

  fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .then((data) => {
      for (item of data.releases) {
        const options = {
          month: 'long',
          day: 'numeric'
        };

        let date = new Date(item.releaseDate).toLocaleDateString('ru-RU', options);

        let duration = `${item.duration} ${declOfNum(item.duration, ['минута', 'минуты', 'минут'])}`;

        let to = item.genres.map(item => Object.values(item)[0]);

        let genres = to.toString().replace(',', ', ');

        appReleasesFilms.insertAdjacentHTML('afterbegin', `
        <div class="swiper-slide">
          <div class="nft-item home-4">
            <div class="nft-inner">
              <div class="nft-item-top d-flex justify-content-between align-items-center">
                <div class="author-part">
                  <ul class="author-list d-flex">
                    <li class="single-author d-flex align-items-center">
                      <a href="https://www.kinopoisk.ru/film/${item.filmId}" class="veryfied"><img loading="lazy" src="${item.posterUrlPreview}"
                          alt="${!item.nameRu ? item.nameEn : item.nameRu}" class="img"></a>
                      <h6><a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank">Смотреть</a></h6>
                    </li>
                  </ul>
                </div>
                <div class="more-part">
                  <div class="dropstart">
                    <a class="dropdown-toggle" href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                      data-bs-offset="25,0">
                      <i class="icofont-flikr"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="nft-item-bottom">
                <div class="nft-thumb">
                  <img class="img" loading="lazy" src="${item.posterUrlPreview}" alt="${!item.nameRu ? item.nameEn : item.nameRu}">
                  <div class="nft-content">
                    <h4><a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank">${genres}</a> </h4>
                    <div class="price-like d-flex justify-content-between align-items-center">
                      <p class="nft-price"><span class="yellow-color">${duration}</span>
                      </p>
                      <a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank" class="nft-like">${date}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
      }
    })
    .catch(() => {
      console.log('error');
    });
}

function fetchTopFilms() {
  const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS`;
  fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .then((data) => {
      for (item of data.films) {
        appListTopFilms.insertAdjacentHTML('afterbegin', `
        <div class="swiper-slide">
							<div class="nft-item home-4">
								<div class="nft-inner">
									<div class="nft-item-bottom">
										<div class="nft-thumb">
											<img src="${item.posterUrlPreview}" alt="nft-img">
										</div>
										<div class="nft-content">
											<h4 class="top-film-title"><a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank">${item.nameRu}</a> </h4>
											<div class="price-like d-flex justify-content-between align-items-center">
												<p class="nft-price">Рейтинг: <span class="yellow-color">${item.rating == null ? 'Нет' : item.rating}</span>
												</p>
												<a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank" class="nft-like">${item.year} г.</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
      `);
      }
    })
}

function fetchAwaitFilms() {
  const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS`;
  fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .then((data) => {
      for (item of data.films) {
        console.log(item);
        appListAwaitFilms.insertAdjacentHTML('afterbegin', `
          <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="nft-item home-4 style-2">
              <div class="nft-inner">
                <div class="nft-thumb">
                  <img src="${item.posterUrl}"
                        alt="${item.nameRu ? item.nameRu : item.nameEn}">
                </div>
                <div class="nft-content">
                  <div class="author-thumb">
                    <a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank" class="veryfied"><img src="${item.posterUrl}"
                        alt="${item.nameRu ? item.nameRu : item.nameEn}"></a>
                  </div>
                  <div class="author-details d-flex flex-wrap align-items-center gap-15">
                    <div class="author-det-info">
                      <h4 class="top-film-title"><a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank">${item.nameRu ? item.nameRu : item.nameEn}</a> </h4>
                      <p class="nft-price yellow-color">Рейтинг ${item.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `);
      }
    })
}

function fetchBestFilms() {
  const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS`;
  fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .then((data) => {
      for (item of data.films) {
        console.log(item);
        appListBestFilms.insertAdjacentHTML('afterbegin', `
            <div class="col-xl-3 col-lg-4 col-sm-6">
							<div class="nft-item home-4">
								<div class="nft-inner">
									<!-- nft top part -->
									<div class="nft-item-top d-flex justify-content-between align-items-center">
										<div class="author-part">
											<ul class="author-list d-flex">
												<li class="single-author d-flex align-items-center">
													<a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank" class="veryfied"><img loading="lazy" src="${item.posterUrl}"
                        alt="${item.nameRu ? item.nameRu : item.nameEn}"></a>													
												</li>
											</ul>
										</div>
										<div class="more-part">
											<div class="dropstart">
												<a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
													aria-expanded="false" data-bs-offset="25,0">
													<i class="icofont-flikr"></i>
												</a>

												<ul class="dropdown-menu">
													<li><a class="dropdown-item" href="#"><span>
																<i class="icofont-warning"></i>
															</span>Пожаловаться</a>
													</li>
													<li><a class="dropdown-item" href="#"><span><i class="icofont-reply"></i></span>Поделиться</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<!-- nft-bottom part -->
									<div class="nft-item-bottom">
										<div class="nft-thumb">
											<img loading="lazy" src="${item.posterUrl}"
                        alt="${item.nameRu ? item.nameRu : item.nameEn}">
										</div>
										<div class="nft-content">
											<h4 class="top-film-title"><a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank">${item.nameRu ? item.nameRu : item.nameEn}</a> </h4>
											<div class="price-like d-flex justify-content-between align-items-center">
												<p class="nft-price">Рейтинг: <span class="yellow-color">${item.rating}</span>
												</p>
												<a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank" class="nft-like">
													${item.year}</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
      `);
      }
    })
}

const initApp = () => {
  fetchReleasesFilms();
  fetchTopFilms();
  fetchAwaitFilms();
  fetchBestFilms();
};

initApp();