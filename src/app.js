/*
 * @Author: Patrick-Jun 
 * @Date: 2021-01-31 19:21:01 
 * @Last Modified by: Patrick-Jun
 * @Last Modified time: 2021-12-07 21:10:46
 */

"use strict";
// 校验网址更新频率
const updateHours = 24;
// 默认网址配置
const websitesDefault = [
  {
    name: '知乎',
    domain: 'link.zhihu.com',
    exactMatch: '',
    targetKey: 'target'
  },
  {
    name: 'CSDN',
    domain: 'link.csdn.net',
    exactMatch: '',
    targetKey: 'target'
  },
  {
    name: '简书',
    domain: 'www.jianshu.com',
    exactMatch: 'www.jianshu.com/go-wild?',
    targetKey: 'url'
  },
  {
    name: 'QQ邮箱',
    domain: 'mail.qq.com',
    exactMatch: 'mail.qq.com/cgi-bin/readtemplate?t=safety&check=false',
    targetKey: 'gourl'
  },
  {
    name: 'segmentfault',
    domain: 'link.segmentfault.com',
    exactMatch: '',
    targetKey: 'url'
  },
  {
    name: '掘金',
    domain: 'link.juejin.cn',
    exactMatch: '',
    targetKey: 'target'
  },
  {
    name: '微信开放社区',
    domain: 'developers.weixin.qq.com',
    exactMatch: 'developers.weixin.qq.com/community/middlepage/href',
    targetKey: 'href'
  },
  {
    name: '腾讯文档',
    domain: 'docs.qq.com',
    exactMatch: 'https://docs.qq.com/scenario/link.html',
    targetKey: 'url'
  }
];

// 需要校验的网址配置
let websites = websitesDefault;

// 运行
try {
  chrome.storage.local.get(['__chrome_ctv_websites'], (result) => {
    websites = JSON.parse(result['__chrome_ctv_websites']);
    run();
  });
} catch (error) {
  websites = websitesDefault;
  run();
}

// 更新匹配站点
updateWebsites();

/**
 * @description 执行
 */
function run() {
  const matchParams = detectUrl();
  if (!matchParams) {
    return;
  }
  const targetUrl = getTargetUrl(window.location.href, matchParams);
  if (!targetUrl) {
    return;
  }
  window.location.replace(targetUrl);
}

/**
 * @description 检测当前链接
 */
function detectUrl() {
  let rt = null;
  websites.some(e => {
    if (location.host === e.domain) {
      return rt = e;
    }
    return false;
  });
  return rt;
}

/**
 * @description 获取目标链接
 * @param fullUrl 全链接
 * @param matchParams 匹配参数
 * @returns {string} 目标链接
 */
function getTargetUrl(fullUrl, matchParams) {
  let targetUrl = '';
  // 精确校验
  if (matchParams?.exactMatch && !fullUrl.includes(matchParams.exactMatch)) {
    return targetUrl;
  }
  // const regexp = new RegExp(`^${ matchParams.targetKey }=.*`);
  const urlPar = fullUrl.split('?');
  if (urlPar.length > 1) {
    urlPar[1].split('&').some(e => {
      const t = e.split('=');
      if (t[0] === matchParams.targetKey) {
        return targetUrl = t[1];
      }
      return false;
    });
  }
  return decodeURIComponent(targetUrl);
}

/**
 * @description 更新网站列表
 * @returns {*} 网站列表
 */
function updateWebsites() {
  // 从github更新website
  try {
    chrome.storage.local.get(['__chrome_ctv_update'], (result) => {
      const now = (new Date()).getTime();
      const update = result['__chrome_ctv_update'];
      if (!update || now - update > updateHours * 3600000) {
        const protocol = location.protocol;
        get(`${protocol}//v1.hot.isdz.cn/github/Chrome-ContinueToVisit/main/src/websites.json`, (res) => {
          chrome.storage.local.set({ '__chrome_ctv_websites': JSON.stringify(res || []) });
          chrome.storage.local.set({ '__chrome_ctv_update': now });
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description get请求
 * @param url 目标地址
 * @param callback 回调
 */
function get(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.send();
  xhr.onload = function() {
    try {
      const json = JSON.parse(xhr.responseText);
      callback(json);
    } catch (error) {
      callback(false);
    }
  }
}


