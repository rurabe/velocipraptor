'use strict';
require('dotenv').load();
const Promise = require('bluebird');
const {Client} = require('ssh2');

const _writeAgent = function(sftp){
  return new Promise(resolve => {
    let stream = sftp.createWriteStream('/home/javery/public_html/averytrips.com/appupdate/thupdate/IPAndAgent.csv');
    stream.on('finish',resolve);
    stream.end('IpAddress|UserAgent|MagicId|ChallengeStamp|Date|Cookie1|Cookie2|Cookie3|IpCategory','utf8');
  });
};

const _writeIPList = function(sftp,iplist){
  let data = iplist.slice();
  data.unshift('iplist');
  data = data.join('\r\n');
  return new Promise(resolve => {
    let stream = sftp.createWriteStream('/home/javery/public_html/averytrips.com/appupdate/thupdate/ipallowed.csv');
    stream.on('finish',resolve);
    stream.end(data,'utf8');
  });
};

const AveryTrips = {
  thupdate: function(iplist){
    return new Promise(resolve => {
      if(process.env.NODE_ENV === 'production'){
        const client = new Client();
        client.on('ready',function(){
          client.sftp(function(err,sftp){
            return Promise.all([
              _writeAgent(sftp),
              _writeIPList(sftp,iplist),
            ]).then(resolve);
          });
        }).connect({
          host: process.env.THUPDATE_HOST,
          port: 22,
          username: process.env.THUPDATE_USERNAME,
          password: process.env.THUPDATE_PASSWORD,
        });
      } else {
        console.log(`wanted to write iplist to thupdate: ${iplist}`);
        resolve();
      }
    });
  }
};

module.exports = AveryTrips;