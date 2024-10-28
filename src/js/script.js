$(document).ready(function () {

    //Переход по ссылке-анкору
    $('.js-link-anchor').on("click", function (e) {
        e.preventDefault();
        var mylink = $(this).attr('href');
        var positionblock = $(mylink).offset().top;

        positionblock = positionblock - 50;

        $('html, body').animate({ scrollTop: positionblock }, 750);
    });

    // Select2
    var haveSelect = $(".select2");
    if (haveSelect.length != 0) {

        $('.select2-choise-car select').select2({
            theme: 'theme-select2-choise-car'
        }).on("change", startSelect2).trigger('change');

        $('.select2-choise-address select').select2({
            theme: 'theme-select2-choise-address',
            templateResult: formatDealer,
            templateSelection: formatDealerSelection
        }).on("change", startSelect2).trigger('change');

        function startSelect2(event) {
            if (this.value !== "") {
                this.parentNode.classList.add('select2--ok');
            }
        }

        var $selectArr = $('.select2 select');
        $selectArr.on("select2:select", function () { this.parentNode.classList.add('select2--ok'); });
        $selectArr.on("select2:unselect", function () { this.parentNode.classList.remove('select2--ok'); });

        function formatDealer(item) {
            if (!item.id) { return item.text; }
            var $item = $(
                '<p class="choise-address__dealer">' + item.element.dataset.name + '</p>' + '<p class="choise-address__address">' + item.element.dataset.address + '</p>' + '<img class="choise-address__icons" src="' + item.element.dataset.img + '.svg" alt="Picture">' + '<img class="choise-address__icons-active" src="' + item.element.dataset.img + '-active.svg" alt="Picture">'
            );
            return $item;
        };
        function formatDealerSelection(item) {
            if (!item.id) { return item.text; }
            var $item = $(
                '<p class="choise-address__dealer">' + item.element.dataset.name + '</p>' + '<p class="choise-address__address">' + item.element.dataset.address + '</p>' + '<img class="choise-address__icons choise-address__icons--result" src="' + item.element.dataset.img + '-choise.svg" alt="Picture">'
            );
            return $item;
        };

    };

    //Открытие карты
    var btnOpenMap = document.querySelector('.js-open-map');
    if (btnOpenMap) {
        btnOpenMap.addEventListener('click', toggleMap);
        var map = document.querySelector('.map');

        function toggleMap(event) {
            event.preventDefault();
            if (this.dataset.status === "not") {
                $(map).slideDown(300);
                this.dataset.status = "open";
                this.innerText = 'Скрыть карту';
                setTimeout(() => { startMap(); }, 1000);
            } else if (this.dataset.status === "open") {
                $(map).slideUp(300);
                this.innerText = 'Посмотреть на карте';
                this.dataset.status = "close";
            } else if (this.dataset.status === 'close') {
                $(map).slideDown(300);
                this.innerText = 'Скрыть карту';
                this.dataset.status = "open";
            }
        }
    }

    //Карусель дат
    function startSliderChoiseDate() {

        var choiseDateSlider = document.querySelector('#choise-date-slider');

        //если есть слайдер и при этом он еще НЕ инициализирован => запускаем слайдер, предварительно вычислив начальный элемент
        if ((choiseDateSlider) && (!(choiseDateSlider.classList.contains('slick-initialized')))) {

            function findCurrentDate() {
                var datesArr = document.querySelectorAll('.choise-date__radio');
                for (var i = 0; i < datesArr.length; i++) {
                    if (datesArr[i].checked === true) {
                        return i - 1;
                    }
                }
            }
            var indexCurrentDate = findCurrentDate();

            $(choiseDateSlider).slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                infinite: false,
                rows: 0,
                prevArrow: '#choise-date-slider-prev',
                nextArrow: '#choise-date-slider-next',
                initialSlide: indexCurrentDate
            })
        }

    }

    //Ф-ция открытия выбора даты и мастера
    var btnOpenMasters = document.querySelector('#open-choise-master');
    if (btnOpenMasters) {
        btnOpenMasters.addEventListener('click', openInfoMastersDates);
    }
    function openInfoMastersDates(event) {
        event.preventDefault();
        if (!(this.classList.contains('btn-choise-master--disabled'))) {
            $(this).slideUp(0);
            var mastersBlock = document.querySelector('#choise-master-block');
            $(mastersBlock).slideDown(300, startSliderChoiseDate);
            setTimeout(() => { document.querySelector('#choise-date-slider').classList.remove('choise-date__slider--hide'); }, 300);
        }
    }

    //PopUp
    function PopUpShow(event, element) {
        if (event) {
            event.preventDefault();
        }
        if ($('.body').hasClass('body--on-popup')) { PopUpHide(); } //если вызов popup из другого popup
        if (element) {
            var linkpopup = $(element).attr('href');
        } else {
            var linkpopup = $(this).attr('href');
        }  

        $(linkpopup).fadeIn(300);
        $('.body').addClass('body--on-popup');

        var container = $('.popup__container');
        $('.popup').mouseup(function (element) {
            if (!container.is(element.target) // если клик был не по нашему блоку
                && (container.has(element.target).length === 0)) { // и не по его дочерним элементам
                PopUpHide(); // скрываем его
            }
        });
        
    }
    function PopUpHide() {
        $(".popup").fadeOut(300);
        $('.body').removeClass('body--on-popup');
    }
    PopUpHide();
    $(document).keydown(function (eventObject) {
        if (eventObject.which == 27) {
            PopUpHide();
        }
    });
    $(".js-call-popup").on("click", PopUpShow);
    $('.popup__close').on("click", PopUpHide);

    //PopUp можно вызвать принудительно, с помощью 
    //PopUpShow(null, `<a href="#succes-send"></a>`);
    //где ссылка содержит id popUp-а

    // setTimeout(()=>{
    //     PopUpShow(null, `<a href="#succes-send"></a>`);
    // }, 300);
    
    // Выпадающий список марок
    document.querySelector('.icon-menu').addEventListener('click', function () {
        document.querySelector('.service-marks__icons').classList.toggle('show');
        document.querySelector('.menu-open').classList.toggle('show');
        document.querySelector('.menu-close').classList.toggle('show');
    }) 

}) 

/*Полифилы для ie*/
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}