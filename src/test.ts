import { DarkUi, DarkUiSite } from "./index"
var standard_input=process.stdin;
standard_input.setEncoding('utf-8');
let test=new DarkUi((input)=>{return null;},(name,other=null)=>{console.error(name,other);});
test.allSites.push(new DarkUiSite(
    "index",
    (self)=>{},
    (self)=>{},
    (self)=>{return "index!";},
    (self,input)=>{},
));
test.allSites.push(new DarkUiSite(
    "sec",
    (self)=>{},
    (self)=>{},
    (self)=>{return Date.now().toLocaleString();},
    (self,input)=>{},
));
test.openSite("index");
setInterval(()=>{
    console.log(test.getContent());
},100);
setInterval(()=>{
    if(test.activeSite?.name==="index")
    test.openSite("sec"); else
    test.openSite("index");
},1000);
standard_input.on('data',function(data_){
    let data=String(data_).replace(/(^[\s\n\r]*|[\s\n\r]*$)/g,"").split('#');
    test.createNotification(data[0],Number(data[1]===undefined?10000:data[1]));
    console.log(data);
});