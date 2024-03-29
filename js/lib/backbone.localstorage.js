/**
 * Backbone localStorage Adapter v1.0
 * https://github.com/jeromegn/Backbone.localStorage
 *
 * Date: Sun Aug 14 2011 09:53:55 -0400
 */

function S4(){return(((1+Math.random())*65536)|0).toString(16).substring(1)}function guid(){return(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())}window.Store=function(b){this.name=b;var a=localStorage.getItem(this.name);this.records=(a&&a.split(","))||[]};_.extend(Store.prototype,{save:function(){localStorage.setItem(this.name,this.records.join(","))},create:function(a){if(!a.id){a.id=a.attributes.id=guid()}localStorage.setItem(this.name+"-"+a.id,JSON.stringify(a));this.records.push(a.id.toString());this.save();return a},update:function(a){localStorage.setItem(this.name+"-"+a.id,JSON.stringify(a));if(!_.include(this.records,a.id.toString())){this.records.push(a.id.toString())}this.save();return a},find:function(a){return JSON.parse(localStorage.getItem(this.name+"-"+a.id))},findAll:function(){return _.map(this.records,function(a){return JSON.parse(localStorage.getItem(this.name+"-"+a))},this)},destroy:function(a){localStorage.removeItem(this.name+"-"+a.id);this.records=_.reject(this.records,function(b){return b==a.id.toString()});this.save();return a}});Backbone.sync=function(f,d,c,b){if(typeof c=="function"){c={success:c,error:b}}var e;var a=d.localStorage||d.collection.localStorage;switch(f){case"read":e=d.id?a.find(d):a.findAll();break;case"create":e=a.create(d);break;case"update":e=a.update(d);break;case"delete":e=a.destroy(d);break}if(e){c.success(e)}else{c.error("Record not found")}};

