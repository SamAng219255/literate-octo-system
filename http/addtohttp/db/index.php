<html>
<head>
<title> 10.183.1.30/http/db/</title>
<link rel ="stylesheet" type "text/css" href ="../css/custom.css">
</head>

<?php
	
	error_reporting(0);

    if ($handle = opendir('.')) {
    while (false !== ($file = readdir($handle)))
    {
		
		$b = "bttn";
		if (false === strpos((string)$file ,'.'))$b = "bttnd";
		
        if ($file != "." && $file != ".."&& $file != "index.php" && $file != "css") 
        {
            $thelist .= $l.'<a href="'.$file.'"class = "'.$b.' bttn2" target = "_blank">&nbsp;&nbsp;'.$file.'&nbsp;&nbsp;</a><br />';
        }
    }
    closedir($handle);
    }
?>

<body>
<div id="list">	
<div class="header">

</div>


<hr />
<p>Files:</p>

<?php echo $thelist?>

<hr />

</body>
</head>
