const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {

   it("throws error if Name is NOT passed into constructor as the first parameter", function() {
      assert.throws( function() {
          new Message();
        },
        {
          message: "Name required."
        }
      );
    });
  
    it("constructor sets name",function(){
          let testName = new Message('Constructor Name Passing Test');
          let testName1 = testName.name;
           assert.strictEqual(testName1, 'Constructor Name Passing Test');
        });
   it("contains a commands array passed into the constructor as 2nd argument",function(){
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let message1 = message.commands[0].commandType;
       // console.log(message1);
       assert.strictEqual(message1, 'MODE_CHANGE');
    });
});
