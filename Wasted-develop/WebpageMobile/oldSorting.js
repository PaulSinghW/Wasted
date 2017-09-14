/** SORTING BY ALPHABET -- table loads and is pupulated by values pulled from databse sorted alphabetically **/


function alphabetOrganized() {


	document.getElementById("table_body").innerHTML = "";

	firebaseRef.orderByChild("name").on("child_added", snap => {var name = snap.child("name").val();

	var expiry = snap.child("expiry").val();
	var id = snap.key;
	var childAuthor = snap.child("author").val();
	var thisAuthor = firebase.auth().currentUser.uid;

	/**Creates a date variable **/
	
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

	today = mm + '/' + dd + '/' + yyyy;
	todayAgain = mm + '/' + ddd + '/' + yyyy;
	todayAgainAgain = mm + '/' + dddd + '/' + yyyy;
	
	var daysLeft = expiry.substring(3,5) - dd;
	
	
	if (daysLeft < 0) {
		daysLeft = 0;
	}
	
	if (expiry.substring(0,2) > mm) {
		daysLeft = expiry.substring(0,2) - mm + ' months';
	}
	
	if (expiry.substring(6,10) > yyyy) {
		daysLeft = expiry.substring(6,10) - yyyy + ' years';
	}
	
	
	if (childAuthor == thisAuthor) {
	
		if ( expiry <= today && expiry.substring(6,10) <= yyyy) {
	
	
	var html = '<tr style="background-color: red;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
	
		} else if ( expiry == todayAgain || expiry == todayAgainAgain) {
		
	
	var html = '<tr style ="background-color: yellow;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	
	$(html).appendTo('#table_body');
		
		
		}else {
			
	var html = '<tr id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
			
		}
    }

	
  });
}

/** SORTING BY EXPIRY -- page loads and populates the table with values from the database **/

function expiryOrganized() {

	document.getElementById("table_body").innerHTML = "";
	
	firebaseRef.orderByChild("expiry").on("child_added", snap => {
	
	var name = snap.child("name").val();
	var expiry = snap.child("expiry").val();
	var id = snap.key;
	var childAuthor = snap.child("author").val();
	var thisAuthor = firebase.auth().currentUser.uid;

	
	/** Creating dates to use when sorting by expiry **/
	
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

	today = mm + '/' + dd + '/' + yyyy;
	todayAgain = mm + '/' + ddd + '/' + yyyy;
	todayAgainAgain = mm + '/' + dddd + '/' + yyyy;
	
	var daysLeft = expiry.substring(3,5) - dd;
	
	/**
	if (daysLeft < 0) {
		daysLeft = 0;
	}
	
	if (expiry.substring(0,2) > mm) {
		daysLeft = expiry.substring(0,2) - mm + ' months';
	}
	
	if (expiry.substring(6,10) > yyyy) {
		daysLeft = expiry.substring(6,10) - yyyy + ' years';
	}
	**/
	
	if (childAuthor == thisAuthor) {
	
		if ( expiry <= today && expiry.substring(6,10) <= yyyy) {
	
	
	var html = '<tr style="background-color: red;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
	
		} else if ( expiry == todayAgain || expiry == todayAgainAgain) {
		
	
	var html = '<tr style ="background-color: yellow;" id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	
	$(html).appendTo('#table_body');
		
		
		}else {
			
	var html = '<tr id ="'+id+'"><td>'+ name + '</td><td>' + expiry + '</td><td>' + daysLeft + '</td><td><button onclick = "removeClick(this)" id ="'+id+'">Remove</button></td></tr>'; 
	
	$(html).appendTo('#table_body');
			
		}
    }

	
  });
 
}