import { KAKAO_API_KEY } from './env.js';
async function getPlacesByPage(lat, lon, radius, page) {
  const apiKey = KAKAO_API_KEY;
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${lat}&x=${lon}&radius=${radius}&category_group_code=FD6&sort=distance&page=${page}&query=음식점`;
  let places;
  // page 1, 2, 3 돌면서 여러개 수집 후 array로 만들기
  await fetch(url, {
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      places = data.documents.map((document) => document.place_name);
      return;
    });
  return places;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const radius = 2000; // 반경 1km 내의 맛집을 검색합니다.
    const places = [
      ...(await getPlacesByPage(lat, lon, radius, 1)),
      ...(await getPlacesByPage(lat, lon, radius, 2)),
      ...(await getPlacesByPage(lat, lon, radius, 3)),
    ];
    let options = '';
    places.forEach((placeName) => {
      options += `<a href="#">${placeName}</a>`;
    });
    const list = document.getElementById('l_lunch');
    list.innerHTML = options;
  });
} else {
}

(function () {
  var stop = true;

  function rolling(id, idx, cnt) {
    var items = document.querySelectorAll('#' + id + ' a');
    let visibleitem = items[idx].innerText;

    items.forEach(function (d, i) {
      d.style.display = i == idx ? 'block' : 'none';
    });
    if (!stop)
      window.setTimeout(function () {
        rolling(id, idx + 1 >= cnt ? 0 : idx + 1, cnt);
      }, 45);
  }

  function launch() {
    window.scrollTo(0, 0);

    stop = false;
    rolling('l_lunch', 0, document.querySelectorAll('#l_lunch a').length);
  }

  function choose(e) {
    if ((!e.keyCode || e.keyCode == 13 || e.keyCode == 32) && !stop) {
      e.preventDefault();
      var domain = window.location.href.replace('http://', '').split('/')[0];
      stop = true;
    }
  }

  window.onload = function () {
    document
      .querySelector('.reload')
      .addEventListener('click', function (event) {
        event.preventDefault();
        stop = false;
        launch();
      });

    document
      .querySelector('.button')
      .addEventListener('click', function (event) {
        choose(event);
      });
    launch();
  };
})();
