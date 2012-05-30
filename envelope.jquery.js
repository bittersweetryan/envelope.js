!(function($,window,document,undefined){
		var _methods = {
			remove : function(eventName){

			},
			add : function(options){

			}
		};
		
		var _events = [

		];

		var _defaults = {
			uiFramework : 'none'
		};

	$.fn.envelope = function(options,events){

		_events = _events.concat(events);

		
		options = $.extend(_defaults, options);

		//make sure events is an array
		if($.isArray(events)){
			//cache array length
			var len = events.length;
			for(var i = 0; i < len; i++){
				//cache current event
				var currentEvent = events[i];

				if($.isObject(events[i]) && events[i].hasOwnProperty('name') && events[i].hasOwnProperty(fn)){
					document.on(events[i].name,function(){
						//use a deferred to call the callback 
					});
				}
			}	
		}
		
		return this;
	}
}(jQuery,window,window.document));