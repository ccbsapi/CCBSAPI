### CCBSAPI
CCBSAPIとは、"Convenient Chat Bot Service API"の略で、 幅広い環境で様々な便利なツールを使うことを可能にする、チャットボット型のAPIサービスです。
インターネット上の様々な便利な外部サービスやCCBSAPI独自のサービスなどを繋ぎ、 様々なプラットフォームからの便利な機能の利用を容易にします。

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
request={
  "method":"POST", //or "GET"
  "Content-Type":"application/json",//or application/x-www-form-urlencoded
  "body":{
    "i":[
      {"type":"text","text":"ウィキ検索りんご"},
    ],
    "o":{
      "inf":"機能が見つかりませんでした"
    }
  }
}
```

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
