(function () {
  var stop = true;

  function rolling(id, idx, cnt) {
    var items = document.querySelectorAll("#" + id + " a");
    visibleitem = items[idx].innerText;
    items.forEach(function (d, i) {
      d.style.display = i == idx ? "block" : "none";
    });
    if (!stop)
      window.setTimeout(function () {
        rolling(id, idx + 1 >= cnt ? 0 : idx + 1, cnt);
      }, 50);
  }

  function launch() {
    window.scrollTo(0, 0);

    stop = false;
    rolling("l_lunch", 0, document.querySelectorAll("#l_lunch a").length);
  }

  function choose(e) {
    if ((!e.keyCode || e.keyCode == 13 || e.keyCode == 32) && !stop) {
      e.preventDefault();
      var domain = window.location.href.replace("http://", "").split("/")[0];
      stop = true;
    }
  }

  window.onload = function () {
    document
      .querySelector(".reload")
      .addEventListener("click", function (event) {
        event.preventDefault();
        stop = false;
        launch();
      });

    document
      .querySelector(".button")
      .addEventListener("click", function (event) {
        choose(event);
      });
    launch();
  };
})();
