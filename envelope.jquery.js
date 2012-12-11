/*
Copyright (c) 2012 Ryan Anklam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*global console:false*/

( function( $, window, document, undefined ){
	'use strict';

	//additional methods
	var _methods = {
		add : function( options ){
			var newElement,
				self = this,
				framework = null;

			options = $.extend( {}, _eventDefaults, options );

			if( _options.uiFramework.search( new RegExp( 'jqueryui', 'i' ) ) === 0 ){
				framework = 'jqueryui';
			}
			else if( _options.uiFramework.search( new RegExp( 'bootstrap', 'i' ) ) === 0 ){
				framework = 'bootstrap';
			}
			else if( _options.uiFramework.search( new RegExp( 'foundation', 'i' ) ) === 0 ){
				framework = 'foundation';
			}
			else{
				framework = 'envelope';
			}
				
			newElement = addAlert( framework, options.type, options.message, options.addCloseButton );
			
			newElement.hide( );

			$( document ).on( options.name, function( e, messageToAppend ){

				if( messageToAppend ){
					var $msg = newElement.find( ".message" );

					$msg.html(
						$msg.html( ) + ' ' + messageToAppend
					);
				}

				self.append( newElement );

				newElement.fadeIn( 'slow' );

				if( options.autoClose ){

					var t = window.setTimeout( function(){
						newElement.fadeOut( 'slow', function(){
							$( this ).remove();
						});

						window.clearTimeout( t );
					}, _options.autoCloseTimeout );
				}

				if( options.callback && typeof options.callback === 'function' ){
					options.callback();
				}
			});

			return this;
		},

		remove : function( method ){
			return $( document ).off( method );
		}
	};
	
	//events objects to hold events this will respond to
	var _events = {},
		_element,
		_options;

	//plugin defaults
	var _defaults = {
		uiFramework : 'none',
		autoCloseTimeout : 5000 //autoclose timeout of 5 seconds
	};

	//defaults for each event
	var _eventDefaults = {
		type : 'info',
		autoClose : false,
		addCloseButton : false,
		callback : undefined
	};

	//vars for creating UI elements
	var elems = {
		jqueryui : {
			ele : '<p><span class="ui-icon" style="float: left; margin-right: .3em;"></span>' + '<span class="message"></span></p>',
			successClass : 'ui-icon-info',
			errorClass : 'ui-icon-error',
			infoClass : 'ui-icon-info',
			closeButton : '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick" style="float: right">close</span></a>',
			addToSelector : 'span:first',
			addCloseEvent : function( ){
				$( this ).on( 'click',function(){
					$( this ).parent().parent().fadeOut( 'slow' );
				});
			}
		},
		bootstrap : {
			ele : '<div class="alert"><span class="message"></span></div>',
			successClass : 'alert-success',
			errorClass : 'alert-error',
			infoClass : 'alert-info',
			closeButton : '<button class="close" data-dismiss="alert">x</button>',
			addToSelector : null,
			addCloseEvent : function( ){

				$( this ).on( 'click',function(){
					$( this ).parent().fadeOut( 'slow' );
				});
			}
		},
		foundation : {
			ele : '<div class="alert-box"><span class="message"></span></div>',
			successClass : 'success',
			errorClass : 'alert',
			infoClass : null,
			closeButton : '<a class="close">x</a>',
			addToSelector : null,
			addCloseEvent : function( ){

				$( this ).on( 'click',function(){
					$( this ).parent().fadeOut( 'slow' );
				});
			}
		},
		envelope : {
			ele : '<div class="env_container"><span class="message">Hello World</span></div>',
			successClass : 'success',
			errorClass : 'error',
			infoClass : null,
			closeButton : $('<div class="close">&times;</div>'),
			addToSelector : null,
			addCloseEvent : function( ){

				$( this ).on( 'click',function(){
					$( this ).parent().fadeOut( 'slow' );
				});
			}
		}
	};


	var addAlert = function( framework, type, message, addCloseButton ){

		var newElement = $(elems[ framework ].ele),
			addToSelector = elems[ framework ].addToSelector,
			addTo = null;

		if(  addToSelector !== null ){
			addTo = newElement.find( addToSelector );
		}
		else{
			addTo = newElement;
		}

		if( type === 'error' ){

			addTo.addClass( elems[ framework ].errorClass );
		}
		else if( type === 'info' ){

			if( elems[ framework ].infoClass ){
				addTo.addClass( elems[ framework ].infoClass );
			}
		}
		else{

			addTo.addClass( elems[ framework ].successClass );
		}

		if( addCloseButton ){
			var closeButton = $( elems[ framework ].closeButton ).clone();

			if( elems[ framework ].addCloseEvent ){
				elems[ framework ].addCloseEvent.call( closeButton );
			}

			newElement.append( closeButton );
		}

		newElement.find( 'span.message' ).html( message );

		return newElement;
	};

	//main plugin method
	$.fn.envelope = function(options,events){
		var $this = $( this ),
			method;

		//if options is an array that means user didn't supply any options and starts with events
		if(typeof options === 'string' && _methods[options]){
			method = options;

			return _methods[ method ].apply( $this, Array.prototype.slice.call( arguments, 1 ) );
		}
		else if( $.isArray( options ) ){
			events = options;
		}

		_events = $.extend( {}, _events, events );
		
		//if options is an object extend it with the defaults
		if( typeof options === 'object' ){
			_options = $.extend( {}, _defaults, options );
		}
		
		//make sure events is an array
		if( $.isArray( events ) ){
			//loop through the events
			$.each( _events, function( index, value ){

				//make sure the options has a name
				if( typeof value === 'object' && value.hasOwnProperty( 'name' ) ){
					_methods.add.call( $this, value );
				}
			});
		}
	
		return this;
	};
}( jQuery, window, window.document ) );