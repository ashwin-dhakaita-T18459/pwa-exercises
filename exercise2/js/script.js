async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    console.log(window.name)

    var title = document.querySelector("title")
    title.innerHTML = " " + window.name + " ";

    var h1 = document.querySelector("h1")
    h1.innerHTML = " " + window.name + " ";

    var img = document.querySelector("img")
    img.src = "../" + window.name + ".jpg"

    if (window.name == "Earth") {
        img.src = "../earth2.jpg";  
    }

    if (window.name == "Venus") {
        img.src = "../venus.png";
    }


    var idx = 0;
    var selectors = document.querySelectorAll(".right-floating-p")

    for (var i=0; i<data.details.length; i++) {

    	var element = selectors[idx];
    	element.textContent = data["details"][i];
    	idx += 1;
    }

    selectors[idx].innerHTML = "";
    for (var i=0; i<data.bullets.length; i++) {

    	var element = selectors[idx];
    	element.innerHTML += "<li>" + data.bullets[i] + "</li>";
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

	var title = window.name

    console.log(title)

	var url = "../jsons/";
	url = url.concat(title.toLowerCase().trim());
	url = url.concat(".txt");

	console.log(url)

	getapi(url);
});