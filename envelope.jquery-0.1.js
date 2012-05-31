(function($,window,document,undefined){
		var _methods = {
			remove : function(eventName){

			},
			add : function(options){

			},
			modify : function(options){
				
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

			$.each(_events,function(){

				if(typeof this === 'object' && this.hasOwnProperty('name') && this.hasOwnProperty('fn')){
					document.on(this.name,function(){
						//use a deferred to call the callback
					});
				}
			});
		}
		
		return this;
	};
}(jQuery,window,window.document));