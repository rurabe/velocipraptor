var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['1', '144.208.130.20,255.255.248.0'],
  ['1', '144.208.128.38,255.255.248.0'],
  ['1', '144.208.132.31,255.255.248.0'],
  ['1', '63.223.90.3,255.255.255.0'],
  ['1', '144.208.130.11,255.255.248.0'],
  ['1', '144.208.133.37,255.255.248.0'],
  ['1', '76.191.100.21,255.255.255.0'],
  ['1', '63.223.87.41,255.255.255.0'],
  ['1', '144.208.129.34,255.255.248.0'],
  ['1', '216.162.211.27,255.255.255.0'],
  ['1', '144.208.133.46,255.255.248.0'],
  ['1', '76.191.100.50,255.255.255.0'],
  ['1', '63.223.88.33,255.255.255.0'],
  ['1', '144.208.130.40,255.255.248.0'],
  ['1', '144.208.129.37,255.255.248.0'],
  ['1', '63.223.80.42,255.255.255.0'],
  ['1', '63.223.87.46,255.255.255.0'],
  ['1', '216.162.218.37,255.255.255.0'],
  ['1', '144.208.128.23,255.255.248.0'],
  ['1', '144.208.134.33,255.255.248.0'],
  ['1', '63.223.87.34,255.255.255.0'],
  ['2', '144.208.130.31,255.255.248.0'],
  ['2', '63.223.87.2,255.255.255.0'],
  ['2', '144.208.132.8,255.255.248.0'],
  ['2', '144.208.128.33,255.255.248.0'],
  ['2', '144.208.135.21,255.255.248.0'],
  ['2', '144.208.128.6,255.255.248.0'],
  ['2', '144.208.129.32,255.255.248.0'],
  ['2', '144.208.131.34,255.255.248.0'],
  ['2', '144.208.134.8,255.255.248.0'],
  ['2', '144.208.131.2,255.255.248.0'],
  ['2', '76.191.103.20,255.255.255.0'],
  ['2', '144.208.134.42,255.255.248.0'],
  ['2', '144.208.131.9,255.255.248.0'],
  ['2', '216.162.211.33,255.255.255.0'],
  ['2', '63.223.90.17,255.255.255.0'],
  ['2', '144.208.128.20,255.255.248.0'],
  ['2', '144.208.133.48,255.255.248.0'],
  ['2', '216.162.211.4,255.255.255.0'],
  ['2', '144.208.130.49,255.255.248.0'],
  ['2', '76.191.103.23,255.255.255.0'],
  ['2', '144.208.132.52,255.255.248.0'],
  ['3', '76.191.105.15,255.255.255.0'],
  ['3', '76.191.100.39,255.255.255.0'],
  ['3', '76.191.105.48,255.255.255.0'],
  ['3', '63.223.88.11,255.255.255.0'],
  ['3', '76.191.100.2,255.255.255.0'],
  ['3', '144.208.131.7,255.255.248.0'],
  ['3', '76.191.105.25,255.255.255.0'],
  ['3', '144.208.129.35,255.255.248.0'],
  ['3', '216.162.218.17,255.255.255.0'],
  ['3', '76.191.100.46,255.255.255.0'],
  ['3', '144.208.129.39,255.255.248.0'],
  ['3', '76.191.105.30,255.255.255.0'],
  ['3', '216.162.211.23,255.255.255.0'],
  ['3', '216.162.218.3,255.255.255.0'],
  ['3', '76.191.100.41,255.255.255.0'],
  ['3', '144.208.128.42,255.255.248.0'],
  ['3', '63.223.88.20,255.255.255.0'],
  ['3', '144.208.134.38,255.255.248.0'],
  ['3', '76.191.100.5,255.255.255.0'],
  ['3', '144.208.134.47,255.255.248.0'],
  ['3', '63.223.80.27,255.255.255.0'],
  ['4', '76.191.105.9,255.255.255.0'],
  ['4', '76.191.98.42,255.255.255.0'],
  ['4', '144.208.130.42,255.255.248.0'],
  ['4', '144.208.129.50,255.255.248.0'],
  ['4', '76.191.103.27,255.255.255.0'],
  ['4', '63.223.90.34,255.255.255.0'],
  ['4', '76.191.103.51,255.255.255.0'],
  ['4', '144.208.128.45,255.255.248.0'],
  ['4', '63.223.80.45,255.255.255.0'],
  ['4', '144.208.128.52,255.255.248.0'],
  ['4', '144.208.132.49,255.255.248.0'],
  ['4', '216.162.218.2,255.255.255.0'],
  ['4', '216.162.211.19,255.255.255.0'],
  ['4', '144.208.130.52,255.255.248.0'],
  ['4', '76.191.105.41,255.255.255.0'],
  ['4', '76.191.98.33,255.255.255.0'],
  ['4', '76.191.103.42,255.255.255.0'],
  ['4', '216.162.211.51,255.255.255.0'],
  ['4', '144.208.131.5,255.255.248.0'],
  ['4', '76.191.98.40,255.255.255.0'],
  ['4', '76.191.100.37,255.255.255.0'],
  ['5', '76.191.103.8,255.255.255.0'],
  ['5', '76.191.103.52,255.255.255.0'],
  ['5', '63.223.87.17,255.255.255.0'],
  ['5', '144.208.134.31,255.255.248.0'],
  ['5', '216.162.211.45,255.255.255.0'],
  ['5', '63.223.88.51,255.255.255.0'],
  ['5', '63.223.90.2,255.255.255.0'],
  ['5', '63.223.80.19,255.255.255.0'],
  ['5', '216.162.211.47,255.255.255.0'],
  ['5', '144.208.129.30,255.255.248.0'],
  ['5', '76.191.103.29,255.255.255.0'],
  ['5', '144.208.133.32,255.255.248.0'],
  ['5', '144.208.131.50,255.255.248.0'],
  ['5', '144.208.135.17,255.255.248.0'],
  ['5', '63.223.90.21,255.255.255.0'],
  ['5', '144.208.134.20,255.255.248.0'],
  ['5', '76.191.105.34,255.255.255.0'],
  ['5', '144.208.132.38,255.255.248.0'],
  ['5', '144.208.132.45,255.255.248.0'],
  ['5', '63.223.87.50,255.255.255.0'],
  ['5', '63.223.88.27,255.255.255.0'],
  ['6', '63.223.87.5,255.255.255.0'],
  ['6', '144.208.130.51,255.255.248.0'],
  ['6', '63.223.80.33,255.255.255.0'],
  ['6', '76.191.105.21,255.255.255.0'],
  ['6', '216.162.211.29,255.255.255.0'],
  ['6', '63.223.88.4,255.255.255.0'],
  ['6', '76.191.103.38,255.255.255.0'],
  ['6', '144.208.133.25,255.255.248.0'],
  ['6', '144.208.131.17,255.255.248.0'],
  ['6', '144.208.129.9,255.255.248.0'],
  ['6', '144.208.133.41,255.255.248.0'],
  ['6', '63.223.88.47,255.255.255.0'],
  ['6', '76.191.98.19,255.255.255.0'],
  ['6', '216.162.211.11,255.255.255.0'],
  ['6', '144.208.130.47,255.255.248.0'],
  ['6', '63.223.87.35,255.255.255.0'],
  ['6', '144.208.129.25,255.255.248.0'],
  ['6', '216.162.211.42,255.255.255.0'],
  ['6', '144.208.129.21,255.255.248.0'],
  ['6', '76.191.98.31,255.255.255.0'],
  ['6', '63.223.90.30,255.255.255.0'],
  ['7', '63.223.80.4,255.255.255.0'],
  ['7', '76.191.103.49,255.255.255.0'],
  ['7', '76.191.100.34,255.255.255.0'],
  ['7', '63.223.90.15,255.255.255.0'],
  ['7', '216.162.218.7,255.255.255.0'],
  ['7', '144.208.128.8,255.255.248.0'],
  ['7', '76.191.100.9,255.255.255.0'],
  ['7', '144.208.132.11,255.255.248.0'],
  ['7', '216.162.211.20,255.255.255.0'],
  ['7', '144.208.133.17,255.255.248.0'],
  ['7', '63.223.88.6,255.255.255.0'],
  ['7', '144.208.128.4,255.255.248.0'],
  ['7', '76.191.98.29,255.255.255.0'],
  ['7', '144.208.128.40,255.255.248.0'],
  ['7', '144.208.131.39,255.255.248.0'],
  ['7', '144.208.135.2,255.255.248.0'],
  ['7', '76.191.105.39,255.255.255.0'],
  ['7', '76.191.98.11,255.255.255.0'],
  ['7', '144.208.135.50,255.255.248.0'],
  ['7', '144.208.135.9,255.255.248.0'],
  ['7', '63.223.80.23,255.255.255.0'],
  ['8', '144.208.129.5,255.255.248.0'],
  ['8', '63.223.80.49,255.255.255.0'],
  ['8', '63.223.87.48,255.255.255.0'],
  ['8', '63.223.80.38,255.255.255.0'],
  ['8', '144.208.129.48,255.255.248.0'],
  ['8', '63.223.87.37,255.255.255.0'],
  ['8', '144.208.132.4,255.255.248.0'],
  ['8', '76.191.105.3,255.255.255.0'],
  ['8', '76.191.103.4,255.255.255.0'],
  ['8', '144.208.134.49,255.255.248.0'],
  ['8', '144.208.128.27,255.255.248.0'],
  ['8', '63.223.88.8,255.255.255.0'],
  ['8', '63.223.90.7,255.255.255.0'],
  ['8', '144.208.133.50,255.255.248.0'],
  ['8', '76.191.103.19,255.255.255.0'],
  ['8', '63.223.90.32,255.255.255.0'],
  ['8', '63.223.80.47,255.255.255.0'],
  ['8', '144.208.128.31,255.255.248.0'],
  ['8', '144.208.135.39,255.255.248.0'],
  ['8', '63.223.90.50,255.255.255.0'],
  ['8', '144.208.134.4,255.255.248.0'],
  ['9', '63.223.87.7,255.255.255.0'],
  ['9', '144.208.134.11,255.255.248.0'],
  ['9', '144.208.128.11,255.255.248.0'],
  ['9', '216.162.218.15,255.255.255.0'],
  ['9', '144.208.134.45,255.255.248.0'],
  ['9', '144.208.133.30,255.255.248.0'],
  ['9', '76.191.98.51,255.255.255.0'],
  ['9', '76.191.105.2,255.255.255.0'],
  ['9', '76.191.103.6,255.255.255.0'],
  ['9', '144.208.135.32,255.255.248.0'],
  ['9', '76.191.103.47,255.255.255.0'],
  ['9', '144.208.135.46,255.255.248.0'],
  ['9', '63.223.87.32,255.255.255.0'],
  ['9', '144.208.128.29,255.255.248.0'],
  ['9', '144.208.132.51,255.255.248.0'],
  ['9', '76.191.100.15,255.255.255.0'],
  ['9', '63.223.87.30,255.255.255.0'],
  ['9', '144.208.129.15,255.255.248.0'],
  ['9', '63.223.80.20,255.255.255.0'],
  ['9', '144.208.130.8,255.255.248.0'],
  ['9', '63.223.80.52,255.255.255.0'],
  ['10',  '144.208.128.47,255.255.248.0'],
  ['10',  '144.208.131.41,255.255.248.0'],
  ['10',  '144.208.134.23,255.255.248.0'],
  ['10',  '216.162.211.8,255.255.255.0'],
  ['10',  '76.191.98.23,255.255.255.0'],
  ['10',  '144.208.132.42,255.255.248.0'],
  ['10',  '63.223.80.51,255.255.255.0'],
  ['10',  '144.208.130.29,255.255.248.0'],
  ['10',  '76.191.100.3,255.255.255.0'],
  ['10',  '63.223.88.49,255.255.255.0'],
  ['10',  '76.191.100.17,255.255.255.0'],
  ['10',  '63.223.90.48,255.255.255.0'],
  ['10',  '144.208.133.35,255.255.248.0'],
  ['10',  '144.208.133.15,255.255.248.0'],
  ['10',  '216.162.218.32,255.255.255.0'],
  ['10',  '144.208.130.45,255.255.248.0'],
  ['10',  '144.208.135.30,255.255.248.0'],
  ['10',  '144.208.135.15,255.255.248.0'],
  ['10',  '144.208.134.6,255.255.248.0'],
  ['10',  '144.208.132.29,255.255.248.0'],
  ['10',  '144.208.134.40,255.255.248.0'],
  ['11',  '144.208.134.29,255.255.248.0'],
  ['11',  '144.208.134.52,255.255.248.0'],
  ['11',  '144.208.128.19,255.255.248.0'],
  ['11',  '144.208.129.46,255.255.248.0'],
  ['11',  '76.191.98.45,255.255.255.0'],
  ['11',  '144.208.133.34,255.255.248.0'],
  ['11',  '144.208.132.23,255.255.248.0'],
  ['11',  '144.208.130.19,255.255.248.0'],
  ['11',  '76.191.105.32,255.255.255.0'],
  ['11',  '144.208.132.40,255.255.248.0'],
  ['11',  '216.162.211.40,255.255.255.0'],
  ['11',  '76.191.98.6,255.255.255.0'],
  ['11',  '63.223.80.40,255.255.255.0'],
  ['11',  '144.208.135.3,255.255.248.0'],
  ['11',  '144.208.131.46,255.255.248.0'],
  ['11',  '63.223.88.52,255.255.255.0'],
  ['11',  '216.162.218.21,255.255.255.0'],
  ['11',  '76.191.100.48,255.255.255.0'],
  ['11',  '144.208.130.27,255.255.248.0'],
  ['11',  '76.191.98.20,255.255.255.0'],
  ['11',  '76.191.103.33,255.255.255.0'],
  ['12',  '144.208.132.33,255.255.248.0'],
  ['12',  '216.162.218.34,255.255.255.0'],
  ['12',  '76.191.100.30,255.255.255.0'],
  ['12',  '144.208.132.6,255.255.248.0'],
  ['12',  '144.208.135.25,255.255.248.0'],
  ['12',  '76.191.105.50,255.255.255.0'],
  ['12',  '63.223.80.6,255.255.255.0'],
  ['12',  '144.208.135.7,255.255.248.0'],
  ['12',  '76.191.100.32,255.255.255.0'],
  ['12',  '144.208.129.2,255.255.248.0'],
  ['12',  '144.208.133.7,255.255.248.0'],
  ['12',  '63.223.88.29,255.255.255.0'],
  ['12',  '216.162.218.25,255.255.255.0'],
  ['12',  '144.208.130.6,255.255.248.0'],
  ['12',  '144.208.134.27,255.255.248.0'],
  ['12',  '76.191.105.7,255.255.255.0'],
  ['12',  '144.208.133.5,255.255.248.0'],
  ['12',  '216.162.218.5,255.255.255.0'],
  ['12',  '216.162.211.38,255.255.255.0'],
  ['12',  '216.162.218.50,255.255.255.0'],
  ['12',  '63.223.90.41,255.255.255.0'],
  ['13',  '216.162.211.6,255.255.255.0'],
  ['13',  '144.208.132.27,255.255.248.0'],
  ['13',  '144.208.132.47,255.255.248.0'],
  ['13',  '63.223.90.39,255.255.255.0'],
  ['13',  '63.223.80.8,255.255.255.0'],
  ['13',  '63.223.88.42,255.255.255.0'],
  ['13',  '144.208.128.49,255.255.248.0'],
  ['13',  '76.191.98.47,255.255.255.0'],
  ['13',  '216.162.218.9,255.255.255.0'],
  ['13',  '63.223.88.38,255.255.255.0'],
  ['13',  '144.208.130.4,255.255.248.0'],
  ['13',  '63.223.87.25,255.255.255.0'],
  ['13',  '76.191.103.11,255.255.255.0'],
  ['13',  '144.208.134.19,255.255.248.0'],
  ['13',  '76.191.98.52,255.255.255.0'],
  ['13',  '216.162.218.48,255.255.255.0'],
  ['13',  '144.208.131.32,255.255.248.0'],
  ['13',  '76.191.98.4,255.255.255.0'],
  ['13',  '144.208.133.9,255.255.248.0'],
  ['13',  '144.208.131.37,255.255.248.0'],
  ['13',  '144.208.131.25,255.255.248.0'],
  ['14',  '76.191.100.25,255.255.255.0'],
  ['14',  '63.223.80.29,255.255.255.0'],
  ['14',  '63.223.88.40,255.255.255.0'],
  ['14',  '76.191.100.7,255.255.255.0'],
  ['14',  '76.191.103.31,255.255.255.0'],
  ['14',  '144.208.128.51,255.255.248.0'],
  ['14',  '144.208.135.35,255.255.248.0'],
  ['14',  '63.223.87.21,255.255.255.0'],
  ['14',  '63.223.90.5,255.255.255.0'],
  ['14',  '144.208.130.38,255.255.248.0'],
  ['14',  '63.223.88.19,255.255.255.0'],
  ['14',  '63.223.88.23,255.255.255.0'],
  ['14',  '144.208.131.15,255.255.248.0'],
  ['14',  '144.208.129.41,255.255.248.0'],
  ['14',  '144.208.135.48,255.255.248.0'],
  ['14',  '144.208.131.3,255.255.248.0'],
  ['14',  '63.223.90.9,255.255.255.0'],
  ['14',  '76.191.105.37,255.255.255.0'],
  ['14',  '76.191.105.35,255.255.255.0'],
  ['14',  '76.191.103.45,255.255.255.0'],
  ['14',  '63.223.87.3,255.255.255.0'],
  ['15',  '216.162.211.52,255.255.255.0'],
  ['15',  '144.208.131.35,255.255.248.0'],
  ['15',  '76.191.100.35,255.255.255.0'],
  ['15',  '76.191.98.8,255.255.255.0'],
  ['15',  '144.208.129.17,255.255.248.0'],
  ['15',  '144.208.133.2,255.255.248.0'],
  ['15',  '76.191.98.49,255.255.255.0'],
  ['15',  '76.191.98.27,255.255.255.0'],
  ['15',  '216.162.218.46,255.255.255.0'],
  ['15',  '144.208.130.23,255.255.248.0'],
  ['15',  '144.208.129.3,255.255.248.0'],
  ['15',  '216.162.218.30,255.255.255.0'],
  ['15',  '144.208.135.34,255.255.248.0'],
  ['15',  '144.208.135.37,255.255.248.0'],
  ['15',  '144.208.132.19,255.255.248.0'],
  ['15',  '63.223.80.11,255.255.255.0'],
  ['15',  '144.208.135.41,255.255.248.0'],
  ['15',  '76.191.103.40,255.255.255.0'],
  ['15',  '76.191.105.5,255.255.255.0'],
  ['15',  '63.223.87.9,255.255.255.0'],
  ['15',  '63.223.87.39,255.255.255.0'],
  ['16',  '63.223.90.37,255.255.255.0'],
  ['16',  '144.208.131.48,255.255.248.0'],
  ['16',  '76.191.105.17,255.255.255.0'],
  ['16',  '144.208.134.51,255.255.248.0'],
  ['16',  '63.223.90.46,255.255.255.0'],
  ['16',  '216.162.218.41,255.255.255.0'],
  ['16',  '216.162.211.31,255.255.255.0'],
  ['16',  '144.208.129.7,255.255.248.0'],
  ['16',  '63.223.87.15,255.255.255.0'],
  ['16',  '144.208.133.39,255.255.248.0'],
  ['16',  '63.223.88.31,255.255.255.0'],
  ['16',  '144.208.130.33,255.255.248.0'],
  ['16',  '76.191.105.46,255.255.255.0'],
  ['16',  '216.162.218.39,255.255.255.0'],
  ['16',  '63.223.90.25,255.255.255.0'],
  ['16',  '76.191.98.38,255.255.255.0'],
  ['16',  '216.162.211.49,255.255.255.0'],
  ['16',  '144.208.135.5,255.255.248.0'],
  ['16',  '63.223.90.35,255.255.255.0'],
  ['16',  '144.208.131.30,255.255.248.0'],
  ['16',  '144.208.133.21,255.255.248.0'],
  ['EXTRA', '63.223.88.45,255.255.255.0'],
  ['EXTRA', '144.208.133.3,255.255.248.0'],
  ['EXTRA', '63.223.80.31,255.255.255.0'],
  ['EXTRA', '144.208.131.21,255.255.248.0'],
  ['EXTRA', '144.208.132.20,255.255.248.0'],
  ['EXTRA', '216.162.218.35,255.255.255.0'],
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
    var server = servers[ip[0]]
    var split = ip[1].split(",");
    var submask = MASKS[split[1]];
    var i = [split[0],submask].join("/");
    return "SELECT id FROM assign('"+server+"','"+i+"');";
  }).join(' ');
};

exports.up = function(db, callback) {
  db.runSql(assign(DATA),callback);
};

exports.down = function(db, callback) {
  callback();
};