
/*!***************************
 *
 * CCBSAPI.gs v3.0
 
 Copyright (c) 2020 CCBSAPI
 
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
 
 !(f_search_translate||f_search_youtube||ajax_GET||f_(en|de)code_base64)⇔JavaScript
 
 *
 *
 *
 *
 *
 * Convenient Chat Bot Service:
 * 
 * http://ccbsapi.html.xdomain.jp/
 *
 *
 *  @version: 3.0
 *
 *
 *  @using:
 *
 *   using math.js API
 *   using WolframAlpha API
 *   using Google Youtube API
 *   using Google Translate API
 *   using Yahoo 乗り換え案内
 *   using Wikipedia
 *   using bitly API
 *   using 気象庁　ホームページ
 *   using IBM Watoson Text to Speech API
 *   using Geocoding API
 *   using pdfconvert
 *
 *  @Examples:
 *
 * var c=[
 *        {'type':'text','text':'検索便利Bot_CCBS'}
 *       ];
 *
 * var res=ccbs.post(c);
 * 
 * 
 *
 *    +------+--------+
 *    | name | value  |
 *    +------+--------+
 *    |   i  |Obj List|
 *    +------+--------+
 *
 *
 *    Request object:
 *     {"type":"{type}","{type}":"DataString"}
 *
 *
 *
 ***************************/
 //function doPOST(e){
 function doPost(e){
  var ep=JSON.parse(e.postData.contents);
  return doOut(ep.i,ep.o||{});
 }
 
 function doGet(e){
  return doOut(JSON.parse(e.parameter.i),JSON.parse(e.parameter.o||"{}"));
 }
 
 function doOut(obj,ops){
  ccbs.e.inf=(typeof ops.inf=='string')?ops.inf:ccbs.e.inf;
  var ret_obj=ccbs.post(obj);
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(ret_obj,null,4));
  
  return output;
 }
 
/****変数群 ****/
/***基本変数***/
 var ccbs = {
            'list':['post','f','v','c','d']
           ,'post':function(m){return f_ccbs(m)}
            
           ,'f':{
           /*functions*/
             'string':{
                'list':[['math','数学'],['encode','エンコード'],['decode','デコード'],['url','url'],['text',"テキスト"],['recipe','レシピ'],['weather','気象情報']]
               ,'devlist':['post','root','math','encode','decode','url','text','weather']
               ,'post':{
                       's':function(m){return f_ccbs_s(m)}
                       }
                       
               ,'root':{
                       'list':['wolf','ewolf','検索','画像検索','Twitter検索','ヤフー検索','マップ検索','乗り換え検索','YouTube検索','ウィキ検索',"経路検索",'翻訳','英訳','レート',"実行","ニュース"]
                      ,'devlist':['wolf','ewolf','google','image','twitter','yahoo','map','norikae','youtube','wiki',"route",'translate','toEng','rate',"runCode","news"]
                      ,'wolf':f_wolf
                      ,'ewolf':f_search_ewolf
                      ,'google':f_search_google
                      ,'image':f_search_image
                      ,'twitter':f_search_twitter
                      ,'yahoo':f_search_yahoo
                      ,'map':f_search_map
                      ,'norikae':f_search_norikae
                      ,'youtube':f_search_youtube
                      ,'wiki':f_search_wiki
                      ,"route":f_search_route
                      ,'translate':f_search_translate
                      ,'toEng':f_search_toEng
                      ,'rate':f_search_rate
                      ,'runCode':f_runCode
                      ,'news':f_search_news
               }
               
               ,'math':{
                       'list':[['calc','計算'],['minKB','最小公倍数'],['maxKY','最大公約数'],['daisu','代数']]
                      ,'calc':function(m){return f_math_calc(m)}
                      ,'minKB':function(m){return f_math_minKB(m.split(','))}
                      ,'maxKY':function(m){return f_math_maxKY(m.split(','))}
                      ,'daisu':{
                                 'list':[['factor','因数分解'],['D','微分'],['integrate','積分'],['reduce','求解']]
                                ,'factor':function(m){return f_wolf('Factor['+m+']')}
                                ,'D':function(m){return f_wolf('D['+m+']')}
                                ,'integrate':function(m){return f_wolf('Integral['+m+']')}
                                ,'reduce':function(m){return f_wolf('Reduce['+m+']')}
                       }
                }
                ,'encode':{
                         'list':[['binary','バイナリ'],['utf8','utf8'],['utf16','utf16'],['utf32','utf32'],['escape','escape'],['url','url'],['qurl','qurl'],['base64','base64'],['html','html']]
                        ,'binary':f_encode_binary
                        ,'utf8':f_encode_utf8
                        ,'utf16':f_encode_utf16
                        ,'utf32':f_encode_utf32
                        ,'escape':f_encode_escape
                        ,'url':f_encode_url
                        ,'qurl':f_encode_qurl
                        ,'base64':f_encode_base64
                        ,'html':f_encode_html
                }
                ,'decode':{
                        'list':[['binary','バイナリ'],['utf8','utf8'],['utf16','utf16'],['utf32','utf32'],['escape','escape'],['url','url'],['qurl','qurl'],['base64','base64'],['html','html']]
                        ,'binary':f_decode_binary
                        ,'utf8':f_decode_utf8
                        ,'utf16':f_decode_utf16
                        ,'utf32':f_decode_utf32
                        ,'escape':f_decode_escape
                        ,'url':f_decode_url
                        ,'qurl':f_decode_qurl
                        ,'base64':f_decode_base64
                        ,'html':f_decode_html
                }
                ,'url':{
                         'list':[['short','短縮'],['bitmap','ビットマップ'],['qr','qr'],['image',"画像化"]]
                         ,'short':f_url_short
                         ,'bitmap':f_url_bitmap
                         ,'qr':f_url_qr
                         ,'image':f_url_image
                }
                ,'text':{
                          'list':[['speech','読み上げ'],["length","文字数"],["replace","置換"],["replace_reg","正規置換"],["indent","コード整形"]]
                          ,'speech':f_text_speech
                          ,"length":f_text_length
                          ,"replace":f_text_replace
                          ,"replace_reg":f_text_replace_reg
                          ,"indent":f_text_indent
                }
                ,'recipe':{
                          'list':[['search','検索']]
                          ,'search':f_recipe_search
                }
                ,'weather':{
                          'list':[['weather','天気'],['temp','気温'],['rain','降水'],['thunder','雷'],['warn','予報'],['satellite','衛星']]
                          ,'weather':f_weather_weather
                          ,'temp':f_weather_temp
                          ,'rain':f_weather_rain
                          ,'thunder':f_weather_thunder
                          ,'warn':f_weather_warn
                          ,'satellite':f_weather_satellite
                }
                       
                }
                ,'toHTML':function(m){return ff_resToHTML(m)}
               } 
           ,'e':{
           /*errors*/
                'inf':'Item Not Found'
                }
                
           ,'c':{
           /*commands*/
                'list':["help","version","tree","commands"]
               ,'help':function(m){return ff_help(m)}
               ,'version':function(){return'3.0'}
               ,'tree':function(m){return ff_HelpTree(m)}
               ,'commands':function(){return ccbs.c.list.join('\n');}
                }
            
           ,'d':{
            /*datas*/
                'htu':{
                 /*how to use*/
                       'list':[[['math','数学']],[['encode','エンコード']],[['decode','デコード']],[['url','url']],[["text","テキスト"]],[['recipe','レシピ']],[['weather','気象情報']]
                               ,['wolf','wolf'],['ewolf','ewolf'],['google','検索'],['image','画像検索'],['youtube','YouTube検索'],['yahoo','ヤフー検索']
                               ,['twitter','Twitter検索'],['map','マップ検索'],['norikae','乗り換え検索'],['wiki','ウィキ検索'],['route',"経路検索"],['translate','翻訳'],['toEng','英訳'],['rate','レート'],["runCode","実行"],['news',"ニュース"]]
                      ,'wolf':'wolf〇〇\nと送信すると、〇〇をWolframAlphaAPIにリクエストしたレスポンスを返します。'
                      ,'ewolf':'ewolf〇〇\nと送信すると、〇〇を英語に翻訳してからwolf機能に渡した結果を返します。'
                      ,'google':'検索〇〇\nと送信すると、〇〇のGoogle検索結果のURLが返されます。'
                      ,'image':"画像検索〇〇\nと送信すると、〇〇というキーワードでGoogle画像検索結果のURLを返します。"
                      ,'youtube':'YouTube検索〇〇 (,n)\nと送信すると、〇〇のYouTube検索結果のURLと、検索結果のリストがn個返されます。(デフォルトで5個)'
                      ,'yahoo':'ヤフー検索〇〇\nと送信すると、〇〇のYahoo!検索結果のURLが返されます。'
                      ,'twitter':'Twitter検索〇〇\nと送信すると、〇〇のTwitter検索結果のURLが返されます。'
                      ,'map':'マップ検索〇〇\nと送信すると、〇〇のGoogleマップ検索結果のURLが返されます。'
                      ,'norikae':'乗り換え検索AA,BB(,CC,DD) と送信すると、AA駅からBB駅までのCC(日時)、DD(検索条件)のルートをYahoo!乗り換え案内で検索します。\n【例】\n乗り換え検索渋谷,東京,8/23/13:25,安着'
                      ,'wiki':"ウィキ検索〇〇\nと送信すると、〇〇をWikipediaで検索した結果(URL,概要,目次)を返します。"
                      ,"route":"出発地,目的地(,タイプ)\nと指定すると、出発地から目的地までの経路(テキスト・画像)と距離を返します。"
                               +"\nタイプに｢距離｣を指定できます。デフォルトは｢時間｣です。"
                      ,'translate':'翻訳AA,BB,CCで、AAをBB語からCC語にGoogle翻訳します(BB,CCは言語コード)。\n\nBBを指定しない場合、自動判定します。\nCCを指定しない場合、日本語に翻訳します。'
                      ,'toEng':'英訳〇〇で、〇〇を英語に翻訳します。'
                      ,'rate':'指定した通貨ペアコード(USDJPYなど)の為替レートを返します。取得できないペアが渡された場合、'
                              +'取得可能な全てのペアにおけるレートを返します。'
                      ,'runCode':"言語\nコード\nで、プログラムを実行します。"
                      ,'news':"Yahooニュースを取得します"
                      ,'math':{
                      /*数学*/
                              'list':[['calc','計算'],['minKB','最小公倍数'],['maxKY','最大公約数'],[['daisu','代数']]]
                              ,'calc':'四則演算を行います。積分等の高度な数学や求解などは、wolf機能を使用してください。\n\n(MathJSを使用)'
                              ,'minKB':',(カンマ)で区切られた数の最小公倍数を返します。'
                              ,'maxKY':',(カンマ)で区切られた数の最大公約数を返します。'
                              ,'daisu':{
                                        'list':[['factor','因数分解'],['D','微分'],['integrate','積分'],['reduce','求解']]
                                       ,'factor':'式の因数分解を返します。'
                                       ,'D':'式の微分を返します。'
                                       ,'integrate':'式の積分を返します。'
                                       ,'reduce':'式の解を返します。'
                               }
                       }
                       ,'encode':{
                               'list':[['binary','バイナリ'],['utf8','utf8'],['utf16','utf16'],['utf32','utf32'],['escape','escape'],['url','url'],['qurl','qurl'],['base64','base64'],['html','html']]
                               ,'binary':"16進数をバイナリ(2進数)に変換します。;で区切ると、2番目に指定した桁より上は切り捨てます。"
                               ,'utf8':"テキストをUTF-8で16進数にエンコードします。"
                               ,'utf16':"テキストをUTF-16で16進数にエンコードします。"
                               ,'utf32':"テキストをUTF-32で16進数にエンコードさします。"
                               ,'escape':"テキストをUTF-16で\\uxxxxのUnicode形式にエンコードします。"
                               ,'url':"テキストをURLエンコードします。"
                               ,'qurl':"テキストをURLクエリパラメター用にURLエンコードします。"
                               ,'base64':"テキストをBase64でエンコードします。"
                               ,'html':"テキストをHTMLエンコードします。"
                       }
                       ,'decode':{
                               'list':[['binary','バイナリ'],['utf8','utf8'],['utf16','utf16'],['utf32','utf32'],['escape','escape'],['url','url'],['qurl','qurl'],['base64','base64'],['html','html']]
                               ,'binary':"2進数(バイナリ)を16進数に変換します。;で区切ると、2番目に指定した桁より上は切り捨てます。"
                               ,'utf8':"16進数をUTF-8でテキストにデコードします。"
                               ,'utf16':"16進数をUTF-16でテキストにデコードします。"
                               ,'utf32':"16進数をUTF-32でテキストにデコードします。"
                               ,'escape':"\\uxxxxというUnicode形式をUTF-16でテキストにデコードします。"
                               ,'url':"テキストをURLデコードします。"
                               ,'qurl':"テキストをURLクエリパラメター用にURLデコードします。"
                               ,'base64':"テキストをBase64でデコードします。"
                               ,'html':'テキストをHTMLデコードします。'
                       }
                       ,'url':{
                               'list':[['short','短縮'],['bitmap','ビットマップ'],['qr','qr'],["image","画像化"]]
                               ,'short':'URLをbit.lyで短縮します。'
                               ,'bitmap':'Base64エンコードされたBitMapのDataスキーム(data:image/~~;base64,~~~)から、画像を生成します。'
                               ,'qr':"QRコードを作成します。"
                               ,"image":"webサイトのURLから画像を生成します。"
                       }
                       ,'text':{
                               'list':[["speech","読み上げ"],["length","文字数"],["replace","置換"],["replace_reg","正規置換"],["indent","コード整形"]]
                               ,"speech":"テキストを読み上げます。言語を指定するには、先頭にen;(英語)、cn;(中国語)、es;(スペイン語)、ja;(日本語)をつけてください。デフォルトは日本語です。"      
                               ,"length":"テキストの文字数を取得します。"
                               ,"replace":"AA,BB,CC\nで、CCに含まれる全てのAAをBBに置換します。"
                               ,"replace_reg":"AA,BB,CC\nで、CCに含まれる全てのAAを正規表現でBBに置換します。但し、正規表現の()は使えず、文字として解析されます。"
                                             +"\\はエスケープ文字です。"
                               ,"indent":"{}に従ってプログラムコードを整形します。"
                       }
                       ,'recipe':{
                               'list':[['search','検索']]
                               ,'search':'指定されたワードでレシピを検索します。'
                       }
                       ,'weather':{
                               'list':[['weather','天気'],['temp','気温'],['rain','降水'],['thunder','雷'],['warn','予報'],["satellite","衛星"]]
                               ,'weather':'｢今日｣または｢明日｣を指定すると、その日の天気(全国・気象庁)の画像を返します。'
                               ,'temp':'｢今日｣または｢明日｣を指定すると、その日の気温(全国・気象庁)の画像を返します。'
                               ,'rain':'降水データ(気象庁)を取得します。時間,地域 の順番で指定してください。'
                                       +'\n時間:n分前(マイナスの場合は-n分後)のデータを取得します。'
                                       +'\n地域:画像に表示する地域を指定できます。(関東地方 など)'
                               ,'thunder':'雷データ(気象庁)を取得します。時間,地域 の順番で指定してください。'
                                       +'\n時間:n分前(マイナスの場合は-n分後)のデータを取得します。'
                                       +'\n地域:画像に表示する地域を指定できます。(関東地方 など)'
                               ,'warn':'気象庁が出している警報・注意報を取得します。地域,種類 の順番で指定してください。'
                                       +'デフォルトは全国,全ての警報・注意報です。'
                               ,'satellite': "気象衛星写真(気象庁)を取得します。時間,範囲,方法,色 の順番で指定してください。"
                                            +"\n時間:n分前のデータを取得します。10分単位で12時間前のデータまで取得できます。"
                                            +"\n範囲:全球 と指定すると、画像の範囲が全球になります。デフォルトは日本周辺です。"
                                            +"\n方法:赤外線、可視光または水蒸気が指定できます。デフォルトは赤外線です。"
                                            +"\n色:白黒 と指定すると、白黒になります。デフォルトは着色です。"
                       }
                       
                }
          }
   };



/**************************
 *
 *
 *
 *
 *      以下 関数群
 *
 *
 *
 *
**************************/
 
 
 /*********************************************
 **********************************************
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * * 
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *      内部処理関数
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * * 
 * * * *
 **********************************************
 *********************************************/
 
 
 
 /****処理関数****/
 
 
 
 /******************
 *                 *
 *  ccbsメイン関数   *
 *                 *
 ******************/
 function f_ccbs(messages){
 try{
  var results=[];
  for(var mi=0;mi<messages.length;mi++){
   var message=messages[mi];
   var type=message.type;
   if(type=="text"){
    var response=f_ccbs_s(message.text);
    var resType=f_typeToCCBS(typeof response);
    results.push({'type':resType,'content':response});
   }
  }
 // Logger.log(results);
  return {'data':results,'html':ccbs.f.toHTML(results),"error":false};
  }catch(e){
  var et=e.toString();
   return {'data':[{'type':'text','content':'エラーが発生しました。\n\n'+et+JSON.stringify(e)/*=e.lineNumber*/}],'html':'<div class="ccbs_text">エラーが発生しました。<br><br>'+htmlUnescape(et,1)+'</div>',"error":true}
  }
 }
 
 /*******************
 *                  *
 * ccbs@String関数   *
 *                  *
 *******************/
 function f_ccbs_s(mes){
  var lines=mes.split('\n');
  var lineL=lines.length;
  var mtop=lines[0];
  var mufir=(mes+'\n').replace(/.*?\n/,'');
  //コマンド判定
  if(mtop&&(ccbs.c.list.indexOf(mtop)+1)){
   return ccbs.c[mtop](mufir);
  }
  
  /*current objects*/
  var curobj=ccbs.f.string;
  var curhtuobj=ccbs.d.htu;
  /**<no-reline>**/
  if(mes.slice(0,4).toLowerCase()=='wolf'){
   var key=mes.slice(4);
   if(key){
    return curobj.root.wolf(key);
   }else{
    return curhtuobj.wolf;
   }
  }else
  if(mes.slice(0,5).toLowerCase()=='ewolf'){
  var key=mes.slice(5);
  if(key){
  return curobj.root.ewolf(key);
  }else{
  return curhtuobj.ewolf;
  }
  }else
  if(mes.slice(0,2)=="検索"){
   return curobj.root.google(mes.slice(2));
  }else
  if(mes.slice(0,4)=="画像検索"){
   var key=mes.slice(4);
   return key?curobj.root.image(key):curhtuobj.image;
  }else
  if(mes.slice(0,9).toLowerCase()=="youtube検索"){
   var key=mes.slice(9);
   if(key){
    return curobj.root.youtube(key);
   }else{
    return curhtuobj.youtube;
   }
  }else
 
  if(mes.slice(0,5)=="ヤフー検索"){
   var key=mes.slice(5);
   return key?curobj.root.yahoo(key):curhtuobj.yahoo;
  }else
 
  if(mes.slice(0,9).toLowerCase()=="twitter検索"){
   var key=mes.slice(9);
   return key?curobj.root.twitter(key):curhtuobj.twitter;
  }else
 
  if(mes.slice(0,5)=="マップ検索"){
   var key=mes.slice(5);
   return key?curobj.root.map(key):curhtuobj.map;
  }else
  if(mes.slice(0,6)=="乗り換え検索"){
   var kw=mes.slice(6);
    return kw?curobj.root.norikae(kw):curhtuobj.norikae;
  }else
  if(mes.slice(0,5)=="ウィキ検索"){
    var kw=mes.slice(5);
    return kw?curobj.root.wiki(kw):curhtuobj.wiki;
  }else
  if(mes.slice(0,4)=="経路検索"){
  var kw=mes.slice(4);
  return kw?curobj.root.route(kw):curhtuobj.route;
  }else
  if(mes.slice(0,2)=="翻訳"){
  var kw=mes.slice(2);
  return kw?curobj.root.translate(kw):curhtuobj.translate;
  }else
  if(mes.slice(0,2)=="英訳"){
  var kw=mes.slice(2);
  return kw?curobj.root.toEng(kw):curhtuobj.toEng;
  }else
  if(mes.slice(0,3)=="レート"){
   var kw=mes.slice(3);
   return kw?curobj.root.rate(kw):curhtuobj.rate;
  }else
  if(mes.slice(0,2)=="実行"){
    var kw=mes.slice(2);
    return kw?curobj.root.runCode(kw):curhtuobj.runCode;
  }else
  if(mes.slice(0,4)=="ニュース"){
    var kw=mes.slice(4);
    return kw?curobj.root.news(kw):curhtuobj.news;
  }
  
  /**</no-reline>**/
  
  var rf=ff_searchFunction(ccbs.f.string,lines);
  return (typeof rf.text=='string')?rf.text:rf[0](rf[1].join('\n'));
 }
 
 
 
 
 
 /******検索系統*******/
 
 /*ewolf*/
 function f_search_ewolf(key){
  return  ccbs.f.string.root.wolf(ccbs.f.string.root.translate(key,"en"));
 }
 
 /*Google検索*/
 
 function f_search_google(key){
  return "https://www.google.co.jp/search?q="+encodeURIComponent(key);
 }
 
 function f_search_image(key){
  return "https://www.google.co.jp/search?q="+encodeURIComponent(key)+"&tbm=isch";
 }
 
 
 /*Twitter検索*/
 function f_search_twitter(key){
  return "https://twitter.com/search?q="+encodeURIComponent(key);
 }
 
 /*ヤフー検索*/
 function f_search_yahoo(key){
  return "https://search.yahoo.co.jp/search?&ei=UTF-8&p="+encodeURIComponent(key);
 }
 
 /*マップ検索*/
 function f_search_map(key){
  return "https://www.google.com/maps/search/"+encodeURIComponent(key);
 }
 
 /*Google翻訳*/
 function f_search_translate(text,to){
 var txs=(text+"").split(',');
 try{
 return to?LanguageApp.translate(text,"",to):LanguageApp.translate(txs[0],txs[1]||"",txs[2]||"ja");
 }catch(e){
  return "翻訳できませんでした";
 }
 }
 
 function f_search_toEng(text){
  return ccbs.f.string.root.translate(text,'en');
 }
 
 
function f_search_wiki(kw){
var url ="https://ja.m.wikipedia.org/wiki/"+encodeURIComponent(kw.replace(/\n/g,'')+"");
 try{
   var rmTag=function(text){
     return text.replace(/<[^>]*?>/g,function(i){
      var rt=''; 
      if(i=="<br>"){rt=i}else
      if(i=="<h2>"){rt="<br><br>【"}else
      if(i=="</h2>"){rt="】<br><br>"}
      return rt;
     });
   }
    var code=ajax_GET(url);
    var section=(code.match(/<section ?[^>]*?>(.|\n)*?<\/section>/)||[''])[0];
    section=section.replace(/<(.*?)( [^>]*?)?>/g,'<$1>').replace(/^(.|\n)*?<\/table><p>/,'').replace(/\n/g,'').replace(/<(li|tr|th|br)>/g,'<br>');
    return url+"\n\n"+htmlUnescape(rmTag(section||"内容が取得できませんでした。"));
  }catch(e){
    return url+"\n\n取得エラー";
  }
}
 
 
function f_search_route(key){
try{
 var from=encodeURIComponent(key.split(',')[0]||"");
 var to=encodeURIComponent(key.split(',')[1]||"");
 var type="fastest";
 if(key.split(',')[2]=="距離"){type="shortest"}
 var apikey="lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24";
 var endp="https://www.geocoding.jp/?q=";
 var fpos=ajax_GET("http://ccbsapi.php.xdomain.jp/api/curl.php?url="+encodeURIComponent(endp+from));
 var tpos=ajax_GET("http://ccbsapi.php.xdomain.jp/api/curl.php?url="+encodeURIComponent(endp+to));
 var fbs=fpos.match(/<b>([0-9]|\.)*?<\/b>/g);
 var tbs=tpos.match(/<b>([0-9]|\.)*?<\/b>/g);
 if(fbs&&fbs[0].slice(3,-4)*1&&fbs[1].slice(3,-4)*1){
   from=fbs[0].slice(3,-4)+","+fbs[1].slice(3,-4)
 }
 if(tbs&&tbs[0].slice(3,-4)*1&&tbs[1].slice(3,-4)*1){
   to=tbs[0].slice(3,-4)+","+tbs[1].slice(3,-4)
 }
 var jsonendp="https://www.mapquestapi.com/directions/v2/route?key="+apikey+"&from="+from+"&to="+to+"&outFormat=json&routeType="+type;
 var jsonc=ajax_GET(jsonendp);
 json=JSON.parse(jsonc);
 var route=json.route
 var sessionId=route.sessionId;
 var distance=route.distance;
 var legs=route.legs[0];
 var destn=legs.destNarrative;
 var maneuvers=legs.maneuvers;
 var routeText="距離:"+tokm(distance)+"km\n進行:"+destn+"\n\n経路:\n----------\n"
               +maneuvers.map(function(t,i){
                 return t.narrative+"  ["+tokm(t.distance)+"km]\n\n";
               }).join("");
 var mapurl="https://www.mapquestapi.com/staticmap/v5/map?key="+apikey+"&size=1000,1000&session="+sessionId;
 return [{type:'text',content:routeText},{type:'image',url:mapurl}];
}catch(e){
 return "経路取得に失敗しました。";
}
function tokm(mile,k){
  k=k||1000;
  return Math.round(mile*1.609344*k)/k;
}
}
 
 
function f_runCode(code){
  try{
    var lang=code.split('\n')[0];
    code=code.slice(lang.length+1);
    var url = 'http://api.paiza.io/runners/create'
    var params = {
        source_code:code,//ソースコード
        language:lang.toLowerCase(),//言語指定、http://api.paiza.io/docs/swagger/#!/runners　を参考に
        input:"",
        longpoll:true,
        api_key:"guest"
    };
    var process=JSON.parse(UrlFetchApp.fetch(url,{method:'post',contentType:'application/json',payload:JSON.stringify(params)}).getContentText());
    var res=JSON.parse(ajax_GET('http://api.paiza.io/runners/get_details?id='+encodeURIComponent(process.id)+"&api_key=guest"));
    if(res.error)return "invalid language";
    if(res.build_stderr){
      return (res.build_stdout||res.build_stderr)+"["+res.build_time+"ms]";
    }
    return (res.stdout||res.stderr)+"["+res.time+"s]"+res.memory+"bytes";
  }catch(e){
    return "実行失敗";
  }
}

 
function f_search_news(str){
  var url="https://news.yahoo.co.jp/topics/top-picks";
  var newsHTML=ajax_GET(url).split('<li class="newsFeed_item">');
  var rText="ニュース[トップ]\n"+url;
  var max=10;
  for(var i=1;(i<=max&&i<newsHTML.length-1);i++){
    var matches=newsHTML[i].match(/href="(.+?)"(.|\n)+?title">(.+?)<(.|\n)+?date">(.+?)</);
    if(!matches){max++;continue;}
    rText+="\n\n"+matches[3]+"["+matches[5]+"]\n"+matches[1]
  }
  return rText;
}
 
 
 
 /******
 
   エンコード系統
 
 ******/
 /*hex->bin*/
function f_encode_binary(t,i){
 if(!i){i=t.split(';')[1];t=t.split(';')[0]}
 i=Math.floor(Math.abs(i))||0; //初期値0,正
 return (t+"").replace(/([^\s]+)(\s+|$)/g,function(d,d1,d2){
  return (new Array(i*1+1).join('0')+(parseInt(d1,16)||0).toString(2)).slice(-i)+d2;
 });
}

/*str->utf32*/
function f_encode_utf32(t){
 var rt=""
 ff_letters(t).forEach(function(v){
  rt+=("00000000"+v.codePointAt().toString(16)).slice(-8);
 })
 return rt.toUpperCase().replace(/(..)/g,' $1').replace(/ /,'');
}

/*str->utf16*/
function f_encode_utf16(str){
  var rt="";
  str=str+"";
  str.split('').forEach(function(t){
    rt+=("0000"+t.codePointAt().toString(16)).slice(-4).toUpperCase().replace(/(..)/g,' $1');
  });
  return rt.replace(/ /,'');
}

/*str->utf8*/
function f_encode_utf8(str){
   var rt="";
   str=str+"";
   var bin16=function(t){
    return ("00"+parseInt(t,2).toString(16)).slice(-2);
   };
   ff_letters(str).forEach(function(t,i){
   var ccode=t.codePointAt().toString(2);
   var clen=7;
   
   if(ccode.length>16){
    clen=21;
   }else
   if(ccode.length>11){
    clen=16;
   }else
   if(ccode.length>7){
    clen=11;
   }
   var bytes=("00000000"+"00000000"+"00000000"+ccode).slice(-clen);
   
   if(clen==21){
    rt+=bin16("11110"+bytes.slice(0,3))+bin16("10"+bytes.slice(3,9))+bin16("10"+bytes.slice(9,15))+bin16("10"+bytes.slice(15,21));
   }else
   if(clen==16){
     rt+=bin16("1110"+bytes.slice(0,4))+bin16("10"+bytes.slice(4,10))+bin16("10"+bytes.slice(10,16));
   }else
   if(clen==11){
    rt+=bin16("110"+bytes.slice(0,5))+bin16("10"+bytes.slice(5,11));
   }else{
    rt+=bin16("0"+bytes);
   }
   
   });
   return rt.toUpperCase().replace(/(..)/g,' $1').replace(/ /,'');
}

/*str->\\uxxxx*/
function f_encode_escape(t){
 t=t+"";
 return t.split('').map(function(v){
    var cc=v.charCodeAt().toString(16);
    var rc=("0000"+cc.toUpperCase()).slice(-4);
 return "\\u"+rc;
 }).join('');
}

/*url encode*/
function f_encode_url(t){
 return encodeURI(t||"");
}

/*url component encode*/
function f_encode_qurl(t){
 return encodeURIComponent(t||"").replace();
}

/*str->base64*/
function f_encode_base64(t){
 try{
   return Utilities.base64Encode(t, Utilities.Charset.UTF_8);
 }catch(e){
   return "エンコードできませんでした。";
 }
}

/*html*/
function f_encode_html(t){
 return htmlUnescape(t,1);
}
 
 /******
 
 　デコード系統 
 
 ******/
 
 /*bin->hex*/
function f_decode_binary(t,i){
 if(!i){i=t.split(';')[1];t=t.split(';')[0]}
 i=Math.floor(Math.abs(i))||0; //初期値0,正
 return (t+"").replace(/([^\s]+)(\s+|$)/g,function(d,d1,d2){
  return (new Array(i*1+1).join('0')+(parseInt(d1,2)||0).toString(16)).toUpperCase().slice(-i)+d2;
 });
}

/*utf32->str*/
function f_decode_utf32(t){
 var ts=t.replace(/\s/g,'').replace(/(.{8})(?=[^$])/g,'$1 ').split(' ');
 var rt="";
 var errtext="データが不正です。";
 if(ts[ts.length-1].length!=8){
   return errtext;
 }
 try{
 for(var i=0;i<ts.length;i++){
  var bytes=ts[i];
  rt+=String.fromCodePoint(parseInt(bytes,16));
 }
 return rt;
 }catch(e){
   return errtext+"\n"+e.toString();
 }
}


/*utf16->str*/
function f_decode_utf16(t){
 var ts=t.replace(/\s/g,'').replace(/(.{4})/g,' $1').split(' ');
 return f_decode_escape(ts.join('\\u'));
}


/*utf8->str*/
function f_decode_utf8(t){
 if(!t)return "";
 var rt="";
 var stack="";
 var hexbin=function(t){
  return ("00000000"+parseInt(t,16).toString(2)).slice(-8);
 }
 
 try{
 var ts=t.replace(/\s/g,'').replace(/(.{2}(?=[^$]))/g,'$1 ').split(' ');
 for(var i=0;i<ts.length;i++){
  var cha=hexbin(ts[i]);
  if(cha.slice(0,2)=="10"){
   stack+=cha.slice(2);
  }else{
   rt+=stack?String.fromCodePoint(parseInt(stack,2)):'';
   stack=cha.replace(/^1*0/,'');
  }
 }
 return rt+(stack?String.fromCodePoint(parseInt(stack,2)):'');
 }catch(e){
  return "データが不正です。";
 }
}



/*\\uxxxx->str*/
function f_decode_escape(t){
 return unescape(t.replace(/\\/g,'%').toLowerCase());
}

/*url->str*/
function f_decode_url(t){
try{
 return decodeURI(t);
 }catch(e){
 return "デコードエラー";
 }
}


/*url component->str*/
function f_decode_qurl(t){
 try{
 return decodeURIComponent(t.replace(/\+/g,' '));
 }catch(e){
   return "デコードエラー";
 }
}

/*base64->str*/
function f_decode_base64(t){
 try{
   var dec = Utilities.base64Decode(t);
   return Utilities.newBlob(dec).getDataAsString();
 }catch(e){
   return "デコードできませんでした。";
 }
}


 
 function f_decode_html(t){
  return htmlUnescape(t);
 }
 /********
 
     URL系統
 
 ********/
 
 /*short (bit.ly)*/
function f_url_short(url){
  try{
    var endp="https://api-ssl.bitly.com/v3/shorten?access_token=c210939d778800ee51837a528ab465e0a91307c7&longUrl=";
    var rtext=ajax_GET(endp+encodeURIComponent(url.replace(/^http(s?):\/\/|^/,'http$1://')));
    var response=JSON.parse(rtext);
    if(response.status_code!=200){
      return response.status_txt;
    }else{
      return response.data.url;
    }
  }catch(e){
    return "エラーが発生しました。";
  }
}
 
 
 function f_url_bitmap(url){
   try{
     var filename=(new Date()).toString();
     return [{'type':'image','url':ff_getBitMapUrl(url,filename),'name':filename}];
   }catch(e){
     return "画像処理エラー";
   }
 }
 
 function f_url_qr(d){
  return [{"type":"image","url":"https://api.qrserver.com/v1/create-qr-code/?format=png&size=200x200&data="+encodeURIComponent(d),'name':d.toString()}];
 }
 
 /*URL->image*/
function f_url_image(url){
  try{
    var endpoint="http://s17.pdfconvertonline.com/convert/convert-webpage.php";
    var res=UrlFetchApp.fetch(endpoint,{method:'post',payload:'websiteurl='+encodeURIComponent(url).replace(/%26/g,"%5C%26")+'&filetype=PNG&source=WEENYSOFT'}).getContentText();
    var nurl="https://res.cloudinary.com/demo/image/fetch/w_2000,h_2000,c_lfill,g_north/"+("http://s17.pdfconvertonline.com/convert/p3r68-cdx67/"+((res.replace(/"/g,"'").match(/value='.*?'/g)||[])[1]||"").slice(7,-1));
    ajax_GET(nurl);
    return [{
      type:'image',url:nurl
    }];
  }catch(e){
    return "画像化失敗";
  }
}
 
 /******
 
   気象情報
 
 ******/
 
function f_weather_weather(op){
  op=op.replace(/\n/g,'');
  if(op=="今日"){
    return [{'type':'image','url':'https://www.jma.go.jp/jp/yoho/images/000_telop_today.png'}];
  }else
  if(op=="明日"){
    return [{'type':'image','url':'https://www.jma.go.jp/jp/yoho/images/000_telop_tomorrow.png'}];
  }else{
    return '"'+op+'" は指定できません。';
  }
 }
 
function f_weather_temp(op){
  op=op.replace(/\n/g,'');
  if(op=="今日"){
    return [{'type':'image','url':'https://www.jma.go.jp/jp/yoho/images/000_temp_today.png'}];
  }else
  if(op=="明日"){
    return [{'type':'image','url':'https://www.jma.go.jp/jp/yoho/images/000_temp_tomorrow.png'}];
  }else{
    return '"'+op+'" は指定できません。';
  }
 }
 
 function f_weather_rain(op){
  try{
   var place="000";
   if(op.split(',')[1]){
     ajax_GET("https://www.jma.go.jp/jp/radnowc/").match(/<option value.*?>[^<]+?<\/option>/g).forEach(function(t){
     if(t.replace(/<\/?option.*?>/g,'')==op.split(',')[1]){
     place=(t.match(/".*?"/)[0]||'"000"').slice(1,-1);
     }
     });
   }
  
   var n=Math.floor((parseInt(op)||0)/5);
   var endp="https://www.jma.go.jp/jp/radnowc/hisjs/radar.js";
   var imgurl="https://www.jma.go.jp/jp/radnowc/imgs/radar/"+place+"/";
   if(n<0){
    endp="https://www.jma.go.jp/jp/radnowc/hisjs/nowcast.js"
    imgurl="https://www.jma.go.jp/jp/radnowc/imgs/nowcast/"+place+"/";
    n+=12;  //n=11-(-(n+1))
   }
   var code=ajax_GET(endp);
   var file=code.match(/".*?"/g)[n*2];
   if(!file){
     return "その時間のデータは取得できません。";
   }
   file=file.slice(1,-1);
   return [{'type':'image','url':imgurl+file,'name':file}];
  }catch(e){
   return "降水情報の取得に失敗しました。";
  }
 }
 
 
function f_weather_thunder(op){
 try{
  var place="000";
  if(op.split(',')[1]){
    ajax_GET("https://www.jma.go.jp/jp/radnowc/").match(/<option value.*?>[^<]+?<\/option>/g).forEach(function(t){
    if(t.replace(/<\/?option.*?>/g,'')==op.split(',')[1]){
    place=(t.match(/".*?"/)[0]||'"000"').slice(1,-1);
    }
    });
  }
 
  var n=Math.floor((parseInt(op)||0)/5);
  var endp="https://www.jma.go.jp/jp/radnowc/hisjs/thunder.js";
  var imgurl="https://www.jma.go.jp/jp/radnowc/imgs/thunder/"+place+"/";
  n+=6;
  var code=ajax_GET(endp);
  var file=code.match(/".*?"/g)[n*2];
  if(!file){
    return "その時間のデータは取得できません。";
  }
  file=file.slice(1,-1);
  return [{'type':'image','url':imgurl+file,'name':file}];
 }catch(e){
  return "雷情報の取得に失敗しました。";
 }
}

 
 
function f_weather_warn(op){
 try{
  var place="000";
  var type="99";
  if(op.split(',')[0]||op.split(',')[1]){
    ajax_GET("https://www.jma.go.jp/jp/warn/").match(/<option value.*?>[^<]+?<\/option>/g).forEach(function(t){
    var tnm=t.replace(/<\/?option.*?>/g,'');
    if(tnm==op.split(',')[0]){//地域一致
    place=(t.match(/".*?"/)[0]||'"000"').slice(1,-1);
    }else
    if(tnm==op.split(',')[1]){//種類一致
    type=(t.match(/".*?"/)[0]||'"99"').slice(1,-1);
    }
    });
  }
  var imgurl="https://www.jma.go.jp/jp/warn/imgs/"+place+"/"+type+".png"

  return [{'type':'image','url':imgurl,'name':type}];
 }catch(e){
  return "警報・注意報情報の取得に失敗しました。";
 }
}
 
 
 
 
 /*衛星写真 10分前,全球,可視光,白黒*/
function f_weather_satellite(op){
 try{
  op=op.replace(/\n/g,'');
  var place="0";
  var type="infrared";
  var color="_c";
  var japs_type=["赤外線","可視光","水蒸気"];
  if(op.split(',')[1]=="全球"){
   place="6";
  }
  if(op.split(',')[2]){
    ["infrared","visible","watervapor"].forEach(function(t,i){
    if(japs_type[i]==op.split(',')[2]){
    type=t;
    }
    });
  }
  if(op.split(',')[3]=="白黒"){
    color="";
  }
  
  var n=Math.floor((parseInt(op)||0)/10);
  var endp="https://www.jma.go.jp/jp/gms/hisjs_c/"+type.slice(0,3)+"-"+place+"-c.js";
  var imgurl= "https://www.jma.go.jp/jp/gms/imgs"+color+"/"+place+"/"+type+"/1/";
  if(n<0){
   return "時間は正の数を指定してください。";
  }
  var code=ajax_GET(endp);
  var file=code.match(/".*?"/g)[n*2];
  if(!file){
    return "その時間のデータは取得できません。";
  }
  file=file.slice(1,-1);
  return [{'type':'image','url':imgurl+file,'name':file}];
 }catch(e){
  return "気象衛星写真の取得に失敗しました。";
 }
}
 
 /*******
 
 数学系統
 
 ********/
 
 /*最小公倍数*/
function f_math_minKB(a) {
 if(!a){return 1;}
    var g = function(n, m){return m ? g(m, n % m) : n;}
    var l = function(n, m){return n * m / g(n, m);}
    var ans =a[0]%1 ? 1: ( a[0]*1||1);
    for (var i = 1; i < a.length; i++) {
        ans = l(ans,a[i]%1?1:(a[i]*1||1));
    }
    return Math.abs(ans)+'';
}
 
 /*最大公約数*/
function gcd2(ia, ib) {
if(ia%1||ib%1){
 return 0;
}
var a=Math.abs(ia);
var b=Math.abs(ib);
 if(!(a*b)){return (a||b)||0;}
    if (b === 0){
        return a
    }
    return gcd2(b, a % b);
}

function f_math_maxKY(ints){
 if((ints||[]).length<=1){return (ints||[0])[0]||0;}
 var gc=ints[0];
 for(var i=1;i<ints.length;i++){
  gc=gcd2(gc,ints[i]);
 }
 return gc+'';
}
 
 
 /********
      テキスト系統
 ********/
 
 //読み上げ
function f_text_speech(text,ex){
  try{
    ex=ex||"m4a";
    var lang="ja";
    var lhs=["en;","es;","ja;","cn;"];
    if(lhs.reduce(function(c,v){
      return c+(v==text.slice(0,3))
    },0)){
      lang=text.slice(0,2);
      text=text.slice(3);
    }
    var apikey='CEMU6R-fbouRnGO_gZUPc6oSFnzk1__F3hGVs8E6ZmYu';
    var endp ="api.jp-tok.text-to-speech.watson.cloud.ibm.com/instances/f6bc3fc3-e8a2-4e55-9a24-fc26a99c0fee/v1/synthesize";
    var langs={
      'en':["en-US","Michael"]
      ,'es':["es-ES","Enrique"]
      ,'ja':["ja-JP","Emi"]
      ,'cn':["zh-CN","LiNa"]
    }
    var lanm=langs[lang||""]||langs.ja;
    var voice=lanm[0]+"_"+lanm[1]+"Voice";
    var IBM="https://apikey:"+apikey+"@"+endp+"?accept=audio%2Fmp3&text="+encodeURIComponent(text)+"&voice="+voice;
    var url="https://s2.aconvert.com/convert/api-win.php?targetformat="+encodeURIComponent(ex)+"&url="+encodeURIComponent(IBM);
    var res=JSON.parse(ajax_GET_r(url,10));
    if(res.state=="ERROR")throw "変換エラー";
    var nurl=res.result;
  // var dur=JSON.parse(ajax_GET("http://ccbsapi.starfree.jp/api/audio.php?url="+encodeURIComponent(nurl)));
    return [{
      type:'audio',url:nurl,ex:ex
    }];
  }catch(e){
    return [{type:'text',content:"読み上げ失敗"}];
  }
}
 
 /*文字数*/
function f_text_length(text){
try{
  var count=0;
  text.split('').forEach(function(t,i){
   if(text.codePointAt(i)>=65536)count--;
   count++
  });
  return count.toString();
  }catch(e){return "カウント失敗";}
}

/*置換*/
function f_text_replace(text){
  try{
    var ts=text.split(',');
    var from=ts[0]||"";
    var to=ts[1]||"";
    if(!ts[2]){throw ["\n対象文字列を指定してください"]}
    var mfl=false;
    var lnow=0;
    var str=text.replace(from+","+to+",","");
    var mreg=new RegExp(
      from.replace(/(\[|\]|\{|\}|\(|\)|\.|\\|\+|\*|\?|\||\^|\$)/g,"\\$1")
    ,"g");
    return str.replace(mreg,to);
  }catch(e){
    return "置換失敗"+e[0]||"";
  }
}
 
/*正規置換:()以外の正規表現(インジェクション防止)*/
function f_text_replace_reg(text){
  try{
    var ts=text.split(',');
    var from=ts[0]||"";
    var to=ts[1]||"";
    if(!ts[2]){throw ["\n対象文字列を指定してください"]}
    var mfl=false;
    var lnow=0;
    var str=text.replace(from+","+to+",","");
    var mreg=new RegExp(
      from.replace(/(\(|\))/g,"\\$1")
    ,"g");
    return str.replace(mreg,to);
  }catch(e){
    return "置換失敗"+(e[0]||"");
  }
}

/*インデント*/
function f_text_indent(code){
  code=code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  var jscodes=code.replace(/((\/\*)(.*?)(\*\/)|\/\/[^\n]*\n|("([^\\"]|\\.)*?")|('([^\\']|\\.)*?')|(\/([^\\\/]|\\.)*?\/))/g,'<cut><com>$1<cut>').split('<cut>');
  var depth=0;
  var indlen=2;
  var indstrreg="\\s";
  var indstr=" ";
  var base=2;
  var rt=mul(indstr,base);
  for(var comi=0;comi<jscodes.length;comi++){
    var jscode=jscodes[comi];
    if(jscode.slice(0,5)=="<com>"){
      rt+=jscode.slice(5)
    }else{
      var codes=jscode.replace(/({|})/g,'&&$1').split('&&');
      codes.forEach(function(t,i){
        var doind=false;
        var dofir=true;
        var tfir=t[0];
        if(tfir=="{"){
          depth++;
          rt+="{";
          t=t.replace("{",'\n');
          doind=true;
        }
        else if(tfir=="}"){
          depth--;
          rt+="";
          doind=true;
          if(new RegExp("(^|\\n)"+indstrreg+"*$").test(rt)){
            rt=rt.replace(/\n[^\n]*?$/,'');
          }
        }else{
          dofir=false;
          t=t.replace(new RegExp("^"+indstrreg+"*"),"");
        }
        rt+=t.replace(new RegExp("(\\n"+(dofir?"|^":'')+")"+indstrreg+"*","g"),("\n"+mul(indstr,base+(depth*indlen))));
      });
    }
  }
  return rt.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  function mul(t,n){
    var mt="";
    for(var i=0;i<n;i++)mt+=t;
    return mt;
  }
}


 /************************************************
 *************************************************
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *    外部アクセス関数
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * * 
 *************************************************
 ************************************************/
 /*****
 *
 *   AJAX_GET
 *
 ********/
 function ajax_GET(url){
  return UrlFetchApp.fetch(url).getContentText();
 }
 
function ajax_GET_r(url,t,s){
 s=s||100;
 for(var i=0;i<t;i++){
  try{return ajax_GET(url)}
  catch(e){Utilities.sleep(s);}
 }
 throw "GET Requests Failed";
}
 
 /***検索系統***/
 
 /*wolf機能*/
 function f_wolf(key){
 var url="http://api.wolframalpha.com/v2/query?appid=YLAXYY-YLTP8R3QTL&input="+encodeURIComponent(key);
 var source=ajax_GET(url);
 if((typeof source)=="object"){
 return source.type+":\n"+source.text;
 }
 var xmltexts= source.replace(/"/g,"'").replace(/\n/g,'').replace(/<pod title='Input.*?<\/pod>/,'');
 if(!xmltexts){return '';}
 var results=(xmltexts.match(/<pod title='Result'.*?>.*?<\/pod>/)||xmltexts)+"";
 if(!results){return '';}
 var texts=results.match(/<plaintext>.*?<\/plaintext>/g);
 if(!texts){texts=[];}
 var srcs=results.match(/src='.*?'/g);
 if(!srcs){srcs=[];}
 var rept="";
 var rarr=[];
 for(var i=0;i<texts.length;i++){
 rept+=texts[i].replace(/<.*?>/g,'')+"\n";
 }
 var tob={'type':'text','content':htmlUnescape(rept),};
 rarr=[tob];
 for(var si=0;si<srcs.length;si++){
 var csr=htmlUnescape(srcs[si]+"").slice(5,-1).replace(/\/gif/,'/png');
 rarr.push({'type':'image','url':csr,'name':encodeURI(key)});
 }
 return rarr;
 }
 
 /*YouTube検索*/
 
 function f_search_youtube(keywords){
 var keyword=keywords.split(',')[0];
 var vll=keywords.split(',')[1];
 if(typeof (vll*1)!="number"){vll=5}
 
 var results = YouTube.Search.list("id,snippet",{q :keyword , maxResults: vll});
 var rs="検索結果:\nhttps://youtube.com/results?search_query="+encodeURIComponent(keyword)+"\n\n\n***検索結果リスト***\n\n";
 for(var i in results.items) {
 var item = results.items[i];
 
 var url="https://youtube.com/";
 
 var title=htmlUnescape(item.snippet.title);
 
 var vid=item.id.videoId+'';
 var plid=item.id.playlistId+'';
 var chid=item.id.channelId+'';
 
 var type="video";
 
 if(vid!="undefined"){
 url+="watch?v="+vid;
 }else
 if(plid!="undefined"){
 url+="playlist?list="+plid;
 type="playlist";
 }else{
 url+="channel/"+chid;
 type="channel";
 }
 
 rs+=title+"\ntype:"+type+"\nurl:"+url+"\n\n\n";
 }
 return [{'type':'text','content':rs}];
 }
 
 
 /*乗り換え検索*/
 
 
 function f_search_norikae(kwd){
 try{
  var url="https://transit.yahoo.co.jp/search/result?";
  var kwds=kwd.split(/,|、/);
  var from=kwds[0]||"";
  var to=kwds[1]||"";
  var times=(kwds[2]||"").split('/');
  var types=kwds[3]||"";
  var time="";
  var now=new Date();
  var year=now.getFullYear();
  var mm=('0'+(now.getMonth()+1)).slice(-2);
  var d=('0'+now.getDate()).slice(-2);
  var h=('0'+now.getHours()).slice(-2);
  var minute=('0'+now.getMinutes()).slice(-2);
  var m1=minute.slice(0,1);
  var m2=minute.slice(1,2);
  var s="";
  var type=kwds[3]||"";
  if(times.length==4){
  year=times[0];
  mm=('0'+times[1]).slice(-2);
  d=('0'+times[2]).slice(-2);
  }else
  if(times.length==3){
  mm=('0'+times[0]).slice(-2);
  d=('0'+times[1]).slice(-2);
  }
  if(times[times.length-1]){
  h=('0'+times[times.length-1].split(':')[0]).slice(-2);
  var m3=('0'+times[times.length-1].split(':')[1]).slice(-2);
  m1=m3.slice(0,1);
  m2=m3.slice(1,2);
  }
  time="&ym="+year+mm+"&d="+d+"&hh="+h+"&m1="+m1+"&m2="+m2;
  
  type=type.replace('安','&s=1').replace('楽','&s=2').replace('早','&s=3');
  type=type.replace('発','&type=1').replace('終','&type=2').replace('始','&type=3').replace('着','&type=4').replace('無','&type=5');
  url+=encodeURI("from="+from+"&to="+to+time+type);
  
  
 var ht=ajax_GET(url).replace(/\n/g,'').replace(/'/g,'"');
 var routes=[];
 
 for(var i=1;i<4;i++){
 var rre='<div id="route0'+i+'">.*?</div><div class="pos-im"';
 var route=ht.match(new RegExp(rre,'g'))[0];
 var summary=removeALLtags(getElements(route,"dl","class",'routeSummary')[0].match(/<ul class="priority">.*?<\/dd>/)[0].replace(/<\/li>/g,"\n")).replace(/\]\n\[/g,'][').replace("priic","ic");
 var routeDetail=getElements(route,"div","class",'routeDetail')[0];
 var stations=getElements(route,"div","class","station");
 var infos=getElements(route,"ul","class","info");
 var transports=getElements(route,"li","class","transport");
 
 var sts="----"+removeALLtags(stations[0].replace("</li>","\n")).replace(/時刻表|地図|ホテル|\[.+?\]/g,'')+"\n";
 
 for(var ti=0;ti<transports.length;ti++){
 var transport=removeALLtags(transports[ti]).replace(/\[.*?\]/g,'');
 var platform=getElements(infos[ti],"li","class","platform");
 var serviceStatus=getElements(infos[ti],"li","class","serviceStatus");
 var station=removeALLtags(stations[ti+1].replace("</p>","\n").replace("</li><li>","\n")).replace(/時刻表|地図|ホテル|\[.+?\]/g,'');
 
 if(ti!=transports.length-1){station=station.replace('\n','\n----')}
 
 
 sts+="\n"+transport+"\n"+(platform==null?"":removeALLtags(platform[0]))+"\n"+(serviceStatus==null?"":removeALLtags(serviceStatus[0]))+"\n\n----"+station+"\n";
 }
 
 sts=sts.replace(/\n\n\n*/g,'\n\n');
 
 var routeText="【ルート"+i+"】\n\n"+summary+"\n*****ルート案内*****\n"+sts+"\n";
 routes.push({'type':'text','content':routeText});
 }
 routes.push({'type':'text','content':url});
 return routes;
 }catch(e){
  return "取得失敗";
 }
 }
 
 
 /*為替レート取得*/
function f_search_rate(code){
 try{
   code=code.replace(/\n/g,'');
   var url ="https://www.gaitameonline.com/rateaj/getrate";
   var rateobj = JSON.parse(ajax_GET(url));
   var rt=null;
   var params=['bid','ask','open','low','high'];
   rateobj.quotes.forEach(function(t){
    if(t.currencyPairCode==code){
    rt=code;
      params.forEach(function(p){
        rt+="\n"+p+":"+t[p];
      });
    }
   });
   if(!rt){
    rt="Code : "+params.join(' | ');
    rateobj.quotes.forEach(function(t){
      rt+="\n\n"+t.currencyPairCode+" : ";
      params.forEach(function(p,i){
        rt+=(i?" | ":'')+t[p];
      });
    });
   }
   return rt;
  }catch(e){
    return "レートデータ取得エラー";
  }
 }
 
 
function f_recipe_search(keyword){
  try{
    var response = ajax_GET("https://www.kyounoryouri.jp/search/recipe?keyword=" + keyword);
    var url_and_title = response.split('class="recipe--category-recipe"').slice(1,1+5);
    if(!url_and_title.length)
      return "'"+keyword+"'に関するレシピが見つかりませんでした。";
    
    var recipe = [];
    url_and_title.forEach(str=>{
      str=str.replace(/\n|\r|\t/g,'');
      var url = 'https://www.kyounoryouri.jp' + (str.match(/data-url="(.*?_)/)||[,''])[1];
      var title = (str.match(/_(.*?)\./)||[,''])[1];
      var time = (str.match(/time">(.*?)</)||[,''])[1];
      var calorie = (str.match(/calorie">(.*?)</)||[,''])[1];
      var material = (str.match(/material">(.*?)</)||[,''])[1];
      var img_url = 'https://www.kyounoryouri.jp' + (str.match(/src="(.*?)"/)||[,''])[1];
      recipe.push(
        {
          type:'buttons',
          title:title,
          thumb:img_url,
          text:time+calorie+"\n"+material,
          default:url,
          actions:[{text:"作り方",url:url}]
        }
      );
    });
    
    return recipe;
  }catch(e){
    return "レシピの取得に失敗しました。";
  }
}
 
 
 
 
 
 /***数学関数***/
 
 /*計算関数*/
 function f_math_calc(m){
 var url="http://api.mathjs.org/v4/?expr="+encodeURIComponent(mathjs_replace(m));
 
 return ajax_GET(url);
 
 }
 
 
 /*************
 
     ドライブ
 
 ************/
 
 
 function ff_getBitMapUrl(burl,name){
  var mime=burl.match(/^data:(.*?);/)[0].slice();
  var b64=burl.replace(/.*?base64,/,'');
  var file=Utilities.newBlob(Utilities.base64Decode(b64),mime,name||"untitled");
  var folderID='1b6sLjdr6_4qchgThKx0_8p9OFaE1wFE7';
  var uploadFolder = DriveApp.getFolderById(folderID);
  var driveFile = uploadFolder.createFile(file);//アップロード
  return "https://drive.google.com/uc?id="+driveFile.getId();
 }
 
 
 /*********************************************
 **********************************************
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * * 
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *      文字列処理関数
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * * 
 * * * *
 **********************************************
 *********************************************/
 
 
 function htmlUnescape(text,type){
 var rtext=text;
  var chart=[
   ["\n","<br>"]
  ,["<","&lt;"]
  ,[">","&gt;"]
  ,["\"","&quot;"]
  ,["'","&#039;"]
  ,[" ","&nbsp;"]
  ,["&","&amp;"]
  ]
  if(type){
  for(var i=chart.length-1;i>-1;i--){
    rtext=rtext.replace(new RegExp(chart[i][0].replace(/\\/g,"\\\\"),"g"),chart[i][1]);
  }
  }else{
  for(var i=0;i<chart.length;i++){
   rtext=rtext.replace(new RegExp(chart[i][1],"g"),chart[i][0]);
  }
  }
  return rtext;
 }
 
 function ff_letters(t){
 return ((t||"").match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]/g) || []);
 }
 
 
 
 
 function getElements(text,tag,attr,data){
  text=text.replace(/\n/g,'');
  var res="<"+tag+" [^>]*?"+attr+' *?= *?"'+data+'".*?>.*?</'+tag+">";
  return text.match(new RegExp(res,'g'));
 }
 
 
 function removeALLtags(text){
  return text.replace(/<.+?>/g,'');
 }
 
 function f_typeToCCBS(text){
 var chart=[
  ["string","text"]
  ,['number','text']
 ]
 for(var i=0;i<chart.length;i++){
  if(text==chart[i][0]){
   return chart[i][1];
  }
 }
 return text;
 }
 
 
 function mathjs_replace(text){
 return (text+"").replace(/微分/g,"derivative");
 }
 
 /*********************************************
 **********************************************
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * * 
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *      内部データ関数
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * *
 * * * *
  * * * 
 * * * *
 **********************************************
 *********************************************/
 
function ff_searchFunction(dir,st,oSt){
 oldSt=oSt||st;
 if(!st.length){
  return ff_htu_s(ccbs.d.htu,oldSt);
 }
 if(typeof dir=="function"){
  return [dir,st];
 }
 var kw=st[0];
 var list=dir.list;
 var sname=st[0];
 if(list){
  for(var si=0;si<list.length;si++){
   var obj=list[si][0];
   var objName=list[si][1];
   if(objName.toLowerCase()==kw.toLowerCase()){//マッチ
    return ff_searchFunction(dir[obj],ff_RmFArr(st),oldSt);
   }
  }
  return {'text':ccbs.e.inf};
 }else{
  return {'text':ccbs.e.inf};
 }
}


  function ff_help(m){
   if(!m){
   ht=ff_htu_s(ccbs.d.htu,[]);
   return "【使い方】\nコマンドと機能が使えます。\nコマンドは commands\n機能は tree\nで一覧を確認できます。\n\nコマンドはコマンド名で実行できます。\n例:\ntree\n\n【機能の使い方】\n基本機能は、\n\n【機能名】【値】\n例:YouTube検索うぇーい\n\n値を指定しない場合、その機能の使い方を確認できます。(検索機能を除く)\n\nディレクトリ内にある機能を使うには、\n\n【ディレクトリ名】\n↑×n\n【機能名】\n【値】\n例:\n数学 <---ディレクトリ\n計算 <---機能\n3*5 <---値\n\n値を指定しない場合、その機能の使い方を確認できます。\n機能を指定しない場合、そのディレクトリにある機能・ディレクトリの一覧を確認できます。\n例:\n数学";
   }
   
   var ht='';
   
   ht=ff_htu_s(ccbs.d.htu,(m.replace(/\n$/,'')).split('\n'));
   
   return ht.text||ht;
  }
  
  
  /**
  *使い方検索
  * @params:
  *
  * ff_htu_s(<object>directory,<array>keyword);
  * >>> <object>{
  *      'type':<string>'directory'
  *     ,'text':<string>【TextData】
  *     ,'function':<array>['function1','function2',...]
  *     ,'directory':<array>['directory1','directory2',...]
  *     ,'dev'{
  *       'function':<array>['function1','function2',...]
  *       'directory':<array>['directory1','directory2',...]
  *      }
  *     }
  *
  *     OR
  *
  *    <object>{
  *     'type':<string>'function'
  *     'text':<string>【TextData】
  *    }
  *
  * @ex:
  * ff_htu_s(ccbs.d.htu,['数学','計算'])
  *
  **/
  function ff_htu_s(dir,st){
   var list=dir.list;
   var sname=(st[0]||'');
   if(list){
    var rlist_func=[];
    var rlist_dir=[];
    var rlist_dev_func=[];
    var rlist_dev_dir=[];
    for(var si=0;si<list.length;si++){
     var objname=list[si];
     if(typeof objname[0]=='object'){
      /*ディレクトリの場合*/
      if(objname[0][1].toLowerCase()==sname.toLowerCase()){
       /*検索にマッチ*/
       return ff_htu_s(dir[objname[0][0]],ff_RmFArr(st));
      }
      rlist_dir.push(objname[0][1]);
      rlist_dev_dir.push(objname[0][0]);
     }else{
     /*説明の場合*/
      if(objname[1].toLowerCase()==sname.toLowerCase()){
      /*検索にマッチ*/
       return {
         'text':dir[objname[0]]
        ,'type':'function'
       };
      }
      rlist_func.push(objname[1]);
      rlist_dev_func.push(objname[0]);
     }
    }
    if(st.length==0){
     var ret_func=(rlist_func.length?"\n機能:\n\n"+rlist_func+"\n":"");
     var ret_dir=(rlist_dir.length?"\nディレクトリ:\n\n"+rlist_dir+"\n":"");
     return {
       'type':'directory'
      ,'text':ret_func+ret_dir
      ,'func':rlist_func
      ,'directory':rlist_dir
      ,'dev':{
        'func':rlist_dev_func
       ,'directory':rlist_dev_dir
       ,'object':dir
       }
      };
    }else{
     return ccbs.e.inf;
    }
   }else{
    return ccbs.e.inf;
   }
  }
  
  /*ヘルプのツリー表示関数*/
  function ff_HelpTree(key){
   var searchObject=ccbs.d.htu;
   if(key){
    var HTUresponse=ff_htu_s(ccbs.d.htu,(key.replace(/\n+$/,'')).split('\n'));
    if(HTUresponse){
     var type=HTUresponse.type;
     if(type=='function'){
      return HTUresponse.text;
     }else
     if(type=="directory"){
      searchObject=HTUresponse.dev.object;
     }else{
      return ccbs.e.inf;
     }
     
    }else{
     return ccbs.e.inf;
    }
   }
   return ff_HelpTreeLoop(searchObject,"",'');
  }
  
  function ff_HelpTreeLoop(dir,dirName,lines){
   var res=ff_htu_s(dir,[]);
   var res_func=res.func;
   var res_dir=res.dev.directory;
   var ret="";
   ret+=lines.slice(0,-1)+(dirName?(lines.slice(-1)=="┃"?"┣":"┗")+dirName:'')
   for(var i=0;i<res_func.length;i++){
    ret+='\n'+lines+(i==res_func.length-1&&res_dir.length==0?'┗':'┣')+res_func[i];
   }
   for(var i=0;i<res_dir.length;i++){
    var newDir=dir[res_dir[i]];
    ret+='\n'+ff_HelpTreeLoop(newDir,res.directory[i],lines+(i==res_dir.length-1?"　":'┃'));
   }
   return ret;
  }
  
  
  function ff_RmFArr(arr){
   var rarr=[];
   for(var i=0;i<arr.length-1;i++){
    rarr.push(arr[i+1])
   }
   return rarr;
  }
  
 function ff_resToHTML(res){
  var retHTML="";
  for(var i=0;i<res.length;i++){
   var rmes=res[i];
   retHTML+="\n";
   if(rmes.type=='text'){
    retHTML+='<div class="ccbs_text">'+ff_AutoLink(htmlUnescape(rmes.content,1))+"</div>"
   }else
   if(rmes.type=='image'){
    retHTML+='<img class="ccbs_image" src="'+rmes.url+'">';
   }else
   if(rmes.type=='audio'){
    retHTML+='<audio class="ccbs_contents ccbs_audio" controls src="'+rmes.url+'">お使いのブラウザでは再生できません</audio>';
   }else
   if(rmes.type=='buttons'){
     retHTML+='<div class="ccbs_text">'
              +'\n<img src="'+rmes.thumb+'" width="100%"><br>'
              +'\n<h3>'+htmlUnescape(rmes.title||'',1)+'</h3>'
              +'\n<p>'+htmlUnescape(rmes.text||'',1)+'</p>'
              +(rmes.actions||[]).map(option=>'<a href="'+option.url+'">'+htmlUnescape(option.text||'',1)+'</a>').join('<br>\n')
            +'\n</div>';
   }else{
    retHTML+='<div class="ccbs_contents">'+ff_resToHTML(rmes.content)+"</div>"
   }
  }
  return retHTML;
 }
 
 function ff_AutoLink(str) {
 var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
 var regexp_makeLink = function(all, url, h, href) {
 return '<a href="h' + href + '">' + url + '</a>';
 }
 
 return str.replace(regexp_url, regexp_makeLink);
 }
