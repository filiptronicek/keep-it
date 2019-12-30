let width = 0;
let MAX_FILE_SIZE = Infinity; // ignore this

const copyText = document.getElementById("urlOutPut").innerHTML;


function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed"; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log(`Fallback: Copying text command was ${msg}`);
  } catch (err) {
    console.error(`Fallback: Oops, unable to copy ${err}`);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      console.log("Async: Copying to clipboard was successful!");

    },
    function(err) {
      console.error(`Async: Could not copy text: ${err}`);

    }
  );
}


function getBaseUrl() {
  return window.location.href.match(/^.*\//);
}

document.getElementById(
  "urlOutPut"
).innerHTML = `${getBaseUrl()}i?g=`;

function eventImageSetup() {
  $(dropbox).height($("#imageBorder").height());

  fileSelect.addEventListener(
    "click",
    function() {
      image.click();
    },
    false
  );

  fileRemove.addEventListener(
    "click",
    function() {
      if (!$("#preview").hasClass("hidden")) {
        // If there is an image uploaded
        $("#preview").empty();
        $("#dropbox").removeClass("hidden");
        $("#preview").addClass("hidden");
        resetFileInputField();
      }
      removeError($("#imageError"), $("#image"));
    },
    false
  );

  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);
} // end of eventImageSetup
function uploadRe($files, toUpload, index) {
  //console.log($files);
  // Begin file upload
  console.log("Uploading file to put.re..");

  // API Endpoint
  let apiUrl = "https://api.put.re/upload";

  let settings = {
    async: false,
    crossDomain: true,
    processData: false,
    contentType: false,
    type: "POST",
    url: apiUrl,
    mimeType: "multipart/form-data"
  };

  let formData = new FormData();
  formData.append("image", $files);
  settings.data = formData;

  console.log("Proccessing no. " + index);

  $.ajax(settings).done(function(response) {
    let data = JSON.parse(response);
    console.log(data.data.link);
    document.getElementById(
      "images"
    ).innerHTML += `<img height="400px" src="${data.data.link}"> `;



    let urlStr =  `${btoa(data.data.name)}`;
    if(index == 0) {
      document.getElementById(
        "urlOutPut"
      ).innerHTML += urlStr;
    } else {
      document.getElementById(
        "urlOutPut"
      ).innerHTML += `$`+urlStr;
    }
    /*
    $.post("https://chl.li/api/shorten", {
      url: document.getElementById("urlOutPut").innerHTML
    }, function(
      data
    ) {
      alert(data);
    });
    */
    index++;

    let elem = document.getElementById("myBar");
    if (width >= toUpload) {
      width = (index / toUpload) * 100;
      elem.style.width = width + "%";
      document.getElementById("myP").className =
        "w3-text-green w3-animate-opacity";
      document.getElementById(
        "myP"
      ).innerHTML = `Successfully uploaded ${toUpload} photos!`;
    } else {
      width = (index / toUpload) * 100;
      elem.style.width = width + "%";
      let num = index;
      document.getElementById("demo").innerHTML = num;
    }
  });
  $("#copyBtn").show();
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
  let dt = e.dataTransfer;
  let files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  $(".w3-container").show();

  $.each(files, function(index, value) {
    $("#toCount").text(files.length);
    let toUpload = files.length;
    let file = value;


    //console.log(file);
    let imageType = /^image\//;
    if (!imageType.test(file.type)) {
      alert("This file type is not supported");
    } else {
      uploadRe(file, toUpload, index);
    }
    if (file.size > MAX_FILE_SIZE) {
      // a bunch of code to deal with this..
      return;
    }
  });

  //console.log("This is the file: ", file);

  let img = document.createElement("img");
  img.onload = function() {
    //adjustImageSize(img);
  };
}

eventImageSetup();
