







$(function(){







    function pjaxPageLoad(){
      console.log('CARAJO');
        //$('.widget').widgster();
        //initMap();
    //    initCalendar();
      //  initRickshaw();
        //initAnimations();
      //   jalar_data();

    //console.log(jalar_data());

//alert(Gid_evento);

   traer_evento(Gid_evento,0);
    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);


});
