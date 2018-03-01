


$(function(){
  $('#grid').magnificPopup({
      delegate: '.thumbnail > a', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
          enabled: true
      }
  });



  $('#datetimepicker2').datetimepicker({
    format: 'YYYY/MM/DD HH:mm:ss'
  });







    function pjaxPageLoad(){
         jalar_data();

    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);


});
