'use strict';

app.controller('ViewCtrl', function( $rootScope, $scope, ContactsService ){

    const getContacts = () => {
        ContactsService.getAllContacts($rootScope.uid).then((results) => {            
            $scope.contacts = results; 
        }).catch((err) => {
            console.log('error in getRatedMovies:', err);
        });
    };

    $scope.deleteContact = ( contactId ) => {
        ContactsService.deleteContactInFb(contactId).then((results) => {
            getContacts();
        }).catch((err) => {
            console.log('error in deleteContactInFb:', err);
        });  
    };

    getContacts();
});