// @flow strict

export type CommandType = {|
    name: string,
    url: string,
    searchurl?: string,
    aliases?: [string]
|};


export type CommandDataTableType = {|
    name: string,
    url: string,
    command: string,
    aliases: string,
    searchurl: string
|};

export type ColumnDataTableType = {|
    data: string,
    title: string
|};

export const COMMANDS: {[string] : CommandType} = {
    fb: {
        name: "Facebook",
        url: "https://facebook.com/",
        searchurl: "https://www.facebook.com/search/top/?q="
    },
    m: {
        name: "Messenger Desktop App",
        url: "messenger://",
    },
    mw: {
        name: "Messenger Web",
        url: "https://www.messenger.com/"
    },
    wa: {
        name: "WhatsApp Desktop App",
        url: "whatsapp://",
    },
    waw: {
        name: "WhatsApp Web",
        url: "https://web.whatsapp.com/"
    },
    gm: {
        name: "Gmail",
        url: "https://mail.google.com/mail/u/0",
        searchurl: "https://mail.google.com/mail/u/"
    },
    gd: {
        name: "Google Drive",
        url: "https://drive.google.com/drive/u/0",
        searchurl: "https://drive.google.com/drive/u/"
    },
    yt: {
        name: "YouTube",
        url: "https://youtube.com/",
        searchurl: "https://www.youtube.com/results?search_query="
    },
    gh: {
        name: "GitHub",
        url: "https://github.com/",
        searchurl: "https://www.github.com/search?q="
    },
    r: {
        name: "Reddit",
        url: "https://reddit.com/",
        searchurl: "https://www.reddit.com/search?q="
    },
    l: {
        name: "Linkedin",
        url: "https://linkedin.com/",
    },
    vs: {
        name: "VS Code",
        url: "vscode://",
    },
    cal: {
        name: "Google Calendar",
        url: "https://calendar.google.com/calendar/r"
    },
    we: {
        name: "Wikipedia",
        url: "https://en.wikipedia.org",
        searchurl: "https://en.wikipedia.org/wiki/"
    },
    DEFAULT: {
        name: "Default - Duck duck go Search",
        url: "https://duckduckgo.com/",
        searchurl: "https://www.duckduckgo.com/?q="
    }
};
