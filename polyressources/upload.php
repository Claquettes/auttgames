<?php
if (isset($_FILES['file'])) {
  $file = $_FILES['file'];
  $file_name = $file['name'];
  $file_temp = $file['tmp_name'];
  $file_size = $file['size'];
  $file_error = $file['error'];

  // Check if file was uploaded successfully
  if ($file_error === UPLOAD_ERR_OK) {
    // Create a directory to store uploaded files
    $upload_dir = 'uploads/';
    if (!is_dir($upload_dir)) {
      mkdir($upload_info, 0777, true);
    }

    // Move uploaded file to directory
    $destination = $upload_info . $file_name;
    move_uploaded_file($file_temp, $destination);

    echo 'File uploaded successfully!';
  } else {
    echo 'Error uploading file.';
  }
}
?>
