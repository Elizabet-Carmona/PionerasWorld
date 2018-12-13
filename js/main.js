let paises = [];

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './paises.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function llenarPaises() {
    init();
    const x = document.getElementById("mySelect");
    for (let pais of paises) {
        const option = document.createElement("option");
        option.text = pais.name;
        option.value = pais.name;
        x.add(option);
    }
}

function init() {
    loadJSON(function(response) {
     // Parse JSON string into object
       paises = JSON.parse(response);
    });
}

function show() {
    document.getElementById("pop-up").style.display = "block";
  }
  function hide() {
    document.getElementById("pop-up").style.display = "none";
  }