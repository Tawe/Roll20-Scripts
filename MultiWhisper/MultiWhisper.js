var multiWhisper = multiWhisper || {};

var playerArray = [];
var message = "";

multiWhisper.init=function(msg){
    
    var content = msg.content.replace(/@/g, '/@').replace('^', '/^');
    var msgArray = content.split("/")
    
    for(var i = 0; i<msgArray.length; i++){
        if(msgArray[i].indexOf("@") !== -1){
            playerArray.push(msgArray[i].replace('@','').slice(0, -1));
        } else if (msgArray[i].indexOf("^") !== -1){
            message = msgArray[i].replace('^', '');
        }
    }

    this.findPlayers();
    this.checkIfNotFound();

    sendChat(msg.who, "/w " + msgWho + " " + message);
}

multiWhisper.findPlayers= function(){
    var players = findObjs({_type: 'player'});
    players.forEach((player) => {
        this.comparePlayerArray(player);
    });
}

multiWhisper.comparePlayerArray=function(player){
    for(var p = 0; p<playerArray.length; p++){
        var displayName = player.get('_displayname').toLowerCase();
        if(displayName == playerArray[p].toLowerCase()){
            sendChat(msg.who, "/w " + displayName + " " + message);
            playerArray.splice(p, 1);
        }
    }
}

multiWhisper.checkIfNotFound=function(){
    var nameNotFound = "";
    if(playerArray.length>1){
        for(var p = 0; p<playerArray.length; p++){
            nameNotFound = nameNotFound + playerArray[p] + ", ";
        }
        message = message + "\n\nThe following players where not Found: " + nameNotFound;
    }
}

on('chat:message', function(msg){
    if(msg.content.substring(0, 2).toLowerCase() == "!w"){
        multiWhisper.init(msg); 
    }
});
