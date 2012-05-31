describe("envelope with jqueryui",function(){
	loadFixtures('envelopeFixture.html');

	var spies = {
		successSpy : jasmine.createSpy(),
		errorSpy : jasmine.createSpy(),
		untypedSpy : jasmine.createSpy()
	};

	beforeEach(function(){
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

	it("should add a message on an event",function(){

	});
});