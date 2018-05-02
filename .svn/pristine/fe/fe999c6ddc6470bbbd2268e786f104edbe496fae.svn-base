/**
 ajax({
    method: 'POST',
    url: 'test.php',
    data: {
        name1: 'value1',
        name2: 'value2'
    },
    success: function (response) {
       console.log(response)；
    }
});
 */
function Ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () { };
    opt.Authorization = opt.Authorization || '';
    let xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    };
    let params = [];
    for (var key in opt.data) {
        params.push(key + '=' + opt.data[key]);
    }
    let postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttp.setRequestHeader("Accept", "application/json");
        xmlHttp.setRequestHeader('Access-Control-Allow-Origin', "*");
        xmlHttp.setRequestHeader('Authorization', opt.Authorization);
        xmlHttp.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttp.setRequestHeader("Accept", "application/json");
        xmlHttp.setRequestHeader('Access-Control-Allow-Origin', "*");
        xmlHttp.setRequestHeader('Authorization', opt.Authorization);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(xmlHttp.responseText);
        } else {
            console.log(xmlHttp.status);
        }
    };
}