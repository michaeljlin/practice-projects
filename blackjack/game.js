$(document).ready(newGame.startGame;
    addClick
);


function Game(){
    var self = this;
    this.cardDeck = [];
    this.suiteRef = ['Diamond','Club','Spades','Hearts'];
    this.numRef = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
    this.turn = 0;

    this.startDeck = function(){
        var value = null;
        for(var i = 0; i< self.suiteRef.length; i++){

            for(var j = 0; j < self.numRef.length; j++){

                if(j>9){
                    value = 10;
                }
                else {
                    value = j+1;
                }

                var newCard = new Card(self.suiteRef[i], self.numRef[j], value);
                self.cardDeck.push(newCard);

            }
        }
    };

    this.pullCards = function(){

        var randomNum = Math.floor(Math.random()*self.cardDeck.length);
        var returnedCard = self.cardDeck[randomNum];

        self.cardDeck.splice( randomNum , 1 );

        return returnedCard;
    };

    this.startGame = function(){
        self.startDeck();

        dealer.addCard(newGame.pullCards());
        player.addCard(newGame.pullCards());
        dealer.addCard(newGame.pullCards());
        player.addCard(newGame.pullCards());

        console.log("Game has started!");



    };

    this.turnChange = function(){
        this.turn = 1 - self.turn;
    };

    this.resetGame = function(){
        player.resetHand();
        dealer.resetHand();
        self.cardDeck = [];
        self.startGame();
    }

}

function Player(){
    var self = this;
    this.cardHand = [];
    this.playerValue = 0;

    this.addCard = function(card){
        self.cardHand.push(card);
    };

    this.checkCard = function(){
        return self.cardHand;
    };

    this.hit = function(){
        self.addCard(newGame.pullCards());
        console.log("Player draws: "+self.cardHand[self.cardHand.length-1].number + " of "+ self.cardHand[self.cardHand.length-1].suite);

        self.playerValue = dealer.checkPlayerCount(self.cardHand);

        if(self.playerValue > 21){
            console.log("Player has busted!");
        }
        else{
            console.log("Player continues to play");
        }
    };

    this.stay = function(){
        self.playerValue = dealer.checkPlayerCount(self.cardHand);

        dealer.hit();
    };

    this.resetHand = function(){
        self.cardHand = [];
        self.playerValue = 0;
    };

}

function Dealer(){
    var self = this;
    this.cardHand = [];
    this.dealerValue = 0;

    this.addCard = function(card){
        self.cardHand.push(card);
        self.setCard();
    };

    this.checkPlayerCount = function(playerHand){
        var totalValue = null;

        for(var i = 0; i < playerHand.length; i++){
            totalValue += playerHand[i].value;
        }

        console.log('Player hand value is: '+totalValue);

        return totalValue;
    };

    this.checkDealerCount = function(playerHand){
        var totalValue = null;

        for(var i = 0; i < playerHand.length; i++){
            totalValue += playerHand[i].value;
        }

        console.log('Dealer hand value is: '+totalValue);

        return totalValue;
    };

    this.hit = function(){
        self.addCard(newGame.pullCards());
        console.log("Dealer draws: "+self.cardHand[self.cardHand.length-1].number + " of "+ self.cardHand[self.cardHand.length-1].suite);

        self.dealerValue = dealer.checkDealerCount(self.cardHand);

        if(self.dealerValue > 21){
            console.log("Dealer has busted!");
        }
        else if(self.dealerValue === '21'){
            console.log("Dealer has 21!");
        }
        else if(self.dealerValue > 16){
            console.log('Game has ended! Comparing cards!');

            if(player.playerValue > dealer.dealerValue){
                console.log("Player has won!");
            }
            else if(player.playerValue < dealer.dealerValue){
                console.log("Dealer has won!");
            }
            else{
                console.log("Equal value, draw game!");
            }
        }
        else if(self.dealerValue <= 16){
            self.hit();
        }
        else{
            console.log("Dealer continues to play");
        }
    };

    this.checkCard = function(){
        return self.cardHand;
    };

    this.setCard = function(){
//      $('#dealerCard1').text(self.cardHand[1].suite+self.cardHand[1].number);
    };

    this.resetHand = function(){
        self.cardHand = [];
        self.dealerValue = 0;
    };
}

function Card(suite, number, value){
    var self = this;
    this.suite = suite;
    this.number = number;
    this.value = value;

    this.image = null;
}

var dealer = new Dealer();

var player = new Player();

var newGame = new Game();

$(document).ready(newGame.startGame);

//  console.log(newGame.cardDeck);

//
function addClick(){
    $('#hit').click(player.hit);
}

//
// $('#hit').click(function(){
//     console.log('hit button hit')
// });