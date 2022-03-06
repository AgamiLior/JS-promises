let baseURL = "http://numbersapi.com";
let favNum = 14;

async function getFavNumFact() {
    let response = await axios.get(`${baseURL}/${favNum}?json`);
    console.log('Fact about your fav number')
    console.log(response.data);
  }

getFavNumFact();


let multFavNums = [14, 21, 7];

async function getMulFavNumsFacts() {
  let response = await axios.get(`${baseURL}/${multFavNums}?json`);
  console.log('Fact about bunch of your fav number')
  console.log(response.data);
}

getMulFavNumsFacts();


async function getFourFacts() {
    let favNumFacts = [];
    for (let i = 1; i < 5; i++) {
      favNumFacts.push(axios.get(`${baseURL}/${favNum}?json`));
    }
    let facts = await Promise.all(favNumFacts);
    facts.forEach((response) => {
      $("body").append(`<p>${response.data.text}</p>`);
    });
    console.log('look at the screen');

  }
  
  getFourFacts();