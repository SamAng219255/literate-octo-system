<html>
<head>
	<link rel ="stylesheet" href ="indextheme.css">
	<link href="/img/folder.png" rel="shortcut icon">
	<?php
		echo '<title>Index of '.basename(__DIR__).'</title>';
	?>
</head>
<body>
<?php
	$direcname=strtoupper(basename(__DIR__));
	$today = getdate();
	
	echo '<h1>'.$direcname.'</h1>';
	echo '<p>Today is: '.$today['weekday'].', '.$today['mday'].' '.$today['month'].' '.$today['year'].'</p>';
?>
<hr />
<?php
	//error_reporting(0);
	
	$filecount=0;
	$filenames=array();

    if ($handle = opendir('.')) {
    while (false !== ($file = readdir($handle)))
    {
        if ($file != "." && $file != "index.php" && $file != "indextheme.css")
        {
			$ext = pathinfo($file,PATHINFO_EXTENSION);
			$kind=0;
			if(is_dir('./'.$file)) {
				$kind=1;
			}
			elseif(exif_imagetype('./'.$file)!==false) {
				$kind=2;
			}
            array_push($filenames,array($file,$kind));
            $filecount++;
        }
    }
    sort($filenames);
	$thelist.='<ul>';
    for ($i=0; $i<$filecount; $i++) {
		$l='file';
		if($filenames[$i][1]==1) {
			$l='directory';
		}
		elseif($filenames[$i][1]==2) {
			$l='image';
		}
		$thelist .= '<li class = "'.$l.'"><a href="'.$filenames[$i][0].'" target = "_blank">'.$filenames[$i][0].'</a></li>';
	}
    $thelist.='</ul>';
    closedir($handle);
    }
?>

<?php echo $thelist?>
<hr />
</body>
</html>
