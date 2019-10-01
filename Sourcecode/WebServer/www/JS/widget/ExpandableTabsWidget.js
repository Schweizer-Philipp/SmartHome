var ExpandableTabs = {
    init: function() {
        console.log("Init ExpandableTabsWidget");
        this.bindClickListenerForTiles();
    },
    bindClickListenerForTiles: function() {
        $('div.tile div.expandable').each(function() {
            $(this).on('click', function(){
                
                if(!$(this).hasClass('active')) {
                    var activeTab = $('div.expandable.active');
                    if(activeTab !== undefined) {
                        
                        var activeTabData = activeTab.data('tab-link');
                        console.log(activeTabData);
                        var activePanel = $('.expandable-pane[data-tab-link="' + activeTabData + '"]');

                        console.log(activeTab);
                        console.log(activePanel);

                    activeTab.toggleClass('active');
                    activePanel.toggleClass('active');
                    activePanel.hide();
                    }

                    $(this).toggleClass('active');
                    var newActiveTabData = $(this).data('tab-link');
                    var newActivePanel = $('.expandable-pane[data-tab-link="' + newActiveTabData + '"]');
                    newActivePanel.toggleClass('active');
                    newActivePanel.slideDown('slow');
                }
            });
        });
    }
}

ExpandableTabs.init();