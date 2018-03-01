
var chk = [];



$(function(){



  /*WORKSPACE*/


  $('#more_services').click(function () {
    if ($(this).text() == '+') {
      $(this).text('-')
    }else {
      $(this).text('+')
    }
    $('#m_services').fadeToggle();
  })

  $.getJSON(Gruta+"tc_mt/serv_listar",function (data) {
    console.log(data);

        var o = 0;
        for (var i = 0; i < data.length ; i++) {
            if (o >= 3) {
              o = 0;
            }
            $('#col_'+o).append('<div class="checkbox checkbox-primary"><input id="'+data[i].ide_ser+'" type="checkbox" name="services[]" value="'+data[i].ide_ser+'"><label for="'+data[i].ide_ser+'">'+data[i].ser_nom+'</label></div>')
            o++
        }
  })

    $('#m_services').on('change','input:checkbox',function () {

      if( $(this).is(':checked') ){
          //alert("El checkbox con valor " + $(this).attr('id') + " ha sido seleccionado");
          var _this  = $(this).attr('id')
          var p_l = 0;
          var p_f = 0;
          var precio;
          var tiposerv= this.id;
          var tipoveh=$("#sel_tip_veh").val();
          rutatiposervicio=Gruta+'Tctarifas/listar_tarifa_tipo/'+tiposerv+'/'+tipoveh;
          $.getJSON(rutatiposervicio, function(data) {
            $.each(data, function(k,item){
              console.log(item);
                precio= item.spr_precio;
                console.log(precio);
            })

            if (precio !== undefined) {
            chk[_this] = parseFloat(precio);
            if ($("#inp_precio_lista").val() != "" &&   $("#inp_precio_final").val() != "") {
              p_l= parseFloat($("#inp_precio_lista").val());
              p_f= parseFloat($("#inp_precio_final").val());
              p_l= p_l + chk[_this]
              p_f= p_f + chk[_this]
              $("#inp_precio_lista").val(p_l)
              $("#inp_precio_final").val(p_f)
            }else {
              $("#inp_precio_lista").val(chk[_this])
              $("#inp_precio_final").val(chk[_this])
            }
          }else {
            alert('Este servicio no tiene un precio establecido');
          }
       })
      } else {
            if (chk[this.id] !== undefined) {
              p_l= parseFloat($("#inp_precio_lista").val());
              p_f= parseFloat($("#inp_precio_final").val());
              p_l= p_l - chk[this.id]
              p_f= p_f - chk[this.id]
              $("#inp_precio_lista").val(p_l)
              $("#inp_precio_final").val(p_f)
              chk.splice(this.id,1);
          }else {
            alert('Este servicio no tiene un precio establecido');
          }

      }



    })



  /*WORKSPACE*/



  $('#datetimepicker2').datetimepicker({
    format: 'YYYY/MM/DD HH:mm:ss'
  });

  var fechahoy=fechaActual();
  $("#date_servicio").val(fechahoy);

  var horahoy=horaNow();
  $("#inp_hor_ini").val(horahoy);
  $("#inp_hor_fin").val(horahoy);

var last;
  $('#sel_tip_ser').change(function() {
    var tiposerv=this.value;

    $('#'+last).removeAttr('checked');
    $('#'+tiposerv).attr('checked','checked');
    last = tiposerv

    var tipoveh=$("#sel_tip_veh").val();
    console.log(tiposerv+' '+tipoveh);
    rutatiposervicio=Gruta+'Tctarifas/listar_tarifa_tipo/'+tiposerv+'/'+tipoveh;
    var nro=0;
    $.getJSON(rutatiposervicio, function(data) {
      $.each(data, function(k,item){
        nro++;
        $("#inp_precio_lista").val(item.spr_precio);
        $("#inp_precio_final").val(item.spr_precio);
    })
    })
  })

  $('#inp_placa').change(function() {
    //alert('xx');

    placa=this.value.toUpperCase();
    rutavehiculo=Gruta+'Tcvehiculos/fil_veh/'+placa;
    //  console.log(rutavehiculo);
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
            $('#form_res #sel_tip_veh').val(item.ide_tipo_veh).trigger("change");
          $("#sel_mod_veh").val(item.ide_mve);
              $('#form_res #sel_mod_veh').val(item.ide_mve).trigger("change");
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
                  $("#existecliente").val('no');
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
      $(".select2").each(function(){
    //    alert('xxx');
          $(this).select2($(this).data());
      });


      comboselect(null,Gruta+"tc_mt/move_listar","Seleccione Modelo Vehiculo","item.ide_mve","item.tmv_detalle","form_res","sel_mod_veh"); // modelo vehiculo
      comboselect(null,Gruta+"tc_mt/tive_listar","Seleccione Tipo Vehiculo","item.ide_tipo_veh","item.tve_detalle","form_res","sel_tip_veh"); // Tipo Vehiculo
      comboselect(null,Gruta+"tc_mt/serv_listar","Seleccione Tipo Servicio","item.ide_ser","item.ser_nom","form_res","sel_tip_ser"); // Tipo Vehiculo
      comboselect(null,Gruta+"tcpersonal/listar","Personal Responsable","item.ide_per","item.nombrecompleto","form_res","sel_per_car"); // Tipo Vehiculo



      $("#form1").on('submit', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            var form = $(this);
            form.parsley().validate();
            if (form.parsley().isValid()){
              $.ajax({
                     url:Gruta+'tcservicios/new_ser',
                     data:$(this).serialize(),
                     type:'POST',
                     success:function(data){
                       window.location=Gruta+"tcservicios";

                  //    printFact(data);

                     },
                     error:function(data){
                    alert('NO SE PUEDE CREAR EL EVENTO')
                     }
                   });
              }
        });

    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);


});




function printFact(id) {

  $.getJSON(Gruta+'/Tcservicios/detalle_servicio/'+id,function (data) {
      $.ajax({
             url:'http://localhost:8080/print/Imprimir.php',
             data:{json:data},
             type:'POST',
             success:function(data){
                console.log(data);
             },
             error:function(data){
            alert('NO SE PUEDE CREAR EL EVENTO')
             }
           });
  })


}
