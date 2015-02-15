angular.module('clicker.settings.gestures.actions', ['components.settingsData'])
    .controller('ActionsCtrl', function ($scope, $stateParams, settingsData) {
        $scope.ActionsCtrl = {
            actions: settingsData.gestureActions,
            gesture: settingsData.gestures[$stateParams.action],
            setAction: function (action) {
                settingsData.gestures[$stateParams.action].action = action;
            }
        };
    });