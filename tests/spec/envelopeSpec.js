describe("jQueryUI",function(){
	describe("Envelope with jQueryUI.",function(){

		var spies = {
			successSpy : jasmine.createSpy(),
			errorSpy : jasmine.createSpy(),
			untypedSpy : jasmine.createSpy(),
			addedSpy : jasmine.createSpy()
		};

		beforeEach(function(){
			loadFixtures('envelopeFixture_jqueryui.html');

			$("#messages").envelope(
				{uiFramework : 'jqueryui'},
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

	describe("Envelope should respond to methods with jqueryui framework.",function(){
		
		beforeEach(function(){
			loadFixtures('envelopeFixture_default.html');

			$("#messages").envelope(
				{
					autoCloseTimeout : 200, //real short timeout so it doesn't slow the test,
					uiFramework : 'jqueryui'
				}
			);
		});


		it("Should add a new event.",function(){
			$("#messages").envelope('add',
				{
					name : 'test.success',
					message: 'Success saving test.',
					type: 'success',
					addCloseButton : true,
					autoClose : true
				}
			);

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			runs ( function(){
				expect($("#messages").find("span:first")).toBe(".ui-icon-info");
			});

		});

		it("Should remove an event",function(){
				
			runs(function(){
				$("#messages").envelope('add',
					{
						name : 'test.success',
						message: 'Success saving test.',
						type: 'success',
						addCloseButton : true,
						autoClose : true
					}
				);
			});
			
			runs(function(){
				$("#messages").envelope('remove','test.success');
			});

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			runs ( function(){
				expect($("#messages").find("span:first")).not.toBe(".ui-icon-info");
			});
		});
	});

	describe("Envlope should respond to options properly for jQueryUI.",function(){

		beforeEach(function(){
			loadFixtures('envelopeFixture_jqueryui.html');

			$("#messages").envelope(
				{
					uiFramework : 'jqueryui',
					autoCloseTimeout : 200 //real short timeout so it doesn't slow the test
				},
				[
					{
						name : 'test.success',
						message: 'Success saving test.',
						type: 'success',
						addCloseButton : true,
						autoClose : true
					}
				]
			);
		});

		it("Should disappear after default amount of time.",function(){

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			waits(1200);

			runs ( function(){
				expect($("#messages>p").is(":visible")).toBeFalsy();
			});

		});

		it("Should add a close button",function(){
			$("#successButton").trigger('test.success');

			expect($("#messages")).toContain(".ui-dialog-titlebar-close");
		});
	});
});

describe("Bootstrap",function(){
	describe("Envelope with bootstrap.",function(){
		var spies = {
			successSpy : jasmine.createSpy(),
			errorSpy : jasmine.createSpy(),
			untypedSpy : jasmine.createSpy(),
			addedSpy : jasmine.createSpy()
		};

		beforeEach(function(){
			loadFixtures('envelopeFixture_bootstrap.html');

			$("#messages").envelope(
				{uiFramework : 'bootstrap'},
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
				expect($("#messages").find("div")).toBe(".alert-success");
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

			expect($("#messages").find("div")).toBe(".alert-error");
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

			expect($("#messages").find("div")).toBe(".alert-info");
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

	describe("Envelope should respond to methods with boostrap framework.",function(){
		
		beforeEach(function(){
			loadFixtures('envelopeFixture_default.html');

			$("#messages").envelope(
				{
					autoCloseTimeout : 200, //real short timeout so it doesn't slow the test,
					uiFramework : 'bootstrap'
				}
			);
		});


		it("Should add a new event.",function(){
			$("#messages").envelope('add',
				{
					name : 'test.success',
					message: 'Success saving test.',
					type: 'success',
					addCloseButton : true,
					autoClose : true
				}
			);

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			runs ( function(){
				expect($("#messages").find("div")).toBe(".alert-success");
			});

		});

		it("Should remove an event",function(){
				
			runs(function(){
				$("#messages").envelope('add',
					{
						name : 'test.success',
						message: 'Success saving test.',
						type: 'success',
						addCloseButton : true,
						autoClose : true
					}
				);
			});
			
			runs(function(){
				$("#messages").envelope('remove','test.success');
			});

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			runs ( function(){
				expect($("#messages").find("div")).not.toBe(".alert-success");
			});
		});
	});

	describe("Envlope should respond to options properly for bootstrap.",function(){

		beforeEach(function(){
			loadFixtures('envelopeFixture_bootstrap.html');

			$("#messages").envelope(
				{
					uiFramework : 'bootstrap',
					autoCloseTimeout : 200 //real short timeout so it doesn't slow the test
				},
				[
					{
						name : 'test.success',
						message: 'Success saving test.',
						type: 'success',
						addCloseButton : true,
						autoClose : true
					}
				]
			);
		});

		it("Should disappear after default amount of time.",function(){

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			waits(1200);

			runs ( function(){
				expect($("#messages").find("div").is(":visible")).toBeFalsy();
			});

		});

		it("Should add a close button",function(){
			$("#successButton").trigger('test.success');

			expect($("#messages")).toContain(".close");
		});
	});
});

describe("Default",function(){
	describe("Envelope with default.",function(){
		var spies = {
			successSpy : jasmine.createSpy(),
			errorSpy : jasmine.createSpy(),
			untypedSpy : jasmine.createSpy(),
			addedSpy : jasmine.createSpy()
		};

		beforeEach(function(){
			loadFixtures('envelopeFixture_default.html');

			$("#messages").envelope(
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
				expect($("#messages").find("div")).toBe(".env_container.success");
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

			expect($("#messages").find("div")).toBe(".env_container.error");
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

			expect($("#messages").find("div")).toBe(".env_container");
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

	describe("Envlope should respond to options properly for default.",function(){

		beforeEach(function(){
			loadFixtures('envelopeFixture_default.html');

			$("#messages").envelope(
				{
					autoCloseTimeout : 200 //real short timeout so it doesn't slow the test
				},
				[
					{
						name : 'test.success',
						message: 'Success saving test.',
						type: 'success',
						addCloseButton : true,
						autoClose : true
					}
				]
			);
		});

		it("Should disappear after default amount of time.",function(){

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			waits(1200);

			runs ( function(){
				expect($("#messages>div").is(":visible")).toBeFalsy();
			});

		});

		it("Should add a close button",function(){
			$("#successButton").trigger('test.success');

			expect($("#messages")).toContain(".close");
		});
	});

	describe("Envelope should respond to methods with default framework.",function(){
		
		beforeEach(function(){
			loadFixtures('envelopeFixture_default.html');

			$("#messages").envelope(
				{
					autoCloseTimeout : 200 //real short timeout so it doesn't slow the test
				}
			);
		});


		it("Should add a new event.",function(){
			$("#messages").envelope('add',
				{
					name : 'test.success',
					message: 'Success saving test.',
					type: 'success',
					addCloseButton : true,
					autoClose : true
				}
			);

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			runs ( function(){
				expect($("#messages").find("div")).toBe(".success");
			});

		});

		it("Should remove an event",function(){
				
			runs(function(){
				$("#messages").envelope('add',
					{
						name : 'test.success',
						message: 'Success saving test.',
						type: 'success',
						addCloseButton : true,
						autoClose : true
					}
				);
			});
			
			runs(function(){
				$("#messages").envelope('remove','test.success');
			});

			runs ( function(){
				$("#successButton").trigger('test.success');
			});
			
			runs ( function(){
				expect($("#messages").find("div")).not.toBe(".success");
			});
		});
	});
});


