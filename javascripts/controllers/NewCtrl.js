'use strict';

app.controller('NewCtrl', function( $location, $rootScope, $scope, ContactsService ){        
    $scope.submitThisForm = (user) => {       
        user.uid = $rootScope.uid;
        ContactsService.postNewContact(user).then((results) => {
            $location.path("/contacts/view");
        }).catch((err) => {
            console.log('error in postNewContact:', err);
        });
    };
});