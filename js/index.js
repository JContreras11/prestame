

       function comboselect(id,ruta,frase,id_valor,id_muestra,form,campodestino) {
//       console.log(id+' '+id_valor);
        var lista='<option value=""> '+frase+' </option>';
           var selected='';
           $.getJSON(ruta, function(data) {
             $.each(data, function(k,item){

               if (parseInt(eval(id_valor))==parseInt(id)) {selected=" selected"; } else {selected="";};
               lista=lista+'<option value="'+eval(id_valor)+'" '+selected+'>'+eval(id_muestra)+' </option> ';
               }); // Fin de Each
             $('#'+form+' #'+campodestino).html(lista);
             $('#'+form+' #'+campodestino).val(id).trigger("change");
           });

       }

       function comboselectmultiple(id,ruta,frase,id_valor,id_muestra,form,campodestino) {
//       console.log(id+' '+id_valor);
        var lista;
           var selected='';
           $.getJSON(ruta, function(data) {
             $.each(data, function(k,item){


               lista=lista+'<option value="'+eval(id_valor)+'" >'+eval(id_muestra)+' </option> ';
               }); // Fin de Each
        //       console.log('#'+form+' #'+campodestino+' '+lista);
             $('#'+form+' #'+campodestino).html(lista);
             $('#'+form+' #'+campodestino).val(id).trigger("change");
           });

       }

       function traer_evento(idr,show) {
         $.getJSON(Gruta+'eventos/det_eve/'+idr, function(data) {
         //  console.log(data);
           deteve=data.evento;
           detmov=data.movimiento;

           $('#form2 #date_evento').val(deteve.fch_eve+' '+deteve.hra_eve);
           //  $('#form2 #datepicker2i').val(deteve.fch_eve+' '+deteve.hra_eve);
           $('#form2 #inp_name').val(deteve.nom_ciu);
           $('#form2 #inp_apelpat').val(deteve.pat_ciu);
           $('#form2 #inp_apelmat').val(deteve.mat_ciu);
           $('#form2 #inp_dni').val(deteve.nro_doc);
           $('#form2 #gls_evento').val(deteve.gls_eve);
           $('#form2 #inp_ide_ciu').val(deteve.ide_ciu);
           $('#form2 #inp_ide_eve').val(deteve.ide_eve);
           $('#form3 #inp_ide_eve').val(deteve.ide_eve);
           $('#form4 #inp_ide_eve').val(deteve.ide_eve);

           console.log('Gusuario: '+Gusuario);
           comboselect(deteve.ide_eje,Gruta+"ejecutora/ent_eve","Selecciona Entidad Evento","item.ide_eje","item.nom_eje","form2","sel_ent_eve");
           comboselect(deteve.ide_t_e,Gruta+"eventos/tip_eve","Selecciona Tipo Eve","item.ide_t_e","item.des_eve","form2","sel_tip_eve");
           comboselect(deteve.ide_est,Gruta+"man_est_eve/listar/null","Selecciona Estado Evento","item.ide_est","item.des_est","form3","est_eve");
           comboselect(Gusuario,Gruta+"Usuario/lis_usu","Selecciona Usuario","item.ide_trb","item.nom_com","form3","sel_usr_mov");
           comboselect(Gentidad,Gruta+"ejecutora/ent_eve","Selecciona Entidad","item.ide_eje","item.nom_eje","form3","sel_ent_usr");
           if(detmov.det=='Si') { // El Evento tiene un movimiento
       //      console.log('SI tengo movimiento');
         //    console.log(detmov.fch_mov+' '+detmov.hra_mov);
             $('#form3 #date_atencion').val(detmov.fch_mov+' '+detmov.hra_mov);
             $('#form3 #existemov').val(detmov.det);
             $('#form3 #inp_ide_e_m').val(detmov.ide_e_m);
             $('#form4 #inp_ide_e_m').val(detmov.ide_e_m);

             $('#form3 #gls_mov').val(detmov.gls_mov);
           } else {  // El Evento es Nuevo y se va hacer la atencion
             var now = new Date();
             var quehoraes=horaActual();
             $('#form3 #date_atencion').val(quehoraes);
             $('#form3 #existemov').val(detmov.det);
             $('#form3 #gls_mov').val('');
           }

           var grillaent='';
           if(data.entidades) {
             var identidadRsp = [];
             $.each(data.entidades, function(k,item){
               grillaent+='<tr > \
               <td  >'+item.ide_ent+' </td> \
               <td  >'+item.nom_eje+' </td> </tr>';
               identidadRsp.push(item.ide_ent);
             })

             comboselectmultiple(identidadRsp,Gruta+"ejecutora/ent_rsp",null,"item.ide_ent","item.nom_eje","form3","entidad_a_cargo");
             $('#grillaentidades').html(grillaent);
           } else
           {
             comboselectmultiple(null,Gruta+"ejecutora/ent_rsp",null,"item.ide_ent","item.nom_eje","form3","entidad_a_cargo");
             $('#grillaentidades').html('');
           }
       /*** GRILLA BITACORA ***/
       var grillahist='';
       if(data.bitacora) {
         $.each(data.bitacora, function(k,item){
           grillahist+='<tr > \
           <td  >'+item.nom_com+' </td> \
           <td  >'+item.gls_bit+' </td> </tr>';
         })

         $('#grillahistoria').html(grillahist);
       } else
       {
         $('#grillahistoria').html('');
       }
       /*** FIN GRILLA BITACORA ***/

         if(show) { $('#ModalSeguimiento').modal('show') }
         });

       } // Fin de Funcion traer_evento
       function traer_evento_ver(idr,show) {
         var html_tab1='';
         var html_tab2='';
         $.getJSON(Gruta+'eventos/det_eve/'+idr, function(data) {
         //  console.log(data);
           deteve=data.evento;
           detmov=data.movimiento;
html_tab1=` <table class="table table-hover table-bordered">
                            <tbody>
                            <tr><th>Fecha y Hora</th><td class="text-align-right">${deteve.fch_eve} ${deteve.hra_eve}</td></tr>
                            <tr><th>Descripcion Evento</th><td class="text-align-right">${deteve.des_eve}</td></tr>
                            <tr><th>Entidad que Registra</th><td class="text-align-right">${deteve.nom_eje}</td></tr>
                            <tr><th>Documento Ciudadano</th><td class="text-align-right">${deteve.nro_doc}</td></tr>
                            <tr><th>Nombre y Apellidos</th><td class="text-align-right">${deteve.nom_ciu} ${deteve.pat_ciu} ${deteve.mat_ciu}</td></tr>
                            <tr><th>Detalle Evento</th><td class="text-align-right">${deteve.gls_eve} </td></tr>

                            </tbody>
                        </table>`;
        //   $('#form2 #date_evento').val(deteve.fch_eve+' '+deteve.hra_eve);
           //  $('#form2 #datepicker2i').val(deteve.fch_eve+' '+deteve.hra_eve);
           // $('#form2 #inp_name').val(deteve.nom_ciu);
           // $('#form2 #inp_apelpat').val(deteve.pat_ciu);
           // $('#form2 #inp_apelmat').val(deteve.mat_ciu);
           // $('#form2 #inp_dni').val(deteve.nro_doc);
           // $('#form2 #gls_evento').val(deteve.gls_eve);
           // $('#form2 #inp_ide_ciu').val(deteve.ide_ciu);
           // $('#form2 #inp_ide_eve').val(deteve.ide_eve);
           // $('#form3 #inp_ide_eve').val(deteve.ide_eve);
           // $('#form4 #inp_ide_eve').val(deteve.ide_eve);
   $('#panelhtml_1').html(html_tab1);
      //     console.log('Gusuario: '+Gusuario);
      //     comboselect(deteve.ide_eje,Gruta+"ejecutora/ent_eve","Selecciona Entidad Evento","item.ide_eje","item.nom_eje","form2","sel_ent_eve");
      //     comboselect(deteve.ide_t_e,Gruta+"eventos/tip_eve","Selecciona Tipo Eve","item.ide_t_e","item.des_eve","form2","sel_tip_eve");
      ///     comboselect(deteve.ide_est,Gruta+"man_est_eve/listar/null","Selecciona Estado Evento","item.ide_est","item.des_est","form3","est_eve");
      //     comboselect(Gusuario,Gruta+"Usuario/lis_usu","Selecciona Usuario","item.ide_trb","item.nom_com","form3","sel_usr_mov");
      //     comboselect(Gentidad,Gruta+"ejecutora/ent_eve","Selecciona Entidad","item.ide_eje","item.nom_eje","form3","sel_ent_usr");
           if(detmov.det=='Si') { // El Evento tiene un movimiento
             html_tab2=` <table class="table table-hover table-bordered">
                                         <tbody>
                                         <tr><th>Fecha y Hora</th><td class="text-align-right">${detmov.fch_mov} ${detmov.hra_mov}</td></tr>
                                         <tr><th>Asignado por</th><td class="text-align-right">${detmov.nom_com} </td></tr>
                                         <tr><th>Detalle</th><td class="text-align-right">${detmov.gls_mov} </td></tr>
                                         <tr><th>Estado</th><td class="text-align-right">${deteve.des_est} </td></tr>
                                         </tbody>
                                     </table>`;
              $('#panelhtml_2').html(html_tab2);
       //      console.log('SI tengo movimiento');
         //    console.log(detmov.fch_mov+' '+detmov.hra_mov);
             $('#form3 #date_atencion').val(detmov.fch_mov+' '+detmov.hra_mov);
             $('#form3 #existemov').val(detmov.det);
             $('#form3 #inp_ide_e_m').val(detmov.ide_e_m);
             $('#form4 #inp_ide_e_m').val(detmov.ide_e_m);

             $('#form3 #gls_mov').val(detmov.gls_mov);
           } else {  // El Evento es Nuevo y se va hacer la atencion
             var now = new Date();
             var quehoraes=horaActual();
             $('#form3 #date_atencion').val(quehoraes);
             $('#form3 #existemov').val(detmov.det);
             $('#form3 #gls_mov').val('');
           }

           var grillaent='';
           if(data.entidades) {

             var identidadRsp = [];
             $.each(data.entidades, function(k,item){
               grillaent+='<tr > \
               <td  >'+item.ide_ent+' </td> \
               <td  >'+item.nom_eje+' </td> </tr>';
               identidadRsp.push(item.ide_ent);
             })

             //comboselectmultiple(identidadRsp,Gruta+"ejecutora/ent_rsp",null,"item.ide_ent","item.nom_eje","form3","entidad_a_cargo");
             $('#grillaentidadesver').html(grillaent);
           } else
           {
             //comboselectmultiple(null,Gruta+"ejecutora/ent_rsp",null,"item.ide_ent","item.nom_eje","form3","entidad_a_cargo");
             $('#grillaentidadesver').html('xxx');
           }
       /*** GRILLA BITACORA ***/
       var grillahist='';
       if(data.bitacora) {
         $.each(data.bitacora, function(k,item){
           grillahist+='<tr > \
           <td  >'+item.nom_com+' </td> \
           <td  >'+item.gls_bit+' </td> </tr>';
         })

         $('#grillahistoriaver').html(grillahist);
       } else
       {
         $('#grillahistoriaver').html('');
       }
       /*** FIN GRILLA BITACORA ***/

         if(show) { $('#ModalVer').modal('show') }
         });

       } // Fin de Funcion traer_evento_ver

$(function(){
var map,markerSource,vectorSource,popup;

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

$(".select2").each(function(){
    $(this).select2($(this).data());
});

// Prevent Dropzone from auto discovering this element:
Dropzone.options.myAwesomeDropzone = false;
$('#my-awesome-dropzone').dropzone();
Holder.run();
/**
 * Holder js hack. removing holder's data to prevent onresize callbacks execution
 * so they don't fail when page loaded
 * via ajax and there is no holder elements anymore
 */
/*$('img[data-src]').each(function(){
    delete this.holder_data;
}); */


$('#datetimepicker2').datetimepicker({
  format: 'YYYY/MM/DD HH:mm:ss'
});
$('#form2 #datetimepicker2').datetimepicker({
  format: 'YYYY/MM/DD HH:mm:ss'
});
$('#form3 #datetimepicker2').datetimepicker({
  format: 'YYYY/MM/DD HH:mm:ss'
});

         function agregarMarcador(idevento,latitud,longitud,fecha,hora,tipoevento,evento,descripcion,nrodoc,nombre,apepat,estadoevento)
         {
//console.log(idevento+' '+descripcion);
         var newMarkers = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([parseFloat(longitud),parseFloat(latitud)], 'EPSG:4326', 'EPSG:3857')),
           idevento:idevento,
           name: evento,
           tipoevento: tipoevento,
           hora: hora,
           fecha: fecha,
           descr:descripcion,
           nrodoc:nrodoc,
           nombre:nombre,
           apepat:apepat,
           esteve:estadoevento,
           style: new ol.style.Style({
             //   label : "${name}",
             label:'xxx',
             image: new ol.style.Circle({
               radius: 20,
               fill: new ol.style.Fill({
                 color: '#363b30'
               }),
               stroke: new ol.style.Stroke({
                 color: 'black'
               }),


             })
           }),
             });
             var ico=tipo_icono(tipoevento);
        //     console.log(ico);
         tipoicono="ve_es";

         tipou='img/'+ico;

         var iconStylex = new ol.style.Style({
           image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
             anchor: [0.5, 0.5],
             anchorXUnits: 'fraction',
             anchorYUnits: 'pixels',
             name:'zzzz',
             opacity: 1,
            // src: '<?php echo base_url(); ?>img/ve_es_'+giro+vel+'.png',
            src:tipou

           }))

         });


         newMarkers.setStyle(iconStylex);
         markerSource.addFeature(newMarkers);

             }

             function zoomEven(lat,lon) {
               //alert(lat+' '+lon);
               var latmax=lat+0.012;
               var latmin=lat-0.012;
               var lonmax=lon+0.012;
               var lonmin=lon-0.012;
               var extent =[parseFloat(lonmin),parseFloat(latmin),parseFloat(lonmax),parseFloat(latmax)];
               extent = ol.extent.applyTransform(extent, ol.proj.getTransform("EPSG:4326", "EPSG:3857"));
         //      var extent = source.getExtent();
               map.getView().fit(extent, map.getSize());
               // ol.proj.transform([-77.1610,-12.0429], 'EPSG:4326', 'EPSG:3857')
               //map.getView().fitExtent(extent, map.getSize());
         //      map.getView().setZoom(map.getView().getZoom()+1);
                 }
   function estado_eventos() {
     $.getJSON('reportes/reporte_cuenta', function(data) {
       //console.log(data.nro_total);
         $('#nroeve').html(data.nro_total );
       var div_stats=''
       var div_stats_bottom='';
          $.each(data.Eventos, function(k,item){

            div_stats=div_stats+`<div class="row progress-stats">
                <div class="col-sm-9">
                    <h5 class="name">`+item.nombre+` (`+item.num+`)</h5>
                    <p class="description deemphasize">`+item.evento+`</p>
                    <div class="progress progress-sm js-progress-animate bg-white">
                        <div class="`+item.color+`" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                             data-width="`+item.por+`%"
                             aria-valuemax="100" style="width: 0;">
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 text-align-center">
                    <span class="status rounded rounded-lg bg-body-light">
                        <small><span id="percent-1">`+item.por+`</span>%</small>
                    </span>
                </div>
            </div>`;


            div_stats_bottom=div_stats_bottom+`<div class="col-md-4">
                <section class="widget">
                    <!-- .widget>header is generally a place for widget title and widget controls. see .widget in _base.scss -->
                    <header>
                        <h5>
                          `+item.nombre+`
                        </h5>
                        <div class="widget-controls">
                            <a href="#"><i class="glyphicon glyphicon-cog"></i></a>
                            <a href="#" data-widgster="close"><i class="glyphicon glyphicon-remove"></i></a>
                        </div>
                    </header>
                    <div class="widget-body">
                        <div class="stats-row">
                            <div class="stat-item">
                                <h6 class="name">Nuevos</h6>
                                <p class="value">`+item.nue+`</p>
                            </div>
                            <div class="stat-item">
                                <h6 class="name">Pendientes</h6>
                                <p class="value">`+item.pen+`</p>
                            </div>
                            <div class="stat-item">
                                <h6 class="name">Cerrados</h6>
                                <p class="value">`+item.cer+`</p>
                            </div>
                        </div>
                        <div class="progress progress-xs">
                            <div class="`+item.color+`" role="progressbar" aria-valuenow="60"
                                 aria-valuemin="0" aria-valuemax="100" style="width: `+item.por+`%;">
                            </div>
                        </div>
                        <p>
                            <small><span class="circle bg-warning"><i class="glyphicon glyphicon-chevron-up"></i></span></small>
                            <span class="fw-semi-bold">0% mas</span>
                            comparado con el mes anterior</p>
                    </div>
                </section>
            </div>`;

          })
 $('#div_stats').html(div_stats );
$('#div_stats_bottom').html(div_stats_bottom );
 $('.js-progress-animate').animateProgressBar();
          console.log(div_stats);
})
   }

         function jalar_data() {

         var grillautx='';
         var nrox=0;
         var otablex = {};
         $.getJSON('eventos/lis_eve/null/null', function(data) {

           $.each(data, function(k,item){
         nrox++;


         grillautx=grillautx+'<tr > \
         <td class="zoome" lat="'+item.lat_eve+'" lon="'+item.lon_eve+'" >  <i class="fa fa-search-plus text-gray"></i> </a>'+ item.ide_eve+'  </a></td> \
         <td  >'+item.lat_eve+' </td> \
         <td  >'+item.lon_eve+' </td> \
         <td  >'+ item.des_eve+' </td> \
         <td  >'+ item.des_est+' </td> \
         <td  >'+ item.nom_eje+' </td> \
         <td  >'+ item.fch_eve+' '+item.hra_eve+' </td> \
         <td  >'+ item.nom_ciu+' '+item.pat_ciu+' </td> \
         <td  >'+ item.gls_eve+' </td> \
         <td  >'+ item.nro_doc+' </td> \
         <td class="ver_registro" idr="'+item.ide_eve+'"><i class="fa fa-search"></i> </td>\
         <td class="edita_registro" idr="'+item.ide_eve+'"><i class="fa fa-pencil"></i> </td></tr> ';


         agregarMarcador(item.ide_eve,item.lat_eve,item.lon_eve,item.fch_eve,item.hra_eve,item.ide_t_e,item.des_eve,item.gls_eve,item.nro_doc,item.nom_ciu,item.pat_ciu,item.des_est);

         }) // Fin Each
         $('#grilladatos').html(grillautx );

         otablex = $('#datatable-table').DataTable({
           "order": [[ 0, "desc" ]],
           "columnDefs": [
             { "visible": false, "targets": 1 },
             { "visible": false, "targets": 2  },
             { "visible": false, "targets": 8  },
             { "visible": false, "targets": 9  }
           ]
         });


           $(".dataTables_length select").selectpicker({
               width: 'auto'
           });

            $("#datatable-table").on('click','.zoome',function() {
              var lat = $(this).attr('lat');
              var lon = $(this).attr('lon');
          //    console.log(lat);
            //  console.log(lon);
zoomEven(lat,lon);

            })


            $("#datatable-table").on('click','.edita_registro',function() {

            var idr = $(this).attr('idr');
          //  alert(idr);
          //  console.log('Id de registro '+idr);
            $('#titulomodal').html('Editar Contacto');
            $('#accion').val('edita');
            var det_registro='';
            traer_evento(idr,1);

            });


            $('#datatable-table tbody').on( 'click', 'tr', function () {
                $(this).toggleClass('selected');

                var pos = otablex.row(this).index();
                var row = otablex.row(pos).data();
                var poscell = otablex.cell(pos,1).index();
         console.log('================');
                console.log(poscell);
                console.log(row[1]);
                console.log(row[2]);
                   var lo=parseFloat(row[2]);
                  var la=parseFloat(row[1]);
                  var coorz =[lo,la];
         console.log(coorz);
                coorz=ol.proj.transform(coorz, 'EPSG:4326', 'EPSG:3857');

                var coo = ol.proj.transform(coorz, 'EPSG:3857', 'EPSG:4326');
                name=row[3]
                estado_evento=row[4];
                fecha=row[6];
                descr=row[8];
                nrodoc=row[9];
                nombre=row[7];

                var coord1 = ol.coordinate.toStringHDMS(coo, 2);
                popup.show(coorz,'<div class="pop"><h4>' + name +'</h4><p class="info" > Fecha Evento: '+fecha+
                '<br> Descripcion: '+ descr +
                '<br> Documento: '+nrodoc+
                '<br> Ciudadano: '+nombre+
                '<br> Estado Evento: '+estado_evento+
                '</p></div>');

             /*
                    if ( $(this).hasClass('selected') ) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    } */
                } );




         }) // Fin Json


         } // Fin Funcion jalar_data

         $("#datatable-table").on('click','.ver_registro',function() {

           var idr = $(this).attr('idr');
        //   alert(idr);
         //  console.log('Id de registro '+idr);
           $('#titulomodal').html('Editar Contacto');
           $('#accion').val('edita');
           var det_registro='';
           traer_evento_ver(idr,1);

         });

         function initMap() {

           console.log("Aqui declararemos OPENLAYERS");

           markerSource = new ol.source.Vector();

           var markerLayer = new ol.layer.Vector({
             projection: 'EPSG:4326',
             title: 'Eventos ',
             source: markerSource

           });

           vectorSource = new ol.source.Vector();   // Definimos la capa del Evento
           var vectorLayer = new ol.layer.Vector({
             projection: 'EPSG:4326',
             title: 'Nuevo Evento',
             source: vectorSource
           });


           var iconStyle = new ol.style.Style({
             image: new ol.style.Icon({
               //anchor: [0.1, 46],
               anchorXUnits: 'fraction',
               anchorYUnits: 'pixels',
               opacity: 0.50,
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


           map = new ol.Map({
             target: 'map',
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

                   ,
                   new ol.layer.Tile({
                     title: 'Water color',
                     type: 'base',
                     visible: false,
                     source: new ol.source.Stamen({
                       layer: 'watercolor'
                     })
                   }),
                 ]
               }),
               new ol.layer.Group({
                 title: 'Overlays',
                 layers: [
                   markerLayer,vectorLayer
                 ]
               })

             ]
             ,
             target: 'map',
             renderer: 'canvas',
             controls: ol.control.defaults({
               attributionOptions:  ({
                 collapsible: true
               })
             }),
             view: new ol.View({
               center: ol.proj.transform([-76.83,-12.0429], 'EPSG:4326', 'EPSG:3857'),
               zoom: 11
             })
           });


           var layerSwitcher = new ol.control.LayerSwitcher({
             tipLabel: 'Legenda' // Optional label for button
           });

           map.addControl(layerSwitcher);


           popup = new ol.Overlay.Popup();
           map.addOverlay(popup);


           map.on('click', function (evt) {

             if(agregaEve) { // Aqui se Agrega Un Evento por el Usuario

               var feature = new ol.Feature(
                 new ol.geom.Point(evt.coordinate)
               );
               var coord = feature.getGeometry().getCoordinates();
               coord = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
               $("#inp_lat").val(coord[1]);
               $("#inp_lon").val(coord[0]);
               _activaTab("tab2");
               //test();
               comboselect(Gentidad,"ejecutora/ent_eve","Selecciona Entidad Evento","item.ide_eje","item.nom_eje","form1","sel_ent_eve");
               comboselect(null,"eventos/tip_eve","Selecciona Tipo Eve","item.ide_t_e","item.des_eve","form1","sel_tip_eve");

               feature.setStyle(iconStyle);
               vectorSource.addFeature(feature);
               //    ol.Observable.unByKey(key)

               agregaEve=false;
             }


             var f = map.forEachFeatureAtPixel(
               evt.pixel,
               function(ft, layer){
                 //      alert('ssss');
                 console.log(ft);              return ft;

               },null,function(layer){console.log('hola');}
             );

             if (f) {
               console.log(f.getGeometryName());
               nomx=f.get('name');
               if(nomx) {
                 var geometry = f.getGeometry();
                 var coord = geometry.getCoordinates();
                 var coo = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
                 coorz=[-77.1610,-12.0429];
                 var lo=parseFloat(coord[0]);
                 var la=parseFloat(coord[1]);
                 var coorz =[lo,la]
                 idevento=f.get('idevento');
                 name=f.get('name');
                 tipoevento=f.get('tipoevento');
                 hora=f.get('hora');
                 fecha=f.get('fecha');
                 descr=f.get('descr');
                 nrodoc=f.get('nrodoc');
                 nombre=f.get('nombre');
                 apepat=f.get('apepat');
                 var coord1 = ol.coordinate.toStringHDMS(coo, 2); // coordendas con 2 decimales
                 popup.show(coord,'<div class="pop"><h4>' + name +'</h4><p class="info" > Fecha Evento: '+fecha+
                 '<br> Descripcion: '+ descr +
                 '<br> Documento: '+nrodoc+
                 '<br> Ciudadano: '+nombre+' '+apepat+
                 '</p></div>');
               }
             }

           })
      /*     descr:descripcion,
           nrodoc:nrodoc,
           nombre:nombre,
           apepat:apellido,
           esteve:estadoevento*/


           function _activaTab(tab){
             $('.nav-tabs a[href="#' + tab + '"]').tab('show');
           }
           function _AgregaEventoxx() {
alert('xxx');
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
               comboselect(Gentidad,"ejecutora/ent_rsp","Selecciona Entidad Rsp","item.ide_eje","item.nom_eje","form1","sel_ent_eve");
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



         } // Finaliza Init Map





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

        $('.widget').widgster();
        initMap();
      ///  initCalendar();
    //    initRickshaw();
      //  initAnimations();
      if(Gjd) {
         jalar_data();
         estado_eventos();
       }
    //console.log(jalar_data());
$("#form1").on('submit', function(e){
      e.preventDefault();
      var form = $(this);
      form.parsley().validate();
      if (form.parsley().isValid()){
        $.ajax({
               url:Gruta+'eventos/new_eve',
               data:$(this).serialize(),
               type:'POST',
               success:function(data){
               console.log(data);
               $('#datatable-table').dataTable().fnDestroy();
               markerSource.clear();
               vectorSource.clear();
               limpiaForm('form1');
               jalar_data();
               Messenger.options = {
                 extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                 theme: 'future'
               }
               msg=Messenger().post({
                 message: "Datos Guardados",
                 hideAfter:3,
               })
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
               },
               error:function(data){
                // $("#error").show().fadeOut(20000); //===Show Error Message====
               }
             });
        }
  }); // Fin de envio form1

  $("#form2").on('submit', function(e){
        e.preventDefault();
        var form = $(this);
        form.parsley().validate();
        if (form.parsley().isValid()){
          $.ajax({
                 url:Gruta+'eventos/upd_eve',
                 data:$(this).serialize(),
                 type:'POST',
                 success:function(data){
                 console.log(data);
                 $('#datatable-table').dataTable().fnDestroy();
                 Messenger.options = {
                   extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                   theme: 'future'
                 }
                 msg=Messenger().post({
                   message: "Datos Guardados",
                   hideAfter:3,
                 })
                // markerSource.clear();
                 //vectorSource.clear();
                 limpiaForm('form1');
                 jalar_data();
                //   $("#success").show().fadeOut(20000); //=== Show Success Message==
                 },
                 error:function(data){
                  // $("#error").show().fadeOut(20000); //===Show Error Message====
                 }
               });
          }
    }); // Fin de envio form2

    $("#form3").on('submit', function(e){
          e.preventDefault();
          var form = $(this);
          form.parsley().validate();
        //  console.log($(this).serialize());
          if (form.parsley().isValid()){
            $.ajax({
                   url:Gruta+'eventos/upd_mov',
                   data:$(this).serialize(),
                   type:'POST',
                   success:function(data){
                     Messenger.options = {
                       extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                       theme: 'future'
                     }
                     msg=Messenger().post({
                       message: "Datos Guardados",
                       hideAfter:3,
                     })
                     //console.log(data);
                   traer_evento(data,0);
                  //   $("#success").show().fadeOut(20000); //=== Show Success Message==
                   },
                   error:function(data){
                    // $("#error").show().fadeOut(20000); //===Show Error Message====
                   }
                 });
            }
      }); // Fin de envio form3

      $("#form4").on('submit', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            var form = $(this);
            form.parsley().validate();
          //  console.log($(this).serialize());
            if (form.parsley().isValid()){
              console.log('enviaremosdata');
              console.log($(this).serialize());
              //alert('ok');
             $.ajax({
                     url:Gruta+'eventos/ins_bit',
                     data:$(this).serialize(),
                     type:'POST',
                     success:function(data){
                     traer_evento(data,0);
                    limpiaForm("form4");
                    Messenger.options = {
                      extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                      theme: 'future'
                    }
                    msg=Messenger().post({
                      message: "Agregado a la Bitacora",
                      hideAfter:1,
                    })


                    //msg.update "Gracias"
                    //msg.hide()
                    //   $("#success").show().fadeOut(20000); //=== Show Success Message==
                     },
                     error:function(data){
                      // $("#error").show().fadeOut(20000); //===Show Error Message====
                     }
                   });
                  //  $("#form4").unbind('submit');
              }
        }); // Fin de envio form4

    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);


});
