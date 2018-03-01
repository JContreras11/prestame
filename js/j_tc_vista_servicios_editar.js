


$(function(){



  $('#sel_tip_ser').change(function() {
    var tiposerv=this.value;
    var tipoveh=$("#sel_tip_veh").val();
    console.log(tiposerv+' '+tipoveh);
    //listar_tarifa_tipo
    //console.log(tipoveh)


    rutatiposervicio=Gruta+'Tctarifas/listar_tarifa_tipo/'+tiposerv+'/'+tipoveh;
    //  console.log(rutavehiculo);
    var nro=0;
    $.getJSON(rutatiposervicio, function(data) {
      $.each(data, function(k,item){
        nro++;

        $("#inp_precio_lista").val(item.spr_precio);
        $("#inp_precio_final").val(item.spr_precio);
    })
    })
  })

  $('#datetimepicker2').datetimepicker({
    format: 'YYYY/MM/DD HH:mm:ss'
  });

  $('#inp_placa').change(function() {
    //alert('xx');
    placa=this.value;
    rutavehiculo=Gruta+'Tcvehiculos/fil_veh/'+placa;
    console.log(rutavehiculo);
    var nro=0;
    $.getJSON(rutavehiculo, function(data) {
      $.each(data, function(k,item){
        nro++;
        if(item.rpta=='sihaydatos') {
          $("#existevehiculo").val('si');
          $("#existecliente").val('si');

          pat_ciu=item.cli_ape_pat;
          mat_ciu=item.cli_ape_mat;
          nom_ciu=item.cli_nom;
          ide_ciu=item.ide_cliente;
          $("#inp_ide_cli").val(item.ide_cliente);
          $("#inp_doc_cli").val(item.cli_doc);
          $("#inp_nom_cli").val(nom_ciu);
          $("#inp_ape_pat").val(pat_ciu);
          $("#inp_ape_mat").val(mat_ciu);
          $("#inp_ide_ciu").val(ide_ciu);
          $("#inp_dir_cli").val(item.cli_dir);
          $("#inp_tel_cli1").val(item.cli_tel1);
          $("#inp_tel_cli2").val(item.cli_tel2);
          $("#inp_ema_cli").val(item.cli_email);
          $("#gls_obs_cli").val(item.cli_gls);
          $("#inp_ide_veh").val(item.ide_veh);

            $("#sel_tip_veh").val(item.ide_tipo_veh);
            $("#sel_mod_veh").val(item.ide_mve);
            $("#inp_col").val(item.veh_color);
            $("#inp_ano").val(item.veh_year);
            $("#gls_veh").val(item.veh_gls);
        }
})

    })

  })


  $('#inp_doc_cli').change(function() {
    var pat_ciu='';
    var mat_ciu='';
    var nom_ciu='';
    var ide_ciu='';
    dni=this.value;
    rutaciudadano=Gruta+'Tcclientes/fil_cli/'+dni;
    console.log(rutaciudadano);
    var nro=0;
    $.getJSON(rutaciudadano, function(data) {
      $.each(data, function(k,item){
        nro++;
        if(item.rpta=='sihaydatos') {
          console.log("SI HAY");
          $("#existecliente").val('si');
          pat_ciu=item.cli_ape_pat;
          mat_ciu=item.cli_ape_mat;
          nom_ciu=item.cli_nom;
          ide_ciu=item.ide_cliente;
          $("#inp_ide_cli").val(item.ide_cliente);
          $("#inp_dir_cli").val(item.cli_dir);
          $("#inp_tel_cli1").val(item.cli_tel1);
          $("#inp_tel_cli2").val(item.cli_tel2);
          $("#inp_ema_cli").val(item.cli_email);
          $("#gls_obs_cli").val(item.cli_gls);
        } else {
          console.log("NO HAY");
          console.log($("#inp_doc_cli").val());
          $.ajax({
            data: { "ndni" : $("#inp_doc_cli").val() },
            type: "POST",
            dataType: "json",
            url: "../../reniec/example/consulta.php",
          }).done(function( data, textStatus, jqXHR ){
            if(data['success']!="false" && data['success']!=false)
            {
              $("#json_code").text(JSON.stringify(data, null, '\t'));
              if(typeof(data['result'])!='undefined')
              {
                console.log(data['result'].Paterno);
                pat_ciu=data['result'].Paterno;
                nom_ciu=data['result'].Nombre;
                mat_ciu=data['result'].Materno;
                $("#inp_nom_cli").val(nom_ciu);
                $("#inp_ape_pat").val(pat_ciu);
                $("#inp_ape_mat").val(mat_ciu);
                $("#inp_ide_ciu").val(ide_ciu);
              }
            }
            else
            {
              if(typeof(data['msg'])!='undefined')
              {
                alert( data['msg'] );
              }
            }
          })

        }
      })
      $("#inp_nom_cli").val(nom_ciu);
      $("#inp_ape_pat").val(pat_ciu);
      $("#inp_ape_mat").val(mat_ciu);
      $("#inp_ide_ciu").val(ide_ciu);
    }) // FIN getJSON

  });





    function pjaxPageLoad(){


  //    console.log('INICIAMOS NEW SERVICIO');
      comboselect(null,Gruta+"tc_mt/move_listar","Seleccione Modelo Vehiculo","item.ide_mve","item.tmv_detalle","form1","sel_mod_veh"); // modelo vehiculo
      comboselect(null,Gruta+"tc_mt/tive_listar","Seleccione Tipo Vehiculo","item.ide_tipo_veh","item.tve_detalle","form1","sel_tip_veh"); // Tipo Vehiculo
      comboselect(null,Gruta+"tc_mt/serv_listar","Seleccione Tipo Servicio","item.ide_ser","item.ser_nom","form1","sel_tip_ser"); // Tipo Vehiculo
      comboselect(null,Gruta+"tcpersonal/listar","Personal Responsable","item.ide_per","item.nombrecompleto","form1","sel_per_car"); // Tipo Vehiculo


      $("#form1").on('submit', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            var form = $(this);
            form.parsley().validate();
            if (form.parsley().isValid()){
              $.ajax({
                     url:Gruta+'tcservicios/upd_ser',
                     data:$(this).serialize(),
                     type:'POST',
                     success:function(data){
                       window.location=Gruta+"tcservicios";
                    /*   //console.log(data);
                       if (data) {
                      //   console.log(data);
                         $('#datatable-table').dataTable().fnDestroy();
                         markerSource.clear();
                         vectorSource.clear();
                         limpiaForm('form1');
                         jalar_data();
                        $("#BtnAddEvento").removeClass('disabled');
                        _activaTab("tab1");
                         Messenger.options = {
                           extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                           theme: 'future'
                         }
                         msg=Messenger().post({
                           message: "Datos Guardados",
                           hideAfter:3,
                         })
                       } else
                       {
                         Messenger.options = {
                           extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                           theme: 'future'
                         }
                         msg=Messenger().post({
                           message: "NO SE PUEDE AGREGAR EL EVENTO NO ESTA EN LA COBERTURA",
                        //   type: 'error',
                           showCloseButton: true,
                           hideAfter:10,
                         })
                       }
                       */
                       //   $("#success").show().fadeOut(20000); //=== Show Success Message==
                     },
                     error:function(data){
                    alert('NO SE PUEDE CREAR EL EVENTO')  // $("#error").show().fadeOut(20000); //===Show Error Message====
                     }
                   });
              }
        }); // Fin de envio form1

        $("#formborrarimg").on('submit', function(e){

              e.preventDefault();
              e.stopImmediatePropagation();
  //  alert('borrar');
              var form = $(this);
              form.parsley().validate();
              if (form.parsley().isValid()){
                $.ajax({
                       url:Gruta+'tcservicios/del_img',
                       data:$(this).serialize(),
                       type:'POST',
                       success:function(data){
                         //window.location=Gruta+"tcservicios";
                         window.location.reload();
                      /*   //console.log(data);
                         if (data) {
                        //   console.log(data);
                           $('#datatable-table').dataTable().fnDestroy();
                           markerSource.clear();
                           vectorSource.clear();
                           limpiaForm('form1');
                           jalar_data();
                          $("#BtnAddEvento").removeClass('disabled');
                          _activaTab("tab1");
                           Messenger.options = {
                             extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                             theme: 'future'
                           }
                           msg=Messenger().post({
                             message: "Datos Guardados",
                             hideAfter:3,
                           })
                         } else
                         {
                           Messenger.options = {
                             extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
                             theme: 'future'
                           }
                           msg=Messenger().post({
                             message: "NO SE PUEDE AGREGAR EL EVENTO NO ESTA EN LA COBERTURA",
                          //   type: 'error',
                             showCloseButton: true,
                             hideAfter:10,
                           })
                         }
                         */
                         //   $("#success").show().fadeOut(20000); //=== Show Success Message==
                       },
                       error:function(data){
                      alert('NO SE PUEDE CREAR EL EVENTO')  // $("#error").show().fadeOut(20000); //===Show Error Message====
                       }
                     });
                }
          }); // Fin de envio form1

        //$('.widget').widgster();
        //initMap();
    //    initCalendar();
      //  initRickshaw();
        //initAnimations();
         jalar_data();
    /*     $(".select2").each(function(){
         //    alert('xxx');
             $(this).select2($(this).data());
         }) */
    //console.log(jalar_data());

//alert(Gid_evento);

  // traer_evento_ver(Gid_evento,0);
    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);


});
