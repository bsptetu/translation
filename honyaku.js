    const speech = new webkitSpeechRecognition();
    speech.lang = 'ja-JP';
    var speechstart = 0;
    var translation = 0;
    var translationlang = "jp";
    var text_val = 1;
    var botan_Color = 1;

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
    document.getElementById('botanA').addEventListener('click' , function() {
       document.getElementById('botanA').classList.remove('btnon2');
       document.getElementById('botanB').classList.add('btnon2');
       botan_Color = 1;
    });
    document.getElementById('botanB').addEventListener('click' , function() {
       document.getElementById('botanA').classList.add('btnon3');
       document.getElementById('botanB').classList.remove('btnon3');
       botan_Color = 2;
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
    if(translation === 0){
      document.querySelector('p').classList.add('displayon');
      document.querySelector('p').classList.remove('displayoff');
    }else{
      document.querySelector('p').classList.remove('displayon');
      document.querySelector('p').classList.add('displayoff');
    }
    if(botan_Color === 1){
     document.getElementById('sanpul').classList.remove('textwhite');
     document.getElementById('content').classList.remove('textwhite');
    }else{
     document.getElementById('sanpul').classList.add('textwhite');
     document.getElementById('content').classList.add('textwhite');
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
             content.insertAdjacentHTML('afterbegin', '<div class="main"translate="no">'+ autotext +'</div>'+'<div id="sabu" class="sabu">'+ autotext +'</div>');
          }
     }
//console.log("speech" + speechstart);
     speech.onend = () => {
        console.log("speech" + speechstart);
        if(speechstart === 1){
          speech.start();
        }
     };
    //--------------------------------//