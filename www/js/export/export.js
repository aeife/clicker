angular.module('clicker.export', ['ngCordova', 'components.clickData'])
    .controller('ExportCtrl', function ($scope, $cordovaEmailComposer, clickData, $cordovaFile) {
        var generateJSON = function (data) {
            return 'base64:data.json//' + btoa(JSON.stringify(data));
        };

        $scope.ExportCtrl = {
            email: function () {
                $cordovaEmailComposer.isAvailable().then(function() {
                    var email = {
                        //to: 'max@mustermann.de',
                        //cc: 'erika@mustermann.de',
                        //bcc: ['john@doe.com', 'jane@doe.com'],
                        attachments: generateJSON(clickData.getClicks()),
                        subject: 'Clicker Export',
                        body: 'Exported data from Clicker.',
                        isHtml: true
                    };

                    $cordovaEmailComposer.open(email).then(null, function () {
                        // user cancelled email
                    });
                });
            }
        };
    });