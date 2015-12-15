var scanUpdate = function() {
    $('#scanheader').html('Scans <small>Click to Download</small>');
};

var createScan = function(sendURL, scanName) {
    $.post(sendURL, {name: scanName}).done(function (data) {
        console.log('Added scanner');
    });
}

var addScan = function(scan, url) {
    link = $('<a>', {
        href: scan.name,
        download: 'Scanned-Document.png',
        title: 'ScannedDocument'
    });
    link.append($('<img>', {
        src: scan.name,
        class: 'col-xs-12 scan'
    }));
    container = $('#template').clone();
    container.attr('id', 'scan-' + scan.id);
    container.removeClass('hidden');
    container.prepend(link);
    imgDelete = container.children('.img-delete');
    imgDelete.click(function() {
        $.ajax({
            url: url + scan.id,
            type: 'DELETE',
            success: function () {
                $('#scan-' + scan.id).remove();
            }
        });
    });
    $('.grid').prepend(container);
};

var getScans = function(url) {
    var scans = $.get(url, function(data) {
        data.forEach(function(scan) {
            addScan(scan, url);
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

var main = function(getURL, sendURL, scanURL, createURL) {
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
                createScan(createURL, data.name);
                addScan(data);
            }
            else {
                console.log('Scanning failed.');
            }
        });
    });
};

$(document).ready(function() {
    $('body').addClass('background');
    main($('#scanners').data('url'),
         $('#scan').data('url'),
         $('.grid').data('url'),
         $('.grid').data('create')
    );
});
