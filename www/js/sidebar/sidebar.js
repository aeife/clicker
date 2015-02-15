angular.module('clicker.sidebar', ['components.clickData'])
    .controller('SidebarCtrl', function($scope, clickData) {
        $scope.SideBarCtrl = {
            getClickDataCount: function () {
                return clickData.getClicks().length;
            }
        }
    });