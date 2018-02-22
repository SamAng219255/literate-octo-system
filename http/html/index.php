<?php
	//error_reporting(0);
	$theList = array("*");
	
	$filecount=0;
	$filenames=array("*");

    if ($handle = opendir('.')) {
    while (false !== ($file = readdir($handle)))
    {
        if ($file != "." && $file != "index.php")
        {
            array_push($filenames,array($file,is_dir($file)));
            $filecount++;
        }
    }
    sort($filenames);
	$thelist.='<ul>';
    for ($i=0; $i<$filecount; $i++) {
		$l='file';
		if($filenames[i][1]) {
			$l='directory';
		}
		$thelist .= '<li><a href="'.$filenames[i][0].'"class = "'.$l.'" target = "_blank">'.$filenames[i][0].'</a></li>';
	}
    $thelist.='</ul>';
    closedir($handle);
    }
?>

<?php echo $thelist?>
