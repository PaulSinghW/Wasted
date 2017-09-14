
/** THIS RUNS WHEN THE USERS LOGIN STATE CAHANGES **/

var firebaseRef = firebase.database().ref();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
	//user is signed in
   $("#signOutBtn").text(firebase.auth().currentUser.email + " | Logout");

   
  } else {
   
    // No user is signed in.
    $("#signOutBtn").text("Sign in / Sign Up");



	window.location = 'http://students.bcitdev.com/A00541112/WebpageMobile/index.html'	




  }
});









/**  SUBMITTING AN ITEM INTO THE DATABASE -- On click takes the values of the two input boxes and pushes them into the database    **/


function submitClick() {
	
var itemName = document.getElementById("itemName");
var expiryName = document.getElementById("datepicker");
var itemInfo = document.getElementById('info');
var firebaseRef = firebase.database().ref();	


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
	var itemText = capitalizeFirstLetter(itemName.value);
	//don't look at the stuff ahead too closely pls
	if(itemName.value == "Wasted" || itemName.value == "wasted") {
		window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
		return false;
	}
	
	if(itemName.value == "Baby" || itemName.value == "baby") {
		alert('goo goo ga ga?');
		window.location.href = "http://imgur.com/a/f7YWK";
		return false;
	}
		
	if(itemName.value == "Alex" || itemName.value == "alex") {
		alert('Please don\'t kill me Alex.');
		window.location.href = "http://imgur.com/a/hy2aT";
		return false;
	}
	
	if(itemName.value == "Misha" || itemName.value == "misha") {
		alert('oh boy, you guys are in for a treat');
		window.location.href = "https://www.youtube.com/watch?v=nZMwKPmsbWE";
		return false;
	}
	
	if(itemName.value == "Dasha" || itemName.value == "dasha") {
		alert('wow what a cool person! So smart and funny and cute!!!!');
		return false;
	}
	
	if(itemName.value == "Simran" || itemName.value == "simran") {
		alert('what is sleep?');
		return false;
	}
	
	if(itemName.value == "Bhagwan" || itemName.value == "bhagwan") {
		alert('You should sleep more!!!! Try this cool soothing song!');
		window.location.href = "https://chickenonaraft.com";
		return false;
	}
	
	
	var expiryText = expiryName.value;
	var expiryTextAgain = expiryText.substr(6, 9);
	var expiryTextFinal = expiryTextAgain + "/" + expiryText.substr(0, 5);
	var intoText = itemInfo.value;
	
	
	
	var author = firebase.auth().currentUser.uid;
	var email = firebase.auth().currentUser.email;
	
	firebaseRef.push({
		'expiry': expiryTextFinal,
		'name': itemText,
		'author': author,
		'email': email,
		'info': intoText 
	});
	
	window.location.reload();
}


/**  REMOVING AN ITEM FROM THE DATABSE -- Removes the selected item from the database **/

function removeClick(obj) {
	var id = obj.id;
	//alert(id);
	firebaseRef.child(id).remove();
	window.location.reload();
}


/** LOADING THE TABLE OF ITEMS FROM DATABASE BY USER -- pulls user specific values from the database and then populates the table **/

var z = 1;
if (z == 1) {
firebaseRef.orderByChild("expiry").on("child_added", snap => {
	
	var name = snap.child("name").val();
	var expiry = snap.child("expiry").val();
	var id = snap.key;
	var childAuthor = snap.child("author").val();
	var thisAuthor = firebase.auth().currentUser.uid;

	
	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 2;
	var dddd = today.getDate() + 1;

	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	today = yyyy + '/' + mm + '/' + dd;
	todayAgain = yyyy + '/' + mm + '/' + ddd;
	todayAgainAgain = yyyy + '/' + mm + '/' + dddd;
	
	var daysLeft;
	var monthsLeft = expiry.substring(5,7);
	var yearsLeft = expiry.substring(0, 4);
	var moreYears = yearsLeft - yyyy;
	
	if ( yearsLeft == yyyy && monthsLeft > mm ) {
	
	daysLeft = 30 - expiry.substring(8, 10);
	
	} else if(yearsLeft > yyyy && monthsLeft >= mm){
		
		daysLeft = "~year";
		
	} else if(yearsLeft > yyyy ) {
		
		daysLeft = "~" + (monthsLeft - mm + 12) + " months";
		
	} else {
		
		daysLeft = expiry.substring(8, 10) - dd;
	}
	

	
	if (childAuthor == thisAuthor) {
	
		if ( expiry <= today ) {
	
	
	var html = '<tr style="background-color: #FF0F46;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td></tr>';
	$(html).appendTo('#table_body');
	
		} else if ( expiry == todayAgain || expiry == todayAgainAgain) {
		
	
	var html = '<tr style="background-color: #FFD119;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td></tr>'; 
	
	
	$(html).appendTo('#table_body');
		
		
		}else {
			
	var html = '<tr style="background-color: #ddd;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td></tr>'; 
	
	$(html).appendTo('#table_body');
			
		}
    }
	
	
	/** start of datables**/
	$(document).ready(function() {
    var table = $('#fridge').DataTable();
	
	
	//var classHighlight = 'highlight'; 

	//.click() will return the result of $('.thumbnail')
	//I save it for future reference so I don't have to query the DOM again
	
	
	/*
	var $fridge = $('tr').click(function(e) {
		e.preventDefault();
		//run removeClass on every element
		//if the elements are not static, you might want to rerun $('.thumbnail')
		//instead of the saved $thumbs
		//$fridge.removeClass(classHighlight);
		//add the class to the currently clicked element (this)
		
		if (!$(this).hasClass('highlight')) {
			//alert('this is NOT highlighted');
			$(this).addClass('highlight');
		}  
		
	});
	
	*/
    
	} );
	/** end of datables **/
	
	
  }); 

}


/** click functionality **/
	
$(document).ready(function() {
    $('#fridge tbody').on('click', 'tr', function() {
		
		if($(this).hasClass('highlight')) {

			
			
			var id = $(this).attr("id")
		
				var name1 = firebaseRef.child(id);
		
				name1.once("value", function(dataSnapshot) {
					test = dataSnapshot.child('expiry').val();
		
					test2 = dataSnapshot.child('name').val();
					
					test3 = dataSnapshot.child('info').val();
					
					var picture;
					
					if (test2 == "Apples") {
						
						picture = "<img src='images/apple.jpg' alt='apple' style='width:183px;height:183px;'>";
					} else if ( test2 == "Chicken") {
						
						picture = "<img src='images/chicken.jpg' alt='chicken' style='width:183px;height:183px;'>";
					} else if ( test2 == "Beef" ) {
						
						picture = "<img src='images/beef.png' alt='beef' style='width:183px;height:183px;'>";
					} else if ( test2 == "Cheese" ) {
						
						picture = "<img src='images/cheesejpg.jpg' alt='cheese' style='width:183px;height:183px;'>";
					} else if ( test2 == "Eggs" ) {
						
						picture = "<img src='images/eggs.jpg' alt='eggs' style='width:183px;height:183px;'>";
					} else if ( test2 == "Carrots" ) {
						
						picture = "<img src='images/carrots.jpg' alt='carrots' style='width:183px;height:183px;'>";
					} else if ( test2 == "Milk" ) {
						
						picture = "<img src='images/milk.jpg' alt='milk' style='width:183px;height:183px;'>";
					} else if ( test2 == "Bananas" ) {
						
						picture = "<img src='images/banana.jpg' alt='bananas' style='width:183px;height:183px;'>";
					} else if ( test2 == "Butter" ) {
						
						picture = "<img src='images/butter.jpg' alt='butter' style='width:183px;height:183px;'>";
					} else {
						
						picture = "";
					}
					
		
						var element = document.getElementById("ex1");
						element.innerHTML = 
						 "<font size=10 color=green>" +
						"<b>Your Selected Item:</b>" +
						"</font>" + 
						"<font size=6>" +
						"<br>" +
						"<br>" +
						"<b>Name: </b>" + test2 + 
						"<br>" +
						"<br>" +						
						"<b>Expiry: </b>" + test  +
						"<br>" +
						"<br>" 
						+ "<b>Info: </b>" + test3 + "<br>" + picture +
						"</font>"
						
						;
					$('#ex1').modal();
						
				
				});

				
			$(this).removeClass('highlight');
		} else {
			$(this).addClass('highlight');
		} 
		
		
		
    });
});
	
	/* Remove all click */

function removeAllClick() {
		//alert('working');
		$("tr").each(function() {
		//	if (tr.hasClass('highlight')) {
			//	var id = $(this).attr("id");
				//firebaseRef.child(id).remove();
				//window.location.reload();
				var id = $(this).attr("id");
				if ($(this).hasClass('highlight')) {
					firebaseRef.child(id).remove();
					window.location.reload();
				}
				//alert(id);
			});
		};
    


	
	
	/* Remove click */
function removeClick(obj) {
	var id = obj.id;
	//alert(id);
	firebaseRef.child(id).remove();
	window.location.reload();
}


	



	


/* LOGOUT PROCESS -- Signs out the current user */

$("#signOutBtn").click(
  function(){

    
	
	firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

	window.location.reload();
	
  }
);



/** Add apple to form **/

$("#appleBtn").click(

function(){
        var text = $('#itemName');
        text.val('Apples'); 

	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+2; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 14;
	var dddd = today.getDate() + 1;
		
	if(ddd<10) {
		ddd ='0'+ ddd;
	} 


		
	if ( ddd > 30 ) {
		
		ddd = 30 - 14;
		mm = mm + 1;
		
			if(mm<10) {
		mm ='0'+ mm;
	} 
		
	}
		
	today = mm + '/' + ddd + '/' + yyyy;
	
	var dateAgain = $('#datepicker');
	dateAgain.val(today);

		
	}

);

/** Add Bananas to form */

$("#bananaBtn").click(

function(){
        var text = $('#itemName');
        text.val('Bananas'); 

	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 6;
	var dddd = today.getDate() + 1;
		

		
	if ( ddd > 30 ) {
		
		ddd = 30 - 6;
		mm = mm + 1;
		
			if(mm<10) {
		mm='0'+mm
	} 
		
			if(ddd<10) {
		ddd='0'+ddd
	} 


		
	}
	
			if(mm<10) {
		mm='0'+mm
	} 
		
	today = mm + '/' + ddd + '/' + yyyy;
	
	var dateAgain = $('#datepicker');
	dateAgain.val(today);
		
	}

);

/**Add milk to form **/

$("#milkBtn").click(

function(){
        var text = $('#itemName');
        text.val('Milk'); 

		var dateAgain = $('#datepicker');
		dateAgain.val("");

		
	}

);

/** Add eggs to form **/

$("#eggBtn").click(

function(){
        var text = $('#itemName');
        text.val('Eggs');    
	
		var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 14;
	var dddd = today.getDate() + 1;
		

		
	if ( ddd > 30 ) {
		
		ddd = 30 - 14;
		mm = mm + 1;
		
					if(ddd<10) {
		ddd='0'+ddd
		
			if(mm<10) {
		mm='0'+mm
	} 
		
	} 

	if(mm<10) {
		mm='0'+mm
	}
		
		
	}
		
	today = mm + '/' + ddd + '/' + yyyy;
	
	var dateAgain = $('#datepicker');
	dateAgain.val(today);
	
	
	}

);

/**Cheese **/

$("#cheeseBtn").click(

function(){
        var text = $('#itemName');
        text.val('Cheese'); 

	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 21;
	var dddd = today.getDate() + 1;
		
 
		
	if ( ddd > 30 ) {
		
		ddd = 30 - 21;
		mm = mm + 1;
		
					if(ddd<10) {
		ddd='0'+ddd
		
			if(mm<10) {
		mm='0'+mm
	} 
	} 


		
		
	}
		
	today = mm + '/' + ddd + '/' + yyyy;
	
	var dateAgain = $('#datepicker');
	dateAgain.val(today);		

			
	}

);

/** Butter **/

$("#butterBtn").click(

function(){
        var text = $('#itemName');
        text.val('Butter'); 


	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 14;
	var dddd = today.getDate() + 1;
		

		
	if ( ddd > 30 ) {
		
		ddd = 30 - 14;
		mm = mm + 1;
		
					if(ddd<10) {
		ddd='0'+ddd
		
			if(mm<10) {
		mm='0'+mm
	} 
		
	} 

	if(mm<10) {
		mm='0'+mm
	}
		
	}
		
	
	today = mm + '/' + ddd + '/' + yyyy;
	
	var dateAgain = $('#datepicker');
	dateAgain.val(today);
	}

);

/** Carrots **/

$("#carrotBtn").click(

function(){
        var text = $('#itemName');
        text.val('Carrots');  

			var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+2; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 2;
	var dddd = today.getDate() + 1;
		

		
			if ( ddd > 30 ) {
		
		ddd = 30 - ddd.value();
		mm = mm + 1;
		
					if(ddd<10) {
		ddd='0'+ddd
		
			if(mm<10) {
		mm='0'+mm
	} 
		
	} 


		
	}
	
		if(mm<10) {
		mm='0'+mm
	}
		
	today = mm + '/' + dd + '/' + yyyy;
	
	var dateAgain = $('#datepicker');
	dateAgain.val(today);
		
	}

);

/** Beef **/

$("#beefBtn").click(

function(){
        var text = $('#itemName');
        text.val('Beef'); 

	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 3;
	var dddd = today.getDate() + 1;
		

		
			if ( ddd > 30 ) {
		
		ddd = 30 - ddd.value();
		mm = mm + 1;
		
					if(ddd<10) {
		ddd='0'+ddd
		
		
	} 


		
	}
	
		if(mm<10) {
		mm='0'+mm
	}
		
	today = mm + '/' + ddd + '/' + yyyy;
	
	var dateAgain = $('#datepicker');
	dateAgain.val(today);
	}

);

/** Chicken **/

$("#chickenBtn").click(

function(){
        var text = $('#itemName');
        text.val('Chicken');

	var today = new Date();
	var todayAgain = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ddd = today.getDate() + 2;
	var dddd = today.getDate() + 1;
		

	
		if ( ddd > 30 ) {
		
		ddd = 30 - ddd.value();
		mm = mm + 1;
		
					if(ddd<10) {
		ddd='0'+ddd
		
			if(mm<10) {
		mm='0'+mm
	} 
		
	} 


		
	}
	
				if(mm<10) {
		mm='0'+mm
	} 
		
		
	today = mm + '/' + ddd + '/' + yyyy;
	
	var dateAgain = $('#datepicker');
	dateAgain.val(today);
	
		
	}

);


