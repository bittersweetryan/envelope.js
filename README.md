envelope.js
===========
To skip all this nonsense and see it in action I've created a <a href="http://jsfiddle.net/bittersweetryan/GbAfk/" target="_blank">fiddle</a> for you to play with.

Envelope is a simple, _**event driven**_ jQuery plugin for in app messaging designed to work with popular UI frameworks as well as without. 

One issue with using callbacks to show user alerts is that they are not very reuseable. Using an evented approach allows you to decouple the action of showing a message to your users with the function or callback that generates it.

```js
$.ajax({

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
}); 
```

Not only is this hard to maintain, but is difficult to reuse.  Envelope decouples this by making the above code look like:

```js
$.ajax({

	url : ...,
	
	success : function(){
		$.trigger('save.success') //note namespaced event
	},

	error : function(){
		$.trigger('save.error');
	}
});
``` 

#Using

###Requirements

 * jQuery 1.7 or greater
 * If you are using Twitter Bootstrap's alerts you must have the boostrap stylesheet included on the page
 * If you are using jQueryUI's alerts you must have the jQueryUI stylesheet included on the page

###Setup

In order to use envelope, you attach it to a container and pass it options and events.

```js
$("#messages").envelope(options,events);
```

Lets take a look a a more complete example: 

```js
$("#messages").envelope(
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
);
```



###Envelop Options

The following options are valid for envelope: 

uiFramework : 'jqueryui | bootstrap | none (default)'
autoCloseTimeout : _milliseconds before autoClose_

###Event Parameter

Events is an array of objects with the following properties, all are optional:
 
 * name : '_string_'
 * message : '_string_'
 * type : 'error | success | info (default)' 
 * autoClose : true | false (default)
 * addCloseButton : true | false (default)
 * callback : function(){}

###Methods

####add(event options)

You can add events to envelope after initialization by using the _add_ method.  

```js
$("#messages").envelope('add',
	{
		name : 'test.success',
		message: 'Success saving test.',
		type: 'success',
		addCloseButton : true,
		autoClose : true
	}
);
```

####remove(eventName)

You can remove events after initialization by using the _remove_ method.

```js
$("#messages").envelope('remove','test.success');
```

##TODO
 * append additional text to the message triggered
 * add a add one
 * Trigger events
     * show
     * hide
     * autoHide
 * Make sure callback runs after event, use deferreds? 