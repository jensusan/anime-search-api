// cached vaiables
const $input = $('#input-field');
const $main = $('main');
const $imageDiv = $('#image-div')
const $textDiv = $('#text-div')
const $button = $('#button');
const $quoteDiv = $('#quote-div');
const $quoteBtn = $('<input id="quote-button" type="submit" value="Get Random Quotes">');
const $watchDiv = $('#watch-list');
const $watchBtn = $('<input id="watch-button" type="submit" value="Add To Watch List">');



//get api data
function handleGetData(event) {
event.preventDefault();
userInput = $input.val();


$.ajax({
    url: 'https://api.jikan.moe/v3/search/anime?q=' + userInput
}).then(
(data) => {
displayInfo(data.results[0]);
}, (error) => {
    console.log('Something went wrong');
}
)
}

//dynamically display data
function displayInfo(data) {
    $textDiv.empty();
    $imageDiv.empty();
    $quoteDiv.empty();

    const $image = $('<img>');
    $image.attr('src',  data.image_url);
    $image.attr('alt', data.title);
    $imageDiv.append($image);
    
    const $title = $('<h2>');
    const $titleLabel = $('<h3>');
    $titleLabel.text('Title');
    $textDiv.append($titleLabel);
    $title.text(data.title)
    $textDiv.append($title)
    
    const $description = $('<p>');
    const $descriptionLabel = $('<h3>');
    $descriptionLabel.text('Description');
    $textDiv.append($descriptionLabel);
    $description.text(data.synopsis);
    const $more = $('<a>');
    $more.text('more');
    $more.attr('href', data.url);
    $more.attr('target', '_blank');
    $textDiv.append($description)
    $textDiv.append($more)

    
    const $episodes = $('<p>') ;
    const $episodesLabel = $('<h3>');
    $episodesLabel.text('Number of Episodes');
    $textDiv.append($episodesLabel);
    $episodes.text(data.episodes);
    $textDiv.append($episodes);
    
    const $rating = $('<p>');
    const $ratingLabel = $('<h3>');
    $ratingLabel.text('Score');
    $textDiv.append($ratingLabel);
    $rating.text(data.score);
    $textDiv.append($rating);

    $quoteDiv.append($quoteBtn);
    $textDiv.append($watchBtn);
}


//event listener main data
$('#button').on('click', handleGetData) 

// event listener quote button
$(document).on('click', '#quote-button', handleGetQuote)

//display quote info
function displayQuote (data) {
    $quoteDiv.empty();
    $quoteDiv.append($quoteBtn)
    $character = $('<p>');
    $character.text('Character: ' + data.character)
    $quote = $('<p>');
    $quote.text(`Quote: "${data.quote}"`);
    $quoteDiv.append($character);
    $quoteDiv.append($quote);
    
}

// get quote data
function handleGetQuote(event) {
    event.preventDefault();
    userInput = $input.val();
    
    $.ajax({
        url: 'https://animechan.vercel.app/api/quotes/anime?title=' + userInput
    }).then(
    (data) => {
        let randomIdx = Math.floor(Math.random() * data.length);
        displayQuote(data[randomIdx]);
    }, (error) => {
        console.log('Something went wrong');
    }
    )
    }


    function handleGetWatch(event) {
        event.preventDefault();
        userInput = $input.val();
        
        
        $.ajax({
            url: 'https://api.jikan.moe/v3/search/anime?q=' + userInput
        }).then(
        (data) => {
        setList(data.results[0]);
        }, (error) => {
            console.log('Something went wrong');
        }
        )
        }
    
    
    
    $(document).on('click', '#watch-button', handleGetWatch);

    function setList(data) {
    let dataTitle = data.title;
    localStorage.setItem(dataTitle, dataTitle);
    }
    

    
 