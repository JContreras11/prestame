


$(function(){


    function pjaxPageLoad(){
      console.log('INICIAMOS NEW SERVICIO');
        //$('.widget').widgster();
        //initMap();
    //    initCalendar();
      //  initRickshaw();
        //initAnimations();
      //   jalar_data();

    //console.log(jalar_data());

//alert(Gid_evento);

   traer_evento_ver(Gid_evento,0);
    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);


});
