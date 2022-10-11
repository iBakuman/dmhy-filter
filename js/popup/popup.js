import {filterConfig} from "../data/filterConfig.js";

async function createForm() {
    const formEl = document.getElementById('filterConfig');
    const result = await chrome.storage.sync.get('filterConfig');
    console.log(result);
}

createForm();