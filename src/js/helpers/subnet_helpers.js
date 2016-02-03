'use strict';
const _ = require('lodash')

const SUBNETS = {
  '30': '255.255.255.252',
  '29': '255.255.255.248',
  '28': '255.255.255.240',
  '27': '255.255.255.224',
  '26': '255.255.255.192',
  '25': '255.255.255.128',
  '24': '255.255.255.0',
  '23': '255.255.254.0',
  '22': '255.255.252.0',
  '21': '255.255.248.0',
  '20': '255.255.240.0',
  '19': '255.255.224.0',
  '18': '255.255.192.0',
  '17': '255.255.128.0',
  '16': '255.255.0.0',
};

class Subnet {
  constructor(input){
    let match = _parse(input);
    this.a = parseInt(match[1]);
    this.b = parseInt(match[2]);
    this.c = parseInt(match[3]);
    this.d = parseInt(match[4]);
    this.size = parseInt(match[5]);
  }

  cs(){
    let r = []; let c = this.c; let lastC = _lastC(c,this.size);
    while (c <= lastC){
      r.push(new C(this.a,this.b,c,this.size)); c++;
    }
    return r;
  }
};

const _parse = function(inet){
  return inet.match(/(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\s*\/\s*(\d{2})/);
}

const _lastC = function(c,size){
  return c + Math.floor((Math.pow( 2, 32-size ) - 1) / 256);
}

class C {
  constructor(a,b,c,size){
    this.a = a;
    this.b = b;
    this.c = c;
    this.size = size;
  }

  generate(i){
    let servers = _serverDs(i).map( d => _formatIp(this.a,this.b,this.c,d,this.size) );
    let proxies = _proxyDs(i).map( d => _formatIp(this.a,this.b,this.c,d,this.size) );
    return {
      servers: servers,
      proxies: proxies,
      axs: _sample(proxies,6),
    };
  }
}

const _serverDs = function(i){
  switch(i % 2){
    case 0: return [4, 6, 8, 11, 19, 20, 23, 27, 29, 31, 33, 38, 40, 42, 45, 47, 49, 51, 52];
    case 1: return [2, 3, 5, 7, 9, 15, 17, 21, 25, 30, 32, 34, 35, 37, 39, 41, 46, 48, 50];
  }
};

const _proxyDs = function(i){
  switch(i % 4){
    case 0: return [66, 69, 71, 73, 76, 79, 82, 84, 87, 89, 92, 95, 97, 100, 102, 104, 106, 108, 111];
    case 1: return [113, 116, 118, 121, 124, 126, 129, 132, 134, 137, 139, 142, 145, 147, 149, 151, 153, 156, 158];
    case 2: return [160, 162, 165, 168, 171, 173, 176, 179, 181, 183, 186, 189, 192, 194, 197, 199, 201, 203, 206];
    case 3: return [209, 212, 215, 218, 221, 224, 226, 228, 230, 233, 235, 238, 240, 242, 244, 246, 248, 251, 253];
  }
};

const _formatIp = function(a,b,c,d,size){
  return [[a,b,c,d].join("."),_mask(size)].join(",");
};

const _sample = function(arr,n){
  let ret = []; let copy = arr.slice();
  for(let i=0;i<n;i++){
    let ran = Math.floor(Math.random() * copy.length);
    ret.push(copy[ran]);
    copy.splice(ran,1);
  }
  return ret;
}

const _mask = function(size){
  return SUBNETS[size.toString()];
};

const _bits = function(mask){
  for(var bits in SUBNETS){
    if(SUBNETS[bits] === mask){ return bits }
  }
}

const _assignToServers = function(ips,servs){
  if(servs && servs.size > 0){
    let servers = servs.toIndexedSeq();
    return ips.map( (ip,i) => {
      let server = servers.get(i%servers.size);
      return [server.get("code"),ip].join(",");
    }).sort();
  } else {
    return ips.map( ip => [null,ip].join(","));
  }
};

const _sort = function(accessor){
  return (a,b) => {
    let aa = _parse(accessor ? accessor(a) : a);
    let ba = _parse(accessor ? accessor(b) : b);
    for(let i=1;i<5;i++){
      let an = parseInt(aa[i]);
      let bn = parseInt(ba[i]);
      if( an < bn ){ return -1 }
      if( an > bn ){ return 1  }
    }
  }
}

const SubnetHelpers = {
  split: function(input,servers){
    let ranges = input.split(/\n|\r/).filter(range => range)
    let cs = ranges.reduce( (a,r) => { 
      let s = new Subnet(r);
      return a.concat(s.cs());
    },[]);

    let ips = cs.map( (c,i) => c.generate(i) ).reduce( (obj,i) => {
      obj.servers = obj.servers.concat(i.servers);
      obj.proxies = obj.proxies.concat(i.proxies);
      obj.axs     = obj.axs.concat(i.axs);
      return obj;
    },{servers: [], proxies: [], axs: []})

    return {
      servers: _assignToServers(ips.servers,servers),
      proxies: ips.proxies,
      axs: ips.axs,
      ranges: ranges
    }
  },
  sort: _sort,
  mask: _mask,
  bits: _bits,
  parse: _parse,
  inetToMask: function(inet){
    let i = _parse(inet);
    return [[i[1],i[2],i[3],i[4]].join("."),_mask(i[5])].join(",");
  },
  maskToInet: function(ipAndMask){
    let split = ipAndMask.split(",");
    return [split[0],_bits(split[1])].join("/");
  },
  host: function(inet){
    let i = _parse(inet);
    return [i[1],i[2],i[3],i[4]].join(".");
  }
};

module.exports = SubnetHelpers;