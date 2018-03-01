

$(function(){
var color = '#999a9c';
var entrada= false;
var salida= false;
var lug= false;
var des= false;
var url= false;
var sel =  'default';
var pago = 0;
var pressed = 0;
/*workspace*/

$('#nwg').click(function () {
  $('#ngp').css('display','block');
  $('#grup').css('display','none');

  pressed = 1;
})
/*workspace*/



  $('#cd').click(function () {
    $(this).prev().css('box-shadow','2px 3px 5px 0px #4a4a4a');
    $('#cp').prev().css('box-shadow','none');
    $('#pt').prev().css('box-shadow','none');
    $('#ot').prev().css('box-shadow','none');
    color ='#3275e6';
    sel =  'cd';
  })
  $('#cp').click(function () {
    $(this).prev().css('box-shadow','2px 3px 5px 0px #4a4a4a');
    $('#cd').prev().css('box-shadow','none');
    $('#pt').prev().css('box-shadow','none');
    $('#ot').prev().css('box-shadow','none');
    color ='#4bb343';
    sel =  'cp';
  })
  $('#pt').click(function () {
    $(this).prev().css('box-shadow','2px 3px 5px 0px #4a4a4a');
    $('#cd').prev().css('box-shadow','none');
    $('#cp').prev().css('box-shadow','none');
    $('#ot').prev().css('box-shadow','none');
    color ='#503cc3';
    sel =  'pt';

    $('#pg').css('display','block');
  })
  $('#ot').click(function () {
    $(this).prev().css('box-shadow','2px 3px 5px 0px #4a4a4a');
    $('#cd').prev().css('box-shadow','none');
    $('#cp').prev().css('box-shadow','none');
    $('#pt').prev().css('box-shadow','none');
    color ='#ca4141';
    sel =  'ot';
  })






    function pageLoad(a){
        comboselect(null,Gruta+'academia/Mantenimiento/mant_lugares_listar','Seleccione el lugar','item.ide_lugar','item.lug_nom','edit-modal','lug')
        comboselect(null,Gruta+'academia/Mantenimiento/mant_grup_listar','Seleccione el Grupo','item.ide_grupo','item.gru_nom','edit-modal','grup')
        comboselect(null,Gruta+'academia/Profesor/prof_listar','Seleccione el Profesor','item.ide_prof','item.pro_nom','edit-modal','prof');
        comboselect(null,Gruta+'academia/Mantenimiento/mant_cat_listar','Deleccione la Categoria','item.ide_categoria','item.cat_nom','edit-modal','cat');
        var o = a;

        $('#external-events').find('div.external-event').each(function() {

            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var $calendar = $('#calendar').fullCalendar({
            header: {
                left: '',
                center: '',
                right: ''
            },

            selectable: true,
            selectHelper: true,
            select: function(start, end, allDay) {
                var $modal = $("#edit-modal"),
                    $btn = $('#create-event');
                $btn.off('click');
                $btn.click(function () {
                    var title = $("#event-name").val();
                     entrada = $("#entrada").val();
                     salida = $("#salida").val();
                     lug = $("#lug").val();
                     des = $("#des").val();
                     url = $("#url").val();
                     var ye = start.getFullYear()
                     var mme = start.getMonth()
                     var de = start.getDate()

                      if (pressed === 1) {
                        grup = {
                          ide_prof: $('#prof').val(),
                          ide_categoria: $('#cat').val(),
                          gru_nom: $('#nv_grup').val(),
                        }
                      } else {
                        grup = $('#grup').val();
                      }

                      if ($('#nwpg').val() != '') {
                        pago = parseFloat($('#nwpg').val());
                      }


                      if (entrada != '') {
                        var hora1 = entrada;
                        var he = entrada.substr(0,2)
                        var me = entrada.substr(3,2)
                        entrada = new Date(ye,mme,de,he,me)
                      }else {
                        entrada = start;
                      }
                      if (salida != '') {
                      var  hora2 = salida;
                        var ys = end.getFullYear()
                        var mms = end.getMonth()
                        var ds = end.getDate()
                        var hs= salida.substr(0,2)
                        var ms= salida.substr(3,2)
                        salida = new Date(ys,mms,ds,hs,ms)
                      }

                    if (title) {
                        $calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: entrada,
                                end: salida,
                                glosa:des,
                                lugar:lug,
                                url: url,
                                backgroundColor: color,
                                textColor: '#fff'
                            },
                            true
                        );


                        var actividad = {
                          act_nom:title,
                          y:ye,
                          m:mme,
                          d:de,
                          act_hor_ini:hora1,
                          act_hor_fin:hora2,
                          act_gls:des,
                          url:url,
                          ide_lugar:lug,
                          act_tip:sel,
                          grup:grup,
                          act_pago:pago,
                        }
                    }
                    $calendar.fullCalendar('unselect');

                    $.ajax({
                      url:Gruta+'academia/Actividades/act_ins',
                      type:'post',
                      data:actividad,
                      success:function (data) {
                        console.log(data);
                        location.reload();
                      },
                    })
                });
                $modal.modal('show');
                $calendar.fullCalendar('unselect');
            },
            editable: true,
            droppable:true,

            drop: function(date, allDay) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');

                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = allDay;

                var $categoryClass = $(this).data('event-class');
                if ($categoryClass)
                    copiedEventObject['className'] = [$categoryClass];

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                $(this).remove();

            },

            // US Holidays
            events: o,

            eventClick: function(event) {
                // opens events in a popup window
                if (event.url != ''){
                    window.open(event.url, 'gcalevent', 'width=700,height=600');
                    return false
                } else {
                    var $modal = $("#myModal"),
                        $modalLabel = $("#myModalLabel17");
                    $modalLabel.html(event.title);
                    $modal.find(".modal-body p").html(function(){
                        if(event.glosa != '') {
                            return "Descripcion: "+event.glosa+"<br>Lugar: <strong>"+event.lugar+"</strong><br>Hora de entrada: <strong>" + event.start.getHours() + ":" + (event.start.getMinutes() == 0 ||  "0" ? "00" : event.start.getMinutes()) + "</strong></br>"
                                + (event.end == null ? "" : "Hora de salida: <strong>" + event.end.getHours() + ":" + (event.end.getMinutes() == 0 ? "00" : event.end.getMinutes()) + "</strong>")
                        }else {
                          return "Hora de entrada: <strong>" + event.start.getHours() + ":" + (event.start.getMinutes() == 0 ? "00" : event.start.getMinutes()) + "</strong></br>"
                              + (event.end == null ? "" : "Hora de salida: <strong>" + event.end.getHours() + ":" + (event.end.getMinutes() == 0 ? "00" : event.end.getMinutes()) + "</strong>")
                        }
                    }());
                    $modal.modal('show');
                  }
            }

        });

        $("#calendar-switcher").find("label").click(function(){
            $calendar.fullCalendar( 'changeView', $(this).find('input').val() )
        });

        var currentDate = $calendar.fullCalendar('getDate');

        $('#calender-current-date').html(
                $.fullCalendar.formatDate(currentDate, "MMM yyyy") +
                " - <span class='fw-semi-bold'>" +
                $.fullCalendar.formatDate(currentDate, "dddd") +
                "</span>"
        );


        $('#calender-prev').click(function(){
            $calendar.fullCalendar( 'prev' );
            currentDate = $calendar.fullCalendar('getDate');
            $('#calender-current-date').html(
                    $.fullCalendar.formatDate(currentDate, "MMM yyyy") +
                    " - <span class='fw-semi-bold'>" +
                    $.fullCalendar.formatDate(currentDate, "dddd") +
                    "</span>"
            );
        });
        $('#calender-next').click(function(){
            $calendar.fullCalendar( 'next' );
            currentDate = $calendar.fullCalendar('getDate');
            $('#calender-current-date').html(
                    $.fullCalendar.formatDate(currentDate, "MMM yyyy") +
                    " - <span class='fw-semi-bold'>" +
                    $.fullCalendar.formatDate(currentDate, "dddd") +
                    "</span>"
            );
        });


        var o = [];
        $.getJSON(Gruta+'academia/Actividades/act_listar', function (data) {
          $.each(data,function (i,item) {

            switch (item.act_tip) {
              case 'cd':
                  var co = '#3275e6'
                break;
              case 'cp':
                  var co = '#4bb343'
                break;
              case 'pt':
                  var co = '#503cc3'
                break;
              case 'ot':
                  var co = '#ca4141'
                break;
              default:
                  var co = '#818182'
            }
                var ye= item.act_fecha.substr(0,4)
                var eme= item.act_fecha.substr(5,2)
                var de= item.act_fecha.substr(8,2)

                var h1  = item.act_hor_ini == null ? 0 :item.act_hor_ini.substr(0,2)
                var m1  = item.act_hor_fin == null ? 0 :item.act_hor_fin.substr(3,2)

                var h2  = item.act_hor_fin == null ? 0 :item.act_hor_ini.substr(0,2)
                var m2  = item.act_hor_fin == null ? 0 :item.act_hor_fin.substr(3,2)
                console.log(ye,eme,de,h1,m1);

          $calendar.fullCalendar('renderEvent', {
              title: item.act_nom,
              start: new Date (ye,eme,de,h1,m1),
              end: new Date (ye,eme,de,h2,m2),
              glosa:item.act_gls,
              lugar:item.lug_nom,
              url: item.url,
              backgroundColor: co,
              textColor: '#fff'
            }, true );


          })
        })



    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);



    $('.fa-pencil').click(function () {

      document.location  = Gruta+'Actividades/editar';
    })
});
