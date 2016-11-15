/**
 * Unit Test for testing Java script using Jasmine Framework. This is the file which will call our java script file that need to be tested. 
 * Each describe block is equivalent to one test case.
 */
	
/* In jQuery, you give $() a CSS selector and it finds elements on the DOM. In jasmine-fixture, you give affix() a CSS selector and it adds those elements to the DOM.
This is very useful for tests, because it means that after setting up the state of the DOM with affix, your subject code under test will have the elements it needs to do its 
work. Finally, jasmine-fixture will help you avoid test pollution by tidying up and remove everything you affix to the DOM after each spec runs. */

// Test Suite for clearPlaceholderTextOnFocus function in js. Which will have all unit tests required to test this function. ========================

	   
describe("Test Suite for clearPlaceholderTextOnFocus function",function(){

  	it("This test should set placeholder to blank", function(){
		
    affix('textarea[id="message"][name="message"][placeholder="write your message here..."]');
    
    var placeholderval = $('#message').attr('placeholder'); 
    expect(placeholderval).toEqual('write your message here...'); // Expect placeholder text value before executing function
	
    clearPlaceholderTextOnFocus();
	
    var placeholderval = $('#message').attr('placeholder'); 
	expect(placeholderval).toEqual(''); // Expect placeholder text value after executing function
    
   });	
});	

//============================== Test Case for function : addPlaceholderTextOnBlur to check if value is correctly being set to blank. ===========================

describe('Test Suite for addPlaceholderTextOnBlur function',function(){
	
	it("This test should add Placeholder text", function(){
		
		affix('textarea[id="message"][name="message"][placeholder=" "]');
		
	    var placeholderval=$('#message').attr('placeholder');
	    expect(placeholderval).toEqual(' ');
	    
	    addPlaceholderTextOnBlur();
	    
	    var placeholderval = $('#message').attr('placeholder');
	    expect(placeholderval).toEqual('Write your message here ...');  
    });
});

//=============================================Test Suite for windowOnLoadFunction ==================================================
	
describe('Test Suite for windowonloadFunction function',function(){

   beforeEach(function() {
  	 affix('label[id="supportmsg"][innerHTML=" "]');
	 affix('textarea[id="messagelog"][name="messagelog"]');
	 affix('textarea[id="message"][name="message"]');
	 affix('input[id="sendbtn"][name="sendbtn"]');
  });
	
	it("This test check all tasks performed on window.load",function(){
		
		console.dir(window);
		spyOn(window, 'openSocket').and.callThrough();
		spyOn(window, 'windowonloadFunction').and.callThrough();
		windowonloadFunction();
       
		expect(openSocket.calls.count()).toEqual(1); 
		expect(window.windowonloadFunction).toHaveBeenCalled();
    });
});

describe('Test Suite for closeWindow function',function(){

  beforeEach(function() {
  	//var popup;
	//spyOn(window, 'open').andCallFake(function () {
	//popup = {
	//	      focus: jasmine.createSpy()
	//	    };
	//return popup;
	//return 2;
	//}); 
  });
	
	it("This test closes window on click of close button ",function(){
		
    //var popup;
	/*spyOn(window, 'open').andCallFake(function () {
	popup = {
		        focus: jasmine.createSpy()
		    };
	return popup;
	}); */
	
	jasmine.createSpy("getName() spy").andCallFake(function() {
    console.log("Hello from getName()");
    return "Bobby";
});
	
	//closeWindow(); 

	//expect(window.open).toHaveBeenCalled();
	//expect(window.open).toHaveBeenCalledWith('about:blank,'_self');
		
    });
});

/*

http://stackoverflow.com/questions/40267775/tesing-window-onload-js-function-using-jasmine-framework/40296405#40296405 

var fun = {}
fun.windowonloadFunction = function() {

  document.getElementById('supportmsg').innerHTML = 'Hi';
  var img = document.createElement("img");
  img.src = "http://www.hyundai.co.uk/test-import/model-profiles/small_cars/i10_premium_sweet_orange.png";
  document.getElementById('supportmsg').appendChild(img);

};



describe("A suite", function() {
  var element;
  beforeEach(function() {
    element = $("<div id= 'supportmsg'/>");
    $(document.body).append(element);
  });

  it("contains spec with an expectation", function() {
    spyOn(fun, 'windowonloadFunction').and.callThrough();
    fun.windowonloadFunction();
    expect(fun.windowonloadFunction.calls.count()).toEqual(1);
  });
});


Observations:

Is your aim to test the window.onload function itself or the functionality of the windowOnLoadFunction which you have defined? If the latter is the answer you are on a right track, however if the former is your answer, then I'm afraid you are trying to meddle with the global window itself which is not recommended.
You'll need to set up the HTML element before your test runs, that is the reason why you are running into the error that you mentioned. There are many ways to do it, like affixing the element, or using fixtures or simply setting up the elements in your beforeEach function.
Also if you are trying to test a code, you can use spies and callThrough() to call it and at the same time track the spy.

spyOn(window, "createDocumentObject").andReturnObject({
  getSupportMessageLabel:function() {
    return makeFakeSupportMessageLabel();
	}
});


*/