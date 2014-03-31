var xlsx = require('xlsx');
var mongo = require('../models/apbd.js');
var xlsxParser = require('../modules/XLSXParser.js');
var config = require('../config.json');

var dataPath = './data/' + config.xlsxname;

function insertingData(range, offset, keyJSON, sheet, counter, max, callback) {
  var data;
  if(counter < max){
    data = xlsxParser.getRows(range, offset, keyJSON, sheet);

    mongo.addData(data, function(err, result){
      if (err) {
        console.log('db error : ', err);
        throw err;
      } else {
        console.log('success : ', result[0]);
      }
    });
    range.startRow = range.startRow + 1;
    insertingData(range, offset, keyJSON, sheet, counter+1, max, callback);
  }
  else {
    callback();
  }
}

exports.xlsx = function(req, res){
  var maxrow = req.params.id;
  var sheetRow = config.offset + maxrow;
  var workbook = xlsxParser.loadWorkbook(dataPath, sheetRow);

  workbook.SheetNames.every(function(sheetName) {
    sheet = workbook.Sheets[sheetName];

    if(!sheet || !sheet["!ref"]) 
      return res.send('sheet error');
    range = xlsx.utils.decode_range(sheet["!ref"]);
    
    var startRow = range.s.r;
    var startCol = range.s.c;
    var endCol = range.e.c;
    var counter = config.offset;

    if(maxrow + startRow > 1000000){
    	console.log('empty sheet');
    	return false;
    }

    var sheetRange = {
    	startRow: startRow,
    	startCol: startCol,
    	endCol: endCol
    }

    var keyJSON = xlsxParser.getHeader(sheetRange, config.offset, sheet);
    sheetRange.startRow = sheetRange.startRow + 1;
    insertingData(sheetRange, config.offset, keyJSON, sheet, counter, maxrow, function(){
      return res.send('insertion completed');
    });
    return true;
  });
}