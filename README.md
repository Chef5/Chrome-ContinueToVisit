# Chrome-ContinueToVisit

浏览器插件：常用网站外链直接跳转，无需点击类似”继续访问“的确认按钮。

**已支持：**

- 知乎
- CSDN
- 简书
- QQ邮箱
- 掘金
- segmentfault
- ...更多网站可提交pr

**提交网站pr：**

在`src/websites.json`中按以下格式追加内容，并提交pr

``` json
{
  "name": "知乎",
  "domain": "link.zhihu.com",
  "exactMatch": "",
  "targetKey": "target"
}
```

- name: 站点名称
- domain: 站点域名
- exactMatch: 精确校验url（少数网站中转域名和主站点域名是一样的，例如”简书“，这时候就需要更精确的url匹配了）
- targetKey: 目标url字段

## 安装包

从 [Releases](https://github.com/Patrick-Jun/Chrome-ContinueToVisit/releases) 列表中找到最新版本，下载 `crx` 包；

浏览器输入：`chrome://extensions/`；

拖拽安装包到浏览器完成安装。

## 从商店安装

- Chrome: https://chrome.google.com/webstore/detail/continue-to-visit/nabahgobhkeppllhmnkplegdfkehliab
- Firefox: https://addons.mozilla.org/zh-CN/firefox/addon/continue-to-visit/
- Edge: https://microsoftedge.microsoft.com/addons/detail/lebcfgkhnnokjclpgkddapohlkjeemoa


> 可能有的伙伴无法访问websotre，可通过下面的方式手动安装
## 开发(手动安装)

- 开启开发者模式，重启浏览器后
- 浏览器输入：`chrome://extensions/`
- 加载本项目文件夹
