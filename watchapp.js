//cached variables
let $showItem
const $carContainer = $('#carousel-container');
const $carSlider = $('#carousel-slider')
let currentImg = 1;
let imgArray = [];
let inverval 


// gets shows from localStorage and appends them to a list
function displayList() {
    for (let i = 0; i < localStorage.length; i++) {
        $showItem = $('<li>'); 
        const $btn = $('<button>X</button>')
        $showItem.text(localStorage.getItem(localStorage.key(i)));
        $('ul').append($showItem); 
        $btn.attr('id', localStorage.key(i));
        $($showItem).append($btn)

        //get images from api
        $.ajax({
            url: 'https://api.jikan.moe/v3/search/anime?q=' + localStorage.key(i)
        }).then(
        (data) => {
            getImages(data.results[0])
        }, (error) => {
            console.log('Something went wrong');
        }
        )
    }
}

    displayList()

    // clears list and localStorage
    $('#clearBtn').on('click', clearList)
    function clearList(event) {
        event.preventDefault();
        localStorage.clear();
        $('ul').empty();
        $carSlider.empty();
    }

    //remove show and image from watch list and localStorage when x is clicked
    $('ul').on('click', 'button', removeShow)
    function removeShow(event) {
        $(this).closest('li').remove();
       localStorage.removeItem($(this).attr('id'));
        $("#" + $(this).attr('id')).remove();
    }

    //set image attributes and append them to html
    function getImages (data) {
        const $imgList = $('<img>')
        $imgList.attr("src", data.image_url)
        $imgList.attr("alt", data.title)
        $imgList.attr('id', data.title)
        $carSlider.append($imgList)
        imgArray.push($imgList)
    }  
   
    //animate image carousel
    function startSlider() {
        interval = setInterval(() => {
        $carSlider.animate({'margin-left': '-=225px'}, 1000, () => {
            currentImg ++;
            if(currentImg === imgArray.length) {
                currentImg = 1
                $carSlider.animate({'margin-left': 0}, 3000);
            }
        })
    }, 3000)
    }
     startSlider();

    //pause and restart carousel
    $('#pause').on('click', ()=> {
        clearInterval(interval)
    })

    $('#start').on('click', startSlider);



