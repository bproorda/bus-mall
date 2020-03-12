'use strict';
console.log('this page is running!');

//global variables
var imageElements = document.getElementsByTagName('img');
var totalclicks = 0;
var rounds = 25;
var itemIndex = [];
var itemNames = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass"];
var imageURLs = ["images/bag.jpg", "images/banana.jpg", "images/bathroom.jpg", "images/boots.jpg", "images/breakfast.jpg", "images/bubblegum.jpg", "images/chair.jpg", "images/cthulhu.jpg", "images/dog-duck.jpg", "images/dragon.jpg", "images/pen.jpg", "images/pet-sweep.jpg", "images/scissors.jpg", "images/shark.jpg", "images/sweep.png", "images/tauntaun.jpg", "images/unicorn.jpg", "images/usb.gif", "images/water-can.jpg", "images/wine-glass.jpg"];

var arrayOfItems = [itemNames, imageURLs];
var allItems = [];
var numberOfItems = 3;
var percents = [];

//add constructor for all items
function Item(name, imageURL, timesClicked=0, timesShown=0) {
    this.name = name;
    this.imageURL = imageURL
    this.timesClicked = timesClicked;
    this.timesShown = timesShown;
    allItems.push(this);
}

//checking for local storage

var savedItemsString = localStorage.getItem('savedItems')

if(savedItemsString) {
    console.log('using saved data');
    var arrayOfSavedItems = JSON.parse(savedItemsString);

    //creating item objects from saved data
    for (var i = 0; i < arrayOfSavedItems.length; i++) {
       var xyz = new Item(arrayOfSavedItems[i].name,
            arrayOfSavedItems[i].imageURL,
            arrayOfSavedItems[i].timesClicked,
            arrayOfSavedItems[i].timesShown);
    } 
}else {

//creating objects from scratch
for (var i = 0; i  < arrayOfItems[0].length; i++) {
    new Item(arrayOfItems[0][i], arrayOfItems[1][i]);

}
}
//attempting stretch goal of making item images dynamically
var imageLocation = document.getElementById('images');
for (var i = 0; i < numberOfItems; i++) {
    var image = document.createElement('img');
    image.src = allItems[i].imageURL;
    // console.log(image.src)
    image.setAttribute('id', (i + 1));
    allItems[i].timesShown++;
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
        // console.log(totalclicks + ' clicks');

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

    localStorage.setItem('savedItems', JSON.stringify(allItems));
    var resultList = document.getElementById('results');
    resultList.style.display = 'inline-block';

    var footer = document.getElementById('footer');
    footer.style.display = 'inline-block';

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
        math = Math.round( ( (allItems[i].timesClicked / allItems[i].timesShown).toFixed(2) * 100) );
    }
    li.textContent = `${allItems[i].name}:   Shown ${allItems[i].timesShown} times,    Clicked ${allItems[i].timesClicked} times,   Percent clicked is   ${math}%`
    listNode.appendChild(li);
 }

var picture = document.getElementById('images');
picture.style.display = 'none';
 createChart();
 radar();
 findThePercentage();
 homerSimpson();
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

function findThePercentage() {
    console.log(allItems.length)
    for (var i = 0; i < allItems.length; i++) {
        var randomVariable = Math.round( ( (allItems[i].timesClicked / allItems[i].timesShown).toFixed(2) * 100) );
        percents.push(randomVariable);
    }
    console.log(percents);
    return percents;
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
               'red',
                'blue',
                'purple',
                'yellow',
                'green',
                'black',
                'gray',
                'brown',
                'maroon',
                'teal',
                'navy',
                'olive',
                'silver',
                'fuschia',
                'lime',
                'DarkTurquoise',
                'MediumSpringGreen',
                'MidnightBlue',
                'ForestGreen',
                'SaddleBrown'
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

function homerSimpson() {
    var ctx = document.getElementById('myChart2').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: findTheProperty('name'),
        datasets: [{
            label: '% clicked when shown',
            data: percents,
            backgroundColor: [
                'red',
                'blue',
                'purple',
                'yellow',
                'green',
                'black',
                'gray',
                'brown',
                'maroon',
                'teal',
                'navy',
                'olive',
                'silver',
                'fuschia',
                'lime',
                'DarkTurquoise',
                'MediumSpringGreen',
                'MidnightBlue',
                'ForestGreen',
                'SaddleBrown'
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
          backgroundColor: "rgba(139,0,0,.5)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: findTheProperty('timesShown')
        }, {
          label: "Times Clicked",
          fill: true,
          backgroundColor: "rgba(124, 104, 238,1)",
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
