`use strict`


const busketWrapperEl = document.querySelector(`.busketWrapper`);

//const addToCartBtn = document.querySelector(`.products_cart_button`); // получаем первую кнопку 
const busketCounterEl = document.querySelector(`.busket__number`);

// получаем счетчик на корзине
const bucketTotalvalueEl = document.querySelector(`.bucketTotal`);
// получаем итоговую сумму
const busketEl = document.querySelector(`.fa-cart-shopping`); // находим значек корзины.
const productboxEl = document.querySelector(`.products_box`);// находим родителя для всех товаров
const busketItemBoxFooter = document.querySelector(`.busketItemBoxFooter`); // достаем итоговую строку в горзине. Перед ней будем добавлять товарі


busketEl.addEventListener(`click`, () => {
    busketWrapperEl.classList.toggle(`hidden`); // при нажатии на корзину появляется табличка
})

const busketObj = {}; // создаем обїект для храниния товаров в корзине

/* Вещаем обработчик событий на родительский блок. 
если кликаем мимо кнопки- ничего не делаем  */
productboxEl.addEventListener(`click`, (event) => {
    if (!event.target.closest(`.products_cart_button`))
        return;
    /* Получаем карточку товара на которую кликнули и параметрі товара*/
    const productCart = event.target.closest(`.products_cart`);
    const id = +productCart.dataset.id;
    const name = productCart.dataset.name;
    const price = +productCart.dataset.price;
    // Добавляем товары в корзину с помощью функции 
    addToCart(id, name, price);
});

// ----------------------Cоздаем функцию addToCart---------------------------

function addToCart(id, name, price) {
    // Если такой id не существует в корзине, то добавляем в виде масива
    if (!(id in busketObj)) {
        busketObj[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        }
    };
    // Если уже существует , то просто счетчик увеличиваем на единицу.
    busketObj[id].count++;
    // Меняем в счетчике количество товаров которие мы вибрали
    busketCounterEl.textContent = getTotalBasketCount().toString();
    // Меняем общую сумму в корзине
    bucketTotalvalueEl.textContent = getTotalBasketPrice().toFixed(2);
    // Добавляем разметку в корзину
    renderProductToBusket(id);
    // при нажатии на кнопку меняется кол-во товара в корзине 
    const countItem = busketWrapperEl
        .querySelector(`.busketItemCount[data-productId="${id}"]`)
    countItem.textContent = busketObj[id].count;

    const sumItem = busketWrapperEl
        .querySelector(`.busketItemSum[data-productId="${id}"]`)
    sumItem.textContent = busketObj[id].count * busketObj[id].price;
}

/**
 * Считаем сколько всего товара в корзине в шт.
 * @returns общее количество товара в корзине
 */
function getTotalBasketCount() {
    const productsArr = Object.values(busketObj); // делаем из объекта массив
    let count = 0;
    /*  ---------------------Вариант 1---------------------------
     Перебираем все ел. массива и склаіваем count 
   for (const product of productsArr) {
        count = count + product.count;
    }*/
    // ----------------------2 Вариант----------------------------
    return productsArr.reduce((acc, product) => acc + product.count, 0);
}
/**
 * Считаем общую сумму
 * @returns общая сумма денег на товары в корзине 
 */
function getTotalBasketPrice() {
    const productsArr = Object.values(busketObj);
    return productsArr.reduce((acc, product) =>
        acc + product.count * product.price, 0);
}

/**
 * Добавляет HTML-разметку товара в корзину
 * @param {*} id id товара
 * @returns добавляем HTML товара в корзину
 */
function renderProductToBusket(id) {
    const isProductInBusket =
        document.querySelector(`.busketItemBox[data-productId="${id}"]`);
    // если такого елемента нет то добавляем

    if (!isProductInBusket) {
        // определяем сумму для одного товара
        const sumPriceForOne = busketObj[id].count * busketObj[id].price;
        // при нажетии на кропку добаляется такая разметка
        const НTML =
            `<div class="busketItemBox" data-productId = ${id}>
    <div class="busketItemHeader" >${busketObj[id].name}</div>
    <div class="busketItemHeader busketItemCount" data-productId="${id}" 
    >${busketObj[id].count}</div>
    <div class="busketItemHeader">${busketObj[id].price}</div>
    <div class="busketItemHeader busketItemSum" data-productId="${id}" 
     >${sumPriceForOne}
     </div>
    </div>`;
        busketItemBoxFooter.insertAdjacentHTML("beforebegin", НTML);
    }
    return;
}



