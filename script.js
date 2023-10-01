var dropArea = document.getElementById('drop-area');
var columnsInput = document.getElementById('columns');
var filterColumnInput = document.getElementById('filterColumn');
var filterValueInput = document.getElementById('filterValue');

dropArea.addEventListener('dragover', function(e) {
  e.preventDefault();
  dropArea.style.backgroundColor = '#f7f7f7';
});

dropArea.addEventListener('dragleave', function() {
  dropArea.style.backgroundColor = '#ffffff';
});

dropArea.addEventListener('drop', function(e) {
  e.preventDefault();
  dropArea.style.backgroundColor = '#ffffff';

  var file = e.dataTransfer.files[0];
  var columns = columnsInput.value || ''; // Default to empty string if undefined
  var filterColumn = filterColumnInput.value || ''; // Default to empty string if undefined
  var filterValue = filterValueInput.value || ''; // Default to empty string if undefined

  var formData = new FormData();
  formData.append('file', file,file.name);
  formData.append('columns', columns);
  formData.append('filterColumn', filterColumn);
  formData.append('filterValue', filterValue);
  console.log(formData);
  fetch('https://script.google.com/macros/s/AKfycbxdjZKA-3izwgbAiwC4qz0K-17_fHa0pGHdt6uUXo0GK2r2NUj3DMepULx1KSrB2x0h/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if (data === 'Success') {
      alert('CSV File Imported Successfully!');
    } else {
     
      alert('Error: ' + data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error: ' + error.message);
  });
});
