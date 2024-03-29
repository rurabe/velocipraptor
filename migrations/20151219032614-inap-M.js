'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['1', '192.161.251.29,255.255.255.0'],
  ['1', '192.161.255.51,255.255.255.0'],
  ['1', '192.161.255.42,255.255.255.0'],
  ['1', '192.161.255.40,255.255.255.0'],
  ['2', '192.161.252.15,255.255.255.0'],
  ['2', '192.161.250.21,255.255.255.0'],
  ['2', '192.161.255.4,255.255.255.0'],
  ['2', '192.161.252.50,255.255.255.0'],
  ['3', '192.161.255.52,255.255.255.0'],
  ['3', '192.161.255.8,255.255.255.0'],
  ['3', '192.161.250.9,255.255.255.0'],
  ['3', '192.161.252.39,255.255.255.0'],
  ['4', '192.161.250.7,255.255.255.0'],
  ['4', '192.161.251.19,255.255.255.0'],
  ['4', '192.161.250.37,255.255.255.0'],
  ['4', '192.161.251.4,255.255.255.0'],
  ['5', '192.161.252.46,255.255.255.0'],
  ['5', '192.161.250.25,255.255.255.0'],
  ['5', '192.161.255.27,255.255.255.0'],
  ['5', '192.161.251.23,255.255.255.0'],
  ['6', '192.161.251.47,255.255.255.0'],
  ['6', '192.161.255.11,255.255.255.0'],
  ['6', '192.161.251.49,255.255.255.0'],
  ['6', '192.161.252.34,255.255.255.0'],
  ['7', '192.161.255.29,255.255.255.0'],
  ['7', '192.161.251.42,255.255.255.0'],
  ['7', '192.161.252.3,255.255.255.0'],
  ['7', '192.161.250.2,255.255.255.0'],
  ['8', '192.161.251.51,255.255.255.0'],
  ['8', '192.161.252.5,255.255.255.0'],
  ['8', '192.161.251.11,255.255.255.0'],
  ['8', '192.161.252.21,255.255.255.0'],
  ['9', '192.161.250.17,255.255.255.0'],
  ['9', '192.161.250.34,255.255.255.0'],
  ['9', '192.161.251.33,255.255.255.0'],
  ['9', '192.161.252.7,255.255.255.0'],
  ['10',  '192.161.252.17,255.255.255.0'],
  ['10',  '192.161.255.49,255.255.255.0'],
  ['10',  '192.161.252.9,255.255.255.0'],
  ['10',  '192.161.251.38,255.255.255.0'],
  ['11',  '192.161.250.15,255.255.255.0'],
  ['11',  '192.161.252.35,255.255.255.0'],
  ['11',  '192.161.255.33,255.255.255.0'],
  ['11',  '192.161.251.52,255.255.255.0'],
  ['12',  '192.161.250.39,255.255.255.0'],
  ['12',  '192.161.252.48,255.255.255.0'],
  ['12',  '192.161.250.30,255.255.255.0'],
  ['12',  '192.161.251.27,255.255.255.0'],
  ['13',  '192.161.255.6,255.255.255.0'],
  ['13',  '192.161.251.20,255.255.255.0'],
  ['13',  '192.161.250.46,255.255.255.0'],
  ['13',  '192.161.250.3,255.255.255.0'],
  ['14',  '192.161.250.50,255.255.255.0'],
  ['14',  '192.161.250.32,255.255.255.0'],
  ['14',  '192.161.252.37,255.255.255.0'],
  ['14',  '192.161.252.2,255.255.255.0'],
  ['15',  '192.161.250.5,255.255.255.0'],
  ['15',  '192.161.255.45,255.255.255.0'],
  ['15',  '192.161.251.31,255.255.255.0'],
  ['15',  '192.161.255.23,255.255.255.0'],
  ['16',  '192.161.252.25,255.255.255.0'],
  ['16',  '192.161.255.38,255.255.255.0'],
  ['16',  '192.161.255.47,255.255.255.0'],
  ['16',  '192.161.255.31,255.255.255.0'],
  ['EXTRA', '192.161.251.8,255.255.255.0'],
  ['EXTRA', '192.161.250.41,255.255.255.0'],
  ['EXTRA', '192.161.255.20,255.255.255.0'],
  ['EXTRA', '192.161.251.40,255.255.255.0'],
  ['EXTRA', '192.161.252.41,255.255.255.0'],
  ['EXTRA', '192.161.250.48,255.255.255.0'],
  ['EXTRA', '192.161.251.6,255.255.255.0'],
  ['EXTRA', '192.161.251.45,255.255.255.0'],
  ['EXTRA', '192.161.252.32,255.255.255.0'],
  ['EXTRA', '192.161.252.30,255.255.255.0'],
  ['EXTRA', '192.161.250.35,255.255.255.0'],
  ['EXTRA', '192.161.255.19,255.255.255.0'],
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
  '1':     '100i',
  '2':     '101i',
  '3':     '102i',
  '4':     '103i',
  '5':     '104i',
  '6':     '105i',
  '7':     '106i',
  '8':     '107i',
  '9':     '108i',
  '10':    '109i',
  '11':    '110i',
  '12':    '111i',
  '13':    '113i',
  '14':    '114i',
  '15':    '115i',
  '16':    '116i',
  'EXTRA': '116i',
};

var assign = function(ips){
  return ips.map(function(ip){
    var serverCode = servers[ip[0]]
    var split = ip[1].split(",");
    var submask = MASKS[split[1]];
    var inet = [split[0],submask].join("/");
    return `SELECT id FROM assign('${serverCode}','${inet}');`;
  }).join(' ');
};

exports.up = function(db, callback) {
  db.runSql(assign(DATA),callback);
};

exports.down = function(db, callback) {
  callback();
};
