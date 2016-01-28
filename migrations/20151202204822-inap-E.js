'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['1',     '162.252.182.216,255.255.254.0'],
  ['1',     '162.252.182.190,255.255.254.0'],
  ['1',     '162.252.182.193,255.255.254.0'],
  ['2',     '162.252.183.162,255.255.254.0'],
  ['2',     '162.252.181.107,255.255.255.0'],
  ['2',     '162.252.181.141,255.255.255.0'],
  ['3',     '162.252.183.205,255.255.254.0'],
  ['3',     '162.252.182.187,255.255.254.0'],
  ['3',     '162.252.181.103,255.255.255.0'],
  ['4',     '162.252.183.175,255.255.254.0'],
  ['4',     '162.252.181.135,255.255.255.0'],
  ['4',     '162.252.181.139,255.255.255.0'],
  ['5',     '162.252.183.185,255.255.254.0'],
  ['5',     '162.252.182.223,255.255.254.0'],
  ['5',     '162.252.183.188,255.255.254.0'],
  ['6',     '162.252.181.137,255.255.255.0'],
  ['6',     '162.252.182.196,255.255.254.0'],
  ['6',     '162.252.181.117,255.255.255.0'],
  ['7',     '162.252.182.204,255.255.254.0'],
  ['7',     '162.252.183.241,255.255.254.0'],
  ['7',     '162.252.181.112,255.255.255.0'],
  ['8',     '162.252.183.231,255.255.254.0'],
  ['8',     '162.252.181.105,255.255.255.0'],
  ['8',     '162.252.183.182,255.255.254.0'],
  ['9',     '162.252.182.199,255.255.254.0'],
  ['9',     '162.252.183.165,255.255.254.0'],
  ['9',     '162.252.181.150,255.255.255.0'],
  ['10',    '162.252.182.212,255.255.254.0'],
  ['10',    '162.252.183.191,255.255.254.0'],
  ['10',    '162.252.181.148,255.255.255.0'],
  ['11',    '162.252.183.198,255.255.254.0'],
  ['11',    '162.252.182.201,255.255.254.0'],
  ['11',    '162.252.182.209,255.255.254.0'],
  ['12',    '162.252.181.130,255.255.255.0'],
  ['12',    '162.252.181.115,255.255.255.0'],
  ['12',    '162.252.183.235,255.255.254.0'],
  ['13',    '162.252.182.175,255.255.254.0'],
  ['13',    '162.252.182.181,255.255.254.0'],
  ['13',    '162.252.183.226,255.255.254.0'],
  ['14',    '162.252.183.168,255.255.254.0'],
  ['14',    '162.252.182.184,255.255.254.0'],
  ['14',    '162.252.182.178,255.255.254.0'],
  ['15',    '162.252.181.134,255.255.255.0'],
  ['15',    '162.252.181.146,255.255.255.0'],
  ['15',    '162.252.181.109,255.255.255.0'],
  ['16',    '162.252.181.125,255.255.255.0'],
  ['16',    '162.252.182.219,255.255.254.0'],
  ['16',    '162.252.181.132,255.255.255.0'],
  ['EXTRA', '162.252.183.179,255.255.254.0'],
  ['EXTRA', '162.252.182.229,255.255.254.0'],
  ['EXTRA', '162.252.183.172,255.255.254.0'],
  ['EXTRA', '162.252.183.239,255.255.254.0'],
  ['EXTRA', '162.252.183.194,255.255.254.0'],
  ['EXTRA', '162.252.182.206,255.255.254.0'],
  ['EXTRA', '162.252.182.221,255.255.254.0'],
  ['EXTRA', '162.252.183.200,255.255.254.0'],
  ['EXTRA', '162.252.181.121,255.255.255.0'],
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
