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

		bootstrapElem = $('<div class="alert"></div>'),

		defaultElem = $('<div></div>'),

		jQueryUISuccessClass = 'ui-icon-info',

		jQueryUIErrorClass = 'ui-icon-error',

		bootstrapSuccessClass = 'alert-success',

		bootstrapErrorClass = 'alert-error',

		bootstrapInfoClass = 'alert-info',

		bootstrapCloseButton = '<button class="close" data-dismiss="alert">x</button>',

		jQueryUICloseButton = '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick" style="float: right">close</span></a>';

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
							eventOptions.addCloseButton,
							eventOptions.callback);
					
					$(document).on(eventOptions.name,function(){

						$this.append(alert);
						alert.fadeIn('slow');

						if(eventOptions.autoClose){

							alert.delay(options.autocloseTimeout).fadeOut(function(){
								$(this).remove();
							});
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
				newElement.append($(bootstrapCloseButton).clone());
			}

			newElement.html(message);

			return newElement;
		}

		return this;
	};
}(jQuery,window,window.document));