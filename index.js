/**
 *
 * User: toby
 * Date: 14-5-27
 * Time: 上午10:26
 */

var fs = require('fs');
var path = require('path');
var moment = require('moment');

var dirname = "";
var logFile = "";
var basename = "";
var extname = "";
var multiFile = false;

function tLogger(logfile, multifile) {
    logFile = logfile;
    dirname = path.dirname(logFile);
    multiFile = multifile;
    if (!fs.existsSync(dirname)) {
        if (!fs.mkdirSync(dirname)) {
            console.log('Can not create directory ' + dirname + '.');
            process.exit(1);
        }
    }
    if (multiFile) {
        extname = path.extname(logFile);
        basename = path.basename(logFile, extname);
    }else {
        basename = path.basename(logFile);
    }

    this.write = function (type, str) {
        str = moment().format() + "\t[" + type +"]\t" + str + "\n";
        fs.appendFile(getFile(), str, function (err) {
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
}

function getFile() {
    if (multiFile) {
        return dirname + '/' + basename + '-' + moment().format('YYYY-MM-DD-HH') + extname;
    }else {
        return dirname + '/' + basename;
    }
}


module.exports = tLogger;