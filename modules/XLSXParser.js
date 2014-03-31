xlsx = require ('xlsx');

var loadWorkbook = function(path, rowCount){
  var wb = xlsx.readFile(path, {sheetRows: rowCount});
  return wb;
}

function strToLower(str) {
    str = str.toLowerCase();
    var arr = str.split(/\s|_/);
    return arr.join("");
}

function getHeader (range, offset, sheet){
  var key = []; 
  var cellValue;
  for(var indexCol = range.startCol; indexCol <= range.endCol; ++indexCol){
    cellValue = sheet[xlsx.utils.encode_cell({c:indexCol,r:range.startRow + offset - 1})];
    if(!cellValue) 
      continue;
    if(cellValue.w)
      key[indexCol] = strToLower(cellValue.w);
    else {
      switch(cellValue.t){
        case 's': 
        case 'str':
        case 'n': 
          key[indexCol] = strToLower(cellValue.v); 
          break;
      }
    }
  }
  return key;
}

function getRows(range, offset, key, sheet){
  var isEmpty = true;
  var rowJSON = Object.create({});
  var cellValue;
  var rowCell = range.startRow + offset - 1;
  for(var indexCol = range.startCol; indexCol <= range.endCol; ++indexCol){
    cellValue = sheet[xlsx.utils.encode_cell({c:indexCol,r:rowCell})];
    if(!cellValue || !cellValue.t) {
      continue;
    }
    if (typeof cellValue.w !== 'undefined'){
      rowJSON[key[indexCol]] = cellValue.w;
      isEmpty = false;
    }
    else
      switch(cellValue.t){
        case 's': 
        case 'str':
        case 'b':
        case 'n': 
          if(typeof cellValue.v !== 'undefined') {
            rowJSON[key[indexCol]] = cellValue.v;
            isEmpty = false;
          }
          break;
        case 'e': 
          break; /* throw */
        default: 
          if(typeof cellValue.w !== 'undefined'){
            rowJSON[key[indexCol]] = cellValue.w;
            isEmpty = false;
          }
          break;
      }
  }
  if(!isEmpty){
    return rowJSON;
  }
}


module.exports = {
	loadWorkbook: loadWorkbook,
	getHeader: getHeader,
	getRows: getRows
}