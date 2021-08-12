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
  "name": "知乎", // 站点名称
  "domain": "link.zhihu.com", // 站点域名
  "exactMatch": "", // 精确校验
  "targetKey": "target", // 目标url字段
},
```

## 安装

- Chrome: https://chrome.google.com/webstore/detail/continue-to-visit/nabahgobhkeppllhmnkplegdfkehliab
- Firefox: https://addons.mozilla.org/zh-CN/firefox/addon/continue-to-visit/
- Edge: https://microsoftedge.microsoft.com/addons/detail/lebcfgkhnnokjclpgkddapohlkjeemoa


> 可能有的伙伴无法访问websotre，可通过下面的方式手动安装
## 开发(手动安装)

- 开启开发者模式，重启浏览器后
- 浏览器输入：`chrome://extensions/`
- 加载本项目文件夹
