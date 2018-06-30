# FirstForever
## 摘要：
人生有很多第一次，如第一次恋爱、第一次对另外一个人说我爱你、第一次找到工作、第一次领到工资等等，但是随着时间流逝，还来不及回味就已经忘却。如果有个地方能让你的这一刻永恒流传，你愿意留下你的痕迹吗？
## 产品用途：
把你觉得重要的一段文字或图片，存放到链上，让经典永流传，随时回味。
## 产品形态：
基于Nervos AppChain、在Neuron上运行的DApp.
## Slogan:
First Forever - 最初即永恒
## pseudocode:
```java
	1. input page: input your message/image

	content_type: "text"
	content_body: "a message"
	content_body: baseb64_encode(File.new(content_body))

  	content_json = {
  	  content_type: 'text',
  	  content_body: 'base64(content)',
	}


	content_hex = hex(json.to_string()) # => "09776acdf..."


	2. return a tx_id

	3. show page: view for tx_id
	
	content_json = "09776acdf..."
	
	{
	  content_type: 'text',
 	 content_body: 	'VFppZgAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAgAAAAAAAAAQAAAAAgAAAAjIXAGAyPoncMnVDoDK21rwHro2AB9pf3AgfmiAIUlhcCJeSoAjKUNwJEdnACUSX/AmJ0kAJvJB8CgHKwAo0iPwAAEAAQABAAEAAQABAAEAAQAAfpABAAAAcIAABENEVABDU1QAAAAAAA==',
	}

	content_type = content_json["content_type"]
	content_body = base64_decode(content_json["content_body"])

	if $content_type == "text"
 	 <textarea>$content_body</textarea>
	else
 	 <img src="base64: $content_body" />
```
## 项目管理：
[Trello board: First Forever(最初即永恒)](https://trello.com/b/knv04a77/first-forever最初即永恒 "悬停显示")
## 原型图：
[MockPlus](https://free.modao.cc/app/jQl9OKzlyvPvqvxJSqYUApg3mVwy5GP#screen=s90194FB9B91529933520728 "悬停显示")
## refs:
* DEVS
    * [开发文档](https://cryptape.github.io/Nervos-AppChain-Docs/#/ "悬停显示")
    * [示例代码](https://github.com/CryptapeHackathon/Hackthon-web3-neuron-example "悬停显示")







