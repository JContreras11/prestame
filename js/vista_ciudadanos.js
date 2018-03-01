$(function(){



  function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON('ciudadano/lis_ciu', function(data) {

      $.each(data, function(k,item){
        nrox++;


        grillautx=grillautx+'<tr > \
        <td class="zoome" lat="'+item.lat_eve+'" lon="'+item.lon_eve+'" >   </a>'+ item.ide_ciu+'  </a></td> \
        <td  >'+item.lat_eve+' </td> \
        <td  >'+item.lon_eve+' </td> \
        <td  >'+ item.nro_doc+' </td> \
        <td  >'+ item.nom_ciu+' </td> \
        <td  >'+ item.pat_ciu+' </td> \
        <td  >'+ item.mat_ciu+' </td> \
         <td class="ver_registro"  idr="'+item.ide_ciu+'" ><i class="fa fa-search"></i> </td><td class="edita_registro" idr="'+item.ide_ciu+'"><i class="fa fa-pencil"></i> </td></tr> ';

      }) // Fin Each
      $('#grilladatos').html(grillautx );

      otablex = $('#datatable-table').DataTable({
        "columnDefs": [
          { "visible": false, "targets": 1 },
          { "visible": false, "targets": 2  }

        ]
      });


      $(".dataTables_length select").selectpicker({
        width: 'auto'
      });



      $('#datatable-table tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');

        var pos = otablex.row(this).index();
        var row = otablex.row(pos).data();
        var poscell = otablex.cell(pos,1).index();
        console.log('================');
        console.log(poscell);
        console.log(row[1]);
        console.log(row[2]);

      } );

      //console.log(otable);


    }) // Fin Json


  } // Fin Funcion jalar_data


    function pjaxPageLoad(){
      console.log('Iniciamos la Carga');

      jalar_data();

      //console.log(jalar_data());
      $("#form1").on('submit', function(e){
        e.preventDefault();
        var form = $(this);
        form.parsley().validate();
        if (form.parsley().isValid()){
          $.ajax({
            url:'eventos/new_eve',
            data:$(this).serialize(),
            type:'POST',
            success:function(data){
              console.log(data);
              $('#datatable-table').dataTable().fnDestroy();
              markerSource.clear();
              vectorSource.clear();
              limpiaForm('form1');
              jalar_data();
              //   $("#success").show().fadeOut(20000); //=== Show Success Message==
            },
            error:function(data){
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
    $.getJSON('ciudadano/det_ciu/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        det_registro+='<tr><th>Documento identidad: </th>\
        <td>'+item.nro_doc+'</td></tr>\
        <tr><th>Nombre: </th>\
        <td>'+item.nom_ciu+'</td></tr>\
        <tr><th>Apellido paterno: </th>\
        <td>'+item.pat_ciu+'</td></tr>\
        <tr><th>Apellido Materno: </th>\
        <td>'+item.mat_ciu+'</td></tr>\
        <tr><th>Email: </th>\
        <td>'+item.ema_ciu+'</td></tr>'

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

    $.getJSON('ciudadano/det_ciu/'+idr, function(data) { // Inicio JSON
      $.each(data, function(k,item){
        $('#inp-text1').val(item.nro_doc);
        $('#inp-text2').val(item.nom_ciu);
        $('#inp-text3').val(item.pat_ciu);
        $('#inp-text4').val(item.mat_ciu);
        $('#inp-text5').val(item.ema_ciu);
      });
      $('#myModaledita').modal('show')
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
