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
		uiFramework : 'none'
	};

	//defaults for each event
	var _eventDefaults = {
		type : 'info',
		autoClose : false,
		addCloseButtion : false,
		callback : undefined
	};

	//vars for creating UI elements
	var jQueryUIElem = $('<p><span class="ui-icon" style="float: left; margin-right: .3em;"></span>' +
						'<span></span></p>'),

		bootstrapElem = $('<div class="alert"></div>'),

		defaultElem = $('<div></div>'),

		jQueryUISuccessClass = 'ui-icon-info',

		jQueryUIErrorClass = 'ui-icon-error',

		bootstrapSuccessClass = 'alert-success',

		bootstrapErrorClass = 'alert-error',

		bootstrapInfoClass = 'alert-info';

	//main plugin method
	$.fn.envelope = function(options,events){
		var $this = $(this);

		_events = $.extend({},_events, events);
		
		options = $.extend({},_defaults, options);

		//make sure events is an array
		if($.isArray(events)){
			//loop through the events
			$.each(_events,function(index,value){

				var eventOptions = $.extend({},_eventDefaults,value);

				//make sure the options has a name
				if(typeof eventOptions === 'object' && eventOptions.hasOwnProperty('name')){
					
					var alert = addAlert(eventOptions.type,
							eventOptions.message,
							eventOptions.autoClose,
							eventOptions.addCloseButton,
							eventOptions.callback);
					
					$(document).on(eventOptions.name,function(){

						$this.append(alert);
						alert.fadeIn('slow');

						if(eventOptions.callback && typeof eventOptions.callback === 'function'){
							eventOptions.callback();
						}
					});
				}
			});
		}
		
		//add an alert to the dom
		function addAlert(type,message,autoClose,addCloseButton,callback){
			var newElement;

			if(options.uiFramework === 'jQueryUI'){
				newElement = addAlertTojQueryUI.apply(this,Array.prototype.slice.call(arguments));
			}
			else if(options.uiFramework === 'bootstrap'){

			}
			else{

			}

			if(addCloseButton){
				//implement add close button
			}

			if(autoClose){
				//implement autoclose
			}
				
			newElement.hide();

			return newElement;
		}

		function addAlertTojQueryUI(type,message,autoClose,addCloseButton){
			var newElement = jQueryUIElem.clone();
			var firstSpan = newElement.find("span:first");

			if(type === 'error'){
				firstSpan.addClass(jQueryUIErrorClass);
			}
			else{
				firstSpan.addClass(jQueryUISuccessClass);
			}

			newElement.find('span:nth-child(2)').html(message);

			return newElement;
		}

		return this;
	};
}(jQuery,window,window.document));