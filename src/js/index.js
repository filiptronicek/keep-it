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
      $('#fileSelect').text('Upload Image');
      resetFileInputField();
    }
    removeError($('#imageError'), $('#image'));
  }, false);

  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);

} // end of eventImageSetup
function uploadRe($files) {
    console.log($files);
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
  
  
    $.ajax(settings).done(function(response) {
      var data = JSON.parse(response);
      console.log(data);
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


  var file = files[0];

  uploadRe(file);
  //console.log("This is the file: ", file);

  var imageType = /^image\//;
  if (!imageType.test(file.type)) {
    // a bunch of code to deal with this...
    return;
  }
  if (file.size > MAX_FILE_SIZE) {
    // a bunch of code to deal with this..
    return;
  }
  var img = document.createElement("img");
  img.onload = function() {
    //adjustImageSize(img);
  };
  $('#dropbox').addClass('hidden');
  $('#preview').removeClass('hidden');
  $('#preview').empty();
  $('#preview').append(img);
  $('#fileSelect').text('Replace Image');
  var reader = new FileReader();
  reader.onload = function(e) {
    img.src = e.target.result;
    img.height = "150";
  }
  reader.readAsDataURL(file);
}

eventImageSetup();