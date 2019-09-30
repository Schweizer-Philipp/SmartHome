var LoginFormWidget = {

    init : function() {
        this.bindUIActions();
        console.log("Init LoginFormWidget");
    },

    bindUIActions: function() {
        $('#btn-login').on("click", function(event) {
            event.preventDefault();
            LoginFormWidget.doLogin();
        });
    },

    doLogin: function() {
        document.location.href="pages/dashboard.html";
    }
}

LoginFormWidget.init();