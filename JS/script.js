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
                    $('.time01h, .time02h').prop('disabled', false);
                    $('.error-message01, .error-message02, .error-message03').css('visibility', 'hidden');
                    $('.comment').val('');

                } else {
                    $('.comment, .time01, .time02').prop('disabled', false);
                    $('.update').prop('disabled', true).css('background-color', 'red');
                }

                // コメントフィールドの入力イベントハンドラ
                $('.comment').on('input', function () {
                    validateComment();
                    updateButtonState(); 
                });

                // 時間01フィールドの入力イベントハンドラ
                $('.time01').on('input', function () {
                    validateTimeFields();
                    updateButtonState(); 
                });

                // 時間02フィールドの入力イベントハンドラ
                $('.time02').on('input', function () {
                    validateTimeFields();
                    updateButtonState(); 
                });

                function validateComment() {
                    let commentLength = $('.comment').val().length;

                    if (commentLength > 30 || commentLength == 0) {
                        $('.error-message01').css('visibility', 'visible');
                        $('.comment').css('border-color', '#b00020');
                    } else {
                        $('.error-message01').css('visibility', 'hidden');
                        $('.comment').css('border-color', '#c2bcbc');
                    }
                }

                function validateTimeFields() {
                    $('.time01').on('input', function () {
                        let time01 = $('.time01').val().replace('：', '');
                        let time02 = $('.time02').val().replace('：', '');
                    
                        if (time02 !== '') { // time02が入力されている場合のみバリデーションを実行
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
                    });

                    $('.time02').on('input', function () {
                        let time01 = $('.time01').val().replace('：', '');
                        let time02 = $('.time02').val().replace('：', '');
                    
                        if (time01 !== '') { // time01が入力されている場合のみバリデーションを実行
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
                    });
                }

                function updateButtonState() {
                    // コメントフィールドが条件を満たしているかを確認
                    let commentLength = $('.comment').val().length;
                    let commentValid = !(commentLength > 30 || commentLength == 0);

                    // 時間フィールドのバリデーション結果を確認
                    let time01 = $('.time01').val().replace('：', '');
                    let time02 = $('.time02').val().replace('：', '');
                    let timeValid = !(time01 >= time02);

                    // コメントと時間の両方が条件を満たしている場合にのみボタンを有効化
                    if (commentValid && timeValid) {
                        $('.update').prop('disabled', false).css('background-color', '#2196f3');
                    } else {
                        $('.update').prop('disabled', true).css('background-color', 'red');
                    }
                }



            }
        });
    });

});