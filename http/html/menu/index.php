<!DOCTYPE html>
<html>
<head>
<title>
PHP MENU
</title>
<link rel ="stylesheet" type "text/css" href ="indextheme.css">
</head>
<body>
<h1>MENU</h1>
<hr />
<ul>
    <li><a href="?v=0">Home</a></li>
	<li><a href="?v=1" >About Us</a></li>
	<li><a href="?v=2" >Contact</a></li>
        <li style="list-style-type: none;"><a style="color: #282830;" href="?v=3" >Easter Egg</a></li>
</ul>
<hr />
<?php
if (isset($_GET['v'])) {
	$get = $_GET['v']; // Default page
	} else {
		$get = 0;
	}
	
	switch ($get) {
		case 0:
			require "home.html";
			break;
		case 1:
			require "about.html";
			break;
		case 2:
			require "contact.html";
			break;
		case 3:
			require "easteregg.html";
			break;
	}


?>



</body>
</html>
