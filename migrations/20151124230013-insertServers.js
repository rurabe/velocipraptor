var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['PhoenixNap','Phx','184.164.155.154','154p','axs'],
  ['PhoenixNap','Phx','198.15.68.10','10','axs'],
  ['PhoenixNap','Ash','198.24.166.18','18','axs'],
  ['PhoenixNap','Phx','184.95.32.26','p26','axs'],
  ['PhoenixNap','Phx','198.24.163.34','34','axs'],
  ['PhoenixNap','Phx','184.171.174.42','42p','axs'],
  ['PhoenixNap','Phx','184.164.156.106','106p','axs'],
  ['PhoenixNap','Phx','184.164.156.114','114p','axs'],
  ['PhoenixNap','Ash','198.24.160.122','p122','axs'],
  ['PhoenixNap','Phx','198.15.124.146','p146','axs'],
  ['PhoenixNap','Ash','198.24.160.170','p170','axs'],
  ['PhoenixNap','Ash','198.24.162.186','186','axs'],
  ['PhoenixNap','Phx','198.15.67.194','194p','axs'],
  ['PhoenixNap','Ash','198.24.165.194','194','axs'],
  ['PhoenixNap','Ash','192.198.204.250','250p','axs'],
  ['PhoenixNap','Ash','198.24.165.250','250','axs'],
  ['VPS','Ash','209.208.10.2','2','axs'],
  ['VPS','Ash','98.126.150.130','130','axs'],
  ['VPS','Ash','207.58.142.202','202','axs'],
  ['VPS','Ash','107.152.97.102','102','axs'],
  ['VPS','Ash','66.71.240.62','62','axs'],
  ['VPS','Phx','192.111.140.166','166','axs'],
  ['VPS','Phx','192.111.140.170','170','axs'],
  ['VPS','Ash','184.170.253.238','238','axs'],
  ['VPS','Phx','50.28.98.237','237','axs'],
  ['VPS','Ash','64.251.7.177','177',null],
  ['VPS','Ash','209.190.71.58','58',null],
  ['VPS','Ash','208.167.236.51','51',null],
  ['VPS','Ash','108.61.144.147','147',null],
  ['VPS','Ash','74.84.136.73','73',null],
  ['VPS','Phx','66.37.25.146','146',null],
  ['VPS','Ash','199.233.231.162','162v',null],
  ['VPS','Phx','209.105.232.4','4',null],
  ['VPS','Ash','66.219.99.87','87',null],
  ['VPS','Phx','104.143.12.162','162',null],
  ['VPS','Ash','207.244.77.145','145',null],
  ['VPS','Phx','184.170.247.94','94',null],
  ['VPS','Phx','184.170.247.98','98p',null],
  ['VPS','Phx','107.152.99.90','90',null],
  ['VPS','Phx','199.58.187.66','66',null],
  ['VPS Colo@','Phx','208.84.155.110','110',null],
  ['VPS Colo@','Phx','107.152.102.114','114',null],
  ['VPS Colo@','Ash','107.152.101.118','118',null],
  ['VPS Colo@','Ash','107.152.104.34','34v',null],
  ['VPS Colo@','Ash','107.152.111.98','98',null],
  ['VPS Colo@','Ash','98.142.212.58','58a',null],
  ['VPS Colo@','Phx','107.152.99.70','70',null],
  ['VPS Colo@','Phx','107.181.184.14','14',null],
  ['VPS Colo@','Phx','107.181.185.2','2p',null],
  ['VPS Colo@','Phx','107.152.99.78','78',null],
  ['VPS Colo@','Phx','107.152.99.74','74',null],
  ['VPS Colo@','Phx','107.181.185.6','6',null],
  ['Colo@','Phx','199.187.209.130','130c','axs/tcen'],
  ['Colo@','Phx','199.187.209.131','131c','axs/tcen'],
  ['Colo@','Phx','199.187.209.132','132c','axs/tcen'],
  ['Colo@','Phx','199.187.209.133','133c','axs/tcen'],
  ['Colo@','Phx','199.187.209.134','134c','axs/tcen'],
  ['Colo@','Phx','199.187.209.135','135c','axs/tcen'],
  ['Colo@','Phx','199.187.209.136','136c','axs/tcen'],
  ['Colo@','Phx','199.187.209.137','137c','axs/tcen'],
  ['Colo@','Phx','199.187.209.138','138c','axs/tcen'],
  ['Colo@','Phx','199.187.209.139','139c','axs/tcen'],
  ['Colo@','Phx','199.187.209.140','140c','axs/tcen'],
  ['Colo@','Phx','199.187.209.141','141c','axs/tcen'],
  ['Colo@','Phx','199.187.209.142','142c','axs/tcen'],
  ['Colo@','Phx','199.187.209.143','143c','axs/tcen'],
  ['Colo@','Phx','199.187.209.144','144c','axs/tcen'],
  ['Colo@','Phx','199.187.209.145','145c','axs/tcen'],
  ['Colo@','Phx','199.187.209.149','colo@proxy','proxy'],
  ['Level 3','Ash','4.35.225.5','5e',null],
  ['Level 3','Ash','4.35.225.6','6e',null],
  ['Level 3','Ash','4.35.225.7','7e',null],
  ['Level 3','Ash','4.35.225.8','8e',null],
  ['Level 3','Ash','4.35.225.9','9e',null],
  ['Level 3','Ash','4.35.225.10','10e',null],
  ['Level 3','Ash','4.35.225.11','11e',null],
  ['Level 3','Ash','4.35.225.12','12e',null],
  ['Level 3','Ash','4.35.225.13','13e',null],
  ['Level 3','Ash','4.35.225.14','14e',null],
  ['Level 3','Ash','4.35.225.15','15e',null],
  ['Level 3','Ash','4.35.225.16','16e',null],
  ['Level 3','Ash','4.35.225.17','17e',null],
  ['Level 3','Ash','4.35.225.18','18e',null],
  ['Level 3','Ash','4.35.225.19','19e',null],
  ['Level 3','Ash','4.35.225.20','20e',null],
  ['Level 3','Ash','4.35.225.21','21e',null],
  ['Level 3','Ash','4.35.225.22','22e',null],
  ['Level 3','Ash','4.35.225.23','23e',null],
  ['Level 3','Ash','4.35.225.24','24e',null],
  ['Level 3','Ash','4.35.225.25','25e',null],
  ['Level 3','Ash','4.35.225.26','26e',null],
  ['Level 3','Ash','4.35.225.27','27e',null],
  ['Level 3','Ash','4.35.225.28','28e',null],
  ['Level 3','Ash','4.35.225.29','29e',null],
  ['Level 3','Ash','4.35.225.30','30e',null],
  ['Level 3','Ash','4.35.225.31','31e',null],
  ['Level 3','Ash','4.35.225.32','32e',null],
  ['Level 3','Ash','4.35.225.33','33e',null],
  ['Level 3','Ash','4.35.225.34','34e',null],
  ['Level 3','Ash','4.35.225.35','35e',null],
  ['Level 3','Ash','4.35.225.36','36e',null],
  ['Level 3','Ash','4.35.225.37','level3proxy','proxy'],
  ['Internap','Ash','63.251.88.100','100i',null],
  ['Internap','Ash','63.251.88.101','101i',null],
  ['Internap','Ash','63.251.88.102','102i',null],
  ['Internap','Ash','63.251.88.103','103i',null],
  ['Internap','Ash','63.251.88.104','104i',null],
  ['Internap','Ash','63.251.88.105','105i',null],
  ['Internap','Ash','63.251.88.106','106i',null],
  ['Internap','Ash','63.251.88.107','107i',null],
  ['Internap','Ash','63.251.88.108','108i',null],
  ['Internap','Ash','63.251.88.109','109i',null],
  ['Internap','Ash','63.251.88.110','110i',null],
  ['Internap','Ash','63.251.88.111','111i',null],
  ['Internap','Ash','63.251.88.113','113i',null],
  ['Internap','Ash','63.251.88.114','114i',null],
  ['Internap','Ash','63.251.88.115','115i',null],
  ['Internap','Ash','63.251.88.116','116i',null],
  ['Internap','Ash','63.251.88.117','internapproxy','proxy']
];

var e = function(v){
  if(v){
    return "'"+v+"'";
  } else {
    return 'NULL';
  }
}

var insertServers = function(servers){
  var values = servers.map(function(server){
    return "("+e(server[0])+","+e(server[1])+","+e(server[2])+","+e(server[3])+","+e(server[4])+",now(),now())";
  }).join(",");
  return "insert into servers(datacenter,location,ip,code,role,created_at,updated_at) values "+values;
}

var insert = "insert into servers(datacenter,location,ip,code,role,created_at,updated_at) values \n('PhoenixNap','Phx','184.164.155.154','154p','axs'),\n('PhoenixNap','Phx','198.15.68.10','10','axs'),\n('PhoenixNap','Ash','198.24.166.18','18','axs'),\n('PhoenixNap','Phx','184.95.32.26','p26','axs'),\n('PhoenixNap','Phx','198.24.163.34','34','axs'),\n('PhoenixNap','Phx','184.171.174.42','42p','axs'),\n('PhoenixNap','Phx','184.164.156.106','106p','axs'),\n('PhoenixNap','Phx','184.164.156.114','114p','axs'),\n('PhoenixNap','Ash','198.24.160.122','p122','axs'),\n('PhoenixNap','Phx','198.15.124.146','p146','axs'),\n('PhoenixNap','Ash','198.24.160.170','p170','axs'),\n('PhoenixNap','Ash','198.24.162.186','186','axs'),\n('PhoenixNap','Phx','198.15.67.194','194p','axs',now(),now()),\n('PhoenixNap','Ash','198.24.165.194','194','axs',now(),now()),\n('PhoenixNap','Ash','192.198.204.250','250p','axs',now(),now()),\n('PhoenixNap','Ash','198.24.165.250','250','axs',now(),now()),\n('VPS','Ash','209.208.10.2','2','axs',now(),now()),\n('VPS','Ash','98.126.150.130','130','axs',now(),now()),\n('VPS','Ash','207.58.142.202','202','axs',now(),now()),\n('VPS','Ash','107.152.97.102','102','axs',now(),now()),\n('VPS','Ash','66.71.240.62','62','axs',now(),now()),\n('VPS','Phx','192.111.140.166','166','axs',now(),now()),\n('VPS','Phx','192.111.140.170','170','axs',now(),now()),\n('VPS','Ash','184.170.253.238','238','axs',now(),now()),\n('VPS','Phx','50.28.98.237','237','axs',now(),now()),\n('VPS','Ash','64.251.7.177','177',NULL,now(),now()),\n('VPS','Ash','209.190.71.58','58',NULL,now(),now()),\n('VPS','Ash','208.167.236.51','51',NULL,now(),now()),\n('VPS','Ash','108.61.144.147','147',NULL,now(),now()),\n('VPS','Ash','74.84.136.73','73',NULL,now(),now()),\n('VPS','Phx','66.37.25.146','146',NULL,now(),now()),\n('VPS','Ash','199.233.231.162','162v',NULL,now(),now()),\n('VPS','Phx','209.105.232.4','4',NULL,now(),now()),\n('VPS','Ash','66.219.99.87','87',NULL,now(),now()),\n('VPS','Phx','104.143.12.162','162',NULL,now(),now()),\n('VPS','Ash','207.244.77.145','145',NULL,now(),now()),\n('VPS','Phx','184.170.247.94','94',NULL,now(),now()),\n('VPS','Phx','184.170.247.98','98p',NULL,now(),now()),\n('VPS','Phx','107.152.99.90','90',NULL,now(),now()),\n('VPS','Phx','199.58.187.66','66',NULL,now(),now()),\n('VPS Colo@','Phx','208.84.155.110','110',NULL,now(),now()),\n('VPS Colo@','Phx','107.152.102.114','114',NULL,now(),now()),\n('VPS Colo@','Ash','107.152.101.118','118',NULL,now(),now()),\n('VPS Colo@','Ash','107.152.104.34','34v',NULL,now(),now()),\n('VPS Colo@','Ash','107.152.111.98','98',NULL,now(),now()),\n('VPS Colo@','Ash','98.142.212.58','58a',NULL,now(),now()),\n('VPS Colo@','Phx','107.152.99.70','70',NULL,now(),now()),\n('VPS Colo@','Phx','107.181.184.14','14',NULL,now(),now()),\n('VPS Colo@','Phx','107.181.185.2','2p',NULL,now(),now()),\n('VPS Colo@','Phx','107.152.99.78','78',NULL,now(),now()),\n('VPS Colo@','Phx','107.152.99.74','74',NULL,now(),now()),\n('VPS Colo@','Phx','107.181.185.6','6',NULL,now(),now()),\n('Colo@','Phx','199.187.209.130','130c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.131','131c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.132','132c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.133','133c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.134','134c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.135','135c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.136','136c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.137','137c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.138','138c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.139','139c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.140','140c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.141','141c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.142','142c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.143','143c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.144','144c','axs/tcen',now(),now()),\n('Colo@','Phx','199.187.209.145','145c','axs/tcen',now(),now()),\n('Level 3','Ash','4.35.225.5','5e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.6','6e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.7','7e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.8','8e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.9','9e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.10','10e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.11','11e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.12','12e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.13','13e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.14','14e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.15','15e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.16','16e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.17','17e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.18','18e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.19','19e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.20','20e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.21','21e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.22','22e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.23','23e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.24','24e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.25','25e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.26','26e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.27','27e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.28','28e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.29','29e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.30','30e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.31','31e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.32','32e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.33','33e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.34','34e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.35','35e',NULL,now(),now()),\n('Level 3','Ash','4.35.225.36','36e',NULL,now(),now()),\n('Internap','Ash','63.251.88.100','100i',NULL,now(),now()),\n('Internap','Ash','63.251.88.101','101i',NULL,now(),now()),\n('Internap','Ash','63.251.88.102','102i',NULL,now(),now()),\n('Internap','Ash','63.251.88.103','103i',NULL,now(),now()),\n('Internap','Ash','63.251.88.104','104i',NULL,now(),now()),\n('Internap','Ash','63.251.88.105','105i',NULL,now(),now()),\n('Internap','Ash','63.251.88.106','106i',NULL,now(),now()),\n('Internap','Ash','63.251.88.107','107i',NULL,now(),now()),\n('Internap','Ash','63.251.88.108','108i',NULL,now(),now()),\n('Internap','Ash','63.251.88.109','109i',NULL,now(),now()),\n('Internap','Ash','63.251.88.110','110i',NULL,now(),now()),\n('Internap','Ash','63.251.88.111','111i',NULL,now(),now()),\n('Internap','Ash','63.251.88.113','113i',NULL,now(),now()),\n('Internap','Ash','63.251.88.114','114i',NULL,now(),now()),\n('Internap','Ash','63.251.88.115','115i',NULL,now(),now()),\n('Internap','Ash','63.251.88.116','116i',NULL,now(),now())\n;"

exports.up = function(db, callback) {
  db.runSql(insertServers(DATA),callback);
};

exports.down = function(db, callback) {
  db.runSql("delete from servers;",callback);
};
