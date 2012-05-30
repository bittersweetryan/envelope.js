!(function($,window,document,undefined){
		var methods = {
			remove : function(eventName){

			},
			add : function(options){

			}
		};
		
		var events = [

		];

	$.fn.envelope = function(options,events){

		//I think creating 3 vars here is a bit clener than creating one
		var defaults = {
				uiFramework : 'none'
		};
		
		options = $.extend(defaults, options);

		//make sure events is an array
		if($.isArray(events)){
			//cache array length
			var len = events.length;
			for(var i = 0; i < len; i++){
				//cache current event
				var currentEvent = events[i];

				if($.isObject(events[i]) && events[i].hasOwnProperty('name') && events[i].hasOwnProperty(fn)){
					document.on(events[i].name,fn);
				}
			}	
		}
		
		return this;
	}
}(jQuery,window,window.document));