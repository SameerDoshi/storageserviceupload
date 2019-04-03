angular.
module('caseForm').
component('caseForm', {
        templateUrl: '/case-form/case-form.html',
        bindings: {
            caseid:'=',
            callback:'&'
        },
        controller: function CaseFormController() {

            this.caseidlength=4;
        }
    }
    );