const commonUrl = 'http://127.0.0.1:8020';
localStorage.setItem('access_token', 'test');

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 500) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(options = {}) {
  // const Authorization = localStorage.getItem('access_token')
  const { data, params } = options;
  let url = options.url;
  options = { ...options };
  options.mode = 'cors';
  delete options.url;
  // post请求
  if (data) {
    delete options.data;
    options.body = JSON.stringify({
      data,
    });
  }
  // get请求
  if (params) {
    const paramsArray = [];
    // 拼接参数
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join('&')}`;
    } else {
      url += `&${paramsArray.join('&')}`;
    }
  }

  options.headers = {
    // 'Authorization':Authorization,
    'Content-Type': 'application/json',
  };
  return fetch(commonUrl + url, options, { credentials: 'include' })
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => ({ err }));
}
