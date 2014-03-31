var models = require('../models/apbd.js');

exports.findAll = function(req, res){
  models.findAll(function(err, items){
    if (err) {
      console.log('db error : ', err);
      res.send(err);
    } else {
      res.send(items);
    }
 })
};

exports.findById = function(req, res){
	var id = req.params.id;
  models.findById(id, function(err, item){
    if (err) {
      console.log('db error : ', err);
      throw err;
    } else {
      console.log('data found : ', item);
      res.send(item);
    }
 })
};

exports.findByKegiatanId = function(req, res){
	var id = req.params.id;
  models.findByKegiatanId(id, function(err, item){
    if (err) {
      console.log('db error : ', err);
      throw err;
    } else {
      console.log('data found : ', item);
      res.send(item);
    }
 })
};

exports.addData = function(req,res){
	var data = req.body;
	models.addData(data, function(err, result){
      if (err) {
        console.log('db error : ', err);
        throw err;
      } else {
        console.log('success : ', result[0]);
        res.send(result[0]);
      }
    });
};

exports.delDataById = function(req,res){
	var id = req.params.id;
	models.delDataById(id, function(err,result){
    if (err) {
      console.log('error deleting : ' + err);
      throw err;
    } else {
      console.log('' + result + ' data removed');
      res.send(result);
    }
	})
};

exports.delDataByKegiatanId = function(req,res){
	var id = req.params.id;
	models.delDataByKegiatanId(id, function(err,result){
    if (err) {
      console.log('error deleting : ' + err);
      throw err;
    } else {
      console.log('' + result + ' data removed');
      res.send(result);
    }
	})
};

exports.updateDataById = function(req,res){
	var id = req.params.id;
	var data = req.body;
	models.updateDataById(id, data, function(err, result){
		if (err) {
      console.log('db error : ', err);
      throw err;
    } else {
      console.log(' ' + result + 'updated');
      res.send(result);
    }
	});
}

exports.updateDataByKegiatanId = function(req,res){
	var id = req.params.id;
	var data = req.body;
	models.updateDataByKegiatanId(id, data, function(err, result){
		if (err) {
      console.log('db error : ', err);
      throw err;
    } else {
      console.log(' ' + result + 'updated');
      res.send(result);
    }
	});
}