envelope.js
===========

Simple jQuery plugin for in app messaging.

#Using

`$("#messages").envelope(options,events);`

##Options

uiFramework : 'jQueryUI | bootstrap : none (default)'

##Events

Events is an array of objects with the following properties:
 
 * event name
 * message text
 * messageType : 'error | success | info (default)' 
 * autoClose : true | false
 * addCloseButton : true | false
 * callback