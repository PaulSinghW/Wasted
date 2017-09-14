<?php
if(isset($_POST['email'])) {
 
    $email_to = "wasted.bcit@gmail.com";
    $email_subject = "Your email subject line";
 
    function died($error) {
 
		echo "We have found errors in your code ";
        echo "The following erros were found.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these and resubmit.<br /><br />";
        die();
    }
 
 
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['comments'])) {
        died('We are sorry, but there appears to be a problem with the values you submitted.');       
    }
 
     
 
    $first_name = $_POST['first_name']; 
    $last_name = $_POST['last_name']; 
    $email_from = $_POST['email']; 
    $telephone = $_POST['telephone']; 
    $comments = $_POST['comments']; 
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'The Email Address you entered is invalid.<br />';
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
  }
 
  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
  }
 
  if(strlen($comments) < 2) {
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
  }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Form details below.\n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= "First Name: ".clean_string($first_name)."\n";
    $email_message .= "Last Name: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telephone: ".clean_string($telephone)."\n";
    $email_message .= "Comments: ".clean_string($comments)."\n";
 

$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->
 <!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>tips</title>
		
		<!-- Code for social media panel -->	
			<!-- for Facebook -->   
			<meta property="og:url"           content="http://students.bcitdev.com/A00991496/WebpageMobile/fridge.html" />
			<meta property="og:type"          content="website" />
			<meta property="og:title"         content="Wasted!" />
			<meta property="og:description"   content="Your go to food waste management solution!" />
			<meta property="og:image"         content="http://students.bcitdev.com/A00991496/WebpageMobile/images/food_waste2.jpg" />	
			<meta property="og:image:width"		content="850" />
			<meta property="og:image:height"	content="1550" />
			<!-- for Google -->
			<meta name="description" content="" />
			<meta name="keywords" content="" />

			<meta name="author" content="" />
			<meta name="copyright" content="" />
			<meta name="application-name" content="" />

       

			<!-- for Twitter -->          
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content="" />
			<meta name="twitter:description" content="" />
			<meta name="twitter:image" content="" />
		<!-- Code for social media panel -->
		
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>

	<body>
	
	<!-- facebook share -->
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9";
		  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
	</script>
	<!-- facebook share -->
	
		<header class="header_logo">	
			<div id="login">
				<button id="signOutBtn"></button>
				<div class="fb-share-button" data-href="http://students.bcitdev.com/A00991496/WebpageMobile/fridge.html" data-layout="button_count" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fstudents.bcitdev.com%2FA00991496%2FWebpageMobile%2Ffridge.html&amp;src=sdkpreparse">Share</a>
				</div>
			</div>
		</header>
		<div class="topnav" id="myTopnav">
			<a href="contact.html">Contact Us</a>
			<a href="fridge.html">MyFridge</a>
			<a href="about_us.html">About Us</a>
			<a href="affiliate.html">Affiliates</a>
			<a href="javascript:void(0);" class="icon" onclick="myFunction()">&#9776;</a>
		</div>
		
		
		
		<script>
			function myFunction() {
				var x = document.getElementById("myTopnav");
				if (x.className === "topnav") {
					x.className += " responsive";
				} else {
					x.className = "topnav";
				}
			}
		</script>
		
		
		<div id ="contactpage">
		<h1>Thank-you for contacting us!</h2>
		
		</div>
		
		
		
		
		
		<script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>
		<script>
			// Initialize Firebase
			var config = {
				apiKey: "AIzaSyDaSug6WUrMPDSlcRO3OOU4yw0zXsJP3og",
				authDomain: "fir-web-learn-6d987.firebaseapp.com",
				databaseURL: "https://fir-web-learn-6d987.firebaseio.com",
				projectId: "fir-web-learn-6d987",
				storageBucket: "fir-web-learn-6d987.appspot.com",
				messagingSenderId: "15555479095"
			};
			firebase.initializeApp(config);
		</script>
		<!--<script src="index.js"></script>-->
		<script src="storage.js"></script>

		<script>
			function searchFood() {

  				var input, filter, table, tr, td, i;
  				input = document.getElementById("myInput");
  				filter = input.value.toUpperCase();
  				table = document.getElementById("accordion");
  				tr = table.getElementsByClassName("wrap");

  				for (i = 0; i < tr.length; i++) {
    				td = tr[i].getElementsByTagName("h3")[0];
    				if (td) {
    			  		if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
     			   			tr[i].style.display = "";
     					} else {
        					tr[i].style.display = "none";
      					}
    				} 
  				}
			}

		</script> 
		<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  		<script>
  			$( function() {
    			$( "#accordion" ).accordion({
      			collapsible: true
    			});
  			} );
  		</script>
	</body>
</html>
 
<?php
 
}
?>