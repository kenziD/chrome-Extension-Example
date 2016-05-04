## chrome.tabs API 
操纵tab标签的页面。
如果要使用这个api，需要在manifest里设置permmistion：tabs

```
  "permissions": [
    "tabs", "http://*/*", "https://*/*"
  ]
```

### 从content script发送一个message
```
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
```

### 从扩展的script（background\popup）里发送消息。extension需要判断往哪个标签页发送消息。所以有一个query方法。
```
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
```
## 原生js没办法取消时间的监听，好奇怪。不知道为什么。jquery倒是不错。

## chrome.tabs.sendMessage是extension给content scripts发送消息
## chrome.runtime.sendMessage则做不到。他可以用来发送任何消息。除了给content scripts发送。比如可以从popup.js给background.js发送消息。

## 	for(var i= 0;i<otherLi.length;i++){
		//如果用display:block就没有动画过度效果了。奇怪。要怎么实现呢？
		otherLi[i].style.visibility = "visible";
	}
	otherLi[0].style.transform  = "rotate(0deg)";
	otherLi[1].style.transform  = "rotate(0deg)";

	应该写个异步函数。监听上一个动画完成，开始下一个。
	封装的不够好。拓展性很差。

## 改变颜色那个不是根据background改的。不够智能。但是原生js获取不到那个不知道为什么。
## 异步编程 等待动画结束

