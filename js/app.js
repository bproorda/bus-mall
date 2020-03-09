'use strict';
console.log('this page is running!');

var imageElements = document.getElementsByTagName('img');

var ItemIndex1 = 0;
var ItemIndex2 = 1;
var ItemIndex3 = 2;

var allItems = [];

//add constructor for all items

function Item(name, imageURL) {
    this.name = name;
    this.imageURL = imageURL
    this.timesclicked = 0;
    this.timesShown = 0;
    allItems.push(this);
}

new Item('bag', '../images/bag.jpg');
new Item('banana', '../images/banana.jpg');
new Item('bathroom', '../images/bathroom.jpg');
new Item('boots', '../images/boots.jpg');
new Item('breakfast', '../images/breakfast.jpg');
new Item('bubblegum', '../images/bubblegum.jpg');
new Item('chair', '../images/chair.jpg');
new Item('cthulhu', '../images/cthulhu.jpg');
new Item('dog-duck', '../images/dog-duck.jpg');
new Item('dragon', '../images/dragon.jpg');
new Item('pen', '../images/pen.jpg');
new Item('pet-sweep', '../images/pet-sweep.jpg');
new Item('scissors', '../images/scissors.jpg');
new Item('shark', '../images/shark.jpg');
new Item('sweep', '../images/sweep.jpg');
new Item('tauntaun', '../images/tauntaun.jpg');
new Item('unicorn', '../images/unicorn.jpg');
new Item('usb', '../images/usb.jpg');
new Item('water-can', '../images/water-can.jpg');
new Item('wine-glass', '../images/wine-glass.jpg');
