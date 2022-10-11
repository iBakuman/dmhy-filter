import {http} from "../utils/http.js";


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
