const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws( function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
    });

  it("constructor sets command type",function(){
        let testCommand = new Command('TestCommandType', 2);
        let testCommand1= testCommand.commandType;
         assert.strictEqual(testCommand1, 'TestCommandType');
  });
  
  it("constructor sets a value passed in as the 2nd argument",function(){
        let testvalue = new Command('TestCommandType', 2); 
        let testvalue1 = testvalue.value;  
        assert.strictEqual(testvalue1,2);
  });
  
  

})