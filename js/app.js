'use strict';
console.log('this page is running!');

//global variables
var imageElements = document.getElementsByTagName('img');
var totalclicks = 0;
var rounds = 25;
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
    imageElements[i].addEventListener('click', itemWasClicked);
  }

//main function
function itemWasClicked(event) {
        totalclicks++;
        console.log(totalclicks + ' clicks');

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
    
    if (!itemIndex.every(function(number) {
        return number !== nextItem;
    })) {
        nextItem = Math.floor(Math.random() * allItems.length);
    } 
    }
    itemIndex[i] = nextItem;
    allItems[itemIndex[i]].timesShown++;
}
for (var z = 0; z < imageElements.length; z++) {
    imageElements[z].src = allItems[itemIndex[z]].imageURL;
}

//removing event listener when max rounds reached
if (totalclicks === rounds) {
    var resultList = document.getElementById('results');
    resultList.style.display = 'inline-block';

    var pageHeader = document.getElementById('pageHeader');
    pageHeader.textContent = 'Results of Survey';

    for(var i = 0; i < imageElements.length; i++){
        imageElements[i].removeEventListener('click', itemWasClicked);
      }
      console.log('event listener removed!');

 //creating result list  
 var listNode = document.getElementById('results');

 for (var i = 0; i < allItems.length; i++) {
     var li = document.createElement('li');
    if (allItems[i].timesClicked === 0) {
        var math = 0;
    } else {
        math = Math.round( ( (allItems[i].timesClicked / allItems[0].timesShown).toFixed(2) * 100) );
    }
    li.textContent = `${allItems[i].name}:   Shown ${allItems[i].timesShown} times,    Clicked ${allItems[i].timesClicked} times,   Percent clicked is   ${math}%`
    listNode.appendChild(li);
 }

var picture = document.getElementById('images');
picture.style.display = 'none';
 createChart();
 radar();
//end of if statment, long isn't it?  
}
//end of function curly bracket
}

function findTheProperty(nameOfTheProperty) {
    var answer = [];
    for (var i = 0; i < allItems.length; i++) {
        answer[i] = allItems[i][nameOfTheProperty]
    }
    return answer;
}

function createChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: findTheProperty('name'),
        datasets: [{
            label: '# of Votes',
            data: findTheProperty('timesClicked'),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

function radar() {
new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
      labels: findTheProperty('name'),
      datasets: [
        {
          label: "Times Shown",
          fill: true,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: findTheProperty('timesShown')
        }, {
          label: "Times Clicked",
          fill: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: findTheProperty('timesClicked')
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Comparison of times clicked with times shown'
      }
    }
});
}
