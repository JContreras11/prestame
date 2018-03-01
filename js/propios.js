

/** FUNCIONES PARA SMARTSOL ****/
function _activaTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}

function comboselect(id,ruta,frase,id_valor,id_muestra,form,campodestino) {
//alert(ruta);
//console.log(id+' '+id_valor);
 var lista='<option value=""> '+frase+' </option>';
    var selected='';
    $.getJSON(ruta, function(data) {
      $.each(data, function(k,item){

        if (parseInt(eval(id_valor))==parseInt(id)) {selected=" selected"; } else {selected="";};
        lista=lista+'<option value="'+eval(id_valor)+'" '+selected+'>'+eval(id_muestra)+' </option> ';
        }); // Fin de Each
      $('#'+form+' #'+campodestino).html(lista);
      $('#'+form+' #'+campodestino).val(id).trigger("change");
    });

}

function comboselectmultiple(id,ruta,frase,id_valor,id_muestra,form,campodestino) {
//       console.log(id+' '+id_valor);
 var lista;
    var selected='';
    $.getJSON(ruta, function(data) {
      $.each(data, function(k,item){


        lista=lista+'<option value="'+eval(id_valor)+'" >'+eval(id_muestra)+' </option> ';
        }); // Fin de Each
 //       console.log('#'+form+' #'+campodestino+' '+lista);
      $('#'+form+' #'+campodestino).html(lista);
      $('#'+form+' #'+campodestino).val(id).trigger("change");
    });

}

    function limpiaForm(miForm) {
// recorremos todos los campos que tiene el formulario
$('#'+miForm).find(':input').each(function(){
  var type = this.type, tag = this.tagName.toLowerCase();
  if (type == 'text' || type == 'password' || tag == 'textarea')
    this.value = '';
  else if (type == 'checkbox' || type == 'radio')
    this.checked = false;
  else if (tag == 'select')
    this.selectedIndex = 0;
})

}


Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}


function fechaActual() { // YYYY/MM/DD hh:mm:ss
  var d = new Date();
  dformat = [d.getFullYear(),(d.getMonth()+1).padLeft(), d.getDate().padLeft()].join('/')+
  ' ' +
  [ d.getHours().padLeft(),
    d.getMinutes().padLeft(),
    d.getSeconds().padLeft()].join(':');
    return dformat;
  }


  function horaNow() { // YYYY/MM/DD hh:mm:ss
    var d = new Date();
    var dformat = [ d.getHours().padLeft(),
      d.getMinutes().padLeft(),
      d.getSeconds().padLeft()].join(':');
      return dformat;
    }
