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
    },
    'click input#primes': function(event){
      var primes = getPrimes(TOP_NUMBER);
      for(var i=0; i<primes.length; i++){
        var id = Numbers.findOne({number: primes[i]})._id;
        Numbers.update({_id: id}, {$set: {arrived: true}});
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

function getPrimes(maxsieve){
    var sieve = new Array();
    var i = 0;
    var prime = 0;
    var count = 0;
    var result = [];

    for (i = 2; i <= maxsieve; i++) {
      sieve[i] = 1;
    }
    for (prime = 2; prime <= maxsieve; prime++) {
      if (sieve[prime] == 1) {
          count += 1;
          for (i = prime * 2; i <= maxsieve; i += prime) {
            sieve[i] = 0;
          }
        }
    }
    for (i = 2; i <= maxsieve; i++) {
      if(sieve[i] === 1) result.push(i);
    }
    return result;
}
