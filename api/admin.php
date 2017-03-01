<?php
	session_start();
	
	if(isset($_SESSION['username'])){
?>
	<html>
	<head>
	</head>

	<body>
		<p>Admin Page, welcome <?php echo $_SESSION['username']?>!</p>
	</body>
	</html>
<?php
	}
	
?>