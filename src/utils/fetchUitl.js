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

export default function request(url, method, params) {
  let requestUrl = url;
  const body = JSON.stringify(params);
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  };
  if (method === 'GET') {
    if (params) {
      console.log(params)
      const paramsArray = [];
      // 拼接参数
      Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
      if (requestUrl.search(/\?/) === -1) {
        requestUrl += `?${paramsArray.join('&')}`;
      } else {
        requestUrl += `&${paramsArray.join('&')}`;
      }
    }
  } else {
    options.body = body;
  }

  return fetch(commonUrl + requestUrl, options, { credentials: 'include' })
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => console.error('Error:', error));
}
