$(function(){

  $('#btnNuevoEst').click(function() {
    location.href = Gruta+'Estudiantes/nuevo'
  })

  $('#go').click(function () {
    var id =  $('#grup').val();
    var ido =  $('#act').val();
    if (id !== null) {
      location.href = Gruta+'Asistencia/actividad/tomar_asistencia/'+id+'/'+ido;

    }else {
      alert('Debe Seleccionar un grupó')
    }
  })


  $('#act').change(function() {
    var id  = $(this).val();
    console.log(typeof(id));
    if (id !== '') {
      $.getJSON(Gruta+'academia/Asistencia/grup_asis/'+id, function (data) {
        console.log(data);
        $('#grup').val(data[0].ide_grupo);
      })
    }
  })



    function pjaxPageLoad(){
      comboselect(null,Gruta+'academia/Actividades/act_listar_grup','Seleccione el Actividad','item.ide_act','item.actividad ','form_asis1','act')
      $(".select2").each(function(){
          $(this).select2($(this).data());
      });


    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);




})
