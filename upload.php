<?php

if(isset($_FILES['imagem']['name'])){
   // file name
   $filename = $_FILES['imagem']['name'];

   // Location
   $location = 'upload/'.$filename;

   // file extension
   $file_extension = pathinfo($location, PATHINFO_EXTENSION);
   $file_extension = strtolower($file_extension);

   // Valid extensions
   $valid_ext = array("pdf","doc","docx","jpg","png","jpeg");
   $response = 0;
   if(in_array($file_extension,$valid_ext)){
      // Upload file
  
      if(move_uploaded_file($_FILES['imagem']['tmp_name'],$location)){
         $response = 1;
      } 
   }

   echo $response;
   exit;
}