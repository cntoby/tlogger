/**
 *
 * User: toby
 * Date: 14-5-27
 * Time: 上午10:26
 */

var fs = require('fs');
var path = require('path');
var moment = require('moment');

function tLogger(logfile, multifile) {
    this.basename = "";
    this.extname = "";
    this.logFile = logfile;
    this.dirname = path.dirname(this.logFile);
    this.multiFile = multifile;
    if (!fs.existsSync(this.dirname)) {
        try {
            fs.mkdirSync(this.dirname);
        }catch (e) {
            console.log('Can not create directory' + this.dirname + '. ' + e);
            process.exit(1);
        }
    }
    if (this.multiFile) {
        this.extname = path.extname(this.logFile);
        this.basename = path.basename(this.logFile, this.extname);
    }else {
        this.basename = path.basename(this.logFile);
    }

    this.write = function (type, str) {
        str = moment().format() + "\t[" + type +"]\t" + str + "\n";
        fs.appendFile(this.getFile(), str, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    this.warn = function (str) {
        this.write('WARN', str);
    }

    this.error = function (str) {
        this.write('ERROR', str);
    }

    this.info = function (str) {
        this.write('INFO', str);
    }

    this.notice = function (str) {
        this.write('NOTICE', str);
    }

    this.getFile = function() {
        if (this.multiFile) {
            return this.dirname + '/' + this.basename + '-' + moment().format('YYYY-MM-DD-HH') + this.extname;
        }else {
            return this.dirname + '/' + this.basename;
        }
    }
}



module.exports = tLogger;