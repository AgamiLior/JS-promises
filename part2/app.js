let baseURL = "http://deckofcardsapi.com/api/deck/";

async function getCard() {
    console.log('your cards id:')
    let response = await axios.get(`${baseURL}/new/draw`);
    console.log(`${response.data.cards[0].value.toLowerCase()} of ${response.data.cards[0].suit.toLowerCase()}`
    );
}

getCard();

async function getTwoCards() {
    let firstCard = await axios.get(`${baseURL}/new/draw`);
    let deckId = firstCard.data.deck_id;
    console.log('your two cards are')

    let secondCard = await axios.get(`${baseURL}/${deckId}/draw`);
    [firstCard, secondCard].forEach((card) => 
    console.log(`${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`
    ))
}

getTwoCards();


async function drawCardFromDeck() {
    let deckId = null;
    let button = document.querySelector("button");
    let cardArea = document.getElementById("cards");
  
    let response = await axios.get(`${baseURL}/new/shuffle`);
    console.log(response.data.deck_id);
    deckId = response.data.deck_id;
    button.style.display = "block";
  
    button.addEventListener("click", async function () {
      let cardData = await axios.get(`${baseURL}/${deckId}/draw`);
      let suit = cardData.data.cards[0].suit;
      let value = cardData.data.cards[0].value;
      let image = cardData.data.cards[0].image;
      cardArea.innerHTML = `<img src=${image} alt="${value} of ${suit}">`;
  
      if (cardData.data.remaining === 0) {
        button.style.display = "none";
        cardArea.innerHTML = "<h1>No more card in deck</h1>";
      }
    });
  }
  
  drawCardFromDeck();