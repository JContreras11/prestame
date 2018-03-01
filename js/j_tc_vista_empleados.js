$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON('Tcpersonal/listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td >   ${item.ide_per}  </td>
        <td  > ${item.per_nom} </td>
        <td  >${item.per_ape_pat} </td>
        <td  >${item.per_ape_mat}</td>
        <td  >${item.per_fecha_ingreso}</td>
        <td  >${item.per_tel1} </td>
         <td class="ver_registro"  idr="${item.ide_per}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_per}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_per}"><i class="fa fa-trash-o"></i> </td>

         </tr> `;

      }) // Fin Each
      $('#grilladatos').html(grillautx );

      tabledatos = $('#datatable-table').DataTable({
        "aoColumnDefs": [
          { 'bSortable': false, 'aTargets': [ 2,3,4] }
        ],

        "oLanguage": {
          "sSearch": "Buscar: "
        }
      });


      $(".dataTables_length select").selectpicker({
        width: 'auto'
      });






    }) // Fin Json


  } // Fin Funcion jalar_data


    function pjaxPageLoad(){

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
            url:`${Gruta}Tcpersonal/${destino}`,
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

    $("#btnNuevo").click(function() {
      limpiaForm('myModaledita');
      $('#myModaleditaLabel').html('Nuevo Empleado');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
  //  console.log('Id de registro '+idr);
  $('#myModalver #myModalLabel').html('Datos Empleado');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON(Gruta+'Tcpersonal/listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`  <tr><th>Id  </th><td >   ${item.ide_per}  </td></tr>
          <tr><th>Nombre: </th><td  > ${item.per_nom} </td></tr>
          <tr><th>Ap Paterno: </th><td  >${item.per_ape_pat} </td></tr>
          <tr><th>Ap Materno: </th><td  >${item.per_ape_mat}</td></tr>
          <tr><th>Fecha Ingreso: </th><td  >${item.per_fecha_ingreso}</td></tr>
          <tr><th>Telefono 1: </th><td  >${item.per_tel1} </td></tr>`;



      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Empeado');
    $('#accion').val('edita');

    $.getJSON(Gruta+'Tcpersonal/listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_per);
        $('#inp_text2').val(item.ser_nom);

        $("#inp_nom_per").val(item.per_nom);
        $("#inp_ape_pat").val(item.per_ape_pat);
        $("#inp_ape_mat").val(item.per_ape_mat);
        //$("#inp_ide_cli").val(item.ide_cliente);
        //$("#inp_dir_cli").val(item.cli_dir);
        $("#inp_tel_per1").val(item.per_tel1);
        $("#inp_tel_per2").val(item.per_tel2);
        //$("#inp_ema_cli").val(item.cli_email);
        //$("#gls_obs_cli").val(item.cli_gls);


        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Personal');
      $('#accion').val('borra');

      $.getJSON(Gruta+'Tcpersonal/listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#inp_text1').val(item.ide_per);
          $('#inp_text2').val(item.ser_nom);

          $("#inp_nom_per").val(item.per_nom);
          $("#inp_ape_pat").val(item.per_ape_pat);
          $("#inp_ape_mat").val(item.per_ape_mat);
          //$("#inp_ide_cli").val(item.ide_cliente);
          //$("#inp_dir_cli").val(item.cli_dir);
          $("#inp_tel_per1").val(item.per_tel1);
          $("#inp_tel_per2").val(item.per_tel2);
          //$("#inp_ema_cli").val(item.cli_email);
          //$("#gls_obs_cli").val(item.cli_gls);
          });
        $('#myModaledita').modal('show')
      });
    });




});
