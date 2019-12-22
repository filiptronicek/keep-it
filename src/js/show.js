let urlParams = new URLSearchParams(window.location.search);

let photosEncodedArray = urlParams.get("g").split("$");

let photosDecodedArray = [];

$.each(photosEncodedArray, function(index, value) {
  photosDecodedArray.push(atob(value));
  console.log(atob(value));
});
$.each(photosDecodedArray, function(index, value) {
  //$("#images").append(`<img src="https://s.put.re/${value}" loading="lazy" width="50%"><br>`);
  realIndex = index + 1;
  $("body").append(
    `<div class="lightbox" id="lightbox-${realIndex}">
    <div class="content"><img src="https://s.put.re/${value}"/>
      <a class="close" href="#gallery"></a>
    </div>
  </div>`
  );
  $("#gallery").append(
    `<div><img src="https://s.put.re/${value}"/><a href="#lightbox-${realIndex}"></a></div>`
  );
});
