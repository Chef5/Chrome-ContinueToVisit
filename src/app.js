/*
 * @Author: Patrick-Jun 
 * @Date: 2021-01-31 19:21:01 
 * @Last Modified by: Patrick-Jun
 * @Last Modified time: 2021-01-31 21:40:54
 */

"use strict";
// 需要校验的网址配置
const websites = [
  {
    name: '知乎', // 站点名称
    domain: 'link.zhihu.com', // 站点域名
    exactMatch: '', // 精确校验
    targetKey: 'target', // 目标url字段
  },
  {
    name: 'CSDN',
    domain: 'link.csdn.net',
    exactMatch: '',
    targetKey: 'target',
  },
  {
    name: '简书',
    domain: 'www.jianshu.com',
    exactMatch: 'www.jianshu.com/go-wild?',
    targetKey: 'url',
  },
  {
    name: 'QQ邮箱',
    domain: 'mail.qq.com',
    exactMatch: 'mail.qq.com/cgi-bin/readtemplate?t=safety&check=false',
    targetKey: 'gourl',
  },
];

run();

/**
 * @description 执行
 */
function run() {
  const matchParams = detectUrl();
  if (!matchParams) {
    return;
  }
  const targetUrl = getTargetUrl(window.location.href, matchParams);
  alert(targetUrl)
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

