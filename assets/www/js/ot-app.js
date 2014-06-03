<script>

var db = openDatabase ("ROTT", "1.0", "ROTT", 65535);

$("#create").bind ("click", function (event)
    {
        db.transaction (function (transaction)
        {
            var sql = "CREATE TABLE overtime " +
                " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "datetimelog DATETIME, " +
                "cad VARCHAR(5), " +
                "vehicle VARCHAR(10), " +
                "loc VARCHAR(100), " +
                "type VARCHAR(6), " +
                "notes VARCHAR(250), " +
                "deleted VARCHAR(5), " +
                "timestamp DATETIME, " +
                "staffnumber VARCHAR(10))";
            transaction.executeSql (sql, undefined, function ()
            {
                alert ("Table 'overtime' created");
            }, error);
        });
        });

$("#remove").bind ("click", function (event)
    {
        if (!confirm ("Delete table?", "")) return;;
        db.transaction (function (transaction)
        {
        var sql = "DROP TABLE overtime";
        transaction.executeSql (sql, undefined, ok, error);
        });
        });

$("#insert").bind ("click", function (event)
    {
        var datetimelog = $("#datetimelog").val ();
        var cad = $("#cad").val ();
        var vehicle = $("#vehicle").val ();
        var loc = $("#loc").val ();
        var type = $("#type").val ();
        var notes = $("#notes").val ();
        var deleted = "false";
        var timestamp = $("#timestamp").val ();
        var staffnumber = "22309449";

        db.transaction (function (transaction)
        {
        var sql = "INSERT INTO overtime (datetimelog, cad, vehicle, loc, type, notes, deleted, timestamp, staffnumber) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?)";
        transaction.executeSql (sql, [datetimelog, cad, vehicle, loc, type, notes, deleted, timestamp, staffnumber], function ()
        {
        alert ("Log inserted");
        }, error);
        });
        });

$("#list").bind ("click", function (event)
    {
        db.transaction (function (transaction)
        {
            var sql = "SELECT * FROM overtime";
            transaction.executeSql (sql, undefined,
                function (transaction, result)
                {
                    var html = "<ul>";
                    if (result.rows.length)
                    {
                        for (var i = 0; i < result.rows.length; i++)
                        {
                            var row = result.rows.item (i);
                            var id = row.id;
                            var datetimelog = row.datetimelog;
                            var cad = row.cad;
                            var vehicle = row.vehicle;
                            var loc = row.loc;
                            var type = row.type;
                            var notes = row.notes;
                            var deleted = row.deleted;
                            var timestamp = row.timestamp;
                            var staffnumber = row.staffnumber;


                            html += "<li>" +
                                id + "&nbsp;" +
                                datetimelog + "&nbsp;" +
                                cad + "&nbsp;" +
                                vehicle +  "&nbsp;" +
                                loc + "&nbsp;" +
                                type + "&nbsp;" +
                                notes + "&nbsp;" +
                                deleted + "&nbsp;" +
                                timestamp + "&nbsp;" +
                                staffnumber + "&nbsp;" +
                                "</li>";
                        }
                    }
                    else
                    {
                        html += "<li> No Logs </li>";
                    }

                    html += "</ul>";

                    $("#win2").unbind ().bind ("pagebeforeshow", function ()
                    {
                        var $content = $("#win2 div:jqmData(role=content)");
                        $content.html (html);
                        var $ul = $content.find ("ul");
                        $ul.listview ();
                    });

                    $.mobile.changePage ($("#win2"));

                }, error);
        });
        });

function ok ()
    {
        }

function error (transaction, err)
    {
        alert ("DB error : " + err.message);
        return false;
        }

function timestamp() {

    var d = new Date();

    var year = d.getFullYear();

    var month = d.getMonth();
    if (month <10)
    {
    month = "0" + month;
    }

    var date = d.getDate();
    if (date < 10)
    {
    date = "0" + date;
    }

    var hours = d.getHours();
    if (hours < 10)
    {
    hours = "0" + hours;
    }

    var minutes = d.getMinutes();
    if (minutes < 10)
    {
    minutes = "0" + minutes;
    }

    var seconds = d.getSeconds();
    if (seconds < 10)
    {
    seconds = "0" + seconds;
    }


    document.getElementById("timestamp").innerHTML = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }

</script>