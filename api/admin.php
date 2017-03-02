<?php
	session_start();
	if (isset($_GET['logout'])) {
		logout();
	}

	if(isset($_SESSION['username']) && $_SESSION['isAdmin']) {
?>
	<html>
	<head>
		<title>Admin</title>
	</head>
	<body>
		<p>Admin Page, welcome <?php echo $_SESSION['username']?>!</p>
		<a href='admin.php?logout=true'>Logout</a>
	</body>
	</html>
<?php
	}

	function logout() {
		session_unset();
		session_destroy();
		header( "refresh:2;url=login.php" ); 
		echo 'You\'ll be redirected to login page in about 2 secs. If not, click <a href="login.php">here</a>.';
	}
	
?>