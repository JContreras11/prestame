$(function(){


  /*WORKSPACE*/
  var n= 1;

          $('#hlp #prev').click(function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            switch (n) {
              case 1:
                $(this).addClass('disabled');
              break;

              case 2:
                  $(this).addClass('disabled');
                  $('#step_'+n).css('display','none');
                  $('#step_'+(n-1)).css('display','block');
                  n--;
              break;

              case 3:
                  n;
              break;
              default:


            }
          })

          $('#save #prev').click(function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            switch (n) {
              case 1:
                $(this).addClass('disabled');
              break;

              case 2:
                  $(this).addClass('disabled');
                  $('#step_'+n).css('display','none');
                  $('#step_'+(n-1)).css('display','block');
                  n--;
              break;

              case 3:
              $('#step_'+n).css('display','none');
              $('#step_'+(n-1)).css('display','block');
              $('#hlp').css('display','block');
              $('#save').css('display','none');
              n--;
              break;
              default:


            }
          })

          $('#next').click(function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
              switch (n) {
                case 1:
                  $('#prev').removeClass('disabled');
                  $('#step_'+n).css('display','none');
                  $('#step_'+(n+1)).css('display','block');
                  n++;
                break;

                case 2:
                $('#step_'+n).css('display','none');
                $('#step_'+(n+1)).css('display','block');
                $('#hlp').css('display','none');
                $('#save').css('display','block');
                n++;
                break;

                case 3:
                  n;
                break;
              default:
              console.log(n);
              }
          })


  /*WORKSPACE*/


  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON('Tc_reserva/res_list', function(data) {

      $.each(data, function(k,item){
        nrox++;


        grillautx=grillautx+`<tr >
        <td >   ${k+1}  </td>
        <td  > ${item.cli_nom} ${item.cli_ape_pat} ${item.cli_ape_mat}</td>
        <td  >${item.veh_placa}</td>
        <td  >${item.nombre_marca} </td>
        <td  >${item.ser_nom} </td>
        <td  >${item.res_fecha} ${item.res_hor_ini}</td>
        <td  ><strong>${item.res_codigo_cli} </strong></td>
         <td class="ver_registro"  idr="${item.ide_res}" ><i class="fa fa-search"></i> </td>
         <td class="edita_registro" idr="${item.ide_res}"><i class="fa fa-pencil"></i> </td>
         <td class="borra_registro" idr="${item.ide_res}" idre="${item.ide_otr}"><i class="fa fa-trash-o"></i> </td>
         </tr> `;

      }) // Fin Each
      $('#grilladatos').html(grillautx );

      otablex = $('#datatable-table').DataTable({
        "columnDefs": [
    //      { "visible": false, "targets": 1 },
      //    { "visible": false, "targets": 2  }

        ]
      });


      $(".dataTables_length select").selectpicker({
        width: 'auto'
      });



      $('#datatable-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');



      } );

      //console.log(otable);


    }) // Fin Json


  } // Fin Funcion jalar_data


    function pjaxPageLoad(){
      console.log('Iniciamos la Carga');

      jalar_data();




    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
    console.log('Id de registro '+idr);
    $('#myModalLabel').html('Datos De la Reserva');
    $('#accion').val('edita');
    var det_registro='';


    $.getJSON('Tc_reserva/res_list/'+idr, function(data) { // Inicio JSON
      console.log(data)
      $.each(data, function(k,item){
        det_registro+=`<tr>
        <th>Documento identidad: </th>
        <td>${item.cli_doc}</td></tr>
        <tr><th>Nombre: </th>
        <td>${item.cli_nom}</td></tr>
        <tr><th>Apellido paterno: </th>
        <td>${item.cli_ape_pat}</td></tr>
        <tr><th>Apellido Materno: </th>
        <td>${item.cli_ape_mat}</td></tr>
        <tr><th>Email: </th>
        <td>${item.cli_email}</td></tr>
        <tr><th>Telefonos: </th>
        <td>${item.cli_tel1} / ${item.cli_tel2}</td></tr>
        --------------------------
        <tr><th>Placa: </th>
        <td>${item.veh_placa}</td></tr>
        <tr><th>Tipo: </th>
        <td>${item.tve_detalle}</td></tr>
        <tr><th>Marca: </th>
        <td>${item.nombre_marca}</td></tr>
        <tr><th>Color: </th>
        <td>${item.veh_color}</td></tr>
        <tr><th>Año: </th>
        <td>${item.veh_year}</td></tr>
        <tr><th>Servicio: </th>
        <td>${item.ser_nom}</td></tr>
        <tr><th>Fecha: </th>
        <td>${item.res_fecha}</td></tr>
        <tr><th>Hora Inicio: </th>
        <td>${item.res_hor_ini}</td></tr>
        <tr><th>Hora Final: </th>
        <td>${item.res_hor_fin}</td></tr>
        <tr><th>Precio: </th>
        <td> S/. ${item.otr_precio_final}</td></tr>
        <tr><th>Codigo: </th>
        <td><h1>${item.res_codigo_cli}</h1></td></tr>
        `

      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });



    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edita_registro',function() {
    var idr = $(this).attr('idr');
    $('#titulomodal').html('Editar Contacto');
    $('#accion2').val('edita');

    $.getJSON('Tc_reserva/res_list/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){

        $('#form_res #ide_cliente ').val(item.ide_cliente);
        $('#form_res #ide_veh ').val(item.ide_veh);
        $('#form_res #ide_otr ').val(item.ide_otr);
        $('#form_res #ide_res ').val(item.ide_res);



        $('#form_res #inp_doc_cli ').val(item.cli_doc);
        $('#form_res #inp_nom_cli ').val(item.cli_nom);
        $('#form_res #inp_ape_pat ').val(item.cli_ape_pat);
        $('#form_res #inp_ape_mat ').val(item.cli_ape_mat);
        $('#form_res #inp_dir_cli ').val(item.cli_dir);
        $('#form_res #inp_ema_cli ').val(item.cli_email);
        $('#form_res #inp_tel_cli1 ').val(item.cli_tel1);
        $('#form_res #inp_tel_cli2 ').val(item.cli_tel2);
        $('#form_res #inp_placa ').val(item.veh_placa);
        $('#form_res #inp_col ').val(item.veh_color);
        $('#form_res #inp_ano ').val(item.veh_year);
        $('#form_res #ide_fecha ').val(item.res_fecha);
        $('#form_res #inp_hor_ini ').val(item.res_hor_ini);
        $('#form_res #inp_hor_fin ').val(item.res_hor_fin);
        $('#form_res #inp_precio_lista ').val(item.otr_precio_lista);
        $('#form_res #inp_precio_final ').val(item.otr_precio_final);

        $('#ide').val(item.ide_res);
        comboselect(item.ide_mve,Gruta+"tc_mt/move_listar","Seleccione Modelo Vehiculo","item.ide_mve","item.tmv_detalle","form_res","sel_mod_veh"); // modelo vehiculo
        comboselect(item.ide_tipo_veh,Gruta+"tc_mt/tive_listar","Seleccione Tipo Vehiculo","item.ide_tipo_veh","item.tve_detalle","form_res","sel_tip_veh"); // Tipo Vehiculo
        comboselect(item.ide_ser,Gruta+"tc_mt/serv_listar","Seleccione Tipo Servicio","item.ide_ser","item.ser_nom","form_res","sel_tip_ser"); // Tipo Vehiculo
        comboselect(item.ide_per,Gruta+"tcpersonal/listar","Personal Responsable","item.ide_per","item.nombrecompleto","form_res","sel_per_car"); // Tipo Vehiculo


      });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.borra_registro',function() {
      $('#myModalborrar').modal('show');
      $('#ide_res').val($(this).attr('idr'));
      $('#ide_ord').val($(this).attr('idre'));

    });

    $('#deleteClient').click(function(e) {
          e.preventDefault();
          var idr = $('#ide_res').val();
          var idre = $('#ide_ord').val();
          $.ajax({
            url:`${Gruta}Tcclientes/del`,
            type:'POST',
            data:{id_res: idr, id_otr: idre},
            success: function(data) {
              $('#datatable-table').dataTable().fnDestroy();
              jalar_data();
              $('#myModalborrar').modal('hide');
            },
            error:function(data){
              alert('Error');
              // $("#error").show().fadeOut(20000); //===Show Error Message====
            }
          });


    })


    $("#btnNuevo").click(function() {
      limpiaForm('myModaledita');
      $('#myModaleditaLabel').html('Nuevo Empleado');
      $('#accion2').val('nuevo');
      $('#myModaledita').modal('show')
    })



$("#form_res").on('submit', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion2').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "res_ins_2";
                break;
            case "edita":
                destino = "res_upd";
                break;
            case "borra":
                destino = "del";
                break;
        }


          $.ajax({
            url:`${Gruta}Tc_reserva/${destino}`,
            data:$(this).serialize(),
            type:'POST',
            success:function(data){

              $('#datatable-table').dataTable().fnDestroy();
              limpiaForm('form1');
              jalar_data();
              $('#myModaledita').modal('hide');
              $('#cod_res').text(data);
              $('#myModalborrars').modal('show');
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
            },
            error:function(data){
              alert('sasax');
              // $("#error").show().fadeOut(20000); //===Show Error Message====
            }
          });

        }
      });



});
