$(function(){
  var estu= 0, prof=0, pag=0;
  var meses = ['Enero','Febrero','Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  var date = new Date();
  var mes = date.getMonth();
  var year = date.getFullYear();

  $('#mes').text(meses[mes]);

  $('#estu').text(estu);
  $('#prof').text(prof);
  $('#pag').text(pag);

  $.getJSON(Gruta+'academia/Academia/data_count',function (data) {
    $('#estu').text(data.est);
    $('#prof').text(data.prof);
    $('#pag').text(data.pagos);
  });

  jalar_data()




  // var agregaEve=false;
  // $('#boton1').hover(function() {
  //      $(this).css('cursor','pointer');
  //  });
  //
  // $("#boton1").on('click',function() {
  //    $('#datatable-table').dataTable().fnDestroy();
    // jalar_data(0,0)
  // })
  //
  // $('#boton2').hover(function() {
  //      $(this).css('cursor','pointer');
  //  });
  //
  // $("#boton2").on('click',function() {
  //    $('#datatable-table').dataTable().fnDestroy();
    // jalar_data(0,1)
  // })
  // $('#boton3').hover(function() {
  //      $(this).css('cursor','pointer');
  //  });
  // $("#boton3").on('click',function() {
  //    $('#datatable-table').dataTable().fnDestroy();
    // jalar_data(0,2)
  // })
  // $('#boton4').hover(function() {
  //      $(this).css('cursor','pointer');
  //  });
  // $("#boton4").on('click',function() {
  //    $('#datatable-table').dataTable().fnDestroy();
    // jalar_data(0,3)
  // })

    function jalar_data() {

    var grillautx='';
    var nrox=0;
    var otablex = {};

    mes =  1 +  parseInt(mes);

    $.getJSON(Gruta+'academia/Academia/pag_list/'+year+'/'+mes, function(data) {
      console.log(data);
      $.each(data, function(k,item){
        nrox++;
        grillautx=grillautx+`<tr >
        <td  > ${k+1} </td>
        <td  > ${item.est_nom} ${item.est_ape_pat} ${item.est_ape_mat}  </td>
        <td  > ${item.pago} </td>
        <td  > ${item.fecha_pago}</td>
        <td  > ${item.detalle_tip_pago} </td>
        <td  > ${item.detalle_per_pago} </td>
        <td  > ${item.detalle_est_pago} </td> `;
      }) // Fin Each
      $('#grilladatos').html(grillautx );
      $('#datatable-table').DataTable({
        "order": [[ 0, "asc" ]],
        "aoColumnDefs": [
          { 'bSortable': false }
        ]

      });

    }) // Fin Json


    } // Fin Funcion jalar_data


    function jalar_dataxx(vie,vte) {

    var grillautx='';
    var nrox=0;
    var otablex = {};
    $.getJSON(`<?php echo base_url(); ?>index.php/eventos/lis_eve/${vie}/${vte}`, function(data) {

      $.each(data, function(k,item){
        nrox++;

        grillautx=grillautx+'<tr > \
        <td class="zoome" lat="'+item.lat_eve+'" lon="'+item.lon_eve+'" >  '+ item.ide_eve+'  </td> \
        <td  >'+ item.des_eve+' </td> \
        <td  >'+ item.des_est+' </td> \
        <td  >'+ item.nom_eje+' </td> \
        <td  >'+ item.fch_eve+' '+item.hra_eve+' </td> \
        <td  >'+ item.nom_ciu+' '+item.pat_ciu+' </td> \
        <td  >'+ item.nro_doc+' </td> \
        <td class="ver_registro" idr="'+item.ide_eve+'"><a href="eventos/ver/'+item.ide_eve+'"><i class="fa fa-search"></i></a> </td>\
        <td class="edita_registro" idr="'+item.ide_eve+'"><a href="eventos/editar/'+item.ide_eve+'"><i class="fa fa-pencil"></i></a> </td></tr> ';

      }) // Fin Each
      $('#grilladatos').html(grillautx );
      $('#datatable-table').DataTable({

      });

    }) // Fin Json


    } // Fin Funcion jalar_data



})
