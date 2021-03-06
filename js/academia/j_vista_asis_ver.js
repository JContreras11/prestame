$(function(){
function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'academia/Asistencia/asis_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${k+1} </td>
        <td  >${item.act_nom} </td>
        <td  >${item.gru_nom} </td>
        <td  >${item.act_fecha} </td>
        <td  >${item.act_hor_ini} </td>
        <td  >${item.act_hor_fin} </td>
         <td class="ver_registro" idr="${item.ide_act_asi}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_act_asi}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_act_asi}"><i class="fa fa-trash-o"></i> </td>
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



      $(".form1").on('submit', function(e){  // Cambio de id a clase
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "mant_cat_ins";
                break;
            case "edita":
                destino = "mant_cat_upd";
                break;
            case "borra":
                destino = "asis_del";
                break;
        }


          $.ajax({
            url:`${Gruta}academia/Asistencia/${destino}`,
            data:$(this).serialize(),
            type:'POST',
            success:function(data){

              $('#datatable-table').dataTable().fnDestroy();
              limpiaForm('form1');
              jalar_data();
              $('#myModaledita').modal('hide');
              $('#myModalborrar').modal('hide');
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
            },
            error:function(data){
              alert('Error');
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
      $('#myModaleditaLabel').html('Nuevo Estado');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');

  $('#myModalver #myModaleditaLabel').html('Estado');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON(Gruta+'academia/Asistencia/asis_listar_alu/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+=`<tr><th>${k+1}</th><td>${item.est_nom} ${item.est_ape_pat} ${item.est_ape_mat}</td></tr>`;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $.getJSON(Gruta+'academia/Asistencia/asis_listar/'+idr, function(data) { // Inicio JSON
        location.href = Gruta+'Asistencia/actividad/ediar_asistencia/'+data[0].ide_act+'/'+data[0].ide_grupo+'/'+data[0].ide_act_asi;
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Movimiento');
      $('#accion').val('borra');

      $.getJSON(Gruta+'academia/Asistencia/asis_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.act_nom);
          $('#ide').val(item.ide_act_asi);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
