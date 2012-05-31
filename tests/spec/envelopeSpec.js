describe("envelope with jqueryui",function(){
	

	var spies = {
		successSpy : jasmine.createSpy(),
		errorSpy : jasmine.createSpy(),
		untypedSpy : jasmine.createSpy()
	};

	beforeEach(function(){
		loadFixtures('envelopeFixture.html');

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
					name : 'test.untype',
					message : 'Untyped saving test.',
					callback : spies.untypedSpy
				}
			]
		);
	});

	it("should add a message on a success event from dom",function(){
		($("#successButton").trigger('test.success'));

		expect($("#messages")).toBe(".ui-icon-info");

		expect($("#messages")).toHaveText("Success saving test.");
	});

	it("should add a message on a error event form dom",function(){
		($("#errorButton").trigger('test.error'));

		expect($("#messages")).toBe(".ui-icon-error");

		expect($("#messages")).toHaveText("Error saving test.");
	});

	it("should add a message on a untyped event from dom",function(){
		($("untypedButton").trigger('test.untyped'));

		expect($("#messages")).toBe(".ui-icon-info");

		expect($("#messages")).toHaveText("Untyped saving test.");

	});
});