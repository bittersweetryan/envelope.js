envelope.js
===========

Simple, event driven jQuery plugin for in app messaging.

#Using

`$("#messages").envelope(options,events);`

`$("#messages").envelope(
	{
		uiFramework : 'jQueryUI', //use jQueryui
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

###options

uiFramework : 'jQueryUI | bootstrap : none (default)'
autoCloseTimeout : _milliseconds before autoClose_

###events

Events is an array of objects with the following properties:
 
 * name : '_string_'
 * message : '_string_'
 * type : 'error | success | info (default)' 
 * autoClose : true | false
 * addCloseButton : true | false
 * callback : function(){}

###Methods

_add(options)_

_remove(options)_

_modify(options)_
