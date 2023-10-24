$(document).ready(function () {

  $("#files").change(function () {
    readURL(this);
  });

  showFiles();
});//ready

//List files
function readURL(input) {
  let arqs = '';
  if (input.files && input.files[0]) {
    for (let i = 0; i < input.files.length; i++) {
      arqs += input.files[i].name + '<br/>';
    }
    $('#arqs').html(arqs);
    uploadFile();
  }
}

// Upload file
function uploadFile() {

  var totalfiles = document.getElementById('files').files.length;

  if (totalfiles > 0) {
    let formData = new FormData();
    // Read selected files
    for (let index = 0; index < totalfiles; index++) {
      formData.append("files[]", document.getElementById('files').files[index]);
    }
    let xhttp = new XMLHttpRequest();
    // Set POST method and ajax file path
    xhttp.open("POST", "up.php", true);
    // call on request changes state
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText;
        $('#arqs').html(response + " arquivo(s) carregado(s) com sucesso.");
      }
    };
    // Send request with data
    xhttp.send(formData);
  } else {
    alert("Selecione um arquivo");
  }

}

function showFiles() {
  $.ajax({
    url: 'up.php',
    type: 'POST',
    data: {
      call: 'showFiles'
    },
    success: function (r) {
      $('#arqs').html(r);
    }
  });
}