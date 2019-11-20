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

                var activityFeed = $('ul.activity-feed');

                var buttonName = $(this).data('button_name');
                var source = $(this).data('source');

                console.log(buttonName);
                console.log(source);

                var url = "localhost/dashboard/"+source;

                var body = {
                    buttonName: buttonName
                };
                $.post(url, body)
                    .done( function(response) {
                        var basis = JSON.parse(response);
                        activityFeed.prepend(TileWidget.createEntry(source, basis.data.title,basis.message, basis.data.timestamp));
                    })
                    .fail(function(error) {
                        var basis = JSON.parse(error.responseText);
                        activityFeed.prepend(TileWidget.createEntry(source, basis.data.title,basis.message, basis.data.timestamp));
                    });
            })
        })
    },

    createEntry: function(source, title, message, timestamp) {
        

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