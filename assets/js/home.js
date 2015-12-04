var addScan = function(scan) {
    console.log(scan);
};

var getScans = function(url) {
    var scans = $.get(url, function(data) {
        data.forEach(function(scan) {
            addScan(scan);
        });
    });
};

var addScanner = function(scanner) {
    var scanSplit = scanner.split(';');

    // Skip empty lines
    if (scanSplit.length != 2) return;

    // Scanner properties
    var scannerID = scanSplit[0];
    var scannerName = scanSplit[1];

    console.log('Adding scanner: ' + scannerName)

    // Add scanners to list
    $('#scanners').append($('<option>', {
        value: scannerID,
        text: scannerName
    }));
};

var getScanners = function(url) {
    var scanners = $.get(url, function(data) {
        console.log('Received scanner list.')
        data['scanners'].forEach(function(scanner) {
            addScanner(scanner);
        });
    });
};

var main = function(getURL, sendURL) {
    getScanners(getURL);
    $("#scan").click(function(){
        $.post(sendURL, {scanner: $('#scanners').val()}).done(function (data) {
            if (data.success) {
                console.log('Scan was successful.');
            }
            else {
                console.log('Scanning failed.');
            }
        });
    });
};

main($('#scanners').data('url'), $('#scan').data('url'))
