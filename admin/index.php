<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Podcaster ADMIN</title>

    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/css/vendor/dropzone-basic.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/vendor/dropzone.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/vendor/bootstrap-datetimepicker.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/upload.css">
</head>

<body>
    <div class="row">
        <div class="col-md-6 col-md-offset-3 header">
            <p>Podcaster ADMIN</p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <form id="msform">
                <ul id="progressbar">
                    <li class="active">Upload audio</li>
                    <li>Add information</li>
                    <li>Done!</li>
                </ul>
                <fieldset>
                    <h2 class="fs-title">Upload audio</h2>
                    <h3 class="fs-subtitle">Upload audio file in mp3-format.</h3>
                    <div class="dropzone" id="myDropzone"></div>

                    <input type="button" name="next" class="next action-button" value="Next" disabled="disabled"/>
                </fieldset>
                <fieldset>
                    <h2 class="fs-title">Add information</h2>
                    <h3 class="fs-subtitle">Add audio information (* required fields).</h3>
                    <input type="text" name="title" placeholder="Title *"/>
                    <input type="text" name="description" placeholder="Description"/>
                    <input type="text" name="author" placeholder="Author *"/>
                    <input type="text" name="date" placeholder="Date (ex: 2018-10-19) *" id="date"/>

                    <input type="button" name="previous" class="previous action-button" value="Previous"/>
                    <input type="button" name="save" class="submit action-button" value="Save"/>
                </fieldset>
                <fieldset>
                <h2 class="fs-title">Done</h2>
                <h3 class="fs-subtitle">Your uploaded audio file is now in the <a href="/podcaster">Podcaster</a>.</h3>
                <h3 class="fs-subtitle">
                    <a href="/podcaster/admin/">Upload another one?</a>
                </h3>
                </fieldset>
            </form>
        </div>
    </div>

    <audio id="audio"></audio>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../assets/js/vendor/moment.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

    <script src="../assets/js/vendor/bootstrap-datetimepicker.min.js"></script>
    <script src="../assets/js/vendor/dropzone.js"></script>
    <script src="../assets/js/podcaster.admin.js"></script>
</body>
</html>