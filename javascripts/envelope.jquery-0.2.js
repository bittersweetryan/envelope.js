/*
Copyright (c) 2012 Ryan Anklam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($,window,document,undefined){

	//additional methods
	var _methods = {
		add : function(options){
			var newElement,
				self = this;

			options = $.extend({},_eventDefaults,options);

			if(_options.uiFramework.search(new RegExp('jqueryui','i')) === 0){
				newElement = addAlertTojQueryUI(options.type,options.message,options.addCloseButton);
			}
			else if(_options.uiFramework.search(new RegExp('bootstrap','i')) === 0){
				newElement = addAlertToBootstrap(options.type,options.message,options.addCloseButton);
			}
			else if(_options.uiFramework.search(new RegExp('foundation','i')) === 0){
				newElement = addAlertToFoundation(options.type,options.message,options.addCloseButton);
			}
			else{
				newElement = addAlertToDefault(options.type,options.message,options.addCloseButton);
			}
				
			newElement.hide();

			$(document).on(options.name,function(e,messageToAppend){

				if(messageToAppend){
					var $msg = newElement.find(".message");

					$msg.html(
						$msg.html() + ' ' + messageToAppend
					);
				}

				self.append(newElement);

				newElement.fadeIn('slow');

				if(options.autoClose){

					var t = setTimeout(function(){
						newElement.fadeOut('slow',function(){
							$(this).remove();
						});

						clearTimeout(t);
					},_options.autoCloseTimeout);
				}

				if(options.callback && typeof options.callback === 'function'){
					options.callback();
				}
			});

			return this;
		},

		remove : function(method){
			return $(document).off(method);
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
	var jQueryUIElem = $('<p><span class="ui-icon" style="float: left; margin-right: .3em;"></span>' +
						'<span class="message"></span></p>'),
		
		jQueryUISuccessClass = 'ui-icon-info',

		jQueryUIErrorClass = 'ui-icon-error',

		jQueryUICloseButton = '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick" style="float: right">close</span></a>',

		bootstrapElem = $('<div class="alert"><span class="message"></span></div>'),

		bootstrapSuccessClass = 'alert-success',

		bootstrapErrorClass = 'alert-error',

		bootstrapInfoClass = 'alert-info',

		bootstrapCloseButton = '<button class="close" data-dismiss="alert">x</button>',

		foundationElem = $('<div class="alert-box"></div>'),

		foundationCloseButton = '<a class="close">x</a>',

		foundationSuccessClass = 'success',

		foundationErrorClass = 'alert',

		defaultElem = $('<div class="env_container"><span class="message">Hello World</span></div>'),

		defaultCloseButton = $('<div class="close">&times;</div>'),

		defaultSuccessClass = 'success',

		defaultErrorClass = 'error';

	function addAlertTojQueryUI(type,message,addCloseButton){
		var newElement = jQueryUIElem.clone(),
			firstSpan = newElement.find("span:first");

		if(type === 'error'){
			firstSpan.addClass(jQueryUIErrorClass);
		}
		else{
			firstSpan.addClass(jQueryUISuccessClass);
		}

		if(addCloseButton){
			var closeButton = $(jQueryUICloseButton).clone();

			closeButton.on('click',function(){
				$(this).parent().parent().fadeOut('slow');
			});

			newElement.append(jQueryUICloseButton);
		}

		newElement.find('span.message').html(message);

		return newElement;
	}

	function addAlertToFoundation(type,message,addCloseButton){
		
        var newElement = foundationElem.clone();

		if(type === 'error'){
			newElement.addClass(foundationErrorClass);
		}
		else if(type === 'success'){
			newElement.addClass(foundationSuccessClass);
		}

		if(addCloseButton){
			var closeButton = $(foundationCloseButton).clone();
			newElement.append(closeButton);
		}
        
		newElement.prepend('<span>' + message + '</span>');
        
		return newElement;
	}

	function addAlertToDefault(type,message,addCloseButton){

		var newElement = defaultElem.clone();

		if(type === 'error'){
			newElement.addClass(defaultErrorClass);
		}
		else if(type === 'success'){
			newElement.addClass(defaultSuccessClass);
		}

		if(addCloseButton){
			var closeButton = defaultCloseButton.clone();

			closeButton.on('click',function(){
				$(this).parent().fadeOut('slow');
			});

			newElement.append(closeButton);
		}

		newElement.find('span.message').html(message);

		return newElement;
	}

	function addAlertToBootstrap(type,message,addCloseButton){
		var newElement = bootstrapElem.clone();

		if(type === 'error'){
			newElement.addClass(bootstrapErrorClass);
		}
		else if(type === 'success'){
			newElement.addClass(bootstrapSuccessClass);
		}
		else{
			newElement.addClass(bootstrapInfoClass);
		}
		
		if(addCloseButton){
			var closeButton = $(bootstrapCloseButton).clone();

			closeButton.on('click',function(){
				$(this).parent().fadeOut('slow');
			});

			newElement.append(closeButton);
		}

		newElement.find('span.message').html(message);

		return newElement;
	}

	//main plugin method
	$.fn.envelope = function(options,events){
		var $this = $(this),
			method;

		//if options is an array that means user didn't supply any options and starts with events
		if(typeof options === 'string' && _methods[options]){
			method = options;

			return _methods[method].apply($this,Array.prototype.slice.call(arguments,1));
		}
		else if($.isArray(options)){
			events = options;
		}

		_events = $.extend({},_events, events);
		
		//if options is an object extend it with the defaults
		if(typeof options === 'object'){
			_options = $.extend({},_defaults, options);
		}
		
		//make sure events is an array
		if($.isArray(events)){
			//loop through the events
			$.each(_events,function(index,value){

				//make sure the options has a name
				if(typeof value === 'object' && value.hasOwnProperty('name')){
					_methods.add.call($this,value);
				}
			});
		}
	
		return this;
	};
}(jQuery,window,window.document));