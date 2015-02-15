angular.module('clicker.settings.gestures', ['clicker.settings.gestures.actions', 'components.settingsData'])
    .controller('GesturesCtrl', function ($scope, settingsData) {
        $scope.GesturesCtrl = {
            gestures: settingsData.gestures
        };
    });