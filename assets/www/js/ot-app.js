// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady()
    {
        alert("DEBUGGING: we are in the onDeviceReady() function");

        if (!window.openDatabase) {
            // not all mobile devices support databases  if it does not, the following alert will display
            // indicating the device will not be albe to run this application
            alert('Databases are not supported on this device.');
            return;
        }

        var db = window.openDatabase("OTDB", "1.0", "Running OT Tracker DB", 65535);

        alert("DEBUGGING: we now leaving the onDeviceReady() function");
    }

//Check DB table and create if not there
function createTable(tx)
    {
        alert("DEBUGGING: we are in the createTable() function");
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
        alert("DEBUGGING: we are now leaving the createTable() function");
    }

function runCreateTable()
    {
        db.transaction(createTable, errorCB, successCB);
    }

// Transaction error callback
function errorCB(tx, err)
    {
        alert("Error processing SQL: "+err);
    }

// Transaction success callback
function successCB()
    {
        alert("success!");
    }

// Query the database
function queryDB(tx)
    {
        alert("DEBUGGING: we are in the queryDB() function");
        tx.executeSql('SELECT * FROM OTDB', [], querySuccess, QerrorCB);
    }

// Query the success callback
function querySuccess(tx, results)
    {
        alert("DEBUGGING: we are in the querySuccess() function");
        var len = results.rows.length;
        alert("DEMO table: " + len + " rows found.");
        for (var i=0; i<len; i++)
            {
                alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
            }
    }

    // Transaction error callback
    //
    function QerrorCB(err) {
        alert("Error querying SQL: "+err.code);
    }