$(function(){
	prettyPrint();

	var $messageContainer_bootstrap = $("#messages_bootstrap");
	var $messageContainer_jqueryui = $("#messages_jqueryui");
	var $messageContainer_foundation = $("#messages_foundation");
	var $messageContainer_default = $("#messages_default");

	$messageContainer_bootstrap.envelope(
		{
			uiFramework : 'bootstrap',
			autoCloseTimeout : 5000
		},
		[
			{
				name : 'bootstrap.success',
				message: "The operation was a success!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'success'
			},
			{
				name : 'bootstrap.error',
				message: "There was an error!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'error'
			},
			{
				name : 'bootstrap.info',
				message: "Something happened!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'info'
			}
		]
	);

	$messageContainer_foundation.envelope(
		{
			uiFramework : 'foundation',
			autoCloseTimeout : 5000
		},
		[
			{
				name : 'foundation.success',
				message: "The operation was a success!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'success'
			},
			{
				name : 'foundation.error',
				message: "There was an error!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'error'
			},
			{
				name : 'foundation.info',
				message: "Something happened!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'info'
			}
		]
	);

	$messageContainer_jqueryui.envelope(
		{
			uiFramework : 'jqueryui',
			autoCloseTimeout : 5000
		},
		[
			{
				name : 'jqueryui.success',
				message: "The operation was a success!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'success'
			},
			{
				name : 'jqueryui.error',
				message: "There was an error!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'error'
			},
			{
				name : 'jqueryui.info',
				message: "Something happened!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'info'
			}
		]
	);

	$messageContainer_default.envelope(
		{
			autoCloseTimeout : 5000
		},
		[
			{
				name : 'default.success',
				message: "The operation was a success!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: false,
				type: 'success'
			},
			{
				name : 'default.error',
				message: "There was an error!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: false,
				type: 'error'
			},
			{
				name : 'default.info',
				message: "Something happened!",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: false,
				type: 'info'
			}
		]
	);

	$("#generateEvent").on('click',function(){
		var framework = $("input[name=uiFramework]:checked").val();
		var type = $("input[name=eventType]:checked").val();
		
		$(this).trigger(framework + '.' + type);
	});
});