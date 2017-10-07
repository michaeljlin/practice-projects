function Game(){
    var self = this;
    this.cardDeck = [];
    this.suiteRef = ['Diamond','Club','Spades','Hearts'];
    this.numRef = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
    this.turn = 0;

    this.startDeck = function(){
        for(var i = 0; i< self.suiteRef.length; i++){

            for(var j = 0; j < self.numRef.length; j++){

                var newCard = new Card(self.suiteRef[i], self.numRef[j]);
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


    };

    this.turnChange = function(){
        this.turn = 1 - self.turn;
    }
}

function Player(){
    var self = this;
    this.cardHand = [];

    this.addCard = function(card){
        self.cardHand.push(card);
    };

    this.checkCard = function(){
        return self.cardHand;
    };

    this.hit = function(){
        self.addCard(newGamecard);
    };

    this.stay = function(){

    }
}

function Dealer(){
    var self = this;
    this.cardHand = [];

    this.addCard = function(card){
        self.cardHand.push(card);
        self.setCard();
    };

    this.checkCard = function(){
        return self.cardHand;
    };

    this.setCard = function(){
//      $('#dealerCard1').text(self.cardHand[1].suite+self.cardHand[1].number);
    };
}

function Card(suite, number){
    var self = this;
    this.suite = suite;
    this.number = number;
    this.image = null;
}

var dealer = new Dealer();

var player = new Player();

var newGame = new Game();

newGame.startDeck();

//  console.log(newGame.cardDeck);