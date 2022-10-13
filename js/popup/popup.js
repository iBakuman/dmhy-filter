createForm().catch(console.error)

async function createForm() {
    let { filterConfig } = await chrome.storage.sync.get('filterConfig');

    let form = document.querySelector('#form');
    // ------------------------------------- resolution config -------------------------------------
    let resolutionStr = document.createElement('p');
    resolutionStr.innerText = '分辨率';
    form.appendChild(resolutionStr);
    let div = document.createElement('div')
    div.appendChild(createCheckboxWithLabel('1080P',
                                            filterConfig.resolution.high_quality,
                                            'change',
                                            getHandler('resolution.high_quality')));
    div.appendChild(createCheckboxWithLabel('720P',
                                            filterConfig.resolution.medium_quality,
                                            'change',
                                            getHandler('resolution.medium_quality')));
    form.appendChild(div);

    // ------------------------------------- organization config -------------------------------------
    let organizationStr = document.createElement('p');
    organizationStr.innerText = '组织';
    form.appendChild(organizationStr);
    let textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = filterConfig.organization;
    textInput.addEventListener('change', async (event)=>{
        let { filterConfig } = await chrome.storage.sync.get('filterConfig');
        filterConfig.organization = event.target.value;
        await chrome.storage.sync.set({ filterConfig });
    })
    form.appendChild(textInput);

    // ------------------------------------- language config -------------------------------------
    let langStr = document.createElement('p');
    langStr.innerText = '语言';
    form.appendChild(langStr);

    div = document.createElement('div');
    div.appendChild(createCheckboxWithLabel('简体中文',
                                            filterConfig.lang.gb.enabled,
                                            'change',
                                            getHandler('lang.gb.enabled')));
    div.appendChild(createCheckboxWithLabel('繁体中文',
                                            filterConfig.lang.big5.enabled,
                                            'change',
                                            getHandler('lang.big5.enabled')));
    form.appendChild(div);

    // ------------------------------------- categories config -------------------------------------
    let categoryStr = document.createElement('p');
    categoryStr.innerText = '分类';
    form.appendChild(categoryStr);

    div = document.createElement('div');
    div.appendChild(createCheckboxWithLabel('动画',
                                            filterConfig.categories.anime.enabled,
                                            'change',
                                            getHandler('categories.anime.enabled')))
    div.appendChild(createCheckboxWithLabel('季度合集',
                                            filterConfig.categories.quarterly_set.enabled,
                                            'change',
                                            getHandler('categories.quarterly_set.enabled')))
    div.appendChild(createCheckboxWithLabel('音乐',
                                            filterConfig.categories.music.enabled,
                                            'change',
                                            getHandler('categories.music.enabled')))
    div.appendChild(createCheckboxWithLabel('日剧',
                                            filterConfig.categories.drama.enabled,
                                            'change',
                                            getHandler('categories.drama.enabled')))
    form.appendChild(div);

    // ------------------------------------- categories config -------------------------------------
    let otherKeyStr = document.createElement('p');
    otherKeyStr.innerText = '其他关键字';
    form.appendChild(otherKeyStr);
    textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = filterConfig.otherKeyWord;
    textInput.addEventListener('change', async (event)=>{
        let { filterConfig } = await chrome.storage.sync.get('filterConfig');
        filterConfig.otherKeyWord = event.target.value;
        await chrome.storage.sync.set({ filterConfig });
    })

    form.appendChild(textInput);
}

function createCheckboxWithLabel(labelName, checked, event, callback) {
    let label = document.createElement('label');
    label.innerText = labelName;
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.addEventListener(event, callback);
    label.appendChild(checkbox);
    return label;
}

function getHandler(keys) {
    if (!keys instanceof String) {
        return () => {
        };
    }
    return async (event) => {
        let { filterConfig } = await chrome.storage.sync.get('filterConfig');
        let targetConfig = keys.substring(keys.lastIndexOf('.') + 1);
        keys = keys.substring(0, keys.lastIndexOf('.'));
        let tmp = filterConfig;
        if (keys) {
            keys.split('.').forEach((key) => {
                tmp = tmp[key];
            });
        }
        tmp[targetConfig] = event.target.checked;
        await chrome.storage.sync.set({ filterConfig })
    }
}
