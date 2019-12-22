let urlParams = new URLSearchParams(window.location.search);


let photosEncodedArray = urlParams.get("g").split("$");

let photosDecodedArray = [];

$.each(photosEncodedArray, function(index, value) {
    photosDecodedArray.push(atob(value));
    console.log(atob(value));
});
$.each(photosDecodedArray, function(index, value) {
    $("#images").append(`<img src="https://s.put.re/${value}" loading="lazy" width="50%"><br>`);
});