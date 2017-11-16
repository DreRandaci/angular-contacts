'use strict';

app.controller('ViewCtrl', function( $rootScope, $scope, ContactsService ){

    const getContacts = () => {
        ContactsService.getAllContacts($rootScope.uid).then((results) => {            
            $scope.contacts = results.data; 
        }).catch((err) => {
            console.log('error in getRatedMovies:', err);
        });
    };

    getContacts();
});