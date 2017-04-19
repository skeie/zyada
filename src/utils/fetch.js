const baseURl = __DEV__
    ? 'http://10.200.228.51:3000'
    : 'https://loggr-api.herokuapp.com';

let authorization = '';

function _appUrl(url) {
    return baseURl + url;
}

export function setAuthorizationToken(token) {
    authorization = token;
}

function setHeaders(method, body, optHeader) {
    const headers = Object.assign(
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        optHeader,
    );

    if (authorization) {
        headers.authorization = `Bearer ${authorization}`;
    }

    return {
        method,
        headers,
        body,
    };
}

export async function postMultipart(url, uri) {
    const image = {
        uri: uri.path,
        type: 'image/jpeg',
        name: 'myImage' + '-' + Date.now() + '.jpg',
    };
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    imgBody.append('image', image);
    // Perform the request. Note the content type - very important
    const response = await fetch(baseURl + url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${authorization}`,
        },
        body: imgBody,
    });

    if (response.status === 201) return;

    const responseJson = await response.json();

    if (response.status >= 400) {
        const msg = responseJson.msg || responseJson.message;
        throw {
            message: msg,
        };
    }

    return responseJson;
}

export async function get(url, obj = {}) {
    const response = await fetch(_appUrl(url), setHeaders('GET'));

    if (response.status === 201) return;

    const responseJson = await response.json();

    if (response.status >= 400) {
        const msg = responseJson.msg || responseJson.message;
        throw {
            message: msg,
        };
    }

    return responseJson;
}

export async function post(url, obj) {
    console.log('hei hei', _appUrl(url));

    const response = await fetch(
        _appUrl(url),
        setHeaders('POST', JSON.stringify(obj)),
    );

    if (response.status === 201) return;

    const responseJson = await response.json();

    if (response.status >= 400) {
        const msg = responseJson.msg || responseJson.message;
        throw {
            message: msg,
        };
    }

    return responseJson;
}

export async function del(url, obj) {
    const response = await fetch(
        _appUrl(url),
        setHeaders('DELETE', JSON.stringify(obj)),
    );

    if (response.status === 201) return;

    const responseJson = await response.json();

    if (response.status >= 400) {
        const msg = responseJson.msg || responseJson.message;
        throw {
            message: msg,
        };
    }

    return responseJson;
}

export async function put(url, obj) {
    const response = await fetch(
        _appUrl(url),
        setHeaders('PUT', JSON.stringify(obj)),
    );

    if (response.status === 201) return;

    const responseJson = await response.json();

    if (response.status >= 400) {
        const msg = responseJson.msg || responseJson.message;
        throw {
            message: msg,
        };
    }

    return responseJson;
}
