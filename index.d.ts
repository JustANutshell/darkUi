export declare class DarkUiSite {
    name: string;
    siteOpen: (self: DarkUiSite) => void;
    siteClose: (self: DarkUiSite) => void;
    siteDisplayActu: (self: DarkUiSite) => any;
    siteUserInput: (self: DarkUiSite, input: any) => void;
    siteCache: any;
    constructor(name: string, siteOpen: (self: DarkUiSite) => void, siteClose: (self: DarkUiSite) => void, displayActu: (self: DarkUiSite) => any, userInput: (self: DarkUiSite, input: any) => void);
    open(): void;
    close(): void;
    displayActu(): any;
    userInput(input: any): void;
}
export declare class DarkUi {
    allSites: DarkUiSite[];
    activeSite: DarkUiSite | null;
    siteSwitch: (input: any) => string | DarkUiSite | null;
    onError: (name: string, other: any) => void;
    constructor(siteSwitch: (input: any) => string | DarkUiSite | null, onError: (name: string, other: any) => void);
    openSiteByName(siteName: string): void;
    openSiteByObject(site: DarkUiSite): void;
    userInput(input: any): void;
    displayActu(): any;
    private err;
}
