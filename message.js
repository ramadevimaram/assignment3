class Message{
    constructor(name, commands){
        this.name = name;
        if (!name) {
            throw Error("Name required.");
          }
        this.commands = commands;

    }
}


/*class Command {
    constructor(commandType, value) {
      this.commandType = commandType;
      if (!commandType) {
        throw Error("Command type required.");
      }
      this.value = value;
    }
  
  }*/
  
  module.exports = Message;