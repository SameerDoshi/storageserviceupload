angular.
module('uiSelect').
component('uiSelect', {
        templateUrl: '/ui-select/ui-select.html',
        controller: function UISelectController() {
            let self=this;
            this.saurl="https://ssduploaderservice.blob.core.windows.net/";
            this.sas="replaceme";
            this.containerName='data';

        }
    }
    );