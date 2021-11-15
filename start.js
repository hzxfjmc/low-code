#!/usr/bin/env node
const path = require('path')

var inquirer = require('inquirer');
import {requireRespons} from './http'
import {promptList} from './promptList'
const fs = require('fs');
import {str} from './template'

var os = require("os");
 
function readFile(filePath){
	fs.readFile(filePath,'utf-8',(err,data)=>{
		if(err){
			console.log(err);
			return;
		}
		console.log(data);
	})
}

function writeFile(filePath,str){
	// for(var i=0;i<contents.length;i++){
		fs.appendFileSync(filePath,str);
		//fs.appendFileSync(filePath,contents[i]+os.EOL);
	// }
}
writeFile("test2.vue");
 

/*
console.log(path.resolve('.'+path.sep));
console.log(__dirname)
console.log(process.cwd())
*/

requireRespons('http://yapi.lepass.cn/api/interface/get?id=227449').then(res=>{
  let obj = JSON.parse(res.res_body).properties.data.items.properties
  let list = []
  Object.keys(obj).forEach(key=>{
    list.push({
      label:obj[key].description,
      key:key
    })
  })
  let str = `export const TABLE_LIST = ${JSON.stringify(list)}`
  writeFile("ENUM.js",str);
  console.log(list)
})

// inquirer.prompt(promptList).then(answers => {
//   // 请求地址
 
//   console.log(answers); // 返回的结果
// })



// console.log(path.join(__dirname))