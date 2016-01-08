var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['PhoenixNap','Phoenix','184.164.155.154','154p','axs'],
  ['PhoenixNap','Phoenix','198.15.68.10','10','axs'],
  ['PhoenixNap','Ashburn','198.24.166.18','18','axs'],
  ['PhoenixNap','Phoenix','184.95.32.26','p26','axs'],
  ['PhoenixNap','Phoenix','198.24.163.34','34','axs'],
  ['PhoenixNap','Phoenix','184.171.174.42','42p','axs'],
  ['PhoenixNap','Phoenix','184.164.156.106','106p','axs'],
  ['PhoenixNap','Phoenix','184.164.156.114','114p','axs'],
  ['PhoenixNap','Ashburn','198.24.160.122','p122','axs'],
  ['PhoenixNap','Phoenix','198.15.124.146','p146','axs'],
  ['PhoenixNap','Ashburn','198.24.160.170','p170','axs'],
  ['PhoenixNap','Ashburn','198.24.162.186','186','axs'],
  ['PhoenixNap','Phoenix','198.15.67.194','194p','axs'],
  ['PhoenixNap','Ashburn','198.24.165.194','194','axs'],
  ['PhoenixNap','Ashburn','192.198.204.250','250p','axs'],
  ['PhoenixNap','Ashburn','198.24.165.250','250','axs'],
  ['VPS','Ashburn','209.208.10.2','2','axs'],
  ['VPS','Ashburn','98.126.150.130','130','axs'],
  ['VPS','Ashburn','207.58.142.202','202','axs'],
  ['VPS','Ashburn','107.152.97.102','102','axs'],
  ['VPS','Ashburn','66.71.240.62','62','axs'],
  ['VPS','Phoenix','192.111.140.166','166','axs'],
  ['VPS','Phoenix','192.111.140.170','170','axs'],
  ['VPS','Ashburn','184.170.253.238','238','axs'],
  ['VPS','Phoenix','50.28.98.237','237','axs'],
  ['VPS','Ashburn','64.251.7.177','177',null],
  ['VPS','Ashburn','209.190.71.58','58',null],
  ['VPS','Ashburn','208.167.236.51','51',null],
  ['VPS','Ashburn','108.61.144.147','147',null],
  ['VPS','Ashburn','74.84.136.73','73',null],
  ['VPS','Phoenix','66.37.25.146','146',null],
  ['VPS','Ashburn','199.233.231.162','162v',null],
  ['VPS','Phoenix','209.105.232.4','4',null],
  ['VPS','Ashburn','66.219.99.87','87',null],
  ['VPS','Phoenix','104.143.12.162','162',null],
  ['VPS','Ashburn','207.244.77.145','145',null],
  ['VPS','Phoenix','184.170.247.94','94',null],
  ['VPS','Phoenix','184.170.247.98','98p',null],
  ['VPS','Phoenix','107.152.99.90','90',null],
  ['VPS','Phoenix','199.58.187.66','66',null],
  ['VPS Colo@','Phoenix','208.84.155.110','110',null],
  ['VPS Colo@','Phoenix','107.152.102.114','114',null],
  ['VPS Colo@','Ashburn','107.152.101.118','118',null],
  ['VPS Colo@','Ashburn','107.152.104.34','34v',null],
  ['VPS Colo@','Ashburn','107.152.111.98','98',null],
  ['VPS Colo@','Ashburn','98.142.212.58','58a',null],
  ['VPS Colo@','Phoenix','107.152.99.70','70',null],
  ['VPS Colo@','Phoenix','107.181.184.14','14',null],
  ['VPS Colo@','Phoenix','107.181.185.2','2p',null],
  ['VPS Colo@','Phoenix','107.152.99.78','78',null],
  ['VPS Colo@','Phoenix','107.152.99.74','74',null],
  ['VPS Colo@','Phoenix','107.181.185.6','6',null],
  ['Colo@','Phoenix','199.187.209.130','130c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.131','131c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.132','132c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.133','133c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.134','134c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.135','135c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.136','136c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.137','137c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.138','138c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.139','139c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.140','140c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.141','141c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.142','142c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.143','143c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.144','144c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.145','145c','axs/tcen'],
  ['Colo@','Phoenix','199.187.209.149','colo@proxy','proxy'],
  ['Level 3','Ashburn','4.35.225.5','5e',null],
  ['Level 3','Ashburn','4.35.225.6','6e',null],
  ['Level 3','Ashburn','4.35.225.7','7e',null],
  ['Level 3','Ashburn','4.35.225.8','8e',null],
  ['Level 3','Ashburn','4.35.225.9','9e',null],
  ['Level 3','Ashburn','4.35.225.10','10e',null],
  ['Level 3','Ashburn','4.35.225.11','11e',null],
  ['Level 3','Ashburn','4.35.225.12','12e',null],
  ['Level 3','Ashburn','4.35.225.13','13e',null],
  ['Level 3','Ashburn','4.35.225.14','14e',null],
  ['Level 3','Ashburn','4.35.225.15','15e',null],
  ['Level 3','Ashburn','4.35.225.16','16e',null],
  ['Level 3','Ashburn','4.35.225.17','17e',null],
  ['Level 3','Ashburn','4.35.225.18','18e',null],
  ['Level 3','Ashburn','4.35.225.19','19e',null],
  ['Level 3','Ashburn','4.35.225.20','20e',null],
  ['Level 3','Ashburn','4.35.225.21','21e',null],
  ['Level 3','Ashburn','4.35.225.22','22e',null],
  ['Level 3','Ashburn','4.35.225.23','23e',null],
  ['Level 3','Ashburn','4.35.225.24','24e',null],
  ['Level 3','Ashburn','4.35.225.25','25e',null],
  ['Level 3','Ashburn','4.35.225.26','26e',null],
  ['Level 3','Ashburn','4.35.225.27','27e',null],
  ['Level 3','Ashburn','4.35.225.28','28e',null],
  ['Level 3','Ashburn','4.35.225.29','29e',null],
  ['Level 3','Ashburn','4.35.225.30','30e',null],
  ['Level 3','Ashburn','4.35.225.31','31e',null],
  ['Level 3','Ashburn','4.35.225.32','32e',null],
  ['Level 3','Ashburn','4.35.225.33','33e',null],
  ['Level 3','Ashburn','4.35.225.34','34e',null],
  ['Level 3','Ashburn','4.35.225.35','35e',null],
  ['Level 3','Ashburn','4.35.225.36','36e',null],
  ['Level 3','Ashburn','4.35.225.37','level3proxy','proxy'],
  ['Internap','Ashburn','63.251.88.100','100i',null],
  ['Internap','Ashburn','63.251.88.101','101i',null],
  ['Internap','Ashburn','63.251.88.102','102i',null],
  ['Internap','Ashburn','63.251.88.103','103i',null],
  ['Internap','Ashburn','63.251.88.104','104i',null],
  ['Internap','Ashburn','63.251.88.105','105i',null],
  ['Internap','Ashburn','63.251.88.106','106i',null],
  ['Internap','Ashburn','63.251.88.107','107i',null],
  ['Internap','Ashburn','63.251.88.108','108i',null],
  ['Internap','Ashburn','63.251.88.109','109i',null],
  ['Internap','Ashburn','63.251.88.110','110i',null],
  ['Internap','Ashburn','63.251.88.111','111i',null],
  ['Internap','Ashburn','63.251.88.113','113i',null],
  ['Internap','Ashburn','63.251.88.114','114i',null],
  ['Internap','Ashburn','63.251.88.115','115i',null],
  ['Internap','Ashburn','63.251.88.116','116i',null],
  ['Internap','Ashburn','63.251.88.117','internapproxy','proxy']
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
    return `('${s[2]}','${s[3]}',${e(s[4])},(select id from datacenters where datacenters.name = '${s[0]}' and datacenters.location = '${s[1]}'),now(),now())`;
  }).join(",");
  return "insert into servers(ip,code,role,datacenter_id,created_at,updated_at) values "+values;
}

exports.up = function(db, callback) {
  db.runSql(insertServers(DATA),callback);
};

exports.down = function(db, callback) {
  db.runSql("delete from servers;",callback);
};
