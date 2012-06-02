describe("envelope with jqueryui",function(){
	

	var spies = {
		successSpy : jasmine.createSpy(),
		errorSpy : jasmine.createSpy(),
		untypedSpy : jasmine.createSpy(),
		addedSpy : jasmine.createSpy()
	};

	beforeEach(function(){
		loadFixtures('envelopeFixture_jqueryui.html');

		$("#messages").envelope(
			{uiFramework : 'jQueryUI'},
			[
				{
					name : 'test.success',
					message: 'Success saving test.',
					type: 'success',
					callback : spies.successSpy
				},
				{
					name : 'test.error',
					message : 'Error saving test.',
					type : 'error',
					callback : spies.errorSpy
				},
				{
					name : 'test.untyped',
					message : 'Untyped saving test.',
					callback : spies.untypedSpy
				}
			]
		);
	});

	it("should add a new message element to the dom on success",function(){

		runs ( function(){
			$("#successButton").trigger('test.success');
		});
		
		runs ( function(){
			expect($("#messages").find("span:first")).toBe(".ui-icon-info");
		});

		
	});

	it("Should add the success message",function(){
		$("#successButton").trigger('test.success');

		expect($("#messages:visible")).toHaveText("Success saving test.");
	});

	it("Should call the success callback",function(){
		$("#successButton").trigger('test.success');

		expect(spies.successSpy).toHaveBeenCalled();
	});

	it("should add a element to the dom on error",function(){
		$("#errorButton").trigger('test.error');

		expect($("#messages").find("span:first")).toBe(".ui-icon-error");
	});

	it("should add a message on a error event form dom",function(){
		$("#errorButton").trigger('test.error');

		expect($("#messages")).toHaveText("Error saving test.");
	});

	it("should call the error callback",function(){
		$("#errorButton").trigger('test.error');

		expect(spies.errorSpy).toHaveBeenCalled();
	});

	it("should add a untyped message to the dom",function(){
		$("#untypedButton").trigger('test.untyped');

		expect($("#messages").find("span:first")).toBe(".ui-icon-info");
	});

	it("should add a message on a untyped event from dom",function(){
		$("#untypedButton").trigger('test.untyped');

		expect($("#messages")).toHaveText("Untyped saving test.");

	});

	it("should call the untyped callback",function(){
		$("#untypedButton").trigger('test.untyped');

		expect(spies.untypedSpy).toHaveBeenCalled();

	});
});

describe("envelope with bootstrap",function(){
	var spies = {
		successSpy : jasmine.createSpy(),
		errorSpy : jasmine.createSpy(),
		untypedSpy : jasmine.createSpy(),
		addedSpy : jasmine.createSpy()
	};

	beforeEach(function(){
		loadFixtures('envelopeFixture_bootstrap.html');

		$("#messages").envelope(
			{uiFramework : 'jQueryUI'},
			[
				{
					name : 'test.success',
					message: 'Success saving test.',
					type: 'success',
					callback : spies.successSpy
				},
				{
					name : 'test.error',
					message : 'Error saving test.',
					type : 'error',
					callback : spies.errorSpy
				},
				{
					name : 'test.untyped',
					message : 'Untyped saving test.',
					callback : spies.untypedSpy
				}
			]
		);
	});
})