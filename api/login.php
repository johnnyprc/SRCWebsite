<?php
	include "../api/dbinfo.inc"; 
	include '../ChromePhp.php';

	session_start();
	ChromePhp::log('Connecting to db...');

	if(isset($_POST['login'])) {

		/* Connect to MySQL and select the database. */
		$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
		$myusername = mysqli_real_escape_string($connection, $_POST['username']);
		$mypassword = mysqli_real_escape_string($connection, $_POST['password']); 

		if (mysqli_connect_errno()) ChromePhp::error("Failed to connect to MySQL: " . mysqli_connect_error());
		
		$database = mysqli_select_db($connection, DB_DATABASE);

		$sql = "SELECT ID FROM Userinfo WHERE username = '$myusername' and password = '$mypassword'";
		$result = mysqli_query($connection, $sql);
		if (!$result) ChromePhp::error("Error description: " . mysqli_error($connection));

		/* Username and password matched */
		if (mysqli_num_rows($result) == 1) {
			$_SESSION['username'] = $myusername;
			$_SESSION['err'] = "";
			header('Location: admin.php');
		} else {
			$_SESSION['err'] = "Username and password is not valid";
			header('Location: login.php');
		}

		mysqli_close($connection);
	}

	// session_unset();
?>
	<html>
	<head>
	</head>

	<body>
		<p><font color="red"><?php if(isset($_SESSION['err'])) echo $_SESSION['err'];?></font></p>
		<form action="login.php" method="post">
			Username: <input type="text" name="username"><br>
			Password: <input type="password" name="password"><br>
			<input type="submit" name="login" value="Login">
		</form>
	</body>
	</html>

<?php ?>
