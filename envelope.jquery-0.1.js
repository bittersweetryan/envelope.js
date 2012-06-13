/*
Copyright (c) 2012 Ryan Anklam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($,window,document,undefined){

	//additional methods
	var _methods = {
		remove : function(eventName){

		},
		add : function(options){

		}
	};
	
	//events objects to hold events this will respond to
	var _events = {};

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
						'<span></span></p>'),

		bootstrapElem = $('<div class="alert"><span></span></div>'),

		defaultElem = $('<div></div>'),

		jQueryUISuccessClass = 'ui-icon-info',

		jQueryUIErrorClass = 'ui-icon-error',

		bootstrapSuccessClass = 'alert-success',

		bootstrapErrorClass = 'alert-error',

		bootstrapInfoClass = 'alert-info',

		bootstrapCloseButton = '<button class="close" data-dismiss="alert">x</button>',

		jQueryUICloseButton = '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick" style="float: right">close</span></a>',

		defaultElem = $('<div class="env_container"><p class="sunkenText">Hello World</p></div>'),

		defaultCloseButton = $('<div class="close">x</div>'),

		defaultSuccessClass = 'success',

		defaultErrorClass = 'error';


	//main plugin method
	$.fn.envelope = function(options,events){
		var $this = $(this);

		//if options is an array that means user didn't supply any options and starts with events
		if($.isArray(options)){
			events = options;
		}

		_events = $.extend({},_events, events);
		
		//if options is an object extend it with the defaults
		if(typeof options === 'object'){
			options = $.extend({},_defaults, options);
		}
		

		//make sure events is an array
		if($.isArray(events)){
			//loop through the events
			$.each(_events,function(index,value){

				var eventOptions = $.extend({},_eventDefaults,value);

				//make sure the options has a name
				if(typeof eventOptions === 'object' && eventOptions.hasOwnProperty('name')){

					var alert = addAlert(eventOptions.type,
							eventOptions.message,
							eventOptions.addCloseButton,
							eventOptions.callback);
					
					$(document).on(eventOptions.name,function(){

						$this.append(alert);
						alert.fadeIn('slow');

						if(eventOptions.autoClose){

							var t = setTimeout(function(){
								alert.fadeOut('slow',function(){
									$(this).remove();
								});

								clearTimeout(t);
							},options.autoCloseTimeout);
						}

						if(eventOptions.callback && typeof eventOptions.callback === 'function'){
							eventOptions.callback();
						}
					});
				}
			});
		}
		
		//add an alert to the dom
		function addAlert(type,message,addCloseButton){
			var newElement;

			if(options.uiFramework === 'jqueryui'){
				newElement = addAlertTojQueryUI.apply(this,$.makeArray(arguments));
			}
			else if(options.uiFramework === 'bootstrap'){
				newElement = addAlertToBootstrap.apply(this,$.makeArray(arguments));
			}
			else{
				newElement = addAlertToDefault.apply(this,$.makeArray(arguments));
			}
				
			newElement.hide();

			return newElement;
		}

		function addAlertTojQueryUI(type,message,addCloseButton){

			var newElement = jQueryUIElem.clone();
			var firstSpan = newElement.find("span:first");

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

			newElement.find('span:nth-child(2)').html(message);

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

			newElement.find('p').html(message);

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

			newElement.find('span').html(message);

			return newElement;
		}

		return this;
	};
}(jQuery,window,window.document));