async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);


    //Mock request for checking with the response from mockend
    const response2 = await fetch("https://mockend.com/ashwin-dhakaita-T18459/pwa-exercises/posts").then(response => response.json()).then(json => console.log(json))

    // const response2 = await fetch("https://aafreshteam2779.freshhr.com/users?filter_id=&page=1&per_page=14&sort=first_name&sort_type=asc&query_hash%5B0%5D%5Bcondition%5D=record_status&query_hash%5B0%5D%5Boperator%5D=is_in&query_hash%5B0%5D%5Bvalue%5D=2", {
    //     method: "GET",
    //     headers: {
    //         "User-Agent": "freshteam_mobile_ios/2.0",
    //         "Authorization": "JWTAuth token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0..pO1K7dL9U0KnVSG9.hy7KW0nFx_1RuFY4XCXs3woqUiC46k8_Xse4IobYDLNi_KuN7etLBWQA3DAbWTRseHn9P2L7aFSB4A8XQPM4qjp_UcJpTlrxd4YwXdW989cmYC5r3sEQol04Gsti0QL3xRhTqoIK8rSdvbsTV4b7wB--ryFV86ZYKaM6lN4XqH9PodQHHujMrKlEiehFRx3RwKcyqRhgZIEIuJXwuE_8VmOdpV1GQMIlhTBSeYXi2CqX.yX8zJPrQP-py7vwVC9nM7g",
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //         },
    //     //referrerPolicy: 'no-referrer',
    //     credentials: "omit",
    //     mode: "no-cors"
    // });
    
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