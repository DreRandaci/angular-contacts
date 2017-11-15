'use strict';

app.controller('LoginCtrl', function( $location, $rootScope, $scope, LoginService ){
    $scope.authenticate = () => {
        LoginService.authenticateGoogle().then(( results ) => {
            $rootScope.uid = results.user.uid;
            $scope.$apply(() => {
                $location.url("/contacts/view");
            }); 
        }).catch(( err ) => {
            console.log('error in authenticateGoogle:', err);
        });
    };
});