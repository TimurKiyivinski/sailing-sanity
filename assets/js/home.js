var scanUpdate = function() {
    $('#scanheader').html('Scans <small>Click to Download</small>');
};

var addScan = function(scan) {
    link = $('<a>', {
        href: scan.name,
        download: 'Scanned-Document.png',
        title: 'ScannedDocument'
    });
    link.append($('<img>', {
        src: scan.name,
        class: 'grid-item scan col-xs-12 col-md-4'
    }));
    $('.grid').prepend(link);
};

var getScans = function(url) {
    var scans = $.get(url, function(data) {
        data.forEach(function(scan) {
            addScan(scan);
        });
        scanUpdate();
    });
};

var scannerUpdate = function() {
    $('#scan').addClass('btn-success');
    $('#scan').removeClass('btn-danger');
    $('#scannerheader').html('Scanners');
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
        scannerUpdate();
    });
};

var main = function(getURL, sendURL, scanURL) {
    // Get scans
    getScans(scanURL);
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 200
    });
    // Get scanners
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

$(document).ready(function() {
    $('body').addClass('background');
    main($('#scanners').data('url'), $('#scan').data('url'), $('.grid').data('url'));
});
