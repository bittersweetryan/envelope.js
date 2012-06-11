envelope.js
===========

Enveope is a simple, _**event driven**_ jQuery plugin for in app messaging designed to work with popular UI frameworks as well as without. 

One issue with using callbacks to show user alerts is that they are not very reuseable. Using an evented approach allows you to decouple the action of showing a message to your users with the function or callback that generates it.

`$.ajax({

	url : ...,
	
	success : function(){
		$msg = $("<p>Success saving.</p>").hide();

		$('#messages').append(
			$msg;
		);

		$msg.fadeIn("slow");
	},

	error : function(){
		...
	}
});` 

Not only is this hard to maintain, but is difficult to reuse.  Envelope decouples this by making the above code look like:

`$.ajax({

	url : ...,
	
	success : function(){
		$.trigger('save.success') //note namespaced event
	},

	error : function(){
		$.trigger('save.error');
	}
});` 

#Using

In order to use envelope, you attach it to a container and pass it options and events.

`$("#messages").envelope(options,events);`

Lets take a look a a more complete example: 

`$("#messages").envelope(
	{
		uiFramework : 'jqueryui', //use jQueryui
		autoCloseTmeout : 5000 //autoclose after 5 seconds
	},
	[
		{
			name: 'user.save',  //event to listen for
			message: 'User saved successfully', //message to add when event is triggered
			callback: function(){ //callback to be executed when the event is triggered
				console.log("User saved");
			},
			autoClose: true,  //tell this message to autoclose
			addCloseButton: true, //add a close button to the div
			type: 'success'  //type of message to show
		}
	]
);`

###Options

The following options are valid for envelope: 

uiFramework : 'jqueryui | bootstrap | none (default)'
autoCloseTimeout : _milliseconds before autoClose_

###events

Events is an array of objects with the following properties, all are optional:
 
 * name : '_string_'
 * message : '_string_'
 * type : 'error | success | info (default)' 
 * autoClose : true | false (default)
 * addCloseButton : true | false (default)
 * callback : function(){}

###Methods (not yet implemented)

_add(options)_

_remove(options)_

_modify(options)_
