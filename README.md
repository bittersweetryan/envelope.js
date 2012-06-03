envelope.js
===========

Simple, event driven jQuery plugin for in app messaging.

#Using

`$("#messages").envelope(options,events);`

`$("#messages").envelope(
	{
		uiFramework : 'jQueryUI'
	},
	[
		{
			name: 'user.save',
			message: 'User saved successfully',
			callback: function(){
				console.log("User saved");
			},
			autoClose: true,
			addCloseButton: true,
			type: 'success'
		}
	]
);`

###options

uiFramework : 'jQueryUI | bootstrap : none (default)'
delay : milliseconds before autoClose

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
