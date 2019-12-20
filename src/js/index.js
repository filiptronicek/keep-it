var width = 0;
var MAX_FILE_SIZE = Infinity; // ignore this

function eventImageSetup() {

  $(dropbox).height($('#imageBorder').height());

  fileSelect.addEventListener("click", function() {
    image.click();
  }, false);

  fileRemove.addEventListener("click", function() {
    if (!$('#preview').hasClass('hidden')) { // If there is an image uploaded
      $('#preview').empty();
      $('#dropbox').removeClass('hidden');
      $('#preview').addClass('hidden');
      resetFileInputField();
    }
    removeError($('#imageError'), $('#image'));
  }, false);

  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);

} // end of eventImageSetup
function uploadRe($files, toUpload, index) {
    //console.log($files);
    // Begin file upload
    console.log("Uploading file to put.re..");
  
    // API Endpoint
    var apiUrl = "https://api.put.re/upload";
  
    var settings = {
      async: false,
      crossDomain: true,
      processData: false,
      contentType: false,
      type: "POST",
      url: apiUrl,
      mimeType: "multipart/form-data"
    };
  
    var formData = new FormData();
    formData.append("image", $files);
    settings.data = formData;
  
    console.log("Proccessing no. "+ index);

    $.ajax(settings).done(function(response) {

      var data = JSON.parse(response);
      console.log(data.data.link);
      document.getElementById("images").innerHTML += `<img src="${data.data.link}"> <br>"`;


      index ++;

      var elem = document.getElementById("myBar");   
        if (width >= toUpload) {
          width = (index / toUpload) * 100;
          elem.style.width = width + '%'; 
          document.getElementById("myP").className = "w3-text-green w3-animate-opacity";
          document.getElementById("myP").innerHTML = `Successfully uploaded ${toUpload} photos!`;
        } else {
          width = (index / toUpload) * 100;
          elem.style.width = width + '%'; 
          var num = index;
          document.getElementById("demo").innerHTML = num;
        }

    });
  }

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  var dt = e.dataTransfer;
  var files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {

  $(".w3-container").show();

  $.each(files, function (index, value) {
    $("#toCount").text(files.length);
    var toUpload = files.length;
    var file = value;

    uploadRe(file, toUpload, index);

    //console.log(file);
    var imageType = /^image\//;
    if (!imageType.test(file.type)) {
      // a bunch of code to deal with this...
    }
    if (file.size > MAX_FILE_SIZE) {
      // a bunch of code to deal with this..
      return;
    }
  });

  //console.log("This is the file: ", file);


  var img = document.createElement("img");
  img.onload = function() {
    //adjustImageSize(img);
  };

}

eventImageSetup();