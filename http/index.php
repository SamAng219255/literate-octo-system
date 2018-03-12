<html>
<head>
	<title>Interverse</title>
	<link rel="stylesheet" type="text/css" href="theme.css">
	<link href="./img/icon.png" rel="shortcut icon">
	<script src="./christmas.js"></script>
</head>
<body>
	<?php
		$whoisit=$_SERVER['REMOTE_ADDR'];
		if(explode(".",$whoisit)[3]=='3') {
			echo '<meta http-equiv="refresh" content="0; URL=https://youtu.be/dQw4w9WgXcQ">';
		}
	?>
	<div id="topBar">
		<div id="name">Interverse</div>
		<div id="navigationButtons">
			<div class="topFullFadeBar"></div><div class="bottomFullFadeBar"></div>
			<a class="navButHolder" href="html/"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">HTML</div></div></a>
			<a class="navButHolder" href="https/"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">HTTPS</div></div></a>
			<a class="navButHolder" href="python/"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">Python</div></div></a>
			<a class="navButHolder" href="logs/"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">Logs</div></div></a>
			<a class="navButHolder" href="https://SamAng219255.github.io"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">Github</div></div></a>
			<a class="navButHolder" href="html/site/"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">Other Site Clone</div></div></a>
			<a class="navButHolder" href="picoctf.com"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">php</div></div></a>
			<a class="navButHolder" href="html/section/"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">Linux Commands</div></div></a>
			<a class="navButHolder" href="https://10.183.2.9/chat/"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">Chat Room (WIP)</div></div></a>
			<a class="navButHolder" href="phpform/"><div class="navButton"><div class="topFadeBar"></div><div class="bottomFadeBar"></div><div class="navTxt">PHP Form</div></div></a>
			<script>
				var navBars=document.getElementsByClassName("navButton");
				var bottomFadeBars=document.getElementsByClassName("bottomFadeBar");
				var topFadeBars=document.getElementsByClassName("topFadeBar");
				for(var i=0; i<navBars.length; i++) {
					bottomFadeBars[i].style="width: "+(navBars[i].offsetWidth-4)+";";
					topFadeBars[i].style="width: "+(navBars[i].offsetWidth-4)+";";
				}
			</script>
		</div>
	</div>
	<div id="leftSideBar">
		<?php
			if($whoisit=='10.183.2.9') {
				echo '<p>Welcome back!</p>';
			}
			elseif($whoisit=='10.183.2.3') {
				echo '<p>Hi!</p>';
			}
			elseif($whoisit=='10.183.1.30') {
				echo '<p>Hello Coleman.</p>';
			}
		?>
	</div>
	<div id="content">
		<p>I don't know what to put here now...</p>
		<div id="tree"></div>
		<script>if((new Date()).getMonth()==11){colortree();}</script>
	</div>
	<div id="rightSideBar"></div>
</body>
</html>
