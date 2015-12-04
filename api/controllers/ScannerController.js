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
    console.log(scanner);
    if (typeof scanner === "undefined") {
        return res.json({
            success: false
        });
    };
    scanDir = Math.floor(Math.random() * 100).toString() + " " +  Date();
    return res.json({
        success: true,
        dir: scanDir,
        param: scanner
    });
  }
};

