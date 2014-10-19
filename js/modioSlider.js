
window.onload=function(){
(function (){

var sliderWidth =      800,      // Ширина слайдера
	sliderHeight =     300,      // Высота слайдера
	respons =          false,    // Адаптивность (при значении true, sliderWidth будет игнорироваться)
	leftRightBut =     true,     // Кнопки пролистывания налево и направо
	slideSpeed =       20,       // Скорость пролистывания
	autoPlay =         true,     // Автопролистывание 
	autoPlayIntrval =  2000;     // Задержка при автопролистывании 


/////////////////////////АНАЛИЗИРУЕМ DOM/////////////////////////
// window.onresize = function(event) {};

if (respons) {sliderWidth= document.documentElement.clientWidth};
var modioElem; // Глобальная переменная, в которой хранится DOM - элемент, внутри которого будет слайдер

// Поиск элемента с атрибутом 'data-modio' со значением 'slider'
function modioElemSearch(){
	var allDivs = document.getElementsByTagName('div');
	for (var i = 0; i<allDivs.length; i++){
		if (allDivs[i].hasAttribute('data-modio') && allDivs[i].getAttribute('data-modio') === 'slider'){
			modioElem = allDivs[i];
		}
	}
}

modioElemSearch(); // Запускаем функцию поиска
var modioSlides = modioElem.children;  // Массив слайдов

/////////////////////////СОЗДАЕМ DOM ЭЛЕМЕНТЫ СЛАЙДЕРА/////////////////////////

//Объект слайдера
var slider = {
		width: sliderWidth,                  // Ширина слайдера
		height: sliderHeight,                // Высота слайдера
		slidesNum: modioSlides.length,       // Количество слайдов
		activeSlide: 1,                      // Номер активного слайда
		slideWrapperPos: 0                   // Позиция обертки слайдов
	};

modioElem.id = 'slider'; // Присваиваем элементу слайдера ID
modioElem.setAttribute('class', 'slider') //Присваиваем элементу слайдера class
modioElem.style.width = sliderWidth+'px';
modioElem.style.height = sliderHeight+'px';

var modioSlidesHTML = ''; // Переменная с HTML содержимым тега с классом 'slideWrapper'

if (leftRightBut) {
	var controlButtons = '<div class="leftBtn" id="leftBtn" style="left:0;width: 50px; height: 100%; position: absolute; background-color: #fff; cursor: pointer; opacity: 0.5;"></div><div class="rightBtn" id="rightBtn" style="right:0 ;width: 50px; height: 100%; position: absolute; background-color: #fff; cursor: pointer; opacity: 0.5;"></div>'
}
else{
	controlButtons = '';
}
// Добавляем все слайды в менеменную modioSlidesHTML
var cssLeft = -slider.width; // Переменная отступа слева
for (var i = 0; i < modioSlides.length; i++){
	cssLeft += slider.width;
	modioSlidesHTML += '<div id="slide'+i+'" style="left:'+cssLeft+'px; width:'+sliderWidth+'px; height:'+sliderHeight+'px; position: absolute; overflow: hidden; "class="slide'+i+'">'+modioSlides[i].innerHTML+'</div>';
}

// Заполняем элемент слайдера содержимым
modioElem.innerHTML = '<div id="slideWrapper" class="slideWrapper" style="left:0; position: absolute;">'+modioSlidesHTML+'</div>'+controlButtons

//css слайдера
modioElem.style.position = 'relative';
modioElem.style.overflow = 'hidden';
modioElem.style.backgroundColor = 'grey';

/////////////////////////АНИМАЦИЯ СЛАЙДЕРА/////////////////////////

//функция анимации
function animLeft(speed, pos){
	var x = parseInt(slideWrapper.style.left);

	var move = setInterval(function(){
		if (x < pos){
			x += 30;
			slideWrapper.style.left = x+'px';
		}
		else {
			clearInterval(move);
			slideWrapper.style.left = pos+'px';
		};
	}, speed)
}

function animRight(speed, pos){
	var x = parseInt(slideWrapper.style.left);

	var move = setInterval(function(){
		if (x > pos){
			x -= 30;
			slideWrapper.style.left = x+'px';
		}

		else {
			clearInterval(move);
			slideWrapper.style.left = pos+'px';
		};
	}, speed)
}

var leftBtn = document.getElementById('leftBtn'),
	rightBtn = document.getElementById('rightBtn'),
	sliderWrapper = document.getElementById('sliderWrapper');

//Функция клика налево
var xLeft = function (){
	
	if (slider.activeSlide != 1){
		slider.activeSlide -=1
		slider.slideWrapperPos +=slider.width;
		// slideWrapper.style.left = slider.slideWrapperPos+'px'
		animLeft(slideSpeed, slider.slideWrapperPos);
	}
	else{
		slider.activeSlide = slider.slidesNum;
		slider.slideWrapperPos = -(slider.width * (slider.slidesNum-1));
		// slideWrapper.style.left = slider.slideWrapperPos+'px'
		animRight(slideSpeed/slider.slidesNum, slider.slideWrapperPos);

	}
	console.log(slider)
}

//Функция клика направо
 var xRight = function (){
	if (slider.activeSlide != slider.slidesNum){
		slider.activeSlide +=1
		slider.slideWrapperPos -=slider.width;
		// slideWrapper.style.left = slider.slideWrapperPos+'px'
		animRight(slideSpeed, slider.slideWrapperPos);
		
	}
	else{
		slider.activeSlide = 1
		slider.slideWrapperPos = 0;
		// slideWrapper.style.left = slider.slideWrapperPos+'px'
		animLeft(slideSpeed/slider.slidesNum, slider.slideWrapperPos);
	}
}

// Если кнопки пролистывания включены, выполнять функцию по клику на них
if (leftRightBut) {
	leftBtn.onclick = function(){xLeft()}
	rightBtn.onclick = function(){xRight()}
};

//Функция автопролистывания
function autoplay(){
	if (autoPlay === true) {
		var autoplayTimer = setInterval (xRight, autoPlayIntrval);
	};
}

autoplay()

}());
};