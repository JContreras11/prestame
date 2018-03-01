var i;

$(function(){

/*WORKSPACE*/

$('#selectAll').change(function () {
  if( $(this).is(':checked') ) {
      $('#form_noti .noti_user').attr('checked','checked');
  }else {
    $('#form_noti .noti_user').removeAttr('checked');
  }
})



$('#newplant').click(function(e) {
  e.preventDefault();
  var w = $('#wysiwyg').val();
  var n = $('#nom_p').val();

  $.ajax({
    url:`${Gruta}Notificaciones/new_plantilla`,
    data:{plantilla: w, nombre:n},
    type:'POST',
    success:function(data){
      if (data) {
        alert('Plantilla Creada con Exito');
        location.reload()
      }
    },
    error:function(data){
      alert('sasax');
      // $("#error").show().fadeOut(20000); //===Show Error Message====
    }
  });
})


$('#cli').click(function () {
  var o =  document.getElementsByClassName('wysihtml5-sandbox')
  o[0].contentDocument.children[0].children[1].append('[nombre]')
})
$('#corr').click(function () {
  var o =  document.getElementsByClassName('wysihtml5-sandbox')
  o[0].contentDocument.children[0].children[1].append('[correo]')
})




/*WORKSPACE*/
  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON('Tcclientes/listar_noti', function(data) {

      $.each(data, function(k,item){
        nrox++;


        grillautx=grillautx+`<tr >
        <td ><div class="checkbox checkbox-primary">
                        <input id="${k}" type="checkbox" name="noti[]" class="noti_user" value="${item.ide_cliente}">
                        <label for="${k}">
                        </label>
            </div></td>
        <td >   ${k+1}  </td>
        <td  > ${item.cli_nom} ${item.cli_ape_pat} ${item.cli_ape_mat}</td>
        <td  >${item.cli_doc} </td>
        <td  >${item.cli_email} </td>
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
      comboselect(null,Gruta+'Notificaciones/list_plan','Seleccione Plantilla','item.ide_mno','item.mno_nombre','form_noti','noti_plan');
      jalar_data();


    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    /*** Ver Registro ****/
    $("#datatable-table").on('click','.ver_registro',function() {

    var idr = $(this).attr('idr');
    console.log('Id de registro '+idr);
    $('#myModalLabel').html('Datos Cliente');
    $('#accion').val('edita');
    var det_registro='';


    $.getJSON('Tcclientes/listar/'+idr, function(data) { // Inicio JSON
      console.log(data)
      $.each(data, function(k,item){
        det_registro+=`<tr>
        <th>Documento identidad: </th>
        <td>${item.cli_doc}</td></tr>
        <tr><th>Nombre: </th>
        <td>${item.nombrecompleto}</td></tr>
        <tr><th>Apellido paterno: </th>
        <td>${item.cli_ape_pat}</td></tr>
        <tr><th>Apellido Materno: </th>
        <td>${item.cli_ape_mat}</td></tr>
        <tr><th>Email: </th>
        <td>${item.cli_email}</td></tr>`

      });
         $('#detalle_registro').html(det_registro);
        $('#myModalver').modal('show')
    });
    });



    /*** Edita Registro ****/
    $("#datatable-table").on('click','.edita_registro',function() {
    var idr = $(this).attr('idr');
    $('#titulomodal').html('Editar Contacto');
    $('#accion').val('edita');

    $.getJSON('Tcclientes/listar/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp-text1').val(item.cli_doc);
        $('#inp-text2').val(item.cli_nom);
        $('#inp-text3').val(item.cli_ape_pat);
        $('#inp-text4').val(item.cli_ape_mat);
        $('#inp-text5').val(item.cli_email);
        $('#inp-text6').val(item.cli_dir);
        $('#inp-text7').val(item.cli_gls);
        $('#inp_tel_cli1').val(item.cli_tel1);
        $('#inp_tel_cli2').val(item.cli_tel2);
        $('#ide').val(item.ide_cliente);

      });
      $('#myModaledita').modal('show')
    });
  });

    /*** Elimina Registro ****/
    $("#datatable-table").on('click','.borra_registro',function() {
      $('#myModalborrar').modal('show');
      $('#ide').val($(this).attr('idr'));

    });

    $('#deleteClient').click(function(e) {
          e.preventDefault();
          var idr = $('#ide').val();
          $.ajax({
            url:`${Gruta}Tcclientes/del`,
            type:'POST',
            data:{id: idr},
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
      $('#accion').val('nuevo');
      $('#myModaledita').modal('show')
    })



$("#form_noti").on('submit', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();


          $.ajax({
            url:`${Gruta}Notificaciones/send`,
            data:$(this).serialize(),
            type:'POST',
            success:function(data){

              $('#datatable-table').dataTable().fnDestroy();
              limpiaForm('form1');
              jalar_data();
              $('#myModaledita').modal('hide');
              location.reload()
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
            },
            error:function(data){
              alert('sasax');
              // $("#error").show().fadeOut(20000); //===Show Error Message====
            }
          });


      });



});
