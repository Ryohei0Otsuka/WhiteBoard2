<?php

include "funcs.php";
$pdo = db_con();

$stmt = $pdo->prepare("SELECT * FROM ikisaki_s");
$status = $stmt->execute();

$view = "";
$id   = "";
if ($status == false) {
    sqlError($stmt);
} else {
    while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $id    = $result["id"];

        $view .= '<div class="border">';
        $view .= '<div class="person" data-person-id="' . $id . '">';

        $view .= '<div class="flex">';
        $view .= '<p class="status">' . $result["statusP"] . '</p>';
        $view .= '<p class="name">' . $result["name"] . '</p>';
        $view .= '</div>';

        $view .= '<div class="time-area">';

        $view .= '<div class="start-time-area">';
        $view .= '<p class="start time">開始</p>';
        $view .= '<p class="start-time">' . $result["time01"] . '</p>';
        $view .= '</div>';

        $view .= '<div class="end-time-area">';
        $view .= '<p class="end time">終了</p>';
        $view .= '<p class="end-time">' . $result["time02"] . '</p>';
        $view .= '</div>';

        $view .= '</div>';

        $view .= '<div class="text">';
        $view .= '<p>' . $result["comment"] . '</p>';
        $view .= '</div>';

        $view .= '<div class="edit">';
        $view .= '<button class="btn"><i class="fa-regular fa-pen-to-square"></i> 編集</button>';
        $view .= '</div>';

        $view .= '</div>';
        $view .= '</div>';
    }
}

?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>行先掲示板S</title>
    <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css">
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v6.0.0/css/all.css" rel="stylesheet">
</head>

<body>
    <div class="container">
        <div class="header-wrapper">
            <header class="header">
                <p class="site-title">行先掲示板</p>
                <p class="date"></p>
            </header>
        </div>


        <main>
            <div class="inner">
                <div class="block">
                    <?= $view ?>
                </div>
            </div>
        </main>
    </div>

    <!-- モーダル -->

    <div id="overlay" class="overlay"></div>
    <!-- モーダルウィンドウ -->
    <div class="modal-window">
        <!-- 閉じるボタン -->
        <button class="modal-close" type="button"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-content">
            <p class="modal-title">行先・目的の編集</p>
            <div class="modal-inner">

                <form action="update.php" method="post">

                    <div class="edit-name">
                        <p class="manager">担当者</p>
                        <p class="modal-name"></p>
                    </div>


                    <div class="edit-status">
                        <p class="modal-status">状態</p>
                        <div class="flex-status">
                            <div class="select-status">
                                <input type="radio" name="blood" id="bloodA" class="blood" value="外出">
                                <label for="bloodA">外出</label>
                            </div>
                            <div class="select-status">
                                <input type="radio" name="blood" id="bloodB" class="blood" value="在席">
                                <label for="bloodB">在席</label>
                            </div>
                            <div class="select-status">
                                <input type="radio" name="blood" id="bloodO" class="blood" value="退勤">
                                <label for="bloodO">退勤</label>
                            </div>
                        </div>
                    </div>

                    <div class="edit-text">
                        <p>行先・目的（全角30文字以内）</p>
                        <textarea name="comment" class="comment" maxlength="30"></textarea>
                        <div class="error-message01"><i class="fa-regular fa-circle-xmark"></i>行先・目的は全角30文字以内です。</div>
                    </div>


                    <div class="time-set">
                        <div class="time-set01">
                            <p class="modal-start-time">開始時刻</p>
                            <div class="time-size time-size01">
                                <select id="time-input" name="time01" class='time01'>
                                <?php echo time_options(); ?>
                                </select>
                                <input type="hidden" class='time01h' name="time01" value='--：--' disabled>
                                <div class="error-message02"><i class="fa-regular fa-circle-xmark"></i>時間の入力が正しくありません。
                                </div>
                            </div>
                        </div>
                        <div class="time-set02">
                            <p class="modal-end-time">終了時刻</p>
                            <div class="time-size">
                                <select id="time-input" name="time02" class='time02'>
                                <?php echo time_options(); ?>
                                </select>
                                <input type="hidden" class='time02h' name="time02" value='--：--' disabled>
                                <div class="error-message03"><i class="fa-regular fa-circle-xmark"></i>時間の入力が正しくありません。
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="btns">
                        <button class="back" type="button">もどる</button>
                        <input type="hidden" class="id" name="id" value=" <?=$id?>">
                        <p><input class="update" type="submit" value="更新"></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="JS/script.js"></script>
</body>

</html>