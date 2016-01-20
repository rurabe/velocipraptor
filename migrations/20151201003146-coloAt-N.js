'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['1', '196.53.0.35,255.255.252.0'],
  ['1', '196.53.3.31,255.255.252.0'],
  ['1', '196.53.0.22,255.255.252.0'],
  ['1', '196.53.2.44,255.255.252.0'],
  ['2', '196.53.1.6,255.255.252.0'],
  ['2', '196.53.2.35,255.255.252.0'],
  ['2', '196.53.0.18,255.255.252.0'],
  ['2', '196.53.3.36,255.255.252.0'],
  ['3', '196.53.3.38,255.255.252.0'],
  ['3', '196.53.2.25,255.255.252.0'],
  ['3', '196.53.0.42,255.255.252.0'],
  ['3', '196.53.0.30,255.255.252.0'],
  ['4', '196.53.0.32,255.255.252.0'],
  ['4', '196.53.0.44,255.255.252.0'],
  ['4', '196.53.1.16,255.255.252.0'],
  ['4', '196.53.3.4,255.255.252.0'],
  ['5', '196.53.3.21,255.255.252.0'],
  ['5', '196.53.0.8,255.255.252.0'],
  ['5', '196.53.3.33,255.255.252.0'],
  ['5', '196.53.2.47,255.255.252.0'],
  ['6', '196.53.0.37,255.255.252.0'],
  ['6', '196.53.1.43,255.255.252.0'],
  ['6', '196.53.2.37,255.255.252.0'],
  ['6', '196.53.2.18,255.255.252.0'],
  ['7', '196.53.2.39,255.255.252.0'],
  ['7', '196.53.1.28,255.255.252.0'],
  ['7', '196.53.3.28,255.255.252.0'],
  ['7', '196.53.1.23,255.255.252.0'],
  ['8', '196.53.3.14,255.255.252.0'],
  ['8', '196.53.3.43,255.255.252.0'],
  ['8', '196.53.2.42,255.255.252.0'],
  ['8', '196.53.1.26,255.255.252.0'],
  ['9', '196.53.3.45,255.255.252.0'],
  ['9', '196.53.0.20,255.255.252.0'],
  ['9', '196.53.0.5,255.255.252.0'],
  ['9', '196.53.3.26,255.255.252.0'],
  ['10', '196.53.2.13,255.255.252.0'],
  ['10', '196.53.2.5,255.255.252.0'],
  ['10', '196.53.0.27,255.255.252.0'],
  ['10', '196.53.2.30,255.255.252.0'],
  ['11', '196.53.2.20,255.255.252.0'],
  ['11', '196.53.3.11,255.255.252.0'],
  ['11', '196.53.0.13,255.255.252.0'],
  ['11', '196.53.1.11,255.255.252.0'],
  ['12', '196.53.2.3,255.255.252.0'],
  ['12', '196.53.0.39,255.255.252.0'],
  ['12', '196.53.3.19,255.255.252.0'],
  ['12', '196.53.2.22,255.255.252.0'],
  ['13', '196.53.0.15,255.255.252.0'],
  ['13', '196.53.3.16,255.255.252.0'],
  ['13', '196.53.3.40,255.255.252.0'],
  ['13', '196.53.0.10,255.255.252.0'],
  ['14', '196.53.3.9,255.255.252.0'],
  ['14', '196.53.1.40,255.255.252.0'],
  ['14', '196.53.2.32,255.255.252.0'],
  ['14', '196.53.3.48,255.255.252.0'],
  ['15', '196.53.1.36,255.255.252.0'],
  ['15', '196.53.2.8,255.255.252.0'],
  ['15', '196.53.1.4,255.255.252.0'],
  ['15', '196.53.1.48,255.255.252.0'],
  ['16', '196.53.1.31,255.255.252.0'],
  ['16', '196.53.0.25,255.255.252.0'],
  ['16', '196.53.0.3,255.255.252.0'],
  ['16', '196.53.1.9,255.255.252.0'],
  ['EXTRA', '196.53.2.10,255.255.252.0'],
  ['EXTRA', '196.53.1.21,255.255.252.0'],
  ['EXTRA', '196.53.0.47,255.255.252.0'],
  ['EXTRA', '196.53.2.27,255.255.252.0'],
  ['EXTRA', '196.53.3.23,255.255.252.0'],
  ['EXTRA', '196.53.1.14,255.255.252.0'],
  ['EXTRA', '196.53.3.6,255.255.252.0'],
  ['EXTRA', '196.53.2.15,255.255.252.0'],
  ['EXTRA', '196.53.1.45,255.255.252.0'],
  ['EXTRA', '196.53.1.38,255.255.252.0'],
  ['EXTRA', '196.53.1.33,255.255.252.0'],
  ['EXTRA', '196.53.1.19,255.255.252.0'],
];

var MASKS = {
  '255.255.255.252': 30,
  '255.255.255.248': 29,
  '255.255.255.240': 28,
  '255.255.255.224': 27,
  '255.255.255.192': 26,
  '255.255.255.128': 25,
  '255.255.255.0'  : 24,
  '255.255.254.0'  : 23,
  '255.255.252.0'  : 22,
  '255.255.248.0'  : 21,
  '255.255.240.0'  : 20,
  '255.255.224.0'  : 19,
  '255.255.192.0'  : 18,
  '255.255.128.0'  : 17,
  '255.255.0.0'    : 16,
};

var servers = {
  '1' :    '130c',
  '2' :    '131c',
  '3' :    '132c',
  '4' :    '133c',
  '5' :    '134c',
  '6' :    '135c',
  '7' :    '136c',
  '8' :    '137c',
  '9' :    '138c',
  '10':    '139c',
  '11':    '140c',
  '12':    '141c',
  '13':    '142c',
  '14':    '143c',
  '15':    '144c',
  '16':    '145c',
  'EXTRA': '145c',
};

var assign = function(ips){
  return ips.map(function(ip){
    var serverCode = servers[ip[0]]
    var split = ip[1].split(",");
    var submask = MASKS[split[1]];
    var inet = [split[0],submask].join("/");
    return `SELECT id FROM assign((select id from servers where code = '${serverCode}'),'${inet}');`;
  }).join(' ');
};

exports.up = function(db, callback) {
  db.runSql(assign(DATA),callback);
};

exports.down = function(db, callback) {
  callback();
};
