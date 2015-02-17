angular.module('clicker.about', [])
    .controller('AboutCtrl', function ($scope, $cordovaEmailComposer, $ionicPlatform, $ionicModal) {
        $scope.AboutCtrl = {
            supportEmail: function () {
                var device = ionic.Platform.device();
                $cordovaEmailComposer.isAvailable().then(function() {
                    var email = {
                        to: 'support@clicker.com',
                        subject: 'Support Request',
                        body: '<br/><br/><br/><br/><br/>--- <br/>' +
                            device.platform + ' ' + device.version + ' (' + device.model + ')',
                        isHtml: true
                    };

                    $cordovaEmailComposer.open(email).then(null, function () {
                        // user cancelled email
                    });
                });
            },
            openIntroduction: function () {
                $ionicModal.fromTemplateUrl('js/introduction/introduction.tpl.html', {}).then(function(modal) {
                    modal.show();
                });
            }
        };
    });