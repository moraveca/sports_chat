$(function () {
    var arrow = $('.chat-head img');
    var textarea = $('.chat-text textarea');


    // when you click on the arrow it minimizes the chat or expands it
    arrow.on('click', function () {
        var src = arrow.attr('src');

        $('.chat-body').slideToggle('fast');
        if (src == 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png') {
            arrow.attr('src', 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_up-16.png');
        }
        else {
            arrow.attr('src', 'https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png');
        }
    });

    var username = prompt('what is your name?');

  
var original = 0;     // this variable will be the length of the original database when you load the site 
$.get("/api/chat", function(data) {
//	console.log('the value of user name is ' + username);
     console.log('hello data' + data);
	for (var i =0; i<data.length; i++) {
		original = data.length;
		if (username === data[i].username) {
				// if user name is correct displaly posts as black 
			$('.msg-insert').append("<div class='msg-send'>"+ data[i].body  + " - " + data[i].username + "</div>");
		} 
		if (username !== data[i].username) {
			// if your not the user then display other peoples prevoius posts as blue 
			$('.msg-insert').append("<div class='msg-receive'>"+ data[i].body + " - " + data[i].username +    "</div>");
		}
	}
});



// a function that displays the most recent information 

	setInterval(function(){ 
		console.log(original);
	var difference = 0;  	
		// function that displays other people 
		$.get('api/chat', function(data) {
		
		 difference = (data.length - original);     //get the difference between the new data.length and the old 
		console.log('dif is ' + difference);

function display ()	{ 	
for (var i=0; i<data.length; i++) {
var y = data[i].username;
	//console.log(data[i].username);

}
return y; 
}
console.log('the value of the function is ' + display());
        // if the current username does not equal itself then display the information 
		if (difference>=1 && username!== display() ) {
			for (var i = original; i<=data.length; i++ )  {
				$('.msg-insert').append("<div class='msg-receive'>"+ data[i].body + " - " + data[i].username + "</div>");

				// reset the values and increase the orginial variable 
				difference = 0;  
				original ++; 
			console.log('inside the diff is ' + difference);
			}	
		}; 
	})

	 }, 1000);

	
	textarea.keypress(function(event) {
		var $this = $(this);

		if(event.keyCode == 13){      // event code 13 is the enter button 

			var msg = $this.val().trim();
			
			$this.val('');
            $('.msg-insert').append("<div class='msg-send'>"+ msg+ " - " + username + "</div>");
			
			var x = {
				body:msg,
				username: username 
			}

	    $.ajax("api/chat", {
			type: "POST", 
			data: x
		}).then(
			function () {
				console.log('post was succesful!')

			})
			
}
	});

});