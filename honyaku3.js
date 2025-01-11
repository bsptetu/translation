    const speech = new webkitSpeechRecognition();
    speech.lang = 'ja-JP';
    var speechstart = 0;
    var translation = 0;
    var translationlang = "jp";
    var text_val = 1;
    var text_NO = 1;
    var textinnerA_val = "";
    var textinnerB_val = "";
    var sabuA_val = "";
    var sabuB_val = "";

firebase.database().ref("textinnerA").on("child_added", function(data) {　// 追加
    textinnerA_val = data.val();
});
  
firebase.database().ref("textinnerA").on("child_changed", function(data) {   // 更新
   textinnerA_val = data.val();
});
  
firebase.database().ref("textinnerA").on("child_removed", function(data) {   // 削除
  textinnerA_val = " ";
});
firebase.database().ref("sabuA").on("child_added", function(data) {　// 追加
    sabuA_val = data.val();
});
  
firebase.database().ref("sabuA").on("child_changed", function(data) {   // 更新
   sabuA_val = data.val();
});
  
firebase.database().ref("sabuA").on("child_removed", function(data) {   // 削除
  sabuA_val = " ";
});
firebase.database().ref("textinnerB").on("child_added", function(data) {　// 追加
    textinnerB_val = data.val();
});
  
firebase.database().ref("textinnerB").on("child_changed", function(data) {   // 更新
   textinnerB_val = data.val();
});
  
firebase.database().ref("textinnerB").on("child_removed", function(data) {   // 削除
  textinnerB_val = " ";
});
firebase.database().ref("sabuB").on("child_added", function(data) {　// 追加
    sabuB_val = data.val();
});
  
firebase.database().ref("sabuB").on("child_changed", function(data) {   // 更新
   sabuB_val = data.val();
});
  
firebase.database().ref("sabuB").on("child_removed", function(data) {   // 削除
  sabuB_val = " ";
});

    const btn = document.getElementById('btn');
    const content = document.getElementById('content');

    document.getElementById('text-val-1').addEventListener('click' , function() {
     text_val = 1;
    });
    document.getElementById('text-val-2').addEventListener('click' , function() {
     text_val = 2;
    });
    document.getElementById('text-val-3').addEventListener('click' , function() {
     text_val = 3;
    });

    btn.addEventListener('click' , function() {
    // 音声認識をスタート
    if(speechstart === 0){
      //document.getElementById('btn').innerText = "停止";
      document.getElementById('btn').classList.add('btn-on');
      speechstart = 1;
      speech.start();
    }else{
      //document.getElementById('btn').innerText = "開始";
      document.getElementById('btn').classList.remove('btn-on');
      speechstart = 0;
      speech.stop();
    }
    });

  setInterval(() => {
    if(speechstart === 1){
         textinnerA = document.getElementById('textinnerA').innerText;
         sabuinnerA = document.getElementById('sabuA').innerText;
      console.log(sabuinnerA);
         textinnerB = document.getElementById('textinnerB').innerText;
         sabuinnerB = document.getElementById('sabuB').innerText;
         if(textinnerA != textinnerA_val){
           document.getElementById('textinnerA').innerText = textinnerA_val;
           
         }
         if(sabuinnerA != sabuA_val){
           //firebase.database().ref("sabuA").set({
           //    sabuA: sabuinnerA
           //})
           document.getElementById('sabuA').innerText = sabuinnerA;
         }
         if(textinnerB != textinnerB_val){
           document.getElementById('textinnerB').innerText = textinnerB_val;
         }
         if(sabuinnerB != sabuB_val){
           //firebase.database().ref("sabuB").set({
           //       sabuA: sabuinnerB
           //})
           document.getElementById('sabuB').innerText = sabuB_val;
         }
    }
    if(translation === 0){
      document.getElementById('sabuA').classList.add('displayon');
      document.getElementById('sabuB').classList.add('displayon');
    }else{
      document.getElementById('sabuA').classList.remove('displayon');
      document.getElementById('sabuB').classList.remove('displayon');
    }
    if(text_val === 1){
     document.getElementById('text-val-1').classList.add('btnon');
     document.getElementById('text-val-2').classList.remove('btnon');
     document.getElementById('text-val-3').classList.remove('btnon');
     document.getElementById('sanpul').classList.remove('sawarabi-mincho-regular');
     document.getElementById('sanpul').classList.remove('hachi-maru-pop-regular');
     document.getElementById('content').classList.remove('sawarabi-mincho-regular');
     document.getElementById('content').classList.remove('hachi-maru-pop-regular');
    }else if(text_val === 2){
     document.getElementById('text-val-1').classList.remove('btnon');
     document.getElementById('text-val-2').classList.add('btnon');
     document.getElementById('text-val-3').classList.remove('btnon');
     document.getElementById('sanpul').classList.add('sawarabi-mincho-regular');
     document.getElementById('sanpul').classList.remove('hachi-maru-pop-regular');
     document.getElementById('content').classList.add('sawarabi-mincho-regular');
     document.getElementById('content').classList.remove('hachi-maru-pop-regular');
    }else{
     document.getElementById('text-val-1').classList.remove('btnon');
     document.getElementById('text-val-2').classList.remove('btnon');
     document.getElementById('text-val-3').classList.add('btnon');
     document.getElementById('sanpul').classList.remove('sawarabi-mincho-regular');
     document.getElementById('sanpul').classList.add('hachi-maru-pop-regular');
     document.getElementById('content').classList.remove('sawarabi-mincho-regular');
     document.getElementById('content').classList.add('hachi-maru-pop-regular');
    }
  }, 100);

function translateText() {
    if(translation === 0){
      //document.getElementById('sabu').classList.add('displayon');
      document.getElementById('btn2').classList.add('btnon2');
      translation = 1;
    }else{
      //document.getElementById('sabu').classList.remove('displayon');
      document.getElementById('btn2').classList.remove('btnon2');
      translation = 0;
    }
}

    //---------------追記---------------//
    //音声自動文字起こし機能
    speech.onresult = function(e) {
         speech.stop();
         if(e.results[0].isFinal){
             var autotext =  e.results[0][0].transcript
             console.log(e);
             console.log(autotext);
             //content.innerHTML += '<div>'+ autotext +'</div>';
             //content.insertAdjacentHTML('afterbegin', '<div class="main">'+ autotext +'</div>');
             //content.insertAdjacentHTML('afterbegin', '<div class="main"translate="no">'+ autotext +'</div>'+'<div id="sabu" class="sabu">'+ autotext +'</div>');
             if(text_NO === 1){
               text_NO = 2;
               firebase.database().ref("textinnerA").set({
                    textinnerA: autotext
               })
              // firebase.database().ref("sabuA").set({
              //    sabuA: autotext
              // })
             }else{
               text_NO = 1;
               firebase.database().ref("textinnerB").set({
                    textinnerA: autotext
               })
              // firebase.database().ref("sabuB").set({
              //    sabuA: autotext
              // })
             }
          }
     }
//console.log("speech" + speechstart);
     speech.onend = () => {
         sabuinnerA = document.getElementById('sabuB').innerText;
         sabuinnerB = document.getElementById('sabuB').innerText;
         if(sabuinnerA != sabuA_val){
           firebase.database().ref("sabuA").set({
               sabuA: sabuinnerA
           })
         }
         if(sabuinnerB != sabuA_val){
           firebase.database().ref("sabuB").set({
               sabuA: sabuinnerB
           })
         }
        if(speechstart === 1){
          speech.start();
        }
     };
    //--------------------------------//