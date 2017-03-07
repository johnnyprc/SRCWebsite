<?php 

	include "api/dbinfo.inc"; 
	include 'ChromePhp.php';

	ChromePhp::log('Connecting to db...');

	/* Connect to MySQL and select the database. */
	$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

	if (mysqli_connect_errno()) ChromePhp::error("Failed to connect to MySQL: " . mysqli_connect_error());

	$database = mysqli_select_db($connection, DB_DATABASE);


	/* Ensure that the Events table exists. */
	VerifyEventsTable($connection, DB_DATABASE); 

	/* Creating fake events data */ 
	date_default_timezone_set('America/Los_Angeles');
	$orgName = "ABC";
	$title = "new event 3";
	$start = "2017-02-24 13:00:00";
	$end = "2017-02-24 14:00:00";

	//AddEvent($connection, $orgName, $title, $start, $end);

	/* Getting events data from db*/
	$result = mysqli_query($connection, "SELECT * FROM Events"); 
	$out = array();

	if (mysqli_num_rows($result) != 0) {
		ChromePhp::log('Successful query from db');
	} else {
		ChromePhp::log('Empty result from db query');
	}

	while($query_data = mysqli_fetch_row($result)) {
		$out[] = array(
			'id' => '100',
			'title' => $query_data[2],
			'url' => "http://www.example.com/",
			'class' => 'event-important',
			'start' => strtotime($query_data[3]).'000',
			'end' => strtotime($query_data[4]).'000'
		);
	}

	echo json_encode(array('success' => 1, 'result' => $out));

	mysqli_free_result($result);
	mysqli_close($connection);

	/* Add an event to the table. */
	function AddEvent($connection, $orgName, $title, $start, $end) {
		$o = mysqli_real_escape_string($connection, $orgName);
		$t = mysqli_real_escape_string($connection, $title);
		$s = mysqli_real_escape_string($connection, $start);
		$e = mysqli_real_escape_string($connection, $end);

		$query = "INSERT INTO `Events` (`OrgName`, `Title`, `Start`, `End`) 
					VALUES ('$o', '$t', '$s', '$e');";

		if(!mysqli_query($connection, $query)) ChromePhp::error("Error adding event data.");
	}

	/* Check whether the table exists and, if not, create it. */
	function VerifyEventsTable($connection, $dbName) {
		if(!TableExists("Events", $connection, $dbName)) 
		{
			$query = "CREATE TABLE `Events` (
					`ID` int(11) NOT NULL AUTO_INCREMENT,
					`OrgName` varchar(45) DEFAULT NULL,
					`Title` varchar(45) DEFAULT NULL,
					`Start` varchar(45) DEFAULT NULL,
					`End` varchar(45) DEFAULT NULL,
					PRIMARY KEY (`ID`),
					UNIQUE KEY `ID_UNIQUE` (`ID`)
				) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1";

			if(!mysqli_query($connection, $query)) ChromePhp::error("Error creating table.");
		}
	}

	/* Check for the existence of a table. */
	function TableExists($tableName, $connection, $dbName) {
		$t = mysqli_real_escape_string($connection, $tableName);
		$d = mysqli_real_escape_string($connection, $dbName);

		$checktable = mysqli_query($connection, 
				"SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = '$t' AND TABLE_SCHEMA = '$d'");

		if(mysqli_num_rows($checktable) > 0) return true;

		return false;
	}
	exit;
?>