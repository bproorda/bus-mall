'use strict';
console.log('this page is running!');


//global variables
var imageElements = document.getElementsByTagName('img');

var totalclicks = 0;

var rounds = 25;

// var itemIndex1 = 0;
// var itemIndex2 = 1;
// var itemIndex3 = 2;
var itemIndex = [];

var allItems = [];

var numberOfItems = 3;

//add constructor for all items
function Item(name, imageURL) {
    this.name = name;
    this.imageURL = imageURL
    this.timesClicked = 0;
    this.timesShown = 0;
    allItems.push(this);
}


//objects
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
new Item('sweep', '../images/sweep.png');
new Item('tauntaun', '../images/tauntaun.jpg');
new Item('unicorn', '../images/unicorn.jpg');
new Item('usb', '../images/usb.gif');
new Item('water-can', '../images/water-can.jpg');
new Item('wine-glass', '../images/wine-glass.jpg');


//attempting stretch goal of making item images dynamically
var imageLocation = document.getElementById('images');
for (var i = 0; i < numberOfItems; i++) {
    var image = document.createElement('img');
    image.src = allItems[i].imageURL;
    // console.log(image.src)
    image.setAttribute('id', (i + 1));
    // console.log(imageElements, image.getAttribute('id'));
    imageLocation.appendChild(image);
    itemIndex.push(i);
}


//event listener
for(var i = 0; i < imageElements.length; i++){
    // console.log('this is the event listener for the click on pizza event');
    //   debugger;
    imageElements[i].addEventListener('click', itemWasClicked);
  }

//main function
function itemWasClicked(event) {
        totalclicks++;
        console.log(totalclicks + ' clicks');
        // if(event.srcElement.id === '1'){
        //     allItems[itemIndex1].timesClicked++;
        //     // console.log('1 was clicked');
        //   } else if (event.srcElement.id === '2'){
        //     allItems[itemIndex2].timesClicked++;
        //     // console.log('2 was clicked');
        // } else if (event.srcElement.id === '3'){
        //     allItems[itemIndex3].timesClicked++;
        //     // console.log('3 was clicked'); 
        //   }



//attempting to rework this part for the stretch goal

for (var w = 0; w < imageElements.length; w++) {
    var checkAgainst = w + 1;
    var checkAgainst2 = checkAgainst.toString();
    if (event.srcElement.id == checkAgainst2) {
        allItems[itemIndex[w]].timesClicked++;
    }
}

for (var i = 0; i < itemIndex.length; i++) {
    var nextItem = Math.floor(Math.random() * allItems.length);
    for (var j = 0; j < itemIndex.length; j++) {
    
    if (nextItem === itemIndex[j]) {
        nextItem = Math.floor(Math.random() * allItems.length);
    } 
    }
    itemIndex[i] = nextItem;
    allItems[itemIndex[i]].timesShown++;
}
for (var z = 0; z < imageElements.length; z++) {
    imageElements[z].src = allItems[itemIndex[z]].imageURL;
}





// //change picture after click, making sure not to repeat
// //next Item 1
// var nextItem1 = Math.floor(Math.random() * allItems.length);
// while (nextItem1 === itemIndex1 || nextItem1 === itemIndex2 || nextItem1 === itemIndex3) {
//     nextItem1 = Math.floor(Math.random() * allItems.length);
// }
// itemIndex1 = nextItem1;
// allItems[itemIndex1].timesShown++;
// console.log(itemIndex1);

// //next Item 2
// var nextItem2 = Math.floor(Math.random() * allItems.length);
// while (nextItem2 === itemIndex1 || nextItem2 === itemIndex2 || nextItem2 === itemIndex3) {
//     nextItem2 = Math.floor(Math.random() * allItems.length);
// }
// itemIndex2 = nextItem2;
// allItems[itemIndex2].timesShown++;
// console.log(itemIndex2)

// //next Item 3
// var nextItem3 = Math.floor(Math.random() * allItems.length);
// while (nextItem3 === itemIndex1 || nextItem3 === itemIndex2 || nextItem3 === itemIndex3) {
//     nextItem3 = Math.floor(Math.random() * allItems.length);
// }
// itemIndex3 = nextItem3;
// allItems[itemIndex3].timesShown++;
// console.log(itemIndex3);


// //display images 
// imageElements[0].src = allItems[itemIndex1].imageURL;
// imageElements[1].src = allItems[itemIndex2].imageURL;
// imageElements[2].src = allItems[itemIndex3].imageURL;


//removing event listener when max rounds reached
if (totalclicks === rounds) {
    for(var i = 0; i < imageElements.length; i++){
        imageElements[i].removeEventListener('click', itemWasClicked);
      }
      console.log('event listener removed!');

 //creating result list  
 var listNode = document.getElementById('results');

 for (var i = 0; i < allItems.length; i++) {
     var li = document.createElement('li');
     li.textContent = `${allItems[i].name}: shown ${allItems[i].timesShown}, times  clicked ${allItems[i].timesClicked} times. clicked ${Math.floor(((allItems[i].timesClicked / allItems[i].timesShown)*100))}%`
     listNode.appendChild(li);
 }

 

//end of if statment, long isn't it?  
}


//end of function curly bracket
}
