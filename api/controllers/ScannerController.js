/**
 * ScannerController
 *
 * @description :: Server-side logic for managing Scanners
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var exec = require('child_process').execSync;

module.exports = {
	


  /**
   * `ScannerController.get()`
   */
  get: function (req, res) {
    return res.json({
        scanners: exec(sails.config.scanList).toString().split('\n')
    });
  },


  /**
   * `ScannerController.scan()`
   */
  scan: function (req, res) {
    scanner = req.param('scanner');
    if (typeof scanner === "undefined") {
        return res.json({
            success: false
        });
    };
    // Format save directory
    date = new Date();
    dateStr = date.getTime() + '.' + date.getDate();
    scanDir = '.tmp/public/images/' + Math.floor(Math.random() * 100).toString() + '.' + dateStr + '.png';
    // Format command string
    scanCommand = sails.config.scanSave;
    scanCommand = scanCommand.replace("DEVICE", scanner);
    scanCommand = scanCommand.replace("DIR", scanDir);
    // Create directory
    try {
        exec('mkdir .tmp/public/images').toString().split('\n');
    }
    catch (e) {
        // I like to keep code dirty ;)
    }
    // Attempt scanning
    try {
        exec(scanCommand);
    }
    catch (e) {
        return res.json({
            success: false
        });
    }
    return res.json({
        success: true,
        dir: scanDir,
        command: scanCommand,
    });
  }
};

