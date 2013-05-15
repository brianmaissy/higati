Numbers = new Meteor.Collection("numbers");
var TOP_NUMBER = 38;

if (Meteor.isClient) {
  Template.responses.numbers = function () {
    return Numbers.find({}, {sort: {number: 1}});
  };
  Template.new_response.numbers = function () {
    return Numbers.find({}, {sort: {number: 1}});
  };
  Template.new_response.events({
    'click input#new-response-submit': function(event){
      var numberBox = document.getElementById('new-response-number');
      var number = parseInt(numberBox[numberBox.selectedIndex].value);
      var id = Numbers.findOne({number: number})._id;
      Numbers.update({_id: id}, {$set: {arrived: true}});
    }
  });
  Template.reset.events({
    'click input#reset': function(event){
      for(var i=1; i<=TOP_NUMBER; i++){
        var id = Numbers.findOne({number: i})._id;
        Numbers.update({_id: id}, {$set: {arrived: false}});
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Numbers.find({}).count() == 0){
      for(var i=1; i<=TOP_NUMBER; i++){
        Numbers.insert({number: i, arrived: false});
      }
    }
  });
}

