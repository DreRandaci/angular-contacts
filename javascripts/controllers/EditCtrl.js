'use strict';

app.controller('EditCtrl', function( $location, $rootScope, $routeParams, $scope, ContactsService ){
   
    $scope.contact = {};
    
    const getContact = () => {
        ContactsService.getSingleContact($routeParams.id).then((results) => {
            $scope.contact = results.data;
        }).catch((err) => {
            console.log('error in getSingleContact:', err);
        });
    };    

    $scope.submitThisForm = (contact) => {       
        contact.uid = $rootScope.uid;
        ContactsService.updateContact(contact, $routeParams.id).then((results) => {
            $location.path("/contacts/view");
        }).catch((err) => {
            console.log('error in postNewContact:', err);
        });
    };

    getContact(); 
});