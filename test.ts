import { DarkUi, DarkUiSite } from "./index"
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
test.openSiteByName("index");
setInterval(()=>{
    console.log(test.displayActu());
},100);
setInterval(()=>{
    test.openSiteByName("sec");
},1000);