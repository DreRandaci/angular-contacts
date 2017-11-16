'use strict';

app.controller( "NavCtrl", function( $rootScope, $scope, $window, $location, LoginService ){
    $scope.logoutUser = () => {
        delete $rootScope.uid;
        $window.localStorage.clear();
        LoginService.logout();
        $location.path('./login');
    };
});