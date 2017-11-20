'use strict';

app.controller('ViewCtrl', function( $location, $rootScope, $scope, ContactsService ){

    $scope.contactDetail = ( contactId ) => {
        $location.path(`/contact/${contactId}`);
    };
});