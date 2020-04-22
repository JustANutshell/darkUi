export declare class DarkUiSite {
    name: string;
    siteOpen: (self: DarkUiSite) => void;
    siteClose: (self: DarkUiSite) => void;
    siteGetContent: (self: DarkUiSite) => any;
    siteUserInput: (self: DarkUiSite, input: any) => void;
    siteCache: any;
    constructor(name: string, siteOpen: (self: DarkUiSite) => void, siteClose: (self: DarkUiSite) => void, getContent: (self: DarkUiSite) => any, userInput: (self: DarkUiSite, input: any) => void);
    open(): void;
    close(): void;
    getContent(): any;
    userInput(input: any): void;
}
declare class DarkUiNotification {
    duration: number;
    content: any;
    startedDisplaying: Date | null;
    constructor(content: any, duration?: number);
    getContent(): any;
}
export declare class DarkUi {
    allSites: DarkUiSite[];
    allNotifications: (DarkUiNotification | undefined)[];
    activeSite: DarkUiSite | null;
    activeNotification: DarkUiNotification | null;
    private activeContent;
    siteSwitch: (input: any) => string | DarkUiSite | null;
    onError: (name: string, other: any) => void;
    constructor(siteSwitch: (input: any) => string | DarkUiSite | null, onError: (name: string, other: any) => void);
    openSite(site: DarkUiSite | string): void;
    userInput(input: any): void;
    getContent(): any;
    openNotification(content: any, duration?: number): void;
    private err;
}
export {};
