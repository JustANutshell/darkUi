export class DarkUiSite{

    public name:string;
    public siteOpen:(self:DarkUiSite)=>void;
    public siteClose:(self:DarkUiSite)=>void;
    public siteDisplayActu:(self:DarkUiSite)=>any;
    public siteUserInput:(self:DarkUiSite,input:any)=>void;
    public siteCache:any=null;

    constructor(name:string,siteOpen:(self:DarkUiSite)=>void,siteClose:(self:DarkUiSite)=>void,displayActu:(self:DarkUiSite)=>any,userInput:(self:DarkUiSite,input:any)=>void){
        this.name=name;
        this.siteOpen=siteOpen;
        this.siteClose=siteClose;
        this.siteDisplayActu=displayActu;
        this.siteUserInput=userInput;
    }

    open(){
        this.siteOpen(this);
    }

    close(){
        this.siteClose(this);
        this.siteCache=null;
    }

    displayActu(){
        return this.siteDisplayActu(this);
    }

    userInput(input:any){
        this.siteUserInput(this,input);
    }
}

export class DarkUi{

    public allSites:DarkUiSite[]=[];
    public activeSite:DarkUiSite|null=null;
    public siteSwitch:(input:any)=>string|DarkUiSite|null;
    public onError:(name:string,other:any)=>void;

    constructor(siteSwitch:(input:any)=>string|DarkUiSite|null,onError:(name:string,other:any)=>void){
        this.siteSwitch=siteSwitch;
        this.onError=onError;
    }

    openSiteByName(siteName:string){
        let a=this.allSites.find((obj:DarkUiSite)=>{
            return obj.name===siteName;
        })
        if(a===undefined){
            this.err("WRONG NAME"),["openSiteByName",siteName];
        }else{
            a.open();
            this.activeSite=a;
        }
    }

    openSiteByObject(site:DarkUiSite){
        let a=this.allSites.find((obj:DarkUiSite)=>{
            return obj===site;
        })
        if(a===undefined){
            this.err("WRONG SITE",["openSiteByObject",site]);
        }else{
            a.open();
            this.activeSite=a;
        }
    }

    userInput(input:any){
        let a=this.siteSwitch(input);
        if(a===null){
            if(this.activeSite===null) this.err("NO SITE SELECTED","userinput"); else
            this.activeSite.userInput(input);
        }else if(typeof a==="string"){
            this.openSiteByName(a);
        }else{
            this.openSiteByObject(a);
        }
    }

    displayActu(){
        if(this.activeSite===null) this.err("NO SITE SELECTED","displayactu"); else
        return this.activeSite.displayActu();
    }
    
    private err(name:string,other:any=null){
        this.onError(name,other);
        throw new Error(name);
    }
}