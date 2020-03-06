var ipAddress = document.querySelector('input[type="hidden"]').value; 
var TileWidget = {
    init: function () {
        this.bindUIActions();
        console.log("Init TileWidget");
    },
    bindUIActions: function () {
        this.bindClickListenerForTiles();
    },

    bindClickListenerForTiles: function () {
        $('div.button').each(function () {
            $(this).on('click', function () {

                var activityFeed1 = document.getElementById("activity-feed");
                var activityFeed = $('ul.activity-feed');
                var source = $(this).data('source');
                var buttonName = $(this).data('button_name');
                

                var url = "http://localhost:5400/dashboard/"+source;
                var url2 = "http://localhost:5400/activityfeed";
                

                //console.log(ipAddress);

                var body = {
                    buttonName: buttonName
                };
                $.get(url2, body)
                    .done(function(response) {
                        var basis = JSON.parse(response);
                        basis = basis["feeds"][0];
                        activityFeed.prepend(TileWidget.createEntry(basis.datasource, basis.title,"basis.message", basis.timestamp));
                        //console.log(TileWidget.createEntry(basis.datasource, basis.title,"basis.message", basis.timestamp))
                    })
                    .fail(function(error) {
                        var basis = JSON.parse(error.responseText);
                        activityFeed.prepend(TileWidget.createEntry(source, basis.data.title,basis.message, basis.data.timestamp));
                    });
            })
        })
    },

    createEntry: function(source, title, message, timestamp) {
        
        //console.log(source);

        var sourceIconMapper = {
            'led_bett' : 'fa-lightbulb-o',
            'klimaanlage' : 'fa-thermometer-0',
            'ventilator' : 'fa-thermometer-0'
        };
        return $('<li class="activity-feed__item"></li>')
                    .append('<div class="activity-feed__item_icon"><i class="fa ' + sourceIconMapper[source] + ' fa-fw"></i></div>')
                    .append(
                        $('<div class="activity-feed__item_content">')
                            .append('<span class="title">' + title + '</span>')
                            .append('<br />')
                            .append('<span class="message">' + message + '</span>')
                            .append('<br />')
                            .append('<span class="timestamp">' + timestamp +'</span>'));
    }
}

TileWidget.init();
