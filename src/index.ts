import {getRealFirstArrEntry,getRealFirstArrMissEntry} from "./arrFunc"
export class DarkUiSite{

    public name:string;
    public siteOpen:(self:DarkUiSite)=>void;
    public siteClose:(self:DarkUiSite)=>void;
    public siteGetContent:(self:DarkUiSite)=>any;
    public siteUserInput:(self:DarkUiSite,input:any)=>void;
    public siteCache:any=null;

    constructor(name:string,siteOpen:(self:DarkUiSite)=>void,siteClose:(self:DarkUiSite)=>void,getContent:(self:DarkUiSite)=>any,userInput:(self:DarkUiSite,input:any)=>void){
        this.name=name;
        this.siteOpen=siteOpen;
        this.siteClose=siteClose;
        this.siteGetContent=getContent;
        this.siteUserInput=userInput;
    }

    open(){
        this.siteOpen(this);
    }

    close(){
        this.siteClose(this);
        this.siteCache=null;
    }

    getContent(){
        return this.siteGetContent(this);
    }

    userInput(input:any){
        this.siteUserInput(this,input);
    }
}

class DarkUiNotification{

    public duration:number; // ms
    public content:any;
    public startedDisplaying:Date|null=null;

    constructor(content:any,duration:number=3000){
        this.duration=duration;
        this.content=content;
    }
    
    getContent(){
        return typeof this.content==="function"?this.content(this):this.content;
    }
}

export class DarkUi{

    public  allSites:           DarkUiSite[]                        =[];
    public  allNotifications:   (DarkUiNotification|undefined)[]    =[];
    public  activeSite:         DarkUiSite|null                     =null;
    public  activeNotification: DarkUiNotification|null             =null;
    private activeContent:      DarkUiSite|DarkUiNotification|null  =null;
    public  siteSwitch:         (input:any)=>string|DarkUiSite|null ;
    public  onError:            (name:string,other:any)=>void       ;

    constructor(siteSwitch:(input:any)=>string|DarkUiSite|null,onError:(name:string,other:any)=>void){
        this.siteSwitch=siteSwitch;
        this.onError=onError;
    }

    openSite(site:DarkUiSite|string){
        let a=this.allSites.filter((obj:DarkUiSite)=>{
            return obj===site||obj.name===site;
        })
        if(a.length>=1){
            if(this.activeSite!==null) this.activeSite.close();
            a[0].open();
            this.activeSite=a[0];
        }else{
            this.err("WRONG SITE",["openSite",site]);
        }
    }

    userInput(input:any){
        let a=this.siteSwitch(input);
        if(a===null){
            if(this.activeSite===null) this.err("NO SITE SELECTED","userinput"); else
            this.activeSite.userInput(input);
        }else{
            this.openSite(a);
        }
    }

    getContent(){
        if(this.activeNotification!==null){ // test for outdated notification
            if(this.activeNotification.startedDisplaying===null){ // error
                let a=this.activeNotification;
                this.activeNotification=null;
                for(let b=0;b<this.allNotifications.length;b++){
                    if(this.allNotifications[b]===a) this.allNotifications[b]=undefined;
                }
                this.err("INTERNAL",["notificaton was opend without starttime",a]);
            }else{
                if(this.activeNotification.startedDisplaying.getTime()+this.activeNotification.duration<(new Date()).getTime()){
                    let a=this.activeNotification;
                    this.activeNotification=null;
                    for(let b=0;b<this.allNotifications.length;b++){
                        if(this.allNotifications[b]===a) this.allNotifications[b]=undefined;
                    }
                }
            }
        }
        if(this.activeNotification===null){ // search for new notification
            let a=getRealFirstArrEntry(this.allNotifications);
            if(a!==false){
                let b=this.allNotifications[a];
                if(b===undefined){
                    this.err("INTERNAL",["code:1"]);
                }else{
                    this.activeNotification=b;
                    this.activeNotification.startedDisplaying=new Date();
                }
            }
        }
        if(this.activeNotification!==null){ // display
            return this.activeNotification.getContent();
        }else{
            if(this.activeSite===null){
                this.err("NO SITE SELECTED","displayactu");
                return null;
            }else return this.activeSite.getContent();
        }
    }
    
    openNotification(content:any,duration:number=3000){
        let a=getRealFirstArrMissEntry(this.allNotifications);
        this.allNotifications[a]=new DarkUiNotification(content,duration);
    }

    private err(name:string,other:any=null){
        this.onError(name,other);
    }
}