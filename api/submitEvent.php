<?php
    session_start();
    if (isset($_GET['logout'])) {
        logout();
    }

    if(isset($_SESSION['username'])) {
?>
    <html>
    <head>
        <title>Event Submission</title>
    </head>
    <body>
        <p>Welcome <?php echo $_SESSION['username']?>!</p>
<!--         <form action="submitEvent.php" method="post">
            Date: <input type="date" name="date"><br>
            Organization name: <input type="text" name="orgName"><br>
            <input type="submit" name="submitEvent" value="SubmitEvent">
        </form> -->
        <a href='submitEvent.php?logout=true'>Logout</a>
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