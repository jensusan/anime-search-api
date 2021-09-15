
// gets shows from localStorage and appends them to a list
function displayList() {
    for (let i = 0; i < localStorage.length; i++) {
        const $showItem = $('<li>'); 
        const $btn = $('<button>X</button>')
        $showItem.text(localStorage.getItem(localStorage.key(i)));
        $('ul').append($showItem); 
        $btn.attr('id', localStorage.key(i));
        $($showItem).append($btn)
    }
}

    displayList()

    // clears list and localStorage
    $('#clearBtn').on('click', clearList)

    function clearList(event) {
        event.preventDefault();
        localStorage.clear();
        $('ul').empty();
    }


    $('ul').on('click', 'button', removeShow)
    function removeShow(event) {
        $(this).closest('li').remove();
       localStorage.removeItem($(this).attr('id'));
    }