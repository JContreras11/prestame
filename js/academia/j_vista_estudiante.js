var menor = false;
$(function(){

  $('#btnNuevoEst').click(function() {
    location.href = Gruta+'Estudiantes/nuevo'
  })

  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'academia/Estudiante/estu_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${k+1} </td>
        <td  >${item.est_nom} ${item.est_ape_pat} ${item.est_ape_mat} </td>
        <td  >${item.est_ano_nac} </td>
        <td  >${item.est_tel1} </td>
         <td class="ver_registro" idr="${item.ide_estudiante}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_estudiante}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_estudiante}"><i class="fa fa-trash-o"></i> </td>
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



      $("#form_estu").on('submit', function(e){  // Cambio de id a clase
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "estu_ins";
                break;
            case "edita":
                destino = "estu_upd";
                break;
            case "borra":
                destino = "estu_del";
                break;
        }


          $.ajax({
            url:`${Gruta}academia/Estudiante/${destino}`,
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
      $('#myModaleditaLabel').html('');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {
    comboselect(null,Gruta+'academia/Estudiante/estu_listar','Seleccione Estudiante','item.ide_estudiante','item.est_nom','frm_pago','inp_text2')
    comboselect(null,Gruta+'academia/Mantenimiento/mant_for_pago_listar','Seleccione la forma de pago','item.ide_forma_pago','item.detalle_for_pago','frm_pago','inp_text3')
    comboselect(null,Gruta+'academia/Mantenimiento/mant_tip_pago_listar','Seleccione el tipo de pago','item.ide_tip_pago','item.detalle_tip_pago','frm_pago','inp_text4')
    comboselect(null,Gruta+'academia/Mantenimiento/mant_est_pago_listar','Seleecione el estado de pago','item.ide_es_pago','item.detalle_est_pago','frm_pago','inp_text5')
    comboselect(null,Gruta+'academia/Mantenimiento/mat_per_pag_listar','Seleecione el periodo de pago','item.ide_periodo_pago','item.detalle_per_pago','frm_pago','inp_text10')



    $('#tab1').removeClass('active');
    $('#tab2').removeClass('active');
    $('#tab3').removeClass('active');
    $('#tab1_li').removeClass('active');
    $('#tab2_li').removeClass('active');
    $('#tab3_li').removeClass('active');

    $('#tab1').addClass('active');
    $('#tab1_li').addClass('active');


    var idr = $(this).attr('idr');


    $('#myModalver #myModaleditaLabel').html('Tipo');
    $('#accion').val('edita');


    var det_est='';
    var det_apo='';


      $.getJSON(Gruta+'academia/Estudiante/estu_listar/'+idr, function(data) {
        $.each(data, function(k,item){
          det_est+=`  <br><tr><th>Id: </th> <td>${item.ide_estudiante}</td></tr>
            <tr><th>Nombre Completo </th><td>${item.est_nom} ${item.est_ape_pat} ${item.est_ape_mat}</td></tr>
            <tr><th>Telefono </th><td>${item.est_tel1} / ${item.est_tel2}</td></tr>
            <tr><th>Fech Nacimiento </th><td>${item.est_fec_nac}</td></tr>
            <tr><th>Direccion</th><td>${item.est_dir}</td></tr>`;
          det_apo+=`<tr><th>Nombre Completo </th><td>${item.apo_nom} ${item.apo_ape_pat} ${item.apo_ape_mat}</td></tr>
          <tr><th>Telefono </th><td>${item.apo_tel1} / ${item.apo_tel2}</td></tr>
          <tr><th>Documento </th><td>${item.apo_dni}</td></tr>
          <tr><th>Correo </th><td>${item.apo_email}</td></tr>
          <tr><th>Direccion</th><td>${item.apo_direccion}</td></tr>`;
          $('#pag_nom').val(item.est_nom)
          $('#pag_id').val(item.ide_estudiante)
        });

        $('#tb_estu').html(det_est)
        $('#tb_apoderado').html(det_apo)
        var det_pago = '';

        $.getJSON(Gruta+'academia/Pagos/pago_estu/'+idr, function(data) {
          $.each(data, function(k,item){

            console.log(item);
            det_pago+=`
              <tr>
                <td>${k+1}</td>
                <td>${item.detalle_per_pago}</td>
                <td>${item.detalle_est_pago}</td>
                <td>${item.detalle_tip_pago}</td>
                <td>${item.detalle_for_pago}</td>
                <td>${item.fecha_pago}</td>
              </tr>`;
          })
          $('#tbody_pago').html(det_pago);

          var det_asis = '';
          $.getJSON(Gruta+'academia/Asistencia/asis_listar_est/'+idr, function(data) {
            $.each(data, function(k,item){
              console.log(item);
              det_asis+=`<tr>
                <td>${k+1}</td>
                <td>${item.act_nom}</td>
                <td>${item.act_fecha}</td>
              </tr>`;
            })
            $('#tbody_asis').html(det_asis);
          })
        });


         //$('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });





    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Estudiante');
    $('#accion').val('edita');

    $.getJSON(Gruta+'academia/Estudiante/estu_listar/'+idr, function(data) {
      $.each(data, function(k,item){
        $('#form_estu #inp_text1').val(item.ide_estudiante);
        $('#form_estu #inp_text2').val(item.est_nom);
        $('#form_estu #inp_text3').val(item.est_ape_pat);
        $('#form_estu #inp_text4').val(item.est_ape_mat);
        $('#form_estu #inp_text5').val(item.est_tel1);
        $('#form_estu #inp_text6').val(item.est_dir);
        $('#form_estu #inp_text7').val(item.est_tel2);
        $('#form_estu #inp_text17').val(item.est_ano_nac);
        $('#form_estu #inp_text16').val(item.est_fec_nac);
        comboselect(item.ide_grupo,Gruta+'academia/Mantenimiento/mant_grup_listar','Seleecione el Grupo','item.ide_grupo','item.gru_nom','form_estu','inp_text18')
        //apo o content

        $('#form_estu #inp_text8').val(item.apo_nom);
        $('#form_estu #inp_text9').val(item.apo_ape_pat);
        $('#form_estu #inp_text10').val(item.apo_ape_mat);
        $('#form_estu #inp_text11').val(item.apo_tel1);
        $('#form_estu #inp_text12').val(item.apo_tel2);
        $('#form_estu #inp_text13').val(item.apo_direccion);
        $('#form_estu #inp_text14').val(item.apo_dni);
        $('#form_estu #inp_text15').val(item.apo_email);
        $('#ide_apo').val(item.ide_apoderado);


        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Movimiento');
      $('#accion').val('borra');

      $.getJSON(Gruta+'academia/Estudiante/estu_listar'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.ide_apoderado);
          $('#ide').val(item.ide_estudiante);

          });
        $('#myModalborrar').modal('show')
      });
    });

/*------------------------------------------------nuevo estudiente------------------------------------------------*/


comboselect(null,Gruta+'academia/Mantenimiento/mant_grup_listar','Seleccione el Grupo','item.ide_grupo','item.gru_nom','form_est','grup')

$('#menor').change(function () {
  $('#apoderado').fadeToggle();
  menor == false ? menor= true : menor=false;
})







  $('#send').click(function () {


      if (menor) {


      var estudiante = {
        est_nom:$('#inp_text2').val(),
        est_ape_pat:$('#inp_text3').val(),
        est_ape_mat:$('#inp_text4').val(),
        est_ano_nac:$('#inp_text5').val(),
        est_fec_nac:$('#inp_text6').val(),
        est_dir:$('#inp_text7').val(),
        est_tel1:$('#inp_text8').val(),
        est_tel2:$('#inp_text9').val(),
        apo_nom:$('#inp_text10').val(),
        apo_ape_pat:$('#inp_text11').val(),
        apo_ape_mat:$('#inp_text12').val(),
        apo_tel1:$('#inp_text16').val(),
        apo_tel2:$('#inp_text17').val(),
        apo_direccion:$('#inp_text15').val(),
        apo_dni:$('#inp_text13').val(),
        apo_email:$('#inp_text14').val(),
        grupo: $('#grup').val()
      }


      }else {
      var estudiante = {
        est_nom:$('#inp_text2').val(),
        est_ape_pat:$('#inp_text3').val(),
        est_ape_mat:$('#inp_text4').val(),
        est_ano_nac:$('#inp_text5').val(),
        est_fec_nac:$('#inp_text6').val(),
        est_dir:$('#inp_text7').val(),
        est_tel1:$('#inp_text8').val(),
        est_tel2:$('#inp_text9').val(),
        grupo: $('#grup').val()
      }

      }

      $.ajax({
        url:Gruta+'academia/Estudiante/estu_ins',
        type:'post',
        data:estudiante,
        success:function functionName(data) {
            if (data) {
                alert('Estudiante registrado con exito')
                location.href =  Gruta+'Estudiantes';
            }else {
              alert('check errors')
            }
        },
      })




  })


  $('#changue_2').click(function () {

    var form_pago = $('#frm_pago').serialize();

    $.ajax({
      url:`${Gruta}academia/Pagos/pag_ins`,
      data:form_pago,
      type:'POST',
      success:function(data){
        alert('Pago realizado Exitosamente')
        $('#datatable-table').dataTable().fnDestroy();
        jalar_data();
        $('#myModalver').modal('hide');

      },
      error:function(data){
        alert('Error');
      }
    });
  })

});




function toggle() {
  $('#apode').fadeToggle();
}


function pagoToggle() {
  if ($('#changue').text() == 'Pagar') {
    $('#changue').text('cancelar');
  }else {
    $('#changue').text('Pagar');
  }
  $('#changue_2').fadeToggle();
  $('#list_pag').fadeToggle();
  $('#new_pag').fadeToggle();
}
