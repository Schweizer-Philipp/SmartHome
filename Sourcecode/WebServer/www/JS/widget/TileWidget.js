var TileWidget = {
    init: function () {
        this.bindUIActions();
        console.log("Init TileWidget");
    },
    bindUIActions: function () {
        this.bindClickListenerForTiles();
    },

    bindClickListenerForTiles: function () {
        $('.tile div.toggable').each(function () {
            $(this).on('click', function () {

                $(this).toggleClass('active-tile');
                var isActive = $(this).hasClass('active-tile');
                var source = $(this).data('source');

                //var activityFeed = $('ul.activity-feed');

                //activityFeed.prepend(TileWidget.createEntry(source, isActive ? "angeschaltet" : "ausgeschaltet"));*/

                var url = "http://192.168.178.52:5400/dashboard/"+source+"/power";
                var body = {
                    "power": isActive
                };
                $.post(url, body)
                    .done( function(response) {
                        console.log(JSON.parse(response));
                        console.log(JSON.parse(response).data.title);
                    })
                    .fail(function(error) {
                        console.log("error");
                    });
            })
        })
    },

    createEntry: function(source, status) {
        var today = new Date();
        var timestamp = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' Uhr - ' + 
                        today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
        var sourceIconMapper = {
            'Licht' : 'fa-lightbulb-o',
            'TV' : 'fa-television',
            'PC' : 'fa-laptop',
            'Lüfter' : 'fa-thermometer-0'
        };
        return $('<li class="activity-feed__item"></li>')
                    .append('<div class="activity-feed__item_icon"><i class="fa ' + sourceIconMapper[source] + ' fa-fw"></i></div>')
                    .append(
                        $('<div class="activity-feed__item_content">')
                            .append('<span class="title">' + source + ' wurde ' + status + '</span>')
                            .append('<br />')
                            .append('<span class="timestamp">' + timestamp +'</span>'));
    }
}

TileWidget.init();