'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['1', '208.117.89.9,255.255.252.0'],
  ['1', '63.141.60.23,255.255.252.0'],
  ['1', '208.117.88.42,255.255.252.0'],
  ['1', '67.219.220.33,255.255.252.0'],
  ['1', '67.219.222.47,255.255.252.0'],
  ['1', '63.141.61.50,255.255.252.0'],
  ['1', '67.219.223.30,255.255.252.0'],
  ['1', '208.117.91.34,255.255.252.0'],
  ['1', '63.141.63.37,255.255.252.0'],
  ['1', '63.141.60.40,255.255.252.0'],
  ['1', '63.141.60.20,255.255.252.0'],
  ['1', '63.141.61.2,255.255.252.0'],
  ['1', '63.141.62.40,255.255.252.0'],
  ['1', '208.117.91.39,255.255.252.0'],
  ['2', '63.141.62.38,255.255.252.0'],
  ['2', '67.219.221.30,255.255.252.0'],
  ['2', '208.117.89.50,255.255.252.0'],
  ['2', '67.219.221.17,255.255.252.0'],
  ['2', '67.219.222.49,255.255.252.0'],
  ['2', '63.141.62.29,255.255.252.0'],
  ['2', '208.117.90.8,255.255.252.0'],
  ['2', '208.117.91.48,255.255.252.0'],
  ['2', '63.141.62.4,255.255.252.0'],
  ['2', '63.141.61.46,255.255.252.0'],
  ['2', '208.117.89.17,255.255.252.0'],
  ['2', '63.141.61.3,255.255.252.0'],
  ['2', '208.117.90.29,255.255.252.0'],
  ['2', '208.117.89.46,255.255.252.0'],
  ['3', '67.219.220.42,255.255.252.0'],
  ['3', '63.141.60.42,255.255.252.0'],
  ['3', '67.219.220.29,255.255.252.0'],
  ['3', '67.219.222.11,255.255.252.0'],
  ['3', '63.141.61.41,255.255.252.0'],
  ['3', '63.141.60.8,255.255.252.0'],
  ['3', '67.219.220.47,255.255.252.0'],
  ['3', '63.141.60.31,255.255.252.0'],
  ['3', '208.117.89.32,255.255.252.0'],
  ['3', '208.117.90.47,255.255.252.0'],
  ['3', '63.141.60.11,255.255.252.0'],
  ['3', '63.141.61.5,255.255.252.0'],
  ['3', '63.141.63.34,255.255.252.0'],
  ['3', '63.141.63.41,255.255.252.0'],
  ['4', '67.219.221.32,255.255.252.0'],
  ['4', '67.219.220.4,255.255.252.0'],
  ['4', '67.219.223.39,255.255.252.0'],
  ['4', '208.117.91.41,255.255.252.0'],
  ['4', '67.219.221.39,255.255.252.0'],
  ['4', '63.141.63.35,255.255.252.0'],
  ['4', '67.219.221.15,255.255.252.0'],
  ['4', '67.219.222.45,255.255.252.0'],
  ['4', '63.141.62.52,255.255.252.0'],
  ['4', '208.117.88.20,255.255.252.0'],
  ['4', '63.141.62.45,255.255.252.0'],
  ['4', '63.141.60.33,255.255.252.0'],
  ['4', '63.141.60.49,255.255.252.0'],
  ['4', '208.117.90.31,255.255.252.0'],
  ['5', '63.141.63.25,255.255.252.0'],
  ['5', '208.117.90.33,255.255.252.0'],
  ['5', '208.117.88.8,255.255.252.0'],
  ['5', '208.117.91.9,255.255.252.0'],
  ['5', '208.117.91.17,255.255.252.0'],
  ['5', '208.117.91.3,255.255.252.0'],
  ['5', '63.141.61.30,255.255.252.0'],
  ['5', '208.117.89.7,255.255.252.0'],
  ['5', '67.219.221.25,255.255.252.0'],
  ['5', '208.117.91.7,255.255.252.0'],
  ['5', '67.219.220.49,255.255.252.0'],
  ['5', '208.117.90.23,255.255.252.0'],
  ['5', '67.219.223.3,255.255.252.0'],
  ['5', '208.117.90.49,255.255.252.0'],
  ['6', '67.219.223.34,255.255.252.0'],
  ['6', '67.219.220.52,255.255.252.0'],
  ['6', '208.117.90.38,255.255.252.0'],
  ['6', '208.117.89.21,255.255.252.0'],
  ['6', '67.219.222.42,255.255.252.0'],
  ['6', '63.141.60.4,255.255.252.0'],
  ['6', '63.141.62.49,255.255.252.0'],
  ['6', '63.141.62.19,255.255.252.0'],
  ['6', '208.117.91.30,255.255.252.0'],
  ['6', '67.219.223.21,255.255.252.0'],
  ['6', '63.141.63.21,255.255.252.0'],
  ['6', '208.117.91.32,255.255.252.0'],
  ['6', '63.141.63.50,255.255.252.0'],
  ['6', '67.219.220.51,255.255.252.0'],
  ['7', '208.117.90.11,255.255.252.0'],
  ['7', '67.219.222.6,255.255.252.0'],
  ['7', '67.219.221.2,255.255.252.0'],
  ['7', '208.117.89.5,255.255.252.0'],
  ['7', '67.219.223.17,255.255.252.0'],
  ['7', '67.219.221.34,255.255.252.0'],
  ['7', '208.117.88.49,255.255.252.0'],
  ['7', '67.219.222.4,255.255.252.0'],
  ['7', '208.117.89.3,255.255.252.0'],
  ['7', '208.117.89.34,255.255.252.0'],
  ['7', '63.141.61.7,255.255.252.0'],
  ['7', '67.219.223.50,255.255.252.0'],
  ['7', '63.141.62.27,255.255.252.0'],
  ['7', '208.117.90.45,255.255.252.0'],
  ['8', '67.219.221.21,255.255.252.0'],
  ['8', '67.219.221.5,255.255.252.0'],
  ['8', '208.117.90.6,255.255.252.0'],
  ['8', '63.141.63.39,255.255.252.0'],
  ['8', '63.141.63.3,255.255.252.0'],
  ['8', '63.141.61.25,255.255.252.0'],
  ['8', '208.117.89.39,255.255.252.0'],
  ['8', '67.219.222.27,255.255.252.0'],
  ['8', '63.141.61.17,255.255.252.0'],
  ['8', '63.141.60.19,255.255.252.0'],
  ['8', '63.141.62.20,255.255.252.0'],
  ['8', '208.117.89.30,255.255.252.0'],
  ['8', '67.219.221.50,255.255.252.0'],
  ['8', '208.117.88.33,255.255.252.0'],
  ['9', '208.117.89.37,255.255.252.0'],
  ['9', '67.219.220.6,255.255.252.0'],
  ['9', '208.117.88.4,255.255.252.0'],
  ['9', '208.117.91.15,255.255.252.0'],
  ['9', '67.219.223.41,255.255.252.0'],
  ['9', '63.141.63.5,255.255.252.0'],
  ['9', '63.141.61.34,255.255.252.0'],
  ['9', '63.141.61.32,255.255.252.0'],
  ['9', '63.141.63.7,255.255.252.0'],
  ['9', '63.141.63.17,255.255.252.0'],
  ['9', '63.141.62.8,255.255.252.0'],
  ['9', '67.219.220.19,255.255.252.0'],
  ['9', '63.141.60.52,255.255.252.0'],
  ['9', '67.219.220.27,255.255.252.0'],
  ['10', '63.141.63.46,255.255.252.0'],
  ['10', '67.219.223.48,255.255.252.0'],
  ['10', '208.117.89.25,255.255.252.0'],
  ['10', '63.141.61.48,255.255.252.0'],
  ['10', '208.117.90.51,255.255.252.0'],
  ['10', '63.141.62.47,255.255.252.0'],
  ['10', '67.219.222.51,255.255.252.0'],
  ['10', '67.219.221.3,255.255.252.0'],
  ['10', '67.219.222.8,255.255.252.0'],
  ['10', '63.141.62.42,255.255.252.0'],
  ['10', '208.117.90.20,255.255.252.0'],
  ['10', '67.219.221.41,255.255.252.0'],
  ['10', '63.141.63.15,255.255.252.0'],
  ['10', '208.117.90.4,255.255.252.0'],
  ['11', '67.219.223.7,255.255.252.0'],
  ['11', '63.141.63.30,255.255.252.0'],
  ['11', '67.219.220.8,255.255.252.0'],
  ['11', '63.141.60.45,255.255.252.0'],
  ['11', '63.141.62.11,255.255.252.0'],
  ['11', '67.219.221.46,255.255.252.0'],
  ['11', '67.219.222.33,255.255.252.0'],
  ['11', '208.117.89.2,255.255.252.0'],
  ['11', '63.141.62.23,255.255.252.0'],
  ['11', '67.219.223.9,255.255.252.0'],
  ['11', '208.117.90.27,255.255.252.0'],
  ['11', '67.219.220.23,255.255.252.0'],
  ['11', '67.219.220.20,255.255.252.0'],
  ['11', '67.219.223.25,255.255.252.0'],
  ['12', '208.117.91.2,255.255.252.0'],
  ['12', '67.219.223.5,255.255.252.0'],
  ['12', '208.117.88.6,255.255.252.0'],
  ['12', '208.117.90.52,255.255.252.0'],
  ['12', '208.117.88.45,255.255.252.0'],
  ['12', '208.117.89.48,255.255.252.0'],
  ['12', '63.141.62.31,255.255.252.0'],
  ['12', '67.219.223.15,255.255.252.0'],
  ['12', '63.141.63.2,255.255.252.0'],
  ['12', '63.141.62.33,255.255.252.0'],
  ['12', '67.219.222.38,255.255.252.0'],
  ['12', '67.219.221.37,255.255.252.0'],
  ['12', '63.141.61.9,255.255.252.0'],
  ['12', '208.117.89.35,255.255.252.0'],
  ['13', '63.141.61.39,255.255.252.0'],
  ['13', '208.117.88.11,255.255.252.0'],
  ['13', '67.219.223.2,255.255.252.0'],
  ['13', '208.117.88.51,255.255.252.0'],
  ['13', '208.117.88.23,255.255.252.0'],
  ['13', '67.219.220.31,255.255.252.0'],
  ['13', '208.117.91.37,255.255.252.0'],
  ['13', '63.141.62.51,255.255.252.0'],
  ['13', '67.219.223.35,255.255.252.0'],
  ['13', '67.219.220.45,255.255.252.0'],
  ['13', '67.219.222.20,255.255.252.0'],
  ['13', '67.219.223.32,255.255.252.0'],
  ['13', '63.141.63.48,255.255.252.0'],
  ['13', '63.141.60.51,255.255.252.0'],
  ['14', '63.141.61.37,255.255.252.0'],
  ['14', '67.219.222.40,255.255.252.0'],
  ['14', '67.219.222.29,255.255.252.0'],
  ['14', '208.117.91.25,255.255.252.0'],
  ['14', '67.219.221.9,255.255.252.0'],
  ['14', '208.117.88.52,255.255.252.0'],
  ['14', '208.117.91.50,255.255.252.0'],
  ['14', '208.117.88.47,255.255.252.0'],
  ['14', '63.141.60.38,255.255.252.0'],
  ['14', '67.219.222.19,255.255.252.0'],
  ['14', '208.117.89.15,255.255.252.0'],
  ['14', '208.117.88.40,255.255.252.0'],
  ['14', '208.117.88.38,255.255.252.0'],
  ['14', '63.141.61.35,255.255.252.0'],
  ['15', '67.219.221.35,255.255.252.0'],
  ['15', '67.219.223.37,255.255.252.0'],
  ['15', '63.141.61.21,255.255.252.0'],
  ['15', '67.219.220.40,255.255.252.0'],
  ['15', '67.219.222.23,255.255.252.0'],
  ['15', '67.219.222.31,255.255.252.0'],
  ['15', '208.117.88.29,255.255.252.0'],
  ['15', '63.141.63.32,255.255.252.0'],
  ['15', '208.117.89.41,255.255.252.0'],
  ['15', '63.141.62.6,255.255.252.0'],
  ['15', '208.117.91.46,255.255.252.0'],
  ['15', '63.141.60.6,255.255.252.0'],
  ['15', '208.117.90.19,255.255.252.0'],
  ['15', '208.117.91.5,255.255.252.0'],
  ['16', '63.141.60.29,255.255.252.0'],
  ['16', '63.141.63.9,255.255.252.0'],
  ['16', '67.219.222.52,255.255.252.0'],
  ['16', '208.117.91.35,255.255.252.0'],
  ['16', '208.117.90.40,255.255.252.0'],
  ['16', '67.219.223.46,255.255.252.0'],
  ['16', '67.219.221.7,255.255.252.0'],
  ['16', '67.219.221.48,255.255.252.0'],
  ['16', '208.117.88.19,255.255.252.0'],
  ['16', '67.219.220.38,255.255.252.0'],
  ['16', '208.117.88.27,255.255.252.0'],
  ['16', '63.141.61.15,255.255.252.0'],
  ['16', '208.117.91.21,255.255.252.0'],
  ['16', '63.141.60.27,255.255.252.0'],
  ['EXTRA', '208.117.88.31,255.255.252.0'],
  ['EXTRA', '67.219.220.11,255.255.252.0'],
  ['EXTRA', '208.117.90.42,255.255.252.0'],
  ['EXTRA', '63.141.60.47,255.255.252.0'],
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
