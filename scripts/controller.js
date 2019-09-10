$(document).ready(function() {
    var topic1 = $("#Topic").val();
    $("#btnDisconnect").click(function() {
        //  $("button").attr("disable", true);
        Swal.fire({
            title: 'Are you sure you want to disconnect?',
            text: "You wont receive any message from the broker!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Disconnect!',
                'You have been disconnect.',
                'success',
                client.end(),
                location.reload()
              )
            }
          })
    })
    
    $("#btnConnect").click(function() {
        //$("button").attr("disable", false);
        // console.log($("#Address").val());
        client = mqtt.connect($("#Address").val())

        client.on("connect", function() {
            $("#checkStatus").val("Connected !");
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Successfully Connected',
                showConfirmButton: false,
                timer: 1500
              })
        })

        client.subscribe(topic)
        client.on("message", function(topic, payload) {
            var row = "<tr><td>" + topic + "</td><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>";
                $("#tbbroker").append(row);
        })

    })

    subs = false;
    $("#btnPublish").click(function() {

        var topic = $("#Topic").val();
        var payload = $("#Payload").val();
        var row = "<tr><td>" + topic + "</td><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>";
        $("#tbpublish").append(row);
        subs = true;

        client.publish(topic, payload)
    })

    $("#btnSubscribe").click(function() {
        var topic = $("#SubTopic").val();
        var row = "<tr><td>" + topic + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>";
        $("#tbsubscribe").append(row);

    })
    $("#btnUnsubscribe").click(function() {
        var topic = $("#SubTopic").val();
        client.unsubscribe(topic)
        topic1 = "";

    })
})