'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
['1',    '8.4.62.42,255.255.255.0'],
['1',    '69.87.215.39,255.255.248.0'],
['1',    '8.4.61.11,255.255.255.0'],
['1',    '104.193.151.5,255.255.252.0'],
['1',    '162.219.127.46,255.255.252.0'],
['1',    '192.74.134.49,255.255.254.0'],
['1',    '104.193.149.21,255.255.252.0'],
['1',    '162.251.0.4,255.255.252.0'],
['1',    '181.41.3.11,255.255.252.0'],
['1',    '192.74.134.38,255.255.254.0'],
['1',    '216.162.205.40,255.255.255.0'],
['1',    '181.41.2.55,255.255.252.0'],
['1',    '162.252.182.23,255.255.254.0'],
['1',    '181.41.1.36,255.255.252.0'],
['1',    '162.251.1.46,255.255.252.0'],
['1',    '162.252.181.5,255.255.255.0'],
['1',    '162.252.181.39,255.255.255.0'],
['1',    '162.210.172.38,255.255.255.0'],
['1',    '192.74.135.37,255.255.254.0'],
['1',    '162.210.172.8,255.255.255.0'],
['1',    '104.193.150.47,255.255.252.0'],
['1',    '162.251.1.17,255.255.252.0'],
['1',    '149.114.3.6,255.255.252.0'],
['1',    '198.178.243.37,255.255.255.0'],
['1',    '216.162.205.51,255.255.255.0'],
['1',    '162.252.181.9,255.255.255.0'],
['1',    '162.251.0.51,255.255.252.0'],
['1',    '8.4.60.44,255.255.255.0'],
['1',    '149.114.2.3,255.255.252.0'],
['1',    '181.41.3.40,255.255.252.0'],
['1',    '162.219.126.19,255.255.252.0'],
['1',    '69.87.209.34,255.255.248.0'],
['1',    '162.219.125.21,255.255.252.0'],
['1',    '162.210.174.9,255.255.255.0'],
['1',    '104.193.149.3,255.255.252.0'],
['1',    '149.114.0.15,255.255.252.0'],
['1',    '162.252.182.8,255.255.254.0'],
['1',    '162.219.126.11,255.255.252.0'],
['1',    '162.210.172.40,255.255.255.0'],
['1',    '181.41.1.4,255.255.252.0'],
['1',    '162.219.126.31,255.255.252.0'],
['1',    '181.41.1.40,255.255.252.0'],
['1',    '104.193.149.37,255.255.252.0'],
['1',    '104.193.151.15,255.255.252.0'],
['1',    '104.193.149.7,255.255.252.0'],
['1',    '162.251.3.5,255.255.252.0'],
['1',    '199.245.212.4,255.255.255.0'],
['1',    '204.27.194.32,255.255.255.0'],
['1',    '149.114.2.37,255.255.252.0'],
['1',    '69.87.215.46,255.255.248.0'],
['1',    '199.245.212.33,255.255.255.0'],
['1',    '181.41.1.45,255.255.252.0'],
['2',    '192.74.134.51,255.255.254.0'],
['2',    '181.41.1.53,255.255.252.0'],
['2',    '162.219.124.33,255.255.252.0'],
['2',    '162.251.3.21,255.255.252.0'],
['2',    '104.193.148.33,255.255.252.0'],
['2',    '104.193.150.8,255.255.252.0'],
['2',    '162.251.0.45,255.255.252.0'],
['2',    '162.251.0.8,255.255.252.0'],
['2',    '104.193.148.38,255.255.252.0'],
['2',    '198.178.243.35,255.255.255.0'],
['2',    '8.4.62.25,255.255.255.0'],
['2',    '162.210.174.50,255.255.255.0'],
['2',    '181.41.1.26,255.255.252.0'],
['2',    '181.41.1.48,255.255.252.0'],
['2',    '216.162.205.45,255.255.255.0'],
['2',    '162.219.127.3,255.255.252.0'],
['2',    '199.245.212.48,255.255.255.0'],
['2',    '181.41.0.13,255.255.252.0'],
['2',    '162.210.172.51,255.255.255.0'],
['2',    '69.87.215.2,255.255.248.0'],
['2',    '181.41.2.47,255.255.252.0'],
['2',    '104.193.148.19,255.255.252.0'],
['2',    '162.251.3.50,255.255.252.0'],
['2',    '69.87.208.31,255.255.248.0'],
['2',    '8.4.60.22,255.255.255.0'],
['2',    '181.41.3.38,255.255.252.0'],
['2',    '149.114.2.27,255.255.252.0'],
['2',    '162.252.183.32,255.255.254.0'],
['2',    '149.114.3.40,255.255.252.0'],
['2',    '69.87.213.30,255.255.248.0'],
['2',    '162.219.127.17,255.255.252.0'],
['2',    '162.251.0.38,255.255.252.0'],
['2',    '162.251.2.40,255.255.252.0'],
['2',    '162.252.182.51,255.255.254.0'],
['2',    '149.114.1.28,255.255.252.0'],
['2',    '69.87.212.8,255.255.248.0'],
['2',    '8.4.60.5,255.255.255.0'],
['2',    '198.178.243.5,255.255.255.0'],
['2',    '162.252.181.48,255.255.255.0'],
['2',    '162.252.183.50,255.255.254.0'],
['2',    '104.193.151.35,255.255.252.0'],
['2',    '162.251.1.34,255.255.252.0'],
['2',    '181.41.0.32,255.255.252.0'],
['2',    '162.219.127.21,255.255.252.0'],
['2',    '149.114.1.31,255.255.252.0'],
['2',    '69.87.215.37,255.255.248.0'],
['2',    '162.252.183.5,255.255.254.0'],
['2',    '181.41.2.10,255.255.252.0'],
['2',    '216.162.208.46,255.255.255.0'],
['2',    '204.27.194.27,255.255.255.0'],
['2',    '104.193.148.6,255.255.252.0'],
['2',    '69.87.210.38,255.255.248.0'],
['3',    '181.41.3.45,255.255.252.0'],
['3',    '216.162.208.15,255.255.255.0'],
['3',    '104.193.150.42,255.255.252.0'],
['3',    '181.41.1.33,255.255.252.0'],
['3',    '69.87.210.29,255.255.248.0'],
['3',    '181.41.3.48,255.255.252.0'],
['3',    '162.252.182.33,255.255.254.0'],
['3',    '149.114.2.30,255.255.252.0'],
['3',    '149.114.2.35,255.255.252.0'],
['3',    '104.193.151.3,255.255.252.0'],
['3',    '104.193.149.41,255.255.252.0'],
['3',    '198.178.243.47,255.255.255.0'],
['3',    '162.252.183.37,255.255.254.0'],
['3',    '162.251.3.15,255.255.252.0'],
['3',    '104.193.150.19,255.255.252.0'],
['3',    '162.219.124.47,255.255.252.0'],
['3',    '149.114.0.18,255.255.252.0'],
['3',    '149.114.0.25,255.255.252.0'],
['3',    '162.219.126.45,255.255.252.0'],
['3',    '216.162.205.42,255.255.255.0'],
['3',    '162.219.126.4,255.255.252.0'],
['3',    '69.87.214.42,255.255.248.0'],
['3',    '162.219.125.17,255.255.252.0'],
['3',    '181.41.0.25,255.255.252.0'],
['3',    '8.4.61.16,255.255.255.0'],
['3',    '162.219.124.11,255.255.252.0'],
['3',    '162.219.125.25,255.255.252.0'],
['3',    '162.252.181.30,255.255.255.0'],
['3',    '149.114.0.27,255.255.252.0'],
['3',    '216.162.208.35,255.255.255.0'],
['3',    '69.87.213.3,255.255.248.0'],
['3',    '162.219.126.47,255.255.252.0'],
['3',    '8.4.63.16,255.255.255.0'],
['3',    '162.210.172.23,255.255.255.0'],
['3',    '162.210.172.11,255.255.255.0'],
['3',    '162.210.174.35,255.255.255.0'],
['3',    '162.252.181.15,255.255.255.0'],
['3',    '8.4.62.32,255.255.255.0'],
['3',    '162.210.172.31,255.255.255.0'],
['3',    '162.219.125.30,255.255.252.0'],
['3',    '162.219.126.20,255.255.252.0'],
['3',    '162.252.183.48,255.255.254.0'],
['3',    '69.87.214.23,255.255.248.0'],
['3',    '162.251.1.41,255.255.252.0'],
['3',    '198.178.243.10,255.255.255.0'],
['3',    '198.178.243.30,255.255.255.0'],
['3',    '198.178.243.25,255.255.255.0'],
['3',    '69.87.211.7,255.255.248.0'],
['3',    '104.193.150.20,255.255.252.0'],
['3',    '216.162.205.4,255.255.255.0'],
['3',    '69.87.215.35,255.255.248.0'],
['3',    '69.87.212.42,255.255.248.0'],
['4',    '149.114.2.32,255.255.252.0'],
['4',    '104.193.149.34,255.255.252.0'],
['4',    '8.4.63.23,255.255.255.0'],
['4',    '8.4.61.36,255.255.255.0'],
['4',    '162.252.181.7,255.255.255.0'],
['4',    '69.87.215.7,255.255.248.0'],
['4',    '162.210.172.49,255.255.255.0'],
['4',    '149.114.1.45,255.255.252.0'],
['4',    '69.87.215.32,255.255.248.0'],
['4',    '8.4.63.4,255.255.255.0'],
['4',    '69.87.211.17,255.255.248.0'],
['4',    '104.193.151.25,255.255.252.0'],
['4',    '69.87.208.38,255.255.248.0'],
['4',    '162.251.2.47,255.255.252.0'],
['4',    '181.41.3.51,255.255.252.0'],
['4',    '162.219.126.49,255.255.252.0'],
['4',    '69.87.208.11,255.255.248.0'],
['4',    '104.193.150.11,255.255.252.0'],
['4',    '216.162.208.25,255.255.255.0'],
['4',    '69.87.211.25,255.255.248.0'],
['4',    '162.219.124.52,255.255.252.0'],
['4',    '149.114.3.28,255.255.252.0'],
['4',    '149.114.3.21,255.255.252.0'],
['4',    '162.219.126.23,255.255.252.0'],
['4',    '63.251.88.119,255.255.255.224'],
['4',    '162.219.124.4,255.255.252.0'],
['4',    '8.4.61.6,255.255.255.0'],
['4',    '162.251.2.45,255.255.252.0'],
['4',    '63.251.88.121,255.255.255.224'],
['4',    '8.4.61.26,255.255.255.0'],
['4',    '162.251.3.37,255.255.252.0'],
['4',    '8.4.62.20,255.255.255.0'],
['4',    '162.251.2.38,255.255.252.0'],
['4',    '8.4.62.5,255.255.255.0'],
['4',    '69.87.214.47,255.255.248.0'],
['4',    '8.4.60.32,255.255.255.0'],
['4',    '69.87.214.40,255.255.248.0'],
['4',    '162.252.182.4,255.255.254.0'],
['4',    '69.87.209.46,255.255.248.0'],
['4',    '104.193.148.51,255.255.252.0'],
['4',    '162.219.125.50,255.255.252.0'],
['4',    '162.251.1.7,255.255.252.0'],
['4',    '181.41.0.15,255.255.252.0'],
['4',    '149.114.0.42,255.255.252.0'],
['4',    '216.162.205.49,255.255.255.0'],
['4',    '199.245.212.16,255.255.255.0'],
['4',    '8.4.61.43,255.255.255.0'],
['4',    '8.4.60.39,255.255.255.0'],
['4',    '69.87.209.39,255.255.248.0'],
['4',    '104.193.149.46,255.255.252.0'],
['4',    '162.252.183.21,255.255.254.0'],
['4',    '149.114.0.47,255.255.252.0'],
['5',    '8.4.61.14,255.255.255.0'],
['5',    '69.87.215.50,255.255.248.0'],
['5',    '162.251.2.8,255.255.252.0'],
['5',    '216.162.208.17,255.255.255.0'],
['5',    '162.252.183.9,255.255.254.0'],
['5',    '192.74.134.45,255.255.254.0'],
['5',    '162.251.2.23,255.255.252.0'],
['5',    '104.193.151.17,255.255.252.0'],
['5',    '69.87.208.51,255.255.248.0'],
['5',    '162.252.181.32,255.255.255.0'],
['5',    '149.114.0.37,255.255.252.0'],
['5',    '8.4.63.19,255.255.255.0'],
['5',    '149.114.2.10,255.255.252.0'],
['5',    '149.114.0.30,255.255.252.0'],
['5',    '192.74.134.47,255.255.254.0'],
['5',    '149.114.2.25,255.255.252.0'],
['5',    '104.193.148.52,255.255.252.0'],
['5',    '162.219.127.25,255.255.252.0'],
['5',    '162.219.124.45,255.255.252.0'],
['5',    '162.219.125.46,255.255.252.0'],
['5',    '162.219.127.48,255.255.252.0'],
['5',    '162.219.127.34,255.255.252.0'],
['5',    '69.87.211.9,255.255.248.0'],
['5',    '192.74.134.42,255.255.254.0'],
['5',    '162.251.3.32,255.255.252.0'],
['5',    '69.87.208.47,255.255.248.0'],
['5',    '198.178.243.39,255.255.255.0'],
['5',    '162.251.2.6,255.255.252.0'],
['5',    '181.41.3.16,255.255.252.0'],
['5',    '162.251.0.11,255.255.252.0'],
['5',    '181.41.3.33,255.255.252.0'],
['5',    '162.251.2.11,255.255.252.0'],
['5',    '162.251.2.27,255.255.252.0'],
['5',    '69.87.214.29,255.255.248.0'],
['5',    '162.219.125.9,255.255.252.0'],
['5',    '162.219.125.41,255.255.252.0'],
['5',    '162.252.182.45,255.255.254.0'],
['5',    '181.41.0.20,255.255.252.0'],
['5',    '162.251.3.34,255.255.252.0'],
['5',    '69.87.212.52,255.255.248.0'],
['5',    '162.219.127.37,255.255.252.0'],
['5',    '162.251.3.7,255.255.252.0'],
['5',    '63.251.88.122,255.255.255.224'],
['5',    '162.252.182.40,255.255.254.0'],
['5',    '69.87.209.50,255.255.248.0'],
['5',    '8.4.63.28,255.255.255.0'],
['5',    '199.245.212.21,255.255.255.0'],
['5',    '162.251.0.52,255.255.252.0'],
['5',    '149.114.3.9,255.255.252.0'],
['5',    '104.193.149.5,255.255.252.0'],
['5',    '199.245.212.43,255.255.255.0'],
['5',    '69.87.214.38,255.255.248.0'],
['6',    '149.114.0.8,255.255.252.0'],
['6',    '149.114.3.19,255.255.252.0'],
['6',    '181.41.2.32,255.255.252.0'],
['6',    '204.27.194.18,255.255.255.0'],
['6',    '181.41.2.3,255.255.252.0'],
['6',    '198.178.243.20,255.255.255.0'],
['6',    '162.252.183.25,255.255.254.0'],
['6',    '69.87.214.6,255.255.248.0'],
['6',    '204.27.194.37,255.255.255.0'],
['6',    '63.251.88.114,255.255.255.224'],
['6',    '162.219.124.31,255.255.252.0'],
['6',    '149.114.3.11,255.255.252.0'],
['6',    '8.4.62.44,255.255.255.0'],
['6',    '69.87.208.27,255.255.248.0'],
['6',    '162.251.2.52,255.255.252.0'],
['6',    '69.87.211.41,255.255.248.0'],
['6',    '69.87.212.38,255.255.248.0'],
['6',    '216.162.208.21,255.255.255.0'],
['6',    '104.193.151.30,255.255.252.0'],
['6',    '162.252.181.37,255.255.255.0'],
['6',    '104.193.150.23,255.255.252.0'],
['6',    '149.114.2.39,255.255.252.0'],
['6',    '216.162.205.47,255.255.255.0'],
['6',    '162.252.182.6,255.255.254.0'],
['6',    '104.193.149.50,255.255.252.0'],
['6',    '149.114.0.3,255.255.252.0'],
['6',    '69.87.214.11,255.255.248.0'],
['6',    '198.178.243.3,255.255.255.0'],
['6',    '216.162.208.50,255.255.255.0'],
['6',    '162.252.182.52,255.255.254.0'],
['6',    '69.87.208.33,255.255.248.0'],
['6',    '149.114.1.26,255.255.252.0'],
['6',    '181.41.2.37,255.255.252.0'],
['6',    '181.41.2.20,255.255.252.0'],
['6',    '8.4.61.19,255.255.255.0'],
['6',    '181.41.0.37,255.255.252.0'],
['6',    '216.162.208.5,255.255.255.0'],
['6',    '69.87.210.47,255.255.248.0'],
['6',    '162.251.3.25,255.255.252.0'],
['6',    '162.210.172.47,255.255.255.0'],
['6',    '216.162.208.48,255.255.255.0'],
['6',    '69.87.213.37,255.255.248.0'],
['6',    '162.219.127.50,255.255.252.0'],
['6',    '162.252.181.46,255.255.255.0'],
['6',    '162.219.125.32,255.255.252.0'],
['6',    '149.114.3.14,255.255.252.0'],
['6',    '104.193.149.39,255.255.252.0'],
['6',    '181.41.1.43,255.255.252.0'],
['6',    '149.114.3.33,255.255.252.0'],
['6',    '8.4.63.21,255.255.255.0'],
['6',    '204.27.194.44,255.255.255.0'],
['6',    '69.87.211.3,255.255.248.0'],
['7',    '149.114.2.20,255.255.252.0'],
['7',    '8.4.62.15,255.255.255.0'],
['7',    '181.41.3.9,255.255.252.0'],
['7',    '162.219.126.38,255.255.252.0'],
['7',    '216.162.208.2,255.255.255.0'],
['7',    '216.162.208.3,255.255.255.0'],
['7',    '149.114.1.4,255.255.252.0'],
['7',    '216.162.208.37,255.255.255.0'],
['7',    '63.251.88.116,255.255.255.224'],
['7',    '198.178.243.42,255.255.255.0'],
['7',    '69.87.214.8,255.255.248.0'],
['7',    '199.245.212.40,255.255.255.0'],
['7',    '149.114.1.23,255.255.252.0'],
['7',    '104.193.150.29,255.255.252.0'],
['7',    '8.4.63.6,255.255.255.0'],
['7',    '162.219.124.6,255.255.252.0'],
['7',    '181.41.3.28,255.255.252.0'],
['7',    '162.210.174.17,255.255.255.0'],
['7',    '162.210.172.52,255.255.255.0'],
['7',    '69.87.209.30,255.255.248.0'],
['7',    '162.251.1.48,255.255.252.0'],
['7',    '204.27.194.39,255.255.255.0'],
['7',    '216.162.205.38,255.255.255.0'],
['7',    '69.87.209.41,255.255.248.0'],
['7',    '216.162.205.31,255.255.255.0'],
['7',    '8.4.60.15,255.255.255.0'],
['7',    '162.252.183.3,255.255.254.0'],
['7',    '149.114.3.4,255.255.252.0'],
['7',    '104.193.148.20,255.255.252.0'],
['7',    '149.114.3.45,255.255.252.0'],
['7',    '162.251.3.2,255.255.252.0'],
['7',    '162.210.174.2,255.255.255.0'],
['7',    '104.193.150.45,255.255.252.0'],
['7',    '149.114.1.40,255.255.252.0'],
['7',    '162.219.124.42,255.255.252.0'],
['7',    '198.178.243.15,255.255.255.0'],
['7',    '8.4.63.45,255.255.255.0'],
['7',    '69.87.211.48,255.255.248.0'],
['7',    '69.87.212.11,255.255.248.0'],
['7',    '8.4.61.45,255.255.255.0'],
['7',    '162.251.1.21,255.255.252.0'],
['7',    '69.87.215.9,255.255.248.0'],
['7',    '69.87.212.45,255.255.248.0'],
['7',    '162.219.126.42,255.255.252.0'],
['7',    '8.4.60.42,255.255.255.0'],
['7',    '162.251.0.20,255.255.252.0'],
['7',    '149.114.1.16,255.255.252.0'],
['7',    '216.162.205.33,255.255.255.0'],
['7',    '104.193.151.48,255.255.252.0'],
['7',    '149.114.1.36,255.255.252.0'],
['7',    '149.114.0.5,255.255.252.0'],
['7',    '162.219.126.52,255.255.252.0'],
['8',    '104.193.149.25,255.255.252.0'],
['8',    '162.219.125.5,255.255.252.0'],
['8',    '8.4.63.11,255.255.255.0'],
['8',    '181.41.0.35,255.255.252.0'],
['8',    '69.87.210.19,255.255.248.0'],
['8',    '8.4.61.33,255.255.255.0'],
['8',    '69.87.212.20,255.255.248.0'],
['8',    '162.219.127.35,255.255.252.0'],
['8',    '204.27.194.47,255.255.255.0'],
['8',    '162.252.183.39,255.255.254.0'],
['8',    '199.245.212.23,255.255.255.0'],
['8',    '162.219.125.39,255.255.252.0'],
['8',    '69.87.210.52,255.255.248.0'],
['8',    '181.41.2.18,255.255.252.0'],
['8',    '149.114.2.8,255.255.252.0'],
['8',    '162.251.2.42,255.255.252.0'],
['8',    '181.41.1.9,255.255.252.0'],
['8',    '192.74.135.17,255.255.254.0'],
['8',    '69.87.209.48,255.255.248.0'],
['8',    '162.219.127.30,255.255.252.0'],
['8',    '149.114.1.19,255.255.252.0'],
['8',    '8.4.63.38,255.255.255.0'],
['8',    '192.74.135.15,255.255.254.0'],
['8',    '63.251.88.118,255.255.255.224'],
['8',    '162.251.1.32,255.255.252.0'],
['8',    '162.251.1.50,255.255.252.0'],
['8',    '8.4.62.47,255.255.255.0'],
['8',    '181.41.0.8,255.255.252.0'],
['8',    '69.87.215.21,255.255.248.0'],
['8',    '216.162.208.9,255.255.255.0'],
['8',    '162.251.2.31,255.255.252.0'],
['8',    '104.193.150.33,255.255.252.0'],
['8',    '192.74.134.23,255.255.254.0'],
['8',    '181.41.0.27,255.255.252.0'],
['8',    '104.193.148.40,255.255.252.0'],
['8',    '149.114.1.6,255.255.252.0'],
['8',    '69.87.210.51,255.255.248.0'],
['8',    '192.74.134.20,255.255.254.0'],
['8',    '204.27.194.22,255.255.255.0'],
['8',    '162.210.172.45,255.255.255.0'],
['8',    '204.27.194.8,255.255.255.0'],
['8',    '149.114.1.38,255.255.252.0'],
['8',    '69.87.209.35,255.255.248.0'],
['8',    '69.87.212.23,255.255.248.0'],
['8',    '69.87.215.41,255.255.248.0'],
['8',    '181.41.2.30,255.255.252.0'],
['8',    '104.193.150.6,255.255.252.0'],
['8',    '162.252.182.20,255.255.254.0'],
['8',    '216.162.205.23,255.255.255.0'],
['8',    '162.252.181.41,255.255.255.0'],
['8',    '162.210.172.27,255.255.255.0'],
['8',    '104.193.148.27,255.255.252.0'],
['9',    '69.87.210.20,255.255.248.0'],
['9',    '69.87.211.21,255.255.248.0'],
['9',    '69.87.215.5,255.255.248.0'],
['9',    '69.87.214.45,255.255.248.0'],
['9',    '69.87.213.7,255.255.248.0'],
['9',    '8.4.62.13,255.255.255.0'],
['9',    '69.87.211.5,255.255.248.0'],
['9',    '104.193.151.32,255.255.252.0'],
['9',    '69.87.208.29,255.255.248.0'],
['9',    '104.193.148.49,255.255.252.0'],
['9',    '69.87.211.50,255.255.248.0'],
['9',    '192.74.134.29,255.255.254.0'],
['9',    '69.87.214.27,255.255.248.0'],
['9',    '69.87.209.9,255.255.248.0'],
['9',    '181.41.3.26,255.255.252.0'],
['9',    '104.193.149.9,255.255.252.0'],
['9',    '181.41.0.50,255.255.252.0'],
['9',    '104.193.149.30,255.255.252.0'],
['9',    '162.251.3.35,255.255.252.0'],
['9',    '8.4.63.14,255.255.255.0'],
['9',    '149.114.0.32,255.255.252.0'],
['9',    '149.114.1.11,255.255.252.0'],
['9',    '104.193.148.4,255.255.252.0'],
['9',    '162.219.126.33,255.255.252.0'],
['9',    '181.41.2.13,255.255.252.0'],
['9',    '162.251.0.33,255.255.252.0'],
['9',    '162.219.125.3,255.255.252.0'],
['9',    '162.251.3.39,255.255.252.0'],
['9',    '181.41.3.21,255.255.252.0'],
['9',    '192.74.135.5,255.255.254.0'],
['9',    '162.251.3.3,255.255.252.0'],
['9',    '149.114.2.5,255.255.252.0'],
['9',    '69.87.208.20,255.255.248.0'],
['9',    '8.4.60.10,255.255.255.0'],
['9',    '162.251.0.40,255.255.252.0'],
['9',    '162.219.127.32,255.255.252.0'],
['9',    '162.210.174.30,255.255.255.0'],
['9',    '104.193.148.8,255.255.252.0'],
['9',    '192.74.134.27,255.255.254.0'],
['9',    '104.193.151.7,255.255.252.0'],
['9',    '162.251.1.25,255.255.252.0'],
['9',    '162.219.127.41,255.255.252.0'],
['9',    '192.74.134.52,255.255.254.0'],
['9',    '69.87.209.37,255.255.248.0'],
['9',    '69.87.208.45,255.255.248.0'],
['9',    '162.251.2.33,255.255.252.0'],
['9',    '204.27.194.42,255.255.255.0'],
['9',    '69.87.215.17,255.255.248.0'],
['9',    '204.27.194.20,255.255.255.0'],
['9',    '8.4.63.36,255.255.255.0'],
['9',    '181.41.3.53,255.255.252.0'],
['9',    '69.87.211.46,255.255.248.0'],
['10',    '181.41.3.4,255.255.252.0'],
['10',    '162.219.124.20,255.255.252.0'],
['10',    '69.87.212.51,255.255.248.0'],
['10',    '149.114.1.14,255.255.252.0'],
['10',    '204.27.194.5,255.255.255.0'],
['10',    '192.74.134.33,255.255.254.0'],
['10',    '8.4.62.37,255.255.255.0'],
['10',    '149.114.2.13,255.255.252.0'],
['10',    '162.251.3.9,255.255.252.0'],
['10',    '216.162.208.34,255.255.255.0'],
['10',    '162.210.174.48,255.255.255.0'],
['10',    '104.193.150.4,255.255.252.0'],
['10',    '162.251.3.17,255.255.252.0'],
['10',    '149.114.2.44,255.255.252.0'],
['10',    '8.4.61.28,255.255.255.0'],
['10',    '162.252.183.34,255.255.254.0'],
['10',    '69.87.213.32,255.255.248.0'],
['10',    '181.41.1.11,255.255.252.0'],
['10',    '192.74.135.30,255.255.254.0'],
['10',    '181.41.3.6,255.255.252.0'],
['10',    '69.87.210.6,255.255.248.0'],
['10',    '181.41.0.44,255.255.252.0'],
['10',    '192.74.135.46,255.255.254.0'],
['10',    '181.41.2.25,255.255.252.0'],
['10',    '162.219.127.39,255.255.252.0'],
['10',    '199.245.212.6,255.255.255.0'],
['10',    '69.87.208.52,255.255.248.0'],
['10',    '8.4.60.30,255.255.255.0'],
['10',    '162.210.174.7,255.255.255.0'],
['10',    '8.4.61.9,255.255.255.0'],
['10',    '199.245.212.19,255.255.255.0'],
['10',    '104.193.149.32,255.255.252.0'],
['10',    '162.252.182.11,255.255.254.0'],
['10',    '69.87.211.37,255.255.248.0'],
['10',    '162.252.183.2,255.255.254.0'],
['10',    '162.251.2.49,255.255.252.0'],
['10',    '8.4.60.13,255.255.255.0'],
['10',    '181.41.2.22,255.255.252.0'],
['10',    '204.27.194.35,255.255.255.0'],
['10',    '162.210.174.41,255.255.255.0'],
['10',    '8.4.62.18,255.255.255.0'],
['10',    '181.41.3.19,255.255.252.0'],
['10',    '69.87.209.25,255.255.248.0'],
['10',    '162.210.174.21,255.255.255.0'],
['10',    '192.74.135.9,255.255.254.0'],
['10',    '162.210.174.25,255.255.255.0'],
['10',    '149.114.1.48,255.255.252.0'],
['10',    '199.245.212.11,255.255.255.0'],
['10',    '162.252.182.19,255.255.254.0'],
['10',    '162.219.125.2,255.255.252.0'],
['10',    '216.162.205.20,255.255.255.0'],
['10',    '162.252.181.35,255.255.255.0'],
['11',    '181.41.1.19,255.255.252.0'],
['11',    '162.251.0.42,255.255.252.0'],
['11',    '8.4.61.48,255.255.255.0'],
['11',    '192.74.134.8,255.255.254.0'],
['11',    '162.219.125.48,255.255.252.0'],
['11',    '181.41.3.43,255.255.252.0'],
['11',    '181.41.0.3,255.255.252.0'],
['11',    '69.87.209.2,255.255.248.0'],
['11',    '69.87.209.5,255.255.248.0'],
['11',    '69.87.213.39,255.255.248.0'],
['11',    '181.41.2.5,255.255.252.0'],
['11',    '69.87.208.42,255.255.248.0'],
['11',    '104.193.151.9,255.255.252.0'],
['11',    '198.178.243.32,255.255.255.0'],
['11',    '162.251.1.30,255.255.252.0'],
['11',    '149.114.2.47,255.255.252.0'],
['11',    '162.219.125.15,255.255.252.0'],
['11',    '198.178.243.8,255.255.255.0'],
['11',    '104.193.151.2,255.255.252.0'],
['11',    '69.87.212.49,255.255.248.0'],
['11',    '162.251.3.46,255.255.252.0'],
['11',    '149.114.0.35,255.255.252.0'],
['11',    '162.210.174.34,255.255.255.0'],
['11',    '8.4.61.21,255.255.255.0'],
['11',    '8.4.62.39,255.255.255.0'],
['11',    '69.87.213.34,255.255.248.0'],
['11',    '69.87.208.49,255.255.248.0'],
['11',    '104.193.148.11,255.255.252.0'],
['11',    '149.114.1.33,255.255.252.0'],
['11',    '181.41.2.27,255.255.252.0'],
['11',    '162.252.181.50,255.255.255.0'],
['11',    '149.114.0.20,255.255.252.0'],
['11',    '192.74.135.25,255.255.254.0'],
['11',    '149.114.0.22,255.255.252.0'],
['11',    '162.251.0.29,255.255.252.0'],
['11',    '162.210.172.42,255.255.255.0'],
['11',    '104.193.149.35,255.255.252.0'],
['11',    '104.193.150.27,255.255.252.0'],
['11',    '149.114.3.31,255.255.252.0'],
['11',    '162.251.0.19,255.255.252.0'],
['11',    '192.74.134.40,255.255.254.0'],
['11',    '198.178.243.13,255.255.255.0'],
['11',    '149.114.1.9,255.255.252.0'],
['11',    '69.87.211.32,255.255.248.0'],
['11',    '8.4.60.35,255.255.255.0'],
['11',    '162.210.174.46,255.255.255.0'],
['11',    '69.87.211.15,255.255.248.0'],
['11',    '69.87.208.19,255.255.248.0'],
['11',    '192.74.135.39,255.255.254.0'],
['11',    '8.4.63.9,255.255.255.0'],
['11',    '162.251.0.23,255.255.252.0'],
['11',    '162.210.174.3,255.255.255.0'],
['12',    '181.41.1.23,255.255.252.0'],
['12',    '149.114.3.48,255.255.252.0'],
['12',    '216.162.205.52,255.255.255.0'],
['12',    '199.245.212.26,255.255.255.0'],
['12',    '198.178.243.22,255.255.255.0'],
['12',    '198.178.243.44,255.255.255.0'],
['12',    '63.251.88.120,255.255.255.224'],
['12',    '69.87.210.42,255.255.248.0'],
['12',    '8.4.60.20,255.255.255.0'],
['12',    '162.210.174.39,255.255.255.0'],
['12',    '192.74.135.32,255.255.254.0'],
['12',    '69.87.212.6,255.255.248.0'],
['12',    '69.87.213.35,255.255.248.0'],
['12',    '192.74.135.48,255.255.254.0'],
['12',    '69.87.209.7,255.255.248.0'],
['12',    '8.4.62.35,255.255.255.0'],
['12',    '69.87.215.3,255.255.248.0'],
['12',    '181.41.3.23,255.255.252.0'],
['12',    '204.27.194.10,255.255.255.0'],
['12',    '162.210.172.19,255.255.255.0'],
['12',    '149.114.2.22,255.255.252.0'],
['12',    '69.87.210.45,255.255.248.0'],
['12',    '69.87.211.35,255.255.248.0'],
['12',    '162.252.181.2,255.255.255.0'],
['12',    '104.193.151.39,255.255.252.0'],
['12',    '149.114.3.26,255.255.252.0'],
['12',    '8.4.61.4,255.255.255.0'],
['12',    '63.251.88.113,255.255.255.224'],
['12',    '104.193.148.42,255.255.252.0'],
['12',    '162.251.1.3,255.255.252.0'],
['12',    '69.87.214.31,255.255.248.0'],
['12',    '162.219.126.8,255.255.252.0'],
['12',    '162.252.182.29,255.255.254.0'],
['12',    '162.219.124.40,255.255.252.0'],
['12',    '69.87.209.3,255.255.248.0'],
['12',    '192.74.135.7,255.255.254.0'],
['12',    '162.210.172.20,255.255.255.0'],
['12',    '69.87.215.30,255.255.248.0'],
['12',    '104.193.150.38,255.255.252.0'],
['12',    '104.193.151.21,255.255.252.0'],
['12',    '69.87.210.23,255.255.248.0'],
['12',    '69.87.210.33,255.255.248.0'],
['12',    '181.41.1.6,255.255.252.0'],
['12',    '69.87.211.39,255.255.248.0'],
['12',    '104.193.150.49,255.255.252.0'],
['12',    '162.210.174.5,255.255.255.0'],
['12',    '181.41.2.15,255.255.252.0'],
['12',    '149.114.1.43,255.255.252.0'],
['12',    '162.219.124.19,255.255.252.0'],
['12',    '162.251.1.5,255.255.252.0'],
['12',    '149.114.3.38,255.255.252.0'],
['12',    '162.251.3.48,255.255.252.0'],
['13',    '199.245.212.45,255.255.255.0'],
['13',    '69.87.213.21,255.255.248.0'],
['13',    '162.252.183.46,255.255.254.0'],
['13',    '8.4.60.25,255.255.255.0'],
['13',    '162.219.127.2,255.255.252.0'],
['13',    '69.87.215.48,255.255.248.0'],
['13',    '181.41.0.47,255.255.252.0'],
['13',    '198.178.243.27,255.255.255.0'],
['13',    '69.87.213.25,255.255.248.0'],
['13',    '69.87.210.31,255.255.248.0'],
['13',    '8.4.62.30,255.255.255.0'],
['13',    '162.210.174.32,255.255.255.0'],
['13',    '8.4.63.33,255.255.255.0'],
['13',    '162.219.124.29,255.255.252.0'],
['13',    '69.87.213.46,255.255.248.0'],
['13',    '192.74.135.34,255.255.254.0'],
['13',    '63.251.88.117,255.255.255.224'],
['13',    '199.245.212.14,255.255.255.0'],
['13',    '162.219.125.34,255.255.252.0'],
['13',    '69.87.213.9,255.255.248.0'],
['13',    '216.162.208.32,255.255.255.0'],
['13',    '104.193.148.47,255.255.252.0'],
['13',    '8.4.62.8,255.255.255.0'],
['13',    '162.252.181.17,255.255.255.0'],
['13',    '69.87.215.15,255.255.248.0'],
['13',    '181.41.0.30,255.255.252.0'],
['13',    '162.252.181.25,255.255.255.0'],
['13',    '162.251.3.41,255.255.252.0'],
['13',    '181.41.2.42,255.255.252.0'],
['13',    '192.74.135.21,255.255.254.0'],
['13',    '162.251.1.15,255.255.252.0'],
['13',    '8.4.63.26,255.255.255.0'],
['13',    '181.41.0.5,255.255.252.0'],
['13',    '149.114.2.15,255.255.252.0'],
['13',    '8.4.62.10,255.255.255.0'],
['13',    '162.251.3.30,255.255.252.0'],
['13',    '69.87.213.15,255.255.248.0'],
['13',    '8.4.62.27,255.255.255.0'],
['13',    '216.162.208.7,255.255.255.0'],
['13',    '162.252.182.49,255.255.254.0'],
['13',    '162.251.0.47,255.255.252.0'],
['13',    '162.251.1.39,255.255.252.0'],
['13',    '104.193.151.34,255.255.252.0'],
['13',    '69.87.209.32,255.255.248.0'],
['13',    '69.87.214.4,255.255.248.0'],
['13',    '192.74.134.19,255.255.254.0'],
['13',    '199.245.212.36,255.255.255.0'],
['13',    '216.162.205.27,255.255.255.0'],
['13',    '162.252.182.31,255.255.254.0'],
['13',    '8.4.61.40,255.255.255.0'],
['13',    '8.4.60.3,255.255.255.0'],
['13',    '181.41.1.21,255.255.252.0'],
['14',    '162.251.2.51,255.255.252.0'],
['14',    '8.4.60.47,255.255.255.0'],
['14',    '162.219.127.5,255.255.252.0'],
['14',    '162.252.181.21,255.255.255.0'],
['14',    '69.87.212.19,255.255.248.0'],
['14',    '162.219.125.7,255.255.252.0'],
['14',    '162.251.1.37,255.255.252.0'],
['14',    '69.87.214.20,255.255.248.0'],
['14',    '104.193.151.37,255.255.252.0'],
['14',    '69.87.214.51,255.255.248.0'],
['14',    '69.87.208.6,255.255.248.0'],
['14',    '149.114.2.42,255.255.252.0'],
['14',    '162.251.1.35,255.255.252.0'],
['14',    '8.4.62.3,255.255.255.0'],
['14',    '216.162.208.30,255.255.255.0'],
['14',    '162.210.172.4,255.255.255.0'],
['14',    '192.74.135.50,255.255.254.0'],
['14',    '149.114.0.44,255.255.252.0'],
['14',    '63.251.88.125,255.255.255.224'],
['14',    '181.41.2.39,255.255.252.0'],
['14',    '216.162.205.11,255.255.255.0'],
['14',    '69.87.215.25,255.255.248.0'],
['14',    '162.210.172.29,255.255.255.0'],
['14',    '69.87.214.52,255.255.248.0'],
['14',    '162.252.181.3,255.255.255.0'],
['14',    '216.162.205.8,255.255.255.0'],
['14',    '216.162.205.6,255.255.255.0'],
['14',    '216.162.205.29,255.255.255.0'],
['14',    '162.251.0.6,255.255.252.0'],
['14',    '104.193.149.48,255.255.252.0'],
['14',    '192.74.135.41,255.255.254.0'],
['14',    '162.251.2.29,255.255.252.0'],
['14',    '8.4.63.31,255.255.255.0'],
['14',    '181.41.0.10,255.255.252.0'],
['14',    '104.193.150.52,255.255.252.0'],
['14',    '204.27.194.13,255.255.255.0'],
['14',    '69.87.215.34,255.255.248.0'],
['14',    '149.114.0.39,255.255.252.0'],
['14',    '69.87.213.5,255.255.248.0'],
['14',    '149.114.3.43,255.255.252.0'],
['14',    '162.252.183.17,255.255.254.0'],
['14',    '63.251.88.124,255.255.255.224'],
['14',    '8.4.63.48,255.255.255.0'],
['14',    '104.193.151.41,255.255.252.0'],
['14',    '104.193.149.15,255.255.252.0'],
['14',    '69.87.211.2,255.255.248.0'],
['14',    '162.219.127.15,255.255.252.0'],
['14',    '199.245.212.31,255.255.255.0'],
['14',    '216.162.208.41,255.255.255.0'],
['14',    '69.87.212.40,255.255.248.0'],
['14',    '69.87.210.8,255.255.248.0'],
['14',    '69.87.212.33,255.255.248.0'],
['15',    '199.245.212.9,255.255.255.0'],
['15',    '162.219.126.29,255.255.252.0'],
['15',    '69.87.208.8,255.255.248.0'],
['15',    '69.87.209.15,255.255.248.0'],
['15',    '69.87.212.27,255.255.248.0'],
['15',    '162.219.126.6,255.255.252.0'],
['15',    '8.4.63.40,255.255.255.0'],
['15',    '162.251.2.4,255.255.252.0'],
['15',    '104.193.149.2,255.255.252.0'],
['15',    '8.4.61.31,255.255.255.0'],
['15',    '162.219.124.49,255.255.252.0'],
['15',    '104.193.149.17,255.255.252.0'],
['15',    '181.41.3.31,255.255.252.0'],
['15',    '63.251.88.115,255.255.255.224'],
['15',    '149.114.0.10,255.255.252.0'],
['15',    '162.252.183.7,255.255.254.0'],
['15',    '69.87.210.11,255.255.248.0'],
['15',    '8.4.61.23,255.255.255.0'],
['15',    '162.219.124.8,255.255.252.0'],
['15',    '8.4.62.22,255.255.255.0'],
['15',    '69.87.211.34,255.255.248.0'],
['15',    '69.87.214.33,255.255.248.0'],
['15',    '162.219.124.51,255.255.252.0'],
['15',    '162.210.172.6,255.255.255.0'],
['15',    '162.210.174.37,255.255.255.0'],
['15',    '149.114.3.23,255.255.252.0'],
['15',    '162.251.1.9,255.255.252.0'],
['15',    '162.252.183.41,255.255.254.0'],
['15',    '216.162.208.39,255.255.255.0'],
['15',    '181.41.1.51,255.255.252.0'],
['15',    '162.251.1.2,255.255.252.0'],
['15',    '8.4.61.38,255.255.255.0'],
['15',    '192.74.134.31,255.255.254.0'],
['15',    '104.193.150.51,255.255.252.0'],
['15',    '162.219.124.27,255.255.252.0'],
['15',    '192.74.134.6,255.255.254.0'],
['15',    '104.193.150.31,255.255.252.0'],
['15',    '104.193.151.46,255.255.252.0'],
['15',    '162.252.181.34,255.255.255.0'],
['15',    '69.87.210.27,255.255.248.0'],
['15',    '162.251.0.31,255.255.252.0'],
['15',    '162.252.183.35,255.255.254.0'],
['15',    '69.87.209.17,255.255.248.0'],
['15',    '104.193.148.23,255.255.252.0'],
['15',    '69.87.208.4,255.255.248.0'],
['15',    '8.4.60.18,255.255.255.0'],
['15',    '162.219.127.9,255.255.252.0'],
['15',    '162.252.182.27,255.255.254.0'],
['15',    '69.87.212.31,255.255.248.0'],
['15',    '192.74.135.2,255.255.254.0'],
['15',    '192.74.134.11,255.255.254.0'],
['15',    '204.27.194.15,255.255.255.0'],
['16',    '69.87.213.48,255.255.248.0'],
['16',    '149.114.2.18,255.255.252.0'],
['16',    '181.41.0.39,255.255.252.0'],
['16',    '69.87.212.47,255.255.248.0'],
['16',    '69.87.213.41,255.255.248.0'],
['16',    '162.219.125.35,255.255.252.0'],
['16',    '181.41.2.8,255.255.252.0'],
['16',    '192.74.135.3,255.255.254.0'],
['16',    '162.210.172.33,255.255.255.0'],
['16',    '149.114.3.16,255.255.252.0'],
['16',    '8.4.60.27,255.255.255.0'],
['16',    '181.41.0.42,255.255.252.0'],
['16',    '216.162.205.19,255.255.255.0'],
['16',    '181.41.0.55,255.255.252.0'],
['16',    '104.193.148.45,255.255.252.0'],
['16',    '162.251.2.20,255.255.252.0'],
['16',    '162.219.124.23,255.255.252.0'],
['16',    '162.219.124.38,255.255.252.0'],
['16',    '69.87.210.49,255.255.248.0'],
['16',    '162.251.2.19,255.255.252.0'],
['16',    '104.193.151.50,255.255.252.0'],
['16',    '69.87.210.40,255.255.248.0'],
['16',    '63.251.88.126,255.255.255.224'],
['16',    '63.251.88.123,255.255.255.224'],
['16',    '162.251.0.49,255.255.252.0'],
['16',    '149.114.0.13,255.255.252.0'],
['16',    '162.219.126.51,255.255.252.0'],
['16',    '162.210.174.15,255.255.255.0'],
['16',    '198.178.243.18,255.255.255.0'],
['16',    '162.252.182.38,255.255.254.0'],
['16',    '204.27.194.30,255.255.255.0'],
['16',    '69.87.214.19,255.255.248.0'],
['16',    '204.27.194.3,255.255.255.0'],
['16',    '181.41.1.31,255.255.252.0'],
['16',    '162.219.126.27,255.255.252.0'],
['16',    '149.114.3.36,255.255.252.0'],
['16',    '162.252.183.15,255.255.254.0'],
['16',    '204.27.194.25,255.255.255.0'],
['16',    '162.219.125.37,255.255.252.0'],
['16',    '8.4.60.37,255.255.255.0'],
['16',    '192.74.134.4,255.255.254.0'],
['16',    '199.245.212.38,255.255.255.0'],
['16',    '181.41.1.28,255.255.252.0'],
['16',    '192.74.135.35,255.255.254.0'],
['16',    '104.193.148.29,255.255.252.0'],
['16',    '69.87.213.50,255.255.248.0'],
['16',    '69.87.212.29,255.255.248.0'],
['16',    '8.4.63.43,255.255.255.0'],
['16',    '181.41.2.50,255.255.252.0'],
['16',    '181.41.1.14,255.255.252.0'],
['16',    '162.251.0.27,255.255.252.0'],
['16',    '69.87.212.4,255.255.248.0'],
['EXTRA', '149.114.1.21,255.255.252.0'],
['EXTRA', '104.193.150.40,255.255.252.0'],
['EXTRA', '199.245.212.28,255.255.255.0'],
['EXTRA', '162.252.183.30,255.255.254.0'],
['EXTRA', '104.193.148.31,255.255.252.0'],
['EXTRA', '8.4.60.8,255.255.255.0'],
['EXTRA', '69.87.213.17,255.255.248.0'],
['EXTRA', '162.219.127.7,255.255.252.0'],
['EXTRA', '162.252.182.42,255.255.254.0'],
['EXTRA', '162.252.182.47,255.255.254.0'],
]

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
    return `SELECT id FROM assign((select id from servers where code = '${serverCode}'),'${inet}');`;
  }).join(' ');
};

exports.up = function(db, callback) {
  db.runSql(assign(DATA),callback);
};

exports.down = function(db, callback) {
  callback();
};
