<html><head><title>START LINUX COMMANDS</title>
<style>
body {
	margin:0px;
	margin-left:50px;
	margin-right:50px;
}
#menu {
	
}
#contents{
    padding-left: 50px;
    padding-top: 50px;
}
</style>

</head>
<body>
<div id = "menu">
<a href = "?v=0"  >BASH DATE</a>&nbsp; 
<a href = "?v=1"  >MAN PS</a>&nbsp; 
<a href = "?v=2"  >PS</a>&nbsp; 
<a href = "?v=3"  >PS -a</a>&nbsp;
<a href = "?v=6"  >PS -A</a>&nbsp;
<a href = "?v=4"  >TIME C CODE</a>&nbsp;
<a href = "?v=5"  >PYTHON PING </a>&nbsp;
<a href = "source/">SOURCE </a>&nbsp;
</div>
<hr />
<div id = "contents">
<pre>
<?php
if (isset($_GET['v'])) {
	$thepost = $_GET['v']; // Default page
	} else {
		$thepost = -1;
	}
$output="You shouldn't see this...";
switch($thepost) {
	case -1:
		$output = shell_exec('cal');
		break;
        case 0:
                $output = shell_exec('date');
                break;
        case 1:
                $output = shell_exec('man ps');
                break;
        case 2:
                $output = shell_exec('ps');
                break;
        case 3:
                $output = shell_exec('ps -a');
                break;
        case 4:
                $output = shell_exec('./source/time');
                break;
        case 5:
                $output = shell_exec('python3 ./source/pingdate.py');
                break;
	case 6:
		$output = shell_exec('ps -A');
		break;
}
echo "OUTPUT";
echo "<pre>$output</pre>";

?>
</pre>
</div>
<hr />

</body>
</html>
