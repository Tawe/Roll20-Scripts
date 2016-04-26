var playerArray = [];
var message = "";

on('chat:message', function(msg){
    if(msg.content.substring(0, 2).toLowerCase() == "!w"){
        var content = msg.content.replace(/@/g, '/@').replace('^', '/^');
    
        var msgArray = content.split("/")
        for(var i = 0; i<msgArray.length; i++){
            if(msgArray[i].indexOf("@") !== -1){
                playerArray.push(msgArray[i].replace('@','').slice(0, -1));
            } else if (msgArray[i].indexOf("^") !== -1){
                message = msgArray[i].replace('^', '')
            }
        }
        
        var players = findObjs({_type: 'player'});
        players.forEach(function(player) {
            comparePlayerArray(player)
        });
        
        checkIfNotFound();
        
        playerArray = [];
        sendChat(msg.who, message);
    }
});

function comparePlayerArray(player){
    for(var p = 0; p<playerArray.length; p++){
        var displayName = player.get('_displayname').toLowerCase();
        if(displayName == playerArray[p].toLowerCase()){
            sendChat(displayName, message);
            playerArray.splice(p, 1);
        }
    }
}

function checkIfNotFound(){
    var nameNotFound = "";
    if(playerArray.length>1){
        for(var p = 0; p<playerArray.length; p++){
            nameNotFound = nameNotFound + playerArray[p] + ", ";
        }
        
        message = message + "\n\nThe following players where not Found: " + nameNotFound;
    }
}