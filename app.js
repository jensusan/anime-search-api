const $input = $('#input-field');
const $main = $('main');
const $button = $('#button');
const quoteBtn = $('#quote-button');
const $div = $('div');


function handleGetData(event) {
event.preventDefault();
userInput = $input.val();

$.ajax({
    url: 'https://api.jikan.moe/v3/search/anime?q=' + userInput
}).then(
(data) => {
    console.log(data.results[0])
displayInfo(data.results[0]);
}, (error) => {
    console.log('Something went wrong');
}
)
}


function displayInfo(data) {
    $main.empty();

    const $image = $('<img>');
    $image.attr('src',  data.image_url);
    $image.attr('alt', data.title);
    $main.append($image);
    
    const $title = $('<h2>');
    const $titleLabel = $('<h2>');
    $titleLabel.text('Title');
    $main.append($titleLabel);
    $title.text(data.title)
    $main.append($title)
    
    const $description = $('<p>');
    const $descriptionLabel = $('<h3>');
    $descriptionLabel.text('Description');
    $main.append($descriptionLabel);
    $description.text(data.synopsis);
    $main.append($description)
    
    const $episodes = $('<p>') ;
    const $episodesLabel = $('<h3>');
    $episodesLabel.text('Number of Episodes');
    $main.append($episodesLabel);
    $episodes.text(data.episodes);
    $main.append($episodes);
    
    const $rating = $('<p>');
    const $ratingLabel = $('<h3>');
    $ratingLabel.text('Rating');
    $main.append($ratingLabel);
    $rating.text(data.score);
    $main.append($rating);
}

//displayInfo()

$('#button').on('click', handleGetData) 

$(quoteBtn).on('click', handleGetQuote)

function displayQuote (data) {
    $div.empty()
    $character = $('<p>');
    $character.text(data.character)
    $quote = $('<p>');
    $quote.text(data.quote);
    $div.append($quote);
}

function handleGetQuote(event) {
    event.preventDefault();
    userInput = $input.val();
    
    $.ajax({
        url: 'https://animechan.vercel.app/api/quotes/anime?title=' + userInput
    }).then(
    (data) => {
        console.log(data)
        displayQuote(data[0]);
    }, (error) => {
        console.log('Something went wrong');
    }
    )
    }

