// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
const dateFns = require('date-fns');

exports.allocateSpaces = functions.https.onRequest((req, res) => {
  //TODO - Develop a better allocation logic
  //1. consider the type of space
  //2. Limit spaces per person per week
  //3. Same space as last week etc.
    return admin.database().ref('/atkins/infra').once('value', (snapshot) => {
    const toDay = new Date();
    const strtWeek = dateFns.addDays(dateFns.endOfWeek(toDay), 2);
    const currentFolder = dateFns.format(strtWeek, "DDMMYYYY");
    var allJSON = snapshot.val();

    var spacesForPerson = {}
    var doneAllocation = false;
    for(var day in allJSON[currentFolder].requests){
      for(var person in allJSON[currentFolder].requests[day]){
        doneAllocation = false;
        for(var spaceType in { "normal": {}, "double": {}, "edge": {} }){
          for(var space in allJSON[currentFolder].status[day][spaceType]){
            if(allJSON[currentFolder].status[day][spaceType][space]===""){
              var pName = allJSON[currentFolder].requests[day][person];
              allJSON[currentFolder].status[day][spaceType][space] = pName;
              if(spacesForPerson[pName]){
                spacesForPerson[pName] = spacesForPerson[pName]+1;
              }else{
                spacesForPerson[pName] = 1;
              }
              doneAllocation = true;
              break;
            }
          } 
          if(doneAllocation){
            break;
          }
        }
      }
    }
    return admin.database().ref('/atkins/infra/'+currentFolder+"/status").set(allJSON[currentFolder].status).then((snapshot) => {
      return res.json(snapshot);
    })
  });
})