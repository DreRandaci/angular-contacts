'use strict';

app.controller('NewCtrl', function( $location, $rootScope, $scope, ContactsService ){        
    $scope.submitThisForm = (contact) => {       
        contact.uid = $rootScope.uid;
        ContactsService.postNewContact(contact).then((results) => {
            $location.path("/contacts/view");
        }).catch((err) => {
            console.log('error in postNewContact:', err);
        });
    };
});