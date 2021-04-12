async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    console.log(window.name)

    var title = document.querySelector("title")
    title.textContent = " " + window.name + " ";

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

	var title = document.querySelector("title").textContent

    console.log(title)

	var url = "../jsons/";
	url = url.concat(title.toLowerCase().trim());
	url = url.concat(".txt");

	console.log(url)

	getapi(url);
});