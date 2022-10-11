import {filterConfig} from "./data/filterConfig.js";

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "dmhy",
        title: '过滤'
    })
    chrome.storage.sync.set({filterConfig});
});

function filterList() {
    let table = document.querySelector('#topic_list > tbody');
    let table_items = table.querySelectorAll('tr');
    for (let i = 0; i < table_items.length; ++i) {
        let tmp = table_items[i].innerText;
        const regex = /1080p.*(简日双语|GB|简中|简体|CHS)/
        if (!regex.test(tmp)) {
            table_items[i].style.display = 'none'
        }
        if (!/爪爪/.test(tmp)) {
            table_items[i].style.display = 'none'
        }
    }
}

chrome.contextMenus.onClicked.addListener((item, tab) => {
    console.log('hosja')
    if (!tab.url.includes("chrome://")) {

        filterList()
        console.log('hello world')
    }
})