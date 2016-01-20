'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['1', '130.185.172.5,255.255.252.0'],
  ['1', '185.21.104.10,255.255.252.0'],
  ['1', '130.185.172.20,255.255.252.0'],
  ['1', '130.185.175.40,255.255.252.0'],
  ['1', '185.21.105.4,255.255.252.0'],
  ['1', '185.21.106.42,255.255.252.0'],
  ['1', '185.21.104.18,255.255.252.0'],
  ['1', '130.185.174.37,255.255.252.0'],
  ['1', '185.21.107.16,255.255.252.0'],
  ['2', '130.185.172.3,255.255.252.0'],
  ['2', '130.185.173.11,255.255.252.0'],
  ['2', '130.185.174.35,255.255.252.0'],
  ['2', '130.185.174.42,255.255.252.0'],
  ['2', '185.21.105.48,255.255.252.0'],
  ['2', '185.21.107.26,255.255.252.0'],
  ['2', '185.21.107.4,255.255.252.0'],
  ['2', '130.185.173.40,255.255.252.0'],
  ['2', '130.185.175.4,255.255.252.0'],
  ['3', '130.185.174.32,255.255.252.0'],
  ['3', '130.185.174.44,255.255.252.0'],
  ['3', '185.21.106.10,255.255.252.0'],
  ['3', '130.185.175.6,255.255.252.0'],
  ['3', '130.185.175.23,255.255.252.0'],
  ['3', '185.21.106.18,255.255.252.0'],
  ['3', '185.21.104.8,255.255.252.0'],
  ['3', '185.21.104.20,255.255.252.0'],
  ['3', '185.21.104.5,255.255.252.0'],
  ['4', '185.21.107.48,255.255.252.0'],
  ['4', '130.185.174.15,255.255.252.0'],
  ['4', '130.185.172.8,255.255.252.0'],
  ['4', '185.21.105.16,255.255.252.0'],
  ['4', '185.21.105.21,255.255.252.0'],
  ['4', '185.21.105.26,255.255.252.0'],
  ['4', '185.21.104.25,255.255.252.0'],
  ['4', '185.21.105.9,255.255.252.0'],
  ['4', '130.185.173.16,255.255.252.0'],
  ['5', '185.21.106.13,255.255.252.0'],
  ['5', '130.185.172.13,255.255.252.0'],
  ['5', '185.21.106.8,255.255.252.0'],
  ['5', '185.21.106.44,255.255.252.0'],
  ['5', '185.21.107.36,255.255.252.0'],
  ['5', '185.21.104.32,255.255.252.0'],
  ['5', '130.185.175.26,255.255.252.0'],
  ['5', '185.21.105.31,255.255.252.0'],
  ['5', '130.185.174.39,255.255.252.0'],
  ['6', '185.21.105.14,255.255.252.0'],
  ['6', '130.185.173.33,255.255.252.0'],
  ['6', '130.185.172.10,255.255.252.0'],
  ['6', '185.21.107.40,255.255.252.0'],
  ['6', '185.21.104.35,255.255.252.0'],
  ['6', '130.185.173.21,255.255.252.0'],
  ['6', '130.185.175.33,255.255.252.0'],
  ['6', '185.21.104.22,255.255.252.0'],
  ['6', '185.21.105.40,255.255.252.0'],
  ['7', '130.185.174.5,255.255.252.0'],
  ['7', '130.185.174.25,255.255.252.0'],
  ['7', '185.21.106.32,255.255.252.0'],
  ['7', '130.185.173.6,255.255.252.0'],
  ['7', '185.21.107.21,255.255.252.0'],
  ['7', '185.21.107.11,255.255.252.0'],
  ['7', '130.185.173.23,255.255.252.0'],
  ['7', '185.21.104.30,255.255.252.0'],
  ['7', '130.185.174.8,255.255.252.0'],
  ['8', '130.185.173.4,255.255.252.0'],
  ['8', '130.185.172.25,255.255.252.0'],
  ['8', '185.21.104.42,255.255.252.0'],
  ['8', '185.21.105.38,255.255.252.0'],
  ['8', '185.21.106.47,255.255.252.0'],
  ['8', '130.185.172.30,255.255.252.0'],
  ['8', '130.185.173.38,255.255.252.0'],
  ['8', '185.21.107.28,255.255.252.0'],
  ['8', '130.185.173.14,255.255.252.0'],
  ['9', '130.185.175.36,255.255.252.0'],
  ['9', '185.21.106.5,255.255.252.0'],
  ['9', '130.185.172.32,255.255.252.0'],
  ['9', '130.185.173.19,255.255.252.0'],
  ['9', '185.21.106.20,255.255.252.0'],
  ['9', '185.21.107.23,255.255.252.0'],
  ['9', '130.185.175.28,255.255.252.0'],
  ['9', '130.185.173.45,255.255.252.0'],
  ['9', '185.21.107.45,255.255.252.0'],
  ['10', '130.185.175.16,255.255.252.0'],
  ['10', '130.185.175.38,255.255.252.0'],
  ['10', '130.185.174.18,255.255.252.0'],
  ['10', '185.21.107.14,255.255.252.0'],
  ['10', '185.21.104.3,255.255.252.0'],
  ['10', '185.21.105.11,255.255.252.0'],
  ['10', '185.21.104.47,255.255.252.0'],
  ['10', '130.185.173.26,255.255.252.0'],
  ['10', '130.185.172.47,255.255.252.0'],
  ['11', '130.185.175.11,255.255.252.0'],
  ['11', '130.185.172.27,255.255.252.0'],
  ['11', '185.21.104.37,255.255.252.0'],
  ['11', '185.21.105.19,255.255.252.0'],
  ['11', '130.185.174.30,255.255.252.0'],
  ['11', '185.21.105.6,255.255.252.0'],
  ['11', '130.185.173.48,255.255.252.0'],
  ['11', '185.21.106.30,255.255.252.0'],
  ['11', '130.185.172.35,255.255.252.0'],
  ['12', '130.185.175.14,255.255.252.0'],
  ['12', '130.185.172.18,255.255.252.0'],
  ['12', '130.185.174.22,255.255.252.0'],
  ['12', '185.21.105.28,255.255.252.0'],
  ['12', '185.21.106.22,255.255.252.0'],
  ['12', '130.185.175.21,255.255.252.0'],
  ['12', '185.21.106.35,255.255.252.0'],
  ['12', '130.185.172.44,255.255.252.0'],
  ['12', '185.21.104.13,255.255.252.0'],
  ['13', '130.185.175.45,255.255.252.0'],
  ['13', '130.185.172.15,255.255.252.0'],
  ['13', '185.21.105.36,255.255.252.0'],
  ['13', '185.21.107.6,255.255.252.0'],
  ['13', '185.21.104.44,255.255.252.0'],
  ['13', '130.185.173.43,255.255.252.0'],
  ['13', '130.185.172.39,255.255.252.0'],
  ['13', '185.21.107.33,255.255.252.0'],
  ['13', '185.21.104.27,255.255.252.0'],
  ['14', '130.185.174.3,255.255.252.0'],
  ['14', '185.21.106.39,255.255.252.0'],
  ['14', '130.185.175.48,255.255.252.0'],
  ['14', '185.21.107.38,255.255.252.0'],
  ['14', '130.185.174.47,255.255.252.0'],
  ['14', '130.185.172.37,255.255.252.0'],
  ['14', '185.21.107.31,255.255.252.0'],
  ['14', '185.21.105.23,255.255.252.0'],
  ['14', '130.185.173.31,255.255.252.0'],
  ['15', '185.21.107.19,255.255.252.0'],
  ['15', '130.185.175.9,255.255.252.0'],
  ['15', '130.185.174.10,255.255.252.0'],
  ['15', '185.21.106.25,255.255.252.0'],
  ['15', '130.185.173.36,255.255.252.0'],
  ['15', '130.185.174.13,255.255.252.0'],
  ['15', '185.21.105.43,255.255.252.0'],
  ['15', '185.21.107.9,255.255.252.0'],
  ['15', '185.21.106.37,255.255.252.0'],
  ['16', '185.21.105.45,255.255.252.0'],
  ['16', '185.21.105.33,255.255.252.0'],
  ['16', '130.185.175.43,255.255.252.0'],
  ['16', '185.21.106.27,255.255.252.0'],
  ['16', '130.185.175.31,255.255.252.0'],
  ['16', '185.21.104.15,255.255.252.0'],
  ['16', '130.185.174.20,255.255.252.0'],
  ['16', '130.185.172.22,255.255.252.0'],
  ['16', '185.21.107.43,255.255.252.0'],
  ['EXTRA', '130.185.172.42,255.255.252.0'],
  ['EXTRA', '185.21.106.15,255.255.252.0'],
  ['EXTRA', '185.21.106.3,255.255.252.0'],
  ['EXTRA', '130.185.175.19,255.255.252.0'],
  ['EXTRA', '185.21.104.39,255.255.252.0'],
  ['EXTRA', '130.185.173.28,255.255.252.0'],
  ['EXTRA', '130.185.174.27,255.255.252.0'],
  ['EXTRA', '130.185.173.9,255.255.252.0'],
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
