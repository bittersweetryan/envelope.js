$(function(){
	var $messageContainer_bootstrap = $("#messages_bootstrap");
	var $messageContainer_ui = $("#messages_ui");
	var $messageContainer_default = $("#messages_default");

	$messageContainer_bootstrap.envelope(
		{
			uiFramework : 'bootstrap',
			autoCloseTimeout : 5000
		},
		[
			{
				name : 'bootstrap.save',
				message: "You just clicked the save button.",
				callback: function(){
				//	$(this).trigger("callback.fired");
				},
				autoClose: true,
				addCloseButton: true,
				type: 'info'
			},
			{
				name : 'callback.fired',
				message: "The callback just fired.",
				autoClose: true,
				addCloseButton: true,
				type: 'success'
			}
		]
	);

	$("#trigger_save").on('click',function(){
		$(this).trigger('bootstrap.save');
	});
});