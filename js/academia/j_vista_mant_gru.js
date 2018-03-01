$(function(){

/*WORKSPACE*/

$('#btnNwE').click(function () {
  $(this).css('display','none');
  $('#ext').css('display','none');
  $('#txt_p').css('display','none');
  $('#addext').css('display','none');
  $('#nve').css('display','block');
  $('#addnw').css('display','block');
})




$('#addext').click(function () {
  var ide_gru_add_ests = $('#ide_gru_add_ests').val();
  var ests = $('#ests').val();
  console.log(ests);
  $.ajax({
    url:`${Gruta}academia/Estudiante/est_ins_in_grup`,
    data:{ide_gru:ide_gru_add_ests,est:ests},
    type:'POST',
    success:function(data){
      $('#datatable-table').dataTable().fnDestroy();
      jalar_data();
      $('#myModalver').modal('hide');
      $('#myModalborrar').modal('hide');
    },

  });

})


$('#addnw').click(function () {
  var form_est = $('#add_nw_Est').serialize();
  console.log(form_est);
  $.ajax({
    url:`${Gruta}academia/Estudiante/est_ins_wt_grup`,
    data:form_est,
    type:'POST',
    success:function(data){

      $('#datatable-table').dataTable().fnDestroy();
      limpiaForm('add_nw_Est');
      jalar_data();
      $('#myModalver').modal('hide');
      $('#myModalborrar').modal('hide');

    },

  });

})





/*WORKSPACE*/
  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(Gruta+'academia/Mantenimiento/mant_grup_listar', function(data) {

      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  >${k+1} </td>
        <td  >${item.gru_nom} </td>
        <td  >${item.pro_nom} ${item.pro_ape_pat} </td>
        <td  >${item.cat_nom} </td>
         <td class="ver_registro" idr="${item.ide_grupo}" ><i class="fa fa-search"></i> </td>
         <td class="edi_registro" idr="${item.ide_grupo}"><i class="fa fa-pencil"></i> </td>
         <td class="bor_registro" idr="${item.ide_grupo}"><i class="fa fa-trash-o"></i> </td>
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
      $(".select2").each(function(){
       $(this).select2($(this).data());
      });
      jalar_data();
      comboselect(null,Gruta+'academia/Profesor/prof_listar','Seleccione el Profesor','item.ide_prof','item.pro_nom','form1','inp_text3');
      comboselect(null,Gruta+'academia/Mantenimiento/mant_cat_listar','Seleccione la Categoria','item.ide_categoria','item.cat_nom','form1','inp_text4');
      comboselectmultiple(null,Gruta+'academia/Estudiante/estu_listar','','item.ide_estudiante','item.est_nom','add_ext_Est','ests');


      $(".form1").on('submit', function(e){  // Cambio de id a clase
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = $(this);

        form.parsley().validate();
        if (form.parsley().isValid()){
        var tipo_accion=$('#accion').val();

        switch(tipo_accion) {
            case "nuevo":
                destino = "mant_grup_ins";
                break;
            case "edita":
                destino = "mant_grup_upd";
                break;
            case "borra":
                destino = "mant_grup_del";
                break;
        }


          $.ajax({
            url:`${Gruta}academia/Mantenimiento/${destino}`,
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
      $('#myModaleditaLabel').html('Nuevo Grupo');
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
  //  console.log('Id de registro '+idr);
  $('#myModalver #myModaleditaLabel').html('Grupo');
    $('#accion').val('edita');
    var det_registro='';
    $.getJSON(Gruta+'academia/Mantenimiento/mant_grup_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#ide_gru_add_est').val(item.ide_grupo)
        $('#ide_gru_add_ests').val(item.ide_grupo)
        det_registro+=`<tr><th>Id: </th> <td>${item.ide_grupo}</td></tr>
        <tr><th>Profesor </th><td>${item.gru_nom} </td></tr>
        <tr><th>Profesor </th><td>${item.pro_nom} ${item.pro_ape_pat} ${item.pro_ape_mat}</td></tr>
        <tr><th>Categoria </th><td>${item.cat_nom}</td></tr>`;
      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });
    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edi_registro',function() {

    var idr = $(this).attr('idr');
    $('#myModaleditaLabel').html('Editar Grupo');
    $('#accion').val('edita');

    $.getJSON(Gruta+'academia/Mantenimiento/mant_grup_listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#form1 #inp_text1').val(item.ide_grupo);
        $('#form1 #inp_text2').val(item.gru_nom);
        comboselect(item.ide_prof,Gruta+'academia/Profesor/prof_listar','Seleccione el Profesor','item.ide_prof','item.pro_nom','form1','inp_text3');
        comboselect(item.ide_categoria,Gruta+'academia/Mantenimiento/mant_cat_listar','Deleccione la Categoria','item.ide_categoria','item.cat_nom','form1','inp_text4');
        });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.bor_registro',function() {

      var idr = $(this).attr('idr');
      $('#myModaleditaLabel').html('Borrar Tipo Movimiento');
      $('#accion').val('borra');

      $.getJSON(Gruta+'academia/Mantenimiento/mant_grup_listar/'+idr, function(data) { // Inicio JSON
        $.each(data, function(k,item){
          $('#nom').val(item.gru_nom);
          $('#ide').val(item.ide_grupo);
          });
        $('#myModalborrar').modal('show')
      });
    });




});
