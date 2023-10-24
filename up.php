<?php

extract($_REQUEST);

// Upload directory
$path = "arq/";

if (@$call == 'showFiles') {
  $diretorio = dir($path);
  $arq = '';
  while ($arquivo = $diretorio->read()) {
    if ($arquivo != '.' and $arquivo != '..' and $arquivo != '')
      $arq .= '<a href="' . $path . $arquivo . '" target="_blank">' . $arquivo . '</a> -> <a href="delete.php?p=' . $path . $arquivo . '" target="_blank" style="color: red;text-height: bold;">X</a><br/>';
  }
  $diretorio->close();
  echo $arq;
  die;
}

// Count total files
$countfiles = count($_FILES['files']['name']);
$count = 0;
for ($i = 0; $i < $countfiles; $i++) {
  // File name
  $filename = $_FILES['files']['name'][$i];

  // File path
  $path = $path . $filename;

  // file extension
  $file_extension = pathinfo($path, PATHINFO_EXTENSION);
  $file_extension = strtolower($file_extension);

  // Valid file extensions
//  $valid_ext = array("pdf", "doc", "docx", "jpg", "png", "jpeg");
  // Check extension
//  if (in_array($file_extension, $valid_ext)) {
  // Upload file
  if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $path)) {
    $count += 1;
  }
//  }
}

echo $count;
exit;
