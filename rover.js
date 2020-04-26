class Rover {
    constructor(position, mode ) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }
     receiveMessage(message){
        const results = [];
        for( const command of message.commands){
            if(command.commandType === 'MOVE'){
                if(this.mode === 'NORMAL'){
                    this.position = command.value;
                    results.push({completed : true});
                }else{
                    results.push({completed : false});
                }
            }else if(command.commandType ==='UNKNOWN'){
                results.push({completed : false});
            }
            else if(command.commandType === 'STATUS_CHECK'){
                results.push({
                    completed : true,
                    roverStatus :{
                        position : this.position,
                        mode : this.mode,
                        generatorWatts : this.generatorWatts 
                    }
                });
            }
            else if(command.commandType === 'MODE_CHANGE'){
                this.mode = command.value;
                results.push({completed : true});
            }
        }
        return {
            "message": message.name,
            "results": results
        };
    }
}

module.exports = Rover;


        /*let response = {
            message :message.name,results:[]
        };
        for(let i=0; i < message.commands.length; i++){
            if(message.commands[i].commandType === 'STATUS_CHECK'){
                response.results.push({
                    completed:true,
                    roverStatus:{
                        mode: this.mode,
                        generatorWatts: this.generatorWatts,
                        position: this.position
                    }
                });
            }else if(message.commands[i].commandType === 'MODE_CHANGE'){
                this.mode = message.commands[i].value;
                response.results.push({
                    completed: true
                });
            }else if(message.commands[i].commandType === 'MOVE'){
                if(this.mode === 'LOW_POWER'){
                    response.results.push({
                        completed:false
                    });
                }else{
                    this.position = message.commands[i].value;
                    response.results.push({
                        completed: true
                    });
                }
            }else{
                response.results.push({
                    completed: true
                });
            }
        }
    return response; 
    }
}*/
