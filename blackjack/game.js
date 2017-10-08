function Game(){
    var self = this;
    this.cardDeck = [];
    this.suiteRef = ['diamonds','clubs','spades','hearts'];
    this.numRef = ['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king'];
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

                var urlString = "images/"+self.numRef[j] + "_of_"+self.suiteRef[i]+".svg";

                var newCard = new Card(self.suiteRef[i], self.numRef[j], value, urlString);
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
        $('.dealer img:nth-child(2)').attr('src', 'images/cardback.svg');

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
        $('.player1').text('').append($('<p>').text('Player'));
        $('.dealer').text('').append($('<p>').text('Dealer'));
        $('.result').text('');
        self.startGame();
    }

}

function Player(){
    var self = this;
    this.cardHand = [];
    this.playerValue = 0;
    this.hasAce = false;

    this.addCard = function(card){
        if(card.number === 'ace'){
            self.hasAce = true;
        }

        self.cardHand.push(card);
        self.setCard(card);

        return card;
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
            $('.result').text("Player has busted!");
        }
        else if(self.playerValue === 21){
            console.log("Player has 21, automatically ending turn!");
            self.stay();
        }
        else{
            console.log("Player continues to play");
        }
    };

    this.stay = function(){
        self.playerValue = dealer.checkPlayerCount(self.cardHand);

        if(self.hasAce === true && self.playerValue < 12){
            self.aceSwap();
            self.hasAce = false;
        }

        console.log('Final player value is: '+self.playerValue);

        dealer.hit();
    };

    this.setCard = function(card){
        var newCardImageElement = $('<img>').attr('src',card.image).css('width','100%');

        $('.player1').append(newCardImageElement);
    };

    this.resetHand = function(){
        self.cardHand = [];
        self.playerValue = 0;
    };

    this.aceSwap = function(){
        this.playerValue += 10;
    }
}

function Dealer(){
    var self = this;
    this.cardHand = [];
    this.dealerValue = 0;
    this.hasAce = false;

    this.addCard = function(card){
        if(card.number === 'ace'){
            self.hasAce = true;
        }

        self.cardHand.push(card);
        self.setCard(card);

        return card;
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
        self.dealerValue = dealer.checkDealerCount(self.cardHand);

        if(self.dealerValue === 11 && self.hasAce === true){
            self.dealerValue = 21;
            self.hasAce = false;
        }

        if($('.dealer img:nth-child(2)').attr('src') === 'images/cardback.svg'){
            $('.dealer img:nth-child(2)').attr('src', self.cardHand[0].image);
        }

        if(self.dealerValue > 21){
            console.log("Dealer has busted!");
            $('.result').text("Dealer has busted!");
        }
        else if(self.dealerValue === '21'){
            console.log("Dealer has 21!");

            if(player.playerValue < dealer.dealerValue){
                console.log("Dealer has won!");
                $('.result').text("Dealer has won!");
            }
            else{
                console.log("Equal value, draw game!");
                $('.result').text("Equal value, draw game!");
            }

        }
        else if(self.dealerValue > 16){
            console.log('Game has ended! Comparing cards!');

            if(player.playerValue > dealer.dealerValue){
                console.log("Player has won!");
                $('.result').text("Player has won!");
            }
            else if(player.playerValue < dealer.dealerValue){
                console.log("Dealer has won!");
                $('.result').text("Dealer has won!");
            }
            else{
                console.log("Equal value, draw game!");
                $('.result').text("Equal value, draw game!");
            }
        }
        else if(self.dealerValue <= 16){

            self.addCard(newGame.pullCards());
            console.log("Dealer draws: "+self.cardHand[self.cardHand.length-1].number + " of "+ self.cardHand[self.cardHand.length-1].suite);

            self.hit();
        }
        else{
            console.log("Dealer continues to play");
        }
    };

    this.checkCard = function(){
        return self.cardHand;
    };

    this.setCard = function(card){

        var newCardImageElement = $('<img>').attr('src',card.image).css('width','100%');

        $('.dealer').append(newCardImageElement);
    };

    this.resetHand = function(){
        self.cardHand = [];
        self.dealerValue = 0;
    };
}

function Card(suite, number, value, imageUrl){
    var self = this;
    this.suite = suite;
    this.number = number;
    this.value = value;

    this.image = imageUrl;
}

var dealer = new Dealer();

var player = new Player();

var newGame = new Game();

$(document).ready(initializeApp);

function addClick(){
    $('#hit').click(player.hit);
    $('#stay').click(player.stay);
    $('#reset').click(newGame.resetGame);
}


function initializeApp() {
    newGame.startGame();
    addClick();
}