

       function comboselect(id,ruta,frase,id_valor,id_muestra,form,campodestino) {
       //alert(id);
        var lista='<option value=""> '+frase+' </option>';
           var selected='';
           $.getJSON(ruta, function(data) {
             $.each(data, function(k,item){
               if (parseInt(eval(id_valor))==parseInt(id)) {selected=" selected"; } else {selected="";};
               lista=lista+'<option value="'+eval(id_valor)+'" '+selected+'>'+eval(id_muestra)+' </option> ';
               }); // Fin de Each
             $('#'+form+' #'+campodestino).html(lista);
           });

       }





$(function(){


  $('#inp_dni').change(function() {
    var pat_ciu='';
    var mat_ciu='';
    var nom_ciu='';
    var ide_ciu='';
dni=this.value;
rutaciudadano='ciudadano/fil_ciu/'+dni;
console.log(rutaciudadano);
var nro=0;
    $.getJSON(rutaciudadano, function(data) {
      $.each(data, function(k,item){
nro++;
if(item.rpta=='sihaydatos') {
console.log("SI HAY");
pat_ciu=item.pat_ciu;
mat_ciu=item.mat_ciu;
nom_ciu=item.nom_ciu;
ide_ciu=item.ide_ciu;
} else {
  console.log("NO HAY");

}
})
$("#inp_name").val(nom_ciu);
$("#inp_apelpat").val(pat_ciu);
$("#inp_apelmat").val(mat_ciu);
$("#inp_ide_ciu").val(ide_ciu);
}) // FIN getJSON

//alert(this.value);
//time(); Date(unix_timestamp
/*var d = new Date();
var n = d.getTime();
var h = n.toString(32);
var nuevax=this.value+' '+h;
var nueva_url=string_to_slug(nuevax);

$('#titulo_url').val(nueva_url); */


});




  $('#datetimepicker2').datetimepicker({
    format: 'YYYY/MM/DD HH:mm:ss'
         });



/*
 function initMap(){ // Inicio initMap

      var  olview = new ol.View({
              center: ol.proj.transform([-76.99,-12.0429], 'EPSG:4326', 'EPSG:3857'),
              zoom: 11
          }),
          map = new ol.Map({
              target: document.getElementById('map'),
              view: olview,

          layers:  [
             new ol.layer.Group({
                      'title': 'Base maps',
                      layers: [
              new ol.layer.Tile({
                  source: new ol.source.OSM(),
                              title: 'basexxx',
                              type: 'base',
                              visible: true,
              })
          ]
          }),
          new ol.layer.Group({
        title: 'Overlays',
        layers: [
markerLayer,vectorLayer
        ]
    })

  ],
  controls: ol.control.defaults({
    attributionOptions:  ({
      collapsible: true
    })
  })
          })
      ;

      var iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
              //anchor: [0.1, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              opacity: 0.25,
              src: 'img/sos.png'
          }),
          name:'evento_temporal',
          text: new ol.style.Text({
              font: '12px Calibri,sans-serif',
              fill: new ol.style.Fill({ color: '#000' }),
              stroke: new ol.style.Stroke({
                  color: '#fff', width: 2
              }),
              text: 'Evento Agregado'
          })
      });
      function orlo(a,b) {
          map.getView().setZoom(5);
          }


      function _activaTab(tab){
          $('.nav-tabs a[href="#' + tab + '"]').tab('show');
      }
  function _AgregaEvento() {

    key=map.on('click', function(evt){
          var feature = new ol.Feature(
              new ol.geom.Point(evt.coordinate)
          );
var coord = feature.getGeometry().getCoordinates();
coord = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
$("#inp_lat").val(coord[1]);
$("#inp_lon").val(coord[0]);
_activaTab("tab2");
//test();
          comboselect(null,"ejecutora/ent_rsp","Selecciona Entidad Rsp","item.ide_eje","item.nom_eje","form1","sel_ent_rsp");
          comboselect(null,"eventos/tip_eve","Selecciona Tipo Eve","item.ide_t_e","item.des_eve","form1","sel_tip_eve");

          feature.setStyle(iconStyle);
          vectorSource.addFeature(feature);
              ol.Observable.unByKey(key)
        });
    //    console.log(key);

}



function _AgregaEvento2() {


  agregaEve=true;


}


$( "#BtnAddEvento" ).click(function() {
_AgregaEvento2()
});

$( "#BtnZoom" ).click(function() {
orlo(1,2);
});


var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'Legenda' // Optional label for button
});



  map.addControl(layerSwitcher);


  var popup = new ol.Overlay.Popup;
  popup.setOffset([0, -1]);
  map.addOverlay(popup);

  key=map.on('click', function (evt) {
//alert('hola');
if(agregaEve) {

  var feature = new ol.Feature(
      new ol.geom.Point(evt.coordinate)
  );
var coord = feature.getGeometry().getCoordinates();
coord = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
$("#inp_lat").val(coord[1]);
$("#inp_lon").val(coord[0]);
_activaTab("tab2");
//test();
  comboselect(null,"ejecutora/ent_rsp","Selecciona Entidad Rsp","item.ide_eje","item.nom_eje","form1","sel_ent_rsp");
  comboselect(null,"eventos/tip_eve","Selecciona Tipo Eve","item.ide_t_e","item.des_eve","form1","sel_tip_eve");

  feature.setStyle(iconStyle);
  vectorSource.addFeature(feature);
  //    ol.Observable.unByKey(key)

  agregaEve=false;
}

    var f = map.forEachFeatureAtPixel(
            evt.pixel,
            function(ft, layer){
console.log(ft);              return ft;

},null,function(layer){console.log('hola');}
        );
    //    console.log(f.getGeometryName());
if (f) {
nomx=f.get('name');
if(nomx) {
  var geometry = f.getGeometry();
var coord = geometry.getCoordinates();
var coo = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
coorz=[-77.1610,-12.0429];
var lo=parseFloat(coord[0]);
var la=parseFloat(coord[1]);
var coorz =[lo,la]

//ol.proj.transform([-76.99,-12.0429], 'EPSG:4326', 'EPSG:3857'),
idevento=f.get('idevento');
name=f.get('name');
tipoevento=f.get('tipoevento');
hora=f.get('hora');
fecha=f.get('fecha');

// console.log('coord ' + evtz.coordinate +' coordx '+coorz);
var coord1 = ol.coordinate.toStringHDMS(coo, 2);
//var coord2 = ol.coordinate.toStringHDMS(evtz.coordinate, 2);


popup.show(coord,'<div class="pop"><h4>' + name +'</h4><p class="info" > Fechax: '+fecha+'<br>'+ coord1 +  '<br> </p></div>');
}
}

  })





        //ie svg height fix
        function _fixMapHeight(){
            $("#map").find('svg').css('height', function(){
              console.log($(this).attr('height'));
                return $(this).attr('height') + 'px';
            });
        }

        _fixMapHeight();
        SingApp.onResize(function(){
            setTimeout(function(){
                _fixMapHeight();
            }, 100)
        });
    } // Fin initMap

    */

/** INICIA OPENLAYERS ***/




/** FINALIZA OPENLAYERS ***/



    function initCalendar(){

        var monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

        var dayNames = ["S", "M", "T", "W", "T", "F", "S"];

        var now = new Date(),
            month = now.getMonth() + 1,
            year = now.getFullYear();

        var events = [
            [
                    "2/"+month+"/"+year,
                'The flower bed',
                '#',
                Sing.colors['brand-primary'],
                'Contents here'
            ],
            [
                    "5/"+month+"/"+year,
                'Stop world water pollution',
                '#',
                Sing.colors['brand-warning'],
                'Have a kick off meeting with .inc company'
            ],
            [
                    "18/"+month+"/"+year,
                'Light Blue 2.2 release',
                '#',
                Sing.colors['brand-success'],
                'Some contents here'
            ],
            [
                    "29/"+month+"/"+year,
                'A link',
                'http://www.flatlogic.com',
                Sing.colors['brand-danger']
            ]
        ];
        var $calendar = $('#events-calendar');
        $calendar.calendar({
            months: monthNames,
            days: dayNames,
            events: events,
            popover_options:{
                placement: 'top',
                html: true
            }
        });
        $calendar.find('.icon-arrow-left').addClass('fa fa-arrow-left');
        $calendar.find('.icon-arrow-right').addClass('fa fa-arrow-right');
        function restyleCalendar(){
            $calendar.find('.event').each(function(){
                var $this = $(this),
                    $eventIndicator = $('<span></span>');
                $eventIndicator.css('background-color', $this.css('background-color')).appendTo($this.find('a'));
                $this.css('background-color', '');
            })
        }
        $calendar.find('.icon-arrow-left, .icon-arrow-right').parent().on('click', restyleCalendar);
        restyleCalendar();
    }

    function initRickshaw(){
        "use strict";

        var seriesData = [ [], [] ];
        var random = new Rickshaw.Fixtures.RandomData(30);

        for (var i = 0; i < 30; i++) {
            random.addData(seriesData);
        }

        var graph = new Rickshaw.Graph( {
            element: document.getElementById("rickshaw"),
            height: 100,
            renderer: 'area',
            series: [
                {
                    color: '#F7653F',
                    data: seriesData[0],
                    name: 'Uploads'
                }, {
                    color: '#F7D9C5',
                    data: seriesData[1],
                    name: 'Downloads'
                }
            ]
        } );

        function onResize(){
            var $chart = $('#rickshaw');
            graph.configure({
                width: $chart.width(),
                height: 100
            });
            graph.render();

            $chart.find('svg').css({height: '100px'})
        }

        SingApp.onResize(onResize);
        onResize();


        var hoverDetail = new Rickshaw.Graph.HoverDetail( {
            graph: graph,
            xFormatter: function(x) {
                return new Date(x * 1000).toString();
            }
        } );

        setInterval( function() {
            random.removeData(seriesData);
            random.addData(seriesData);
            graph.update();

        }, 1000 );
    }

    function initAnimations(){
        $('#geo-locations-number, #percent-1, #percent-2, #percent-3').each(function(){
            $(this).animateNumber({
                number: $(this).text().replace(/ /gi, ''),
                numberStep: $.animateNumber.numberStepFactories.separator(' '),
                easing: 'easeInQuad'
            }, 1000);
        });

        $('.js-progress-animate').animateProgressBar();
    }


    function pjaxPageLoad(){
      console.log('CARAJO');
        //$('.widget').widgster();
        //initMap();
    //    initCalendar();
      //  initRickshaw();
        //initAnimations();
         jalar_data(0,0);

    //console.log(jalar_data());
$("#form1").on('submit', function(e){
      e.preventDefault();
      var form = $(this);
      form.parsley().validate();
      if (form.parsley().isValid()){
        $.ajax({
               url:'eventos/new_eve',
               data:$(this).serialize(),
               type:'POST',
               success:function(data){
               console.log(data);
               $('#datatable-table').dataTable().fnDestroy();
               markerSource.clear();
               vectorSource.clear();
               limpiaForm('form1');
               jalar_data();
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
               },
               error:function(data){
                // $("#error").show().fadeOut(20000); //===Show Error Message====
               }
             });


        }
  });







    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);


});
