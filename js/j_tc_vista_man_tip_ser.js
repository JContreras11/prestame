$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'Tc_mt/serv_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;

        grillautx=grillautx+`<tr >
        <td  >${item.ide_ser} </td>
        <td  >${item.ser_nom} </td>
         <td class="ver_registro" idr="${item.ide_ser}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_ser}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_ser}"><i class="fa fa-trash-o"></i> </td>
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
                destino = "serv_ins";
                break;
            case "edita":
                destino = "serv_upd";
                break;
            case "borra":
                destino = "serv_del";
                break;
        }


          $.ajax({
            url:`${Gruta}Tc_mt/${destino}`,
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
      $('#myModaleditaLabel').html('Nuevo Tipo de Servicio');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
  //  console.log('Id de registro '+idr);
  $('#myModalver #myModaleditaLabel').html('Datos Tipo Servicio');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON(Gruta+'Tc_mt/serv_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>Id Serv: </th> <td>${item.ide_ser}</td></tr>
        <tr><th>Tipo Servicio </th><td>${item.ser_nom}</td></tr>`;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Tipo Servicio');
    $('#accion').val('edita');

    $.getJSON(Gruta+'Tc_mt/serv_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp_text1').val(item.ide_ser);
        $('#inp_text2').val(item.ser_nom);
        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Servicio');
      $('#accion').val('borra');

      $.getJSON(Gruta+'Tc_mt/serv_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#inp_text1').val(item.ide_ser);
          $('#inp_text2').val(item.ser_nom);
          });
        $('#myModaledita').modal('show')
      });
    });




});
