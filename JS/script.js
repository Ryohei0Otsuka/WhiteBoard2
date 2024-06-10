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
            $('.time01, .time02').val('-- : --');
            $('.error-message01, .error-message02, .error-message03').css('visibility', 'hidden');
            $('.comment, .time01, .time02').prop('disabled', true).css('border-color', '#c2bcbc');
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
                console.log(status);

                if (status != '外出') {
                    $('.update').prop('disabled', false).css('background-color', '#2196f3');
                    $('.comment, .time01, .time02').prop('disabled', true).css('border-color', '#c2bcbc');
                    $('.error-message01, .error-message02, .error-message03').css('visibility', 'hidden');
                    $('.comment').val('');
                    $('.time01').val('-- : --');
                    $('.time02').val('-- : --');
                } else {
                    $('.comment, .time01, .time02').prop('disabled', false);
                    $('.update').prop('disabled', true).css('background-color', 'red');
                }

                    $('.comment').on('input', function () {
                        let commentLength = $('.comment').val().length;
                        console.log(commentLength);
                        if (commentLength >= 30 || commentLength == 0) {
                            $('.update').prop('disabled', true).css('background-color', 'red');
                            $('.error-message01').css('visibility', 'visible');
                            $('.comment').css('border-color', '#b00020');
                        } else {
                            $('.error-message01').css('visibility', 'hidden');
                            $('.comment').css('border-color', '#c2bcbc');
                        }
                    });

                    $('.time01, .time02').on('input', function () {
                        let time01 = $('.time01').val().replace(':', '');
                        let time02 = $('.time02').val().replace(':', '');
                        console.log(time02);
                        if (time02 == '--  --' || time01 >= time02 || time01 == '-- --') {
                            $('.update').prop('disabled', true).css('background-color', 'red');
                            $('.error-message02').css('visibility', 'visible');
                            $('.time02').css('border-color', '#b00020');
                        } else {
                            $('.update').prop('disabled', false).css('background-color', '#2196f3');
                            $('.error-message02, .error-message03').css('visibility', 'hidden');
                            $('.time01, .time02').css('border-color', '#c2bcbc');
                        }
                    });
            }
        });
    });

});