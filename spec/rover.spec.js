const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');
const assert = require('assert');

describe("Rover class", function() {
    it("constructor sets position and default values for mode and generatorWatts", function() {
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        //let response = rover.receiveMessage(message);
        assert.deepEqual(
            {
            position: rover.position,
            mode : rover.mode,
            generatorWatts :rover.generatorWatts
            },
            {
                position : 98382,
                mode : "NORMAL",
                generatorWatts : 110
            }
        ); 
    });
    it("response returned by receiveMessage contains name of message", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);

        assert.strictEqual(response.message,"Test message with two commands");
    });
    it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
       // console.log(commands.length);
        let message = new Message('Test message with two commands', commands);
        let rover = new Rover(98382);    // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
       // console.log(response);
        let twoResults = response.results.length;
        assert.strictEqual(twoResults, 2);
    });
    it("responds correctly to status check command", function() {
        let commands = [new Command('STATUS_CHECK')];
        let message = new Message('message', commands);
        let rover = new Rover(98382); 
        let response = rover.receiveMessage(message);
        assert.deepEqual(response.results[0],
            {completed :true,
                roverStatus:{
            position : 98382,
            mode : 'NORMAL',
            generatorWatts : 110
            }
        });
    });
    it("responds correctly to mode change command", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
        let message = new Message('message', commands);
        let rover = new Rover(98382); 
        let response = rover.receiveMessage(message);
        assert.deepEqual(rover.mode,'LOW_POWER');
    });
    it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('MOVE',1)];
        let message = new Message('message', commands);
        let rover = new Rover(98382); 
        let response = rover.receiveMessage(message);
        assert.deepEqual(response.results[1],{completed : false});
    });
    it("responds with position for move command", function() {
        let rover = new Rover(98382); 
        let commands = [new Command('MOVE',1)];
        let message = new Message('message', commands);
        // let rover = new Rover(98382); 
        let response = rover.receiveMessage(message);
        assert.deepEqual(rover.position, 1);
    });
    it("completed false and a message for an unknown command", function() {
        let rover = new Rover(98382); 
        let commands = [new Command('UNKNOWN',1)];
        let message = new Message('message', commands);
        // let rover = new Rover(98382); 
        let response = rover.receiveMessage(message);
        assert.deepEqual(response.results[0],{completed : false});
    });
 });