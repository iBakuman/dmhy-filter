import { filterConfig } from "./data/filterConfig.js";

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
                                   id: "dmhy",
                                   title: '过滤'
                               })
    chrome.storage.sync.set({ filterConfig });
});

async function getRegexps() {
    let { filterConfig } = await chrome.storage.sync.get('filterConfig')
    let otherRegexps = {};

    // resolution config
    let resolution = "";
    if (filterConfig.resolution.high_quality) {
        resolution += "1080"
    }
    if (filterConfig.resolution.medium_quality) {
        if (resolution) {
            resolution += "|";
        }
        resolution += "720";
    }
    resolution ? otherRegexps.resolution = new RegExp(resolution) : undefined;

    // organization config
    if (filterConfig.organization) {
        otherRegexps.organization = new RegExp(filterConfig.organization);
    }

    // language config
    let lang = "";
    if (filterConfig.lang.gb.enabled) {
        lang += filterConfig.lang.gb.value;
    }
    if (filterConfig.lang.big5.enabled) {
        if (lang) {
            lang += "|";
        }
        lang += filterConfig.lang.big5.value;
    }
    lang ? otherRegexps.lang = new RegExp(lang) : undefined;

    // other config
    if (filterConfig.otherKeyWord) {
        otherRegexps.other = new RegExp(filterConfig.otherKeyWord);
    }

    // category config
    let categories = "";
    for (let category of Object.values(filterConfig.categories)) {
        if (category.enabled) {
            if (categories) {
                categories += "|";
            }
            categories += category.value;
        }
    }
    let categoriesRegex = null;
    if (categories)
        categoriesRegex = new RegExp(categories);

    return otherRegexps;
}

async function filterList() {
    let { filterConfig } = await chrome.storage.sync.get('filterConfig')
    const regexps = {};

    // resolution config
    let resolution = "";
    if (filterConfig.resolution.high_quality) {
        resolution += "1080"
    }
    if (filterConfig.resolution.medium_quality) {
        if (resolution) {
            resolution += "|";
        }
        resolution += "720";
    }
    resolution ? regexps.resolution = new RegExp(resolution) : undefined;

    // organization config
    if (filterConfig.organization) {
        regexps.organization = new RegExp(filterConfig.organization);
    }

    // language config
    let lang = "";
    if (filterConfig.lang.gb.enabled) {
        lang += filterConfig.lang.gb.value;
    }
    if (filterConfig.lang.big5.enabled) {
        if (lang) {
            lang += "|";
        }
        lang += filterConfig.lang.big5.value;
    }
    lang ? regexps.lang = new RegExp(lang) : undefined;

    // other config
    if (filterConfig.otherKeyWord) {
        regexps.other = new RegExp(filterConfig.otherKeyWord);
    }

    // category config
    let categories = "";
    for (let category of Object.values(filterConfig.categories)) {
        if (category.enabled) {
            if (categories) {
                categories += "|";
            }
            categories += category.value;
        }
    }
    categories ? regexps.categories = new RegExp(categories) : undefined;

    debugger
    let table = document.querySelector('#topic_list > tbody');
    let table_items = table.querySelectorAll('tr');
    for (let i = 0; i < table_items.length; ++i) {
        let tmp = table_items[i].innerText;
        for (let regex of Object.values(regexps)) {
            if (!regex.test(tmp)) {
                table_items[i].style.display = 'none'
                break;
            }
        }
    }

}

chrome.contextMenus.onClicked.addListener((item, tab) => {
    if (!tab.url.includes("chrome://")) {
        chrome.scripting.executeScript({ target: { tabId: tab.id }, func: filterList });
    }
})