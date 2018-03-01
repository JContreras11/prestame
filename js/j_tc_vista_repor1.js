$(function(){

  $(".select2").each(function(){
      $(this).select2($(this).data());
  });


  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    var datagrafico = [];
    var datagraficoy = [];
    var etiquetas = [];
    $.getJSON(Gruta+'tcreportes/repor1_json', function(data) {

      $.each(data, function(k,item){
        nrox++;
          datagrafico[k]=[item.ser_nom,item.count];
          datagraficoy[k] = [k,item.count];
          etiquetas[k] = [k,item.ser_nom];
        grillautx=grillautx+`<tr >
        <td  >${item.ser_nom} </td>
        <td  >${item.otr_fecha} </td>
        <td  >${item.count} </td>

         </tr> `;

      }) // Fin Each
      console.log('xxxx CARAJO *****');
      console.log(datagrafico);
          console.log(datagraficoy);
      $('#grilladatos').html(grillautx );

      tabledatos = $('#datatable-table').DataTable({
      /*  "aoColumnDefs": [
          { 'bSortable': false, 'aTargets': [ 3,4,5] }
        ],
*/
        "oLanguage": {
          "sSearch": "Buscar: "
        }
      });

      var bar_customised_1 = [[1388534400000, 120], [1391212800000, 70],  [1393632000000, 100], [1396310400000, 60], [1398902400000, 35]];
  //    var bar_customised_2 = [[1388534400000, 120], [1391212800000, 60], [1393632000000, 30], [1396310400000, 73], [1398902400000, 30]];
    //  var bar_customised_3 = [[1388534400000, 120], [1391212800000, 40], [1393632000000, 47], [1396310400000, 22], [1398902400000, 24]];

      var data = [
          {
              label: "# de Eventos",
              data: datagraficoy,
              bars: {
                  show: true,
                //  barWidth: 12*24*60*60*300,
                  fill: true,
                  lineWidth:0,
                  order: 1
              }
          }
          /*,
          {
              label: "Google",
              data: bar_customised_2,
              bars: {
                  show: true,
                  barWidth: 12*24*60*60*300,
                  fill: true,
                  lineWidth: 0,
                  order: 2
              }
          },
          {
              label: "Facebook",
              data: bar_customised_3,
              bars: {
                  show: true,
                  barWidth: 12*24*60*60*300,
                  fill: true,
                  lineWidth: 0,
                  order: 3
              }
          }*/

      ];


      $.plot($("#flot-bar"), data, {
          series: {
            bars: {
                show: true,
                barWidth: 0.6,
                fill: true,
                align: 'center',
                fillColor: {
                    colors: [{
                        opacity: 0.8
                    }, {
                        opacity: 0.8
                    }]
                }
            }
          },
          xaxis: {
        /*      mode: "time",
              min: 1387497600000,
              max: 1400112000000,
              tickLength: 0,
              tickSize: [1, "month"],
              axisLabel: 'Month',
              axisLabelUseCanvas: true,
              axisLabelFontSizePixels: 13,
              axisLabelPadding: 15 */
                        /*ticks:etiquetas,
                         rotateTicks: 45, */
                         ticks: etiquetas,
rotateTicks: 45,
labelWidth: 100,
//labelHeight: 150,
//reserveSpace: true
          },
          yaxis: {
              axisLabel: 'Value',
              axisLabelUseCanvas: true,
              axisLabelFontSizePixels: 13,
              axisLabelPadding: 5
          },
          grid: {
              hoverable: true,
              borderWidth: 0
          },
          legend: {
              backgroundColor: "transparent",
              labelBoxBorderColor: "none"
          },
          colors: ["#64bd63", "#f0b518", "#F7653F"]
      });


      //console.log(otable);


    }) // Fin Json


  } // Fin Funcion jalar_data
  function initFlotBar(){
      var bar_customised_1 = [[1388534400000, 120], [1391212800000, 70],  [1393632000000, 100], [1396310400000, 60], [1398902400000, 35]];
  //    var bar_customised_2 = [[1388534400000, 120], [1391212800000, 60], [1393632000000, 30], [1396310400000, 73], [1398902400000, 30]];
    //  var bar_customised_3 = [[1388534400000, 120], [1391212800000, 40], [1393632000000, 47], [1396310400000, 22], [1398902400000, 24]];

      var data = [
          {
              label: "Apple",
              data: bar_customised_1,
              bars: {
                  show: true,
                  barWidth: 12*24*60*60*300,
                  fill: true,
                  lineWidth:0,
                  order: 1
              }
          }
          /*,
          {
              label: "Google",
              data: bar_customised_2,
              bars: {
                  show: true,
                  barWidth: 12*24*60*60*300,
                  fill: true,
                  lineWidth: 0,
                  order: 2
              }
          },
          {
              label: "Facebook",
              data: bar_customised_3,
              bars: {
                  show: true,
                  barWidth: 12*24*60*60*300,
                  fill: true,
                  lineWidth: 0,
                  order: 3
              }
          }*/

      ];

      function _initChart(){
          $.plot($("#flot-bar"), data, {
              series: {
                  bars: {
                      show: true,
                      barWidth: 12*24*60*60*350,
                      lineWidth: 0,
                      order: 1,
                      fillColor: {
                          colors: [{
                              opacity: 1
                          }, {
                              opacity: 0.7
                          }]
                      }
                  }
              },
              xaxis: {
                  mode: "time",
                  min: 1387497600000,
                  max: 1400112000000,
                  tickLength: 0,
                  tickSize: [1, "month"],
                  axisLabel: 'Month',
                  axisLabelUseCanvas: true,
                  axisLabelFontSizePixels: 13,
                  axisLabelPadding: 15
              },
              yaxis: {
                  axisLabel: 'Value',
                  axisLabelUseCanvas: true,
                  axisLabelFontSizePixels: 13,
                  axisLabelPadding: 5
              },
              grid: {
                  hoverable: true,
                  borderWidth: 0
              },
              legend: {
                  backgroundColor: "transparent",
                  labelBoxBorderColor: "none"
              },
              colors: ["#64bd63", "#f0b518", "#F7653F"]
          });
      }

    //_initChart();

      ///SingApp.onResize(_initChart);


  }

    function pjaxPageLoad(){
      console.log('Iniciamos la Carga');
initFlotBar();
      jalar_data();

      $("#form1").on('submit', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);
        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "ins";
                break;
            case "edita":
                destino = "upd";
                break;
            case "borra":
                destino = "del";
                break;
        }
        $.ajax({
            url:`ejecutora/${destino}`,
            data:$(this).serialize(),
            type:'POST',
            success:function(data){

              $('#datatable-table').dataTable().fnDestroy();
              limpiaForm('form1');
              jalar_data();
              $('#myModaledita').modal('hide');
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
            },
            error:function(data){
              alert('sasax');
              // $("#error").show().fadeOut(20000); //===Show Error Message====
            }
          });

        }
      });


    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
    console.log('Id de registro '+idr);
    $('#titulomodal').html('Editar Contacto');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON('man_ent_eje/det_eje/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+='<tr><th>IDE_EJE: </th>\
        <td>'+item.ide_eje+'</td></tr>\
        <tr><th>Nombre Ejecutora: </th>\
        <td>'+item.nom_eje+'</td></tr>\
        <tr><th>Latitud: </th>\
        <td>'+item.lat_eje+'</td></tr>\
        <tr><th>Longitud: </th>\
        <td>'+item.lon_eje+'</td></tr>\
        <tr><th>Cobertura: </th>\
        <td>'+item.ubi_dis+'</td></tr>'

      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#titulomodal').html('Editar Contacto');
    $('#accion').val('edita');

  //  comboselectmultiple(null,Gruta+"ejecutora/ent_cob",null,"item.gid","item.ubi","form1","entidad_a_cargo");

    $.getJSON('man_ent_eje/det_eje/'+idr, function(data) { // Inicio JSON
      $.each(data.entidad, function(k,item){

        $('#inp_text1').val(item.ide_eje);
        $('#inp_text2').val(item.nom_eje);
        $('#inp_text3').val(item.lat_eje);
        $('#inp_text4').val(item.lon_eje);
        $('#inp_text5').val(item.ubi_dis);


      });

      if(data.cobertura) {
        var identidadRsp = [];
        $.each(data.cobertura, function(k,item){
        /*  grillaent+='<tr > \
          <td  >'+item.ide_ent+' </td> \
          <td  >'+item.nom_eje+' </td> </tr>'; */
          identidadRsp.push(item.gid);
        })

        //comboselectmultiple(identidadRsp,Gruta+"ejecutora/ent_rsp",null,"item.ide_ent","item.nom_eje","form3","entidad_a_cargo");
              comboselectmultiple(identidadRsp,Gruta+"ejecutora/ent_cob",null,"item.gid","item.ubi","form1","entidad_a_cargo")
        //$('#grillaentidades').html(grillaent);
      } else
      {
      comboselectmultiple(null,Gruta+"ejecutora/ent_cob",null,"item.gid","item.ubi","form1","entidad_a_cargo")
      //        $('#grillaentidades').html('');
      }


      $('#myModaledita').modal('show');

    });
  });

    /*** Elimina Registro ****/
    $("#tabladatos").on('click','.borra_registro',function() {
    var idc = $(this).attr('idc');
    var idem = $(this).attr('idem');
    $('#titulomodal').html('Eliminar Contacto');
    $('#accion').val('borra');
    var listaem='';
    var selecempresa='';

    $.getJSON('<?php echo base_url(); ?>index.php/empresas/listar', function(data) {
    $.each(data, function(k,item){
    if (parseInt(item.id_empresa)==parseInt(idem)) {selecempresa=" selected"; console.log(idc);
    console.log(item.id_empresa); } else {selecempresa="";};
    listaem=listaem+'<option value="'+item.id_empresa+'" '+selecempresa+'>'+ item.razonsocial+' </option> ';
    }); // Fin de Each
    $('#listaempresas').html(listaem);
    });

    $.getJSON('contactos/detallecontacto/'+idc, function(data) { // Inicio JSON
        $.each(data, function(k,item){
            $('#idcontacto').val(item.id_contacto);
            $('#nombrec').val(item.nombres);
            $('#apellidoc').val(item.apellidop);
            $('#telefonoc').val(item.celular);
            $('#emailc').val(item.correo);
            $('#dnic').val(item.dni);
            $('#empresac').val(item.razonsocial);
            $('#cargoc').val(item.cargo);
        });
        $('#myModalver').modal('show')
    });
    });




});
