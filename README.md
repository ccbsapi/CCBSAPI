### CCBSAPI
CCBSAPIとは、"Convenient Chat Bot Service API"の略で、 幅広い環境で様々な便利なツールを使うことを可能にする、チャットボット型のAPIサービスです。
インターネット上の様々な便利な外部サービスやCCBSAPI独自のサービスなどを繋ぎ、 様々なプラットフォームからの便利な機能の利用を容易にします。

### 仕様

httpsリクエスト:
|Method|GET/POST|

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
