document.addEventListener('DOMContentLoaded', () => {
  //Проверка ошибок console.log() 


  //--*Меню(data-target) клик или is-open--is-active*--//
  document.querySelectorAll(".header__center-item-btn_js").forEach(item => {
    item.addEventListener("click", function () {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".header__center-dropdown_js");

      document.querySelectorAll(".header__center-item-btn_js").forEach(el => {
        if (el != btn) {
          el.classList.remove("active--btn");
        }
      });

      document.querySelectorAll(".header__center-dropdown_js").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("active-list--item");
        }
      })
      dropdown.classList.toggle("active-list--item");
      btn.classList.toggle("active--btn")
    })
  })

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".header__center-list_js")) {
      document.querySelectorAll(".header__center-dropdown_js").forEach(el => {
        el.classList.remove("active-list--item");
      })
      document.querySelectorAll(".header__center-item-btn_js").forEach(el => {
        el.classList.remove("active--btn");
      });
    }
  });
  //--* // Меню(data-target) клик или is-open--is-active*--//


  /*Клик БУРГЕР-Саши*/
  // $ предполагает использование библиотеки jQuery. В codepen-е без неё работает, в других местах без библиотеки jQuery не работает
  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#menu');

  burger.addEventListener('click', function () {
    burger.classList.add('open');

    menu.classList.toggle('is-active');

    if (menu.classList.contains('is-active')) {
      menu.style.transition = 'transform .7s ease-in-out';
    }
  });
  menu.addEventListener('transitionend', function () {
    if (!menu.classList.contains('is-active')) {
      menu.style.transition = '';
      burger.classList.remove('open');
    }
  });



  //--*Расскрытие лупы для поиска*--//
  const search = document.querySelector('.header__center-form');
  const searchBtn = document.querySelector('.header__center-search');
  const searchInput = document.querySelector('.header__center-input');
  const searchClose = document.querySelector('.header__center-close');

  // search Лупа
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.classList.add('header__center-input--active');
    search.classList.add('search-active');
    searchClose.classList.add('header__center-close-active');
  })

  searchClose.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.classList.remove('header__center-input--active');
    search.classList.remove('search-active');
    searchClose.classList.remove('header__center-close-active');
  })

  window.addEventListener('click', (event) => {
    if (!search.contains(event.target)) searchInput.classList.remove('header__center-input--active');
    if (!search.contains(event.target)) search.classList.remove('search-active');
    if (!search.contains(event.target)) searchClose.classList.remove('header__center-close-active');
  });
  //--* // Расскрытие лупы для поиска*--//



  //about__bottom-btn_moreJs-Смотреть больше товаров//
  windowWidth = document.documentElement.clientWidth;
  const moreBtn = document.querySelector(".about__bottom-btn_moreJs"),
    ratingList = document.querySelector(".about__bottom-list_js");
  const divanBtn = document.querySelector(".about__bottom-btn") // Для обёртки if
  if (divanBtn) { // Обёртка if. Спасение Gulp-а от null в браузере
    let immediatelyShownCount;
    immediatelyShownCount = windowWidth >= 1350 ? 6 : 6;
    for (let e = 0; e < ratingList.childElementCount; ++e)
      e >= immediatelyShownCount && (ratingList.children[e].style.display = "none",
        ratingList.children[e].style.opacity = "0",
        ratingList.children[e].style.transform = "translateY(40px) scaleX(.8)");
    moreBtn.addEventListener("click", () => {
      let e;
      const t = document.documentElement.clientWidth;
      e = t >= 1350 || t <= 1021 ? 4 : 3;
      const r = ratingList.querySelectorAll(".about__bottom-item_js");
      let s = 100;
      r.forEach(e => {
          "none" === window.getComputedStyle(e).display && (e.style.display = "inline-flex",
            setTimeout(() => {
              e.style.opacity = "1",
                e.style.transform = "translateY(0) scaleX(1)"
            }, s),
            s += 100)
        }),
        moreBtn.style.display = "none"
    });
  };


  // Гостиница для дом.животных модал - recording
  const btnCloseBuy = document.querySelector('.recording__modal-close_js');
  const modalBuy = document.querySelector('.recording__dog_js');
  if (modalBuy) {
    btnCloseBuy.addEventListener('click', function () {
      document.querySelector('.recording__dog_js').classList.toggle('recording__dog_js_active');
    });
    modalBuy.addEventListener('click', function (event) {
      if (event._notClick) return;
      modalBuy.classList.remove('recording__dog_js_active');
      document.querySelector('.recording__dog-sps_js').classList.remove('recording__dog-sps_js_active');
    });    
  }




  // inputmask - Телефон/d-31
  const formJs = document.querySelector('.recording__form_js');
  if (formJs) { // Обёртка if. Спасение Gulp-а от null в браузере
    const telSelector = formJs.querySelector('input[type="tel"]');
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    // const validateForms = function validateForms(form, selector, successModal, yaGoal) {
    new window.JustValidate('.recording__form_js', {
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLenght: 10,
          strength: {
            custom: '^[А-яёЁ\s-]' //только по русски текст
            //custom: '^[а-яёЁ\s]+$'только по русски и маленькими буквами
            //custom: '^[a-yeO\s]+$'только по английски текст
          }
        },
        tel: {
          required: true,
          function: () => {
            const phone = telSelector.inputmask.unmaskedvalue();
            return Number(phone) && phone.length === 10;
          }
        },
        /*checkbox: { // Обязательная галка
          required: true
        }*/
      },
      colorWrong: '#ff6972',
      messages: {
        name: {
          required: 'Введите ваше имя',
          minLength: 'Введите 3 и более символов',
          maxLength: 'Запрещено вводить более 15 символов',
          strength: 'Текст только по русски'
          //strength: 'Текст только по русски и маленькими буквами'
          //strength: 'Текст только по английски'
        },
        email: {
          email: 'Недопустимый формат',
          required: 'Введите email'
        },
        tel: {
          required: 'Введите ваш телефон',
          function: 'Здесь должно быть 11 симв..'
        }
        // checkbox: {
        //   required: 'Поставьте галочку',
        //   function: 'Здесь должна быть галка'
        // }
      },

      //*отправка формы*/
      submitHandler: function (thisForm) {
        let formData = new FormData(thisForm);
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            } //if xhr
          }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);
        thisForm.reset();
        document.querySelector('.recording__dog_js').classList.toggle('recording__dog_js_active');
        document.querySelector('.recording__dog-sps_js').classList.toggle('recording__dog-sps_js_active');
      }
    })
  }



  //--Табы (gallery__bay Каталог-фото ремонт авто)--//
  const allTabBtns = document.querySelectorAll('.js-tabs-btn');

  allTabBtns.forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {

      // event.preventDefault();//Отменяем клик ссылке

      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.tab-content').forEach(function (tabContent) {
        tabContent.classList.remove('tab-content-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active')

      allTabBtns.forEach(function (el) {
        el.classList.remove('is-active');
      });

      this.classList.add('is-active');
    })
  });





  //Код для Ютюб видео video-iframe - Остановить проигрывание видео при клике на другое видео.
  const videoOb = document.querySelector(".video-iframe") // Для обёртки if
  if (videoOb) { // Обёртка if. Спасение Gulp-а от null в браузере*/
    // Массив с id видео /*Для Video 1*/
    const videos = [{
      id: "APxa_mwQCHQ"
    }];
    const tag = document.createElement('script');
    const players = [];
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    const pVideo = document.querySelector(".video-iframeOne");
    for (var i = 0; videos.length > i; i++) {
      // Создаем дочерние элементы с id
      const newDiv = document.createElement("div");
      newDiv.setAttribute("id", videos[i].id);
      // Добавление элементов видео в родительских контейнер        
      pVideo.appendChild(newDiv);
      item = document.querySelector("#" + videos[i].id).getAttribute("id");
      var player;
      players.push(item);
    }

    /*Для Video 2*/
    const videosTwo = [{
      id: "FpK0xr_EJQI"
    }];
    const pVideoTwo = document.querySelector(".video-iframeTwo");
    for (var i = 0; videosTwo.length > i; i++) {
      // Создаем дочерние элементы с id
      const newDivTwo = document.createElement("div");
      newDivTwo.setAttribute("id", videosTwo[i].id);
      // Добавление элементов видео в родительских контейнер        
      pVideoTwo.appendChild(newDivTwo);
      item = document.querySelector("#" + videosTwo[i].id).getAttribute("id");
      var player;
      players.push(item);
    }

    /*Общая функция для всех видео стили*/
    // function onYouTubeIframeAPIReady() { 
    window.onYouTubeIframeAPIReady = function () {
      for (var k = 0; players.length > k; k++) {
        players[k] = new YT.Player(players[k], {
          width: '560',
          height: '315',
          videoId: players[k],
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
    }
    function onPlayerReady(event) {
      event.target.stopVideo();
    }
    /*Общая функция для всех видео стоп*/
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        const temp = event.target.getVideoUrl();
        for (var i = 0; i < players.length; i++) {
          if (players[i].getVideoUrl() != temp) players[i].stopVideo();
        }
      }
    }
  }; //Обёртка if.
  // -//- Код для Ютюб видео video-iframe - Остановить проигрывание видео при клике на другое видео.



  




}); // DOMContentLoaded