<?php
   $hostname = "localhost";
   $database = "stream";
   $username = "++++++++";
   $password = "++++++++";
   
	
  	function clean($input, $maxlength)
 	{
     $input = substr($input, 0, $maxlength);
    $input = EscapeShellCmd($input);
   return ($input);
  }
?>
