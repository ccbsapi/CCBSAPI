### CCBSAPI
CCBSAPIとは、"Convenient Chat Bot Service API"の略で、 幅広い環境で様々な便利なツールを使うことを可能にする、チャットボット型のAPIサービスです。
インターネット上の様々な便利な外部サービスやCCBSAPI独自のサービスなどを繋ぎ、 様々なプラットフォームからの便利な機能の利用を容易にします。
ccbsapi.html.xdomain.jp

###Web API

ccbsapi.php.xdomain.jp/v2/

### 仕様

httpsリクエストヘッダ:
| Method | GET/POST |
|--------|----------|
| Content-Type| application/json <br> application/x-www-form-urlencoded |

httpリクエストボディ:
| key | value |
|-----|-------|
| i | CCBSAPI Inputs Object |
| o | CCBSAPI Options Object |

```JavaScript
{
  "method":"POST", //or "GET"
  "Content-Type":"application/json",//or application/x-www-form-urlencoded
  "body":{
    "i":[
      {"type":"text","text":"検索ほげほげ"},
    ],
    "o":{
      "inf":"機能が見つかりませんでした"
    }
  }
}
```

httpレスポンス:
```JavaScript
{
    "data": [
        {
            "type": "text",
            "content": "https://www.google.co.jp/search?q=%E3%81%BB%E3%81%92%E3%81%BB%E3%81%92"
        }
    ],
    "html": "<div class=\"ccbs_text\"><a href=\"https://www.google.co.jp/search?q=%E3%81%BB%E3%81%92%E3%81%BB%E3%81%92\">https://www.google.co.jp/search?q=%E3%81%BB%E3%81%92%E3%81%BB%E3%81%92</a></div>",
    "error":  false
}
```

Response Object(レスポンス.data):
| data.type | key | value |
|-----------|-----|-------|
| object | content | Array[Response Objects] |
| text | content | text |
| image | url | image URL |
| audio | url | audio URL |


### 使い方
```JavaScript
var textData="YouTube検索ほげほげ";
 var endpoint="http://ccbsapi.php.xdomain.jp/v2/";
 var postObj=[{'type':'text','text':textData}];
 var xhr=  new XMLHttpRequest();
 xhr.open("POST",endpoint);
 xhr.setRequestHeader('Content-Type','application/json');
 xhr.send(JSON.stringify({'i':postObj}));
 xhr.onreadystatechange= function(){
   if(xhr.readyState==4){
    console.log(JSON.parse(xhr.responseText).html);
  }
}
```
