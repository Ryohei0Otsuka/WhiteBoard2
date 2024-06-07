$(document).ready(function () {

    let date = new Date();

    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let week_japanese = ["日", "月", "火", "水", "木", "金", "土"];
    let week = week_japanese[date.getDay()];

    $('.date').html(`${year}/${month}/${day}　(${week})`);
    console.log(`${year}/${month}/${day}　(${week})`);


    $(function () {
        $('.btn').click(function () {

            let personId = $(this).closest('.person').data('person-id');
            $('.modal-window').find('.id').val(personId);
            $('#overlay, .modal-window').fadeIn();

            console.log(personId);
        });
        

        $('.modal-close, .back').click(function () {
            $('#overlay, .modal-window').fadeOut();
        });
    });

    $(function () {
        $('.status').each(function() {
            let status = $(this).text();
            if (status === "外出") {
                $(this).css('background-color', '#f44336');
            } else if (status === "在席") {
                $(this).css('background-color', '#43a047');
            } else if (status === "退勤") {
                $(this).css('background-color', '#757575');
            }
            console.log(status);
        });
    });

    $(function () {
        $('.name').each(function() {
            let name = $(this).text();
            console.log(name);
            $('.modal-name').each(function () {
                $(this).text(name);
            })
        })
    });

    

});