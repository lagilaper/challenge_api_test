var mongo = require('mongoskin');
var config = require('../config.json');

var hostDB = 'mongodb://'+config.dbhost+'/'+config.dbname+'?auto_reconnect';
var db = mongo.db(hostDB);
var collections = config.collections;
var BSON = mongo.BSONPure;

exports.findById = function(id, callback) {
  db.collection(collections).findOne({
    _id:  new BSON.ObjectID(id)
  }, function(err, item) {
    callback(err, item);
  });
};

exports.findByKegiatanId = function(id, callback) {
  db.collection(collections).findOne({
    kegiatanid:  id
  }, function(err, item) {
    callback(err, item);
  });
};

exports.findAll = function(callback) {
  db.collection(collections).find().toArray(function(err, items) {
    callback(err, items)
  });
};

exports.addData = function(data, callback) {
  console.log('add data : ', data);
  db.collection(collections).insert(data, function(err, result) {
    callback(err, result);
  });
};

exports.delDataById = function(id, callback) {
  id = new BSON.ObjectID(id);
  db.collection(collections).removeById(id, function(err, result) {
    callback(err,result);
  });
};

exports.delDataByKegiatanId = function(id, callback) {
  db.collection(collections).remove({
    kegiatanid: id.toString()
  }, function(err, result) {
    callback(err,result);
  });
};

exports.updateDataById = function(id, data, callback) {
  db.collection(collections).update({
    _id:  new BSON.ObjectID(id)
  }, {$set:data}, function(err, result) {
    callback(err, result);
  });
};

exports.updateDataByKegiatanId = function(id, data, callback) {
  db.collection(collections).update({
    kegiatanid:  id.toString()
  }, {$set:data}, function(err, result) {
    callback(err, result);
  });
};