'use strict';

app.controller('ViewCtrl', function( $location, $rootScope, $scope, ContactsService ){

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

    $scope.changeFavorite = ( contact, contactId ) => {        
        contact.favorite = contact.favorite ? false : true;        
        let favoriteContact = ContactsService.createContactObj( contact );
        ContactsService.updateContact( favoriteContact, contactId ).then(() => {
            getContacts();
        }).catch((err) => {
            console.log('error in updateContact:', err);
        });
    };


    $scope.editContact = ( contactId ) => {
        $location.path(`/contacts/edit/${contactId}`);
    };

    $scope.routeToNewContacts = () => {        
        $location.path("/contacts/new");
    };

    getContacts();
});