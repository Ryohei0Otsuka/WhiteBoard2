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
            let person = $(this).closest('.person');
            let personId = person.data('person-id');
            let name = person.find('.name').text();

            $('.modal-window').find('.id').val(personId);
            $('.modal-window').find('.modal-name').text(name);
            $('#overlay, .modal-window').fadeIn();

            console.log(personId);
            console.log(name);
        });
        $('.modal-close, .back').click(function () {
            $('#overlay, .modal-window').fadeOut();
            $('.modal-window input[type="radio"]').prop('checked', false);
            $('.comment').val('');
            $('.time01, .time02').val('--：--');
            $('.error-message01, .error-message02, .error-message03').css('visibility', 'hidden');
            $('.comment, .time01, .time02').prop('disabled', false).css('border-color', '#c2bcbc');
        });
    });

    $(function () {
        $('.status').each(function () {
            let status = $(this).text();
            if (status === "外出") {
                $(this).css('background-color', '#f44336');
            } else if (status === "在席") {
                $(this).css('background-color', '#43a047');
            } else if (status === "退勤") {
                $(this).css('background-color', '#757575');
            }
        });
    });

    //--バリデーション--//

    $(function () {
        $('.btn').click(function () {
            $('.update').prop("disabled", true).css('background-color', 'red');
        });

        $('.blood').change(function () {
            if ($(this).is(':checked')) {
                let status = $(this).val();
                validateStatus(status);
            }
            updateButtonState();
        });

        $('.comment').on('input', function () {
            validateComment();
            updateButtonState();
        });


        $('.time01').on('input', function () {
            validateTime();
            updateButtonState();
        });


        $('.time02').on('input', function () {
            validateTime();
            updateButtonState();
        });


        function validateStatus(status) {
            console.log(status);

            if (status != '外出') {
                $('.update').prop('disabled', false).css('background-color', '#2196f3');
                $('.comment, .time01, .time02').prop('disabled', true).css('border-color', '#c2bcbc');
                $('.time01h, .time02h').prop('disabled', false);
                $('.error-message01, .error-message02, .error-message03').css('visibility', 'hidden');
                $('.comment').val('');
                $('.time01, .time02').val('--：--');

            } else {
                $('.comment, .time01, .time02').prop('disabled', false);
                $('.update').prop('disabled', true).css('background-color', 'red');
            }
        }

        function validateComment() {
            let commentLength = $('.comment').val().length;
            console.log(commentLength);

            if (commentLength > 30 || commentLength == 0) {
                $('.error-message01').css('visibility', 'visible');
                $('.comment').css('border-color', '#b00020');
            } else {
                $('.error-message01').css('visibility', 'hidden');
                $('.comment').css('border-color', '#c2bcbc');
            }
        }

        function validateTime() {

            let time01 = $('.time01').val().replace('：', '');
            let time02 = $('.time02').val().replace('：', '');
            console.log(time01);
            console.log(time02);

            if (time02 != '----') {
                if (time01 >= time02) {
                    $('.error-message02').css('visibility', 'visible');
                    $('.time01').css('border-color', '#b00020');
                    $('.error-message03').css('visibility', 'visible');
                    $('.time02').css('border-color', '#b00020');
                } else {
                    $('.error-message02').css('visibility', 'hidden');
                    $('.time01').css('border-color', '#c2bcbc');
                    $('.error-message03').css('visibility', 'hidden');
                    $('.time02').css('border-color', '#c2bcbc');
                }
            }
        }

        function updateButtonState() {
            let commentLength = $('.comment').val().length;
            let commentValid = !(commentLength > 30 || commentLength == 0);
            let status = $('.blood:checked').val();

    

            let time01 = $('.time01').val().replace('：', '');
            let time02 = $('.time02').val().replace('：', '');
            let timeValid = !(time01 >= time02);
            let sValid = (status === '外出');
            console.log(sValid);
            
            if (commentValid && timeValid && sValid) {
                $('.update').prop('disabled', false).css('background-color', '#2196f3');
            } else if(!(sValid)){
                $('.update').prop('disabled', false).css('background-color', '#2196f3');
            }else{
                $('.update').prop('disabled', true).css('background-color', 'red');
            }
        }

    });

});