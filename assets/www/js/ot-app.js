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

        var db = window.openDatabase("OTDB", "1.0", "OTDB", 1000000);
    }

//Check DB table and create if not there
function createTable(tx)
    {
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        db.transaction(populateDB, errorCB, successCB);
    }

// Populate the database
function populateDB(tx)
    {
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
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
        tx.executeSql('SELECT * FROM OTDB', [], querySuccess, QerrorCB);
    }

// Query the success callback
function querySuccess(tx, results)
    {
        var len = results.rows.length;
        console.log("DEMO table: " + len + " rows found.");
        for (var i=0; i<len; i++)
            {
                console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
            }
    }

    // Transaction error callback
    //
    function QerrorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }