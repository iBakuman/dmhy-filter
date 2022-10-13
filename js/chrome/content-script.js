let http = {};
http.rquest = function (option, callback) {
    let url = option.url;
    let method = option.method;
    let data = option.data;
    let timeout = option.timeout || 0;
    let xhr = new XMLHttpRequest();
    (timeout > 0) && (xhr.timeout = timeout);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 400) {
                let result = xhr.responseText;
                try {
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                }
                callback && callback(null, result);
            } else {
                callback && callback('status: ' + xhr.status);
            }
        }
    }.bind(this);
    xhr.open(method, url, true);
    if (typeof data === 'object') {
        try {
            data = JSON.stringify(data);
        } catch (e) {
        }
    }
    xhr.send(data);
    xhr.ontimeout = function () {
        callback && callback('timeout');
        console.log('%c连%c接%c超%c时', 'color:red', 'color:orange', 'color:purple', 'color:green');
    };
};
http.get = function (url, callback) {
    let option = url.url ? url : {url: url};
    option.method = 'get';
    this.rquest(option, callback);
};
http.post = function (option, callback) {
    option.method = 'post';
    this.rquest(option, callback);
};

function createNode(txt) {
    const template = `<div class='child'>${txt}</div>`;
    let tempNode = document.createElement('div');
    tempNode.innerHTML = template;
    return tempNode.firstElementChild;
}

http.get('https://dmhy.anoneko.com//topics/advanced-search?team_id=0&sort_id=0&orderby=', function (err, result) {
    // 这里对结果进行处理
    let advsearch = document.querySelector('#AdvSearch');
    // var div = createNode(result)
    // var selects = div.querySelectorAll('select');
    //
    // var current = selects[1];
    // var options = current.getElementsByTagName('option');
    // var arrOps = Array.prototype.slice.call(options, 0);
    // // console.log(arrOps)
    // arrOps.sort((a, b) => {
    //     return a.text.localeCompare(b.text, 'zh')
    // })
    // current.options.length = 0;
    // arrOps.map(function (option) {
    //     current.appendChild(option)
    // })
    // advsearch.innerHTML = div.innerHTML
    advsearch.innerHTML = result
});
