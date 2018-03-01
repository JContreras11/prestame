$(function(){
/*WORKSPACE*/
var n= 1;

        $('#hlp #prev').click(function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          switch (n) {
            case 1:
              $(this).addClass('disabled');
            break;

            case 2:
                $(this).addClass('disabled');
                $('#step_'+n).css('display','none');
                $('#step_'+(n-1)).css('display','block');
                n--;
            break;

            case 3:
                n;
            break;
            default:


          }
        })

        $('#save #prev').click(function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          switch (n) {
            case 1:
              $(this).addClass('disabled');
            break;

            case 2:
                $(this).addClass('disabled');
                $('#step_'+n).css('display','none');
                $('#step_'+(n-1)).css('display','block');
                n--;
            break;

            case 3:
            $('#step_'+n).css('display','none');
            $('#step_'+(n-1)).css('display','block');
            $('#hlp').css('display','block');
            $('#save').css('display','none');
            n--;
            break;
            default:


          }
        })

        $('#next').click(function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
            switch (n) {
              case 1:
                $('#prev').removeClass('disabled');
                $('#step_'+n).css('display','none');
                $('#step_'+(n+1)).css('display','block');
                n++;
              break;

              case 2:
              $('#step_'+n).css('display','none');
              $('#step_'+(n+1)).css('display','block');
              $('#hlp').css('display','none');
              $('#save').css('display','block');
              n++;
              break;

              case 3:
                n;
              break;
            default:
            console.log(n);
            }
        })




        //
        // $('#create_reserv').click(function () {
        //   validateForm();
        // })



/*WORKSPACE*/


    function pageLoad(){
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
                    $btn = $('#create_reserv');
                    var ye = start.getFullYear()
                    var mme = start.getMonth()
                    var de = start.getDate()
                    var fe = ye+'-'+(mme+1)+'-'+de
                    $('#ide_fecha').val(fe);


                $btn.off('click');
                $btn.click(function () {
                    var title = $("#inp_nom_cli").val()+' '+$("#inp_ape_pat").val();
                    if (validateForm()) {
                    if (title) {
                        $calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay,
                                backgroundColor: '#64bd63',
                                textColor: '#fff'
                            },
                            true
                        );
                    }
                  }
                    $calendar.fullCalendar('unselect');
                    $.ajax({
                      url:Gruta+'Tc_reserva/res_ins',
                      type:'post',
                      data:$('#form_res').serialize(),
                      success:function (data) {
                        $('#cod_res').text(data);
                        $('#myModalborrar').modal('show');

                      },
                    })
                });
                $modal.modal('show');
                $calendar.fullCalendar('unselect');
            },
            editable: false,
            droppable:false,

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
            events: [],

            eventClick: function(event) {
                // opens events in a popup window
                if (event.url){
                    window.open(event.url, 'gcalevent', 'width=700,height=600');
                    return false
                } else {
                    var $modal = $("#myModal"),
                        $modalLabel = $("#myModalLabel");
                    $modalLabel.html(event.title);
                    $modal.find(".modal-body p").html(function(){
                        if (event.allDay){
                            return "All day event"
                        } else {
                            return "Start At: <strong>" + event.start.getHours() + ":" + (event.start.getMinutes() == 0 ? "00" : event.start.getMinutes()) + "</strong></br>"
                                + (event.end == null ? "" : "End At: <strong>" + event.end.getHours() + ":" + (event.end.getMinutes() == 0 ? "00" : event.end.getMinutes()) + "</strong>")
                        }
                    }());
                    $modal.modal('show');
                }
            }

        });


        $('#form_res').submit(function (e) {
          e.preventDefault()
          $('#edit-modal').modal('hide');
          // e.preventDefault();
          // var form = $(this).serialize()
          // console.log(form);
          //
          //     var title = $("#inp_nom_cli").val()+' '+$("#inp_ape_pat").val();
          //     if (title) {
          //         $calendar.fullCalendar('renderEvent',
          //             {
          //                 title: title,
          //                 start: 1,
          //                 end: 1,
          //                 allDay: 1,
          //                 backgroundColor: '#64bd63',
          //                 textColor: '#fff'
          //             },
          //             true
          //         );
          //     }
          //     $calendar.fullCalendar('unselect');
        })


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
        $.getJSON(Gruta+'Tc_reserva/res_list_cal/'+emp, function (data) {
          $.each(data,function (i,item) {

                var ye= item.res_fecha.substr(0,4)
                var eme= item.res_fecha.substr(5,2)
                var de= item.res_fecha.substr(8,2)

                console.log(ye,eme,de);

          $calendar.fullCalendar('renderEvent', {
              title: 'Reservado',
              start: new Date (ye,(eme-1),de),
              end: new Date (ye,(eme-1),de),
              backgroundColor: '#64bd63',
              textColor: '#fff'
            }, true );


          })
        })


    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});




function validateForm() {
  if ( $('#inp_nom_cli').val() == '' || $('#inp_ape_pat').val() == '' || $('#inp_dir_cli').val() == '' || $('#inp_tel_cli1').val() == '' || $('#inp_ema_cli').val() == '') {
      alert('Por favor ingrese todos los datos del cliente');
      return false;
  } else if ($('#inp_placa').val() == '' ||  $('#sel_tip_veh').val() == '' ||  $('#sel_mod_veh').val() == '' ||  $('#inp_col').val() == '' ) {
      alert('Por favor ingrese todos los datos del Vehiculo');
      return false;
  }else if ($('#inp_hor_ini').val() == '' ||  $('#inp_hor_fin').val() == '' ||  $('#sel_tip_ser').val() == '' ){
      alert('Por favor ingrese todos los datos del Servicio');
      return false;
  }else {
    return true;
  }
}
