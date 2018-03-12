<?php
   $hostname = "localhost";
   $database = "stream";
   $username = "streamer";
   $password = "foobarsstuff";
   
	
  	function clean($input, $maxlength)
 	{
     $input = substr($input, 0, $maxlength);
    $input = EscapeShellCmd($input);
   return ($input);
  }
?>
