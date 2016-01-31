var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['PhoenixNapPhx','Phoenix','184.164.155.154','154p',null,null],
  ['PhoenixNapPhx','Phoenix','198.15.68.10','10',null,null],
  ['PhoenixNapAsh','Ashburn','198.24.166.18','18',null,null],
  ['PhoenixNapPhx','Phoenix','184.95.32.26','p26',null,null],
  ['PhoenixNapPhx','Phoenix','198.24.163.34','34',null,null],
  ['PhoenixNapPhx','Phoenix','184.171.174.42','42p',null,null],
  ['PhoenixNapPhx','Phoenix','184.164.156.106','106p',null,null],
  ['PhoenixNapPhx','Phoenix','184.164.156.114','114p',null,null],
  ['PhoenixNapAsh','Ashburn','198.24.160.122','p122',null,null],
  ['PhoenixNapPhx','Phoenix','198.15.124.146','p146',null,null],
  ['PhoenixNapAsh','Ashburn','198.24.160.170','p170',null,null],
  ['PhoenixNapAsh','Ashburn','198.24.162.186','186',null,null],
  ['PhoenixNapPhx','Phoenix','198.15.67.194','194p',null,null],
  ['PhoenixNapAsh','Ashburn','198.24.165.194','194',null,null],
  ['PhoenixNapAsh','Ashburn','192.198.204.250','250p',null,null],
  ['PhoenixNapAsh','Ashburn','198.24.165.250','250',null,null],
  ['VPS','Ashburn','209.208.10.2','2',null,null],
  ['VPS','Ashburn','98.126.150.130','130',null,null],
  ['VPS','Ashburn','207.58.142.202','202',null,null],
  ['VPS','Ashburn','107.152.97.102','102',null,null],
  ['VPS','Ashburn','66.71.240.62','62',null,null],
  ['VPS','Phoenix','192.111.140.166','166',null,null],
  ['VPS','Phoenix','192.111.140.170','170',null,null],
  ['VPS','Ashburn','184.170.253.238','238',null,null],
  ['VPS','Phoenix','50.28.98.237','237',null,null],
  ['VPS','Ashburn','64.251.7.177','177',null,null],
  ['VPS','Ashburn','209.190.71.58','58',null,null],
  ['VPS','Ashburn','208.167.236.51','51',null,null],
  ['VPS','Ashburn','108.61.144.147','147',null,null],
  ['VPS','Ashburn','74.84.136.73','73',null,null],
  ['VPS','Phoenix','66.37.25.146','146',null,null],
  ['VPS','Ashburn','199.233.231.162','162v',null,null],
  ['VPS','Phoenix','209.105.232.4','4',null,null],
  ['VPS','Ashburn','66.219.99.87','87',null,null],
  ['VPS','Phoenix','104.143.12.162','162',null,null],
  ['VPS','Ashburn','207.244.77.145','145',null,null],
  ['VPS','Phoenix','184.170.247.94','94',null,null],
  ['VPS','Phoenix','184.170.247.98','98p',null,null],
  ['VPS','Phoenix','107.152.99.90','90',null,null],
  ['VPS','Phoenix','199.58.187.66','66',null,null],
  ['VPS Colo@','Phoenix','208.84.155.110','110',null,null],
  ['VPS Colo@','Phoenix','107.152.102.114','114',null,null],
  ['VPS Colo@','Ashburn','107.152.101.118','118',null,null],
  ['VPS Colo@','Ashburn','107.152.104.34','34v',null,null],
  ['VPS Colo@','Ashburn','107.152.111.98','98',null,null],
  ['VPS Colo@','Ashburn','98.142.212.58','58a',null,null],
  ['VPS Colo@','Phoenix','107.152.99.70','70',null,null],
  ['VPS Colo@','Phoenix','107.181.184.14','14',null,null],
  ['VPS Colo@','Phoenix','107.181.185.2','2p',null,null],
  ['VPS Colo@','Phoenix','107.152.99.78','78',null,null],
  ['VPS Colo@','Phoenix','107.152.99.74','74',null,null],
  ['VPS Colo@','Phoenix','107.181.185.6','6',null,null],
  ['Colo@','Phoenix','199.187.209.130','130c',null,1],
  ['Colo@','Phoenix','199.187.209.131','131c',null,2],
  ['Colo@','Phoenix','199.187.209.132','132c',null,3],
  ['Colo@','Phoenix','199.187.209.133','133c',null,4],
  ['Colo@','Phoenix','199.187.209.134','134c',null,5],
  ['Colo@','Phoenix','199.187.209.135','135c',null,6],
  ['Colo@','Phoenix','199.187.209.136','136c',null,7],
  ['Colo@','Phoenix','199.187.209.137','137c',null,8],
  ['Colo@','Phoenix','199.187.209.138','138c',null,9],
  ['Colo@','Phoenix','199.187.209.139','139c',null,10],
  ['Colo@','Phoenix','199.187.209.140','140c',null,11],
  ['Colo@','Phoenix','199.187.209.141','141c',null,12],
  ['Colo@','Phoenix','199.187.209.142','142c',null,13],
  ['Colo@','Phoenix','199.187.209.143','143c',null,14],
  ['Colo@','Phoenix','199.187.209.144','144c',null,15],
  ['Colo@','Phoenix','199.187.209.145','145c',null,16],
  ['Colo@','Phoenix','199.187.209.149','colo@proxy','proxy',null],
  ['Level 3','Ashburn','4.35.225.5','5e',null,1],
  ['Level 3','Ashburn','4.35.225.6','6e',null,2],
  ['Level 3','Ashburn','4.35.225.7','7e',null,3],
  ['Level 3','Ashburn','4.35.225.8','8e',null,4],
  ['Level 3','Ashburn','4.35.225.9','9e',null,5],
  ['Level 3','Ashburn','4.35.225.10','10e',null,6],
  ['Level 3','Ashburn','4.35.225.11','11e',null,7],
  ['Level 3','Ashburn','4.35.225.12','12e',null,8],
  ['Level 3','Ashburn','4.35.225.13','13e',null,9],
  ['Level 3','Ashburn','4.35.225.14','14e',null,10],
  ['Level 3','Ashburn','4.35.225.15','15e',null,11],
  ['Level 3','Ashburn','4.35.225.16','16e',null,12],
  ['Level 3','Ashburn','4.35.225.17','17e',null,13],
  ['Level 3','Ashburn','4.35.225.18','18e',null,14],
  ['Level 3','Ashburn','4.35.225.19','19e',null,15],
  ['Level 3','Ashburn','4.35.225.20','20e',null,16],
  ['Level 3','Ashburn','4.35.225.21','21e',null,17],
  ['Level 3','Ashburn','4.35.225.22','22e',null,18],
  ['Level 3','Ashburn','4.35.225.23','23e',null,19],
  ['Level 3','Ashburn','4.35.225.24','24e',null,20],
  ['Level 3','Ashburn','4.35.225.25','25e',null,21],
  ['Level 3','Ashburn','4.35.225.26','26e',null,22],
  ['Level 3','Ashburn','4.35.225.27','27e',null,23],
  ['Level 3','Ashburn','4.35.225.28','28e',null,24],
  ['Level 3','Ashburn','4.35.225.29','29e',null,25],
  ['Level 3','Ashburn','4.35.225.30','30e',null,26],
  ['Level 3','Ashburn','4.35.225.31','31e',null,27],
  ['Level 3','Ashburn','4.35.225.32','32e',null,28],
  ['Level 3','Ashburn','4.35.225.33','33e',null,29],
  ['Level 3','Ashburn','4.35.225.34','34e',null,30],
  ['Level 3','Ashburn','4.35.225.35','35e',null,31],
  ['Level 3','Ashburn','4.35.225.36','36e',null,32],
  ['Level 3','Ashburn','4.35.225.37','level3proxy','proxy',null],
  ['Internap','Ashburn','63.251.88.100','100i',null,1],
  ['Internap','Ashburn','63.251.88.101','101i',null,2],
  ['Internap','Ashburn','63.251.88.102','102i',null,3],
  ['Internap','Ashburn','63.251.88.103','103i',null,4],
  ['Internap','Ashburn','63.251.88.104','104i',null,5],
  ['Internap','Ashburn','63.251.88.105','105i',null,6],
  ['Internap','Ashburn','63.251.88.106','106i',null,7],
  ['Internap','Ashburn','63.251.88.107','107i',null,8],
  ['Internap','Ashburn','63.251.88.108','108i',null,9],
  ['Internap','Ashburn','63.251.88.109','109i',null,10],
  ['Internap','Ashburn','63.251.88.110','110i',null,11],
  ['Internap','Ashburn','63.251.88.111','111i',null,12],
  ['Internap','Ashburn','63.251.88.113','113i',null,13],
  ['Internap','Ashburn','63.251.88.114','114i',null,14],
  ['Internap','Ashburn','63.251.88.115','115i',null,15],
  ['Internap','Ashburn','63.251.88.116','116i',null,16],
  ['Internap','Ashburn','63.251.88.117','internapproxy','proxy',null]
];

var e = function(v){
  if(v){
    return "'"+v+"'";
  } else {
    return 'NULL';
  }
}

var insertServers = function(servers){
  var values = servers.map(function(s){
    return `('${s[2]}','${s[3]}',${e(s[4])},(select id from datacenters where datacenters.name = '${s[0]}' and datacenters.location = '${s[1]}'),${s[5]})`;
  }).join(",");
  return "insert into servers(ip,code,role,datacenter_id,number) values "+values;
}

exports.up = function(db, callback) {
  db.runSql(insertServers(DATA),callback);
};

exports.down = function(db, callback) {
  db.runSql("delete from servers;",callback);
};
