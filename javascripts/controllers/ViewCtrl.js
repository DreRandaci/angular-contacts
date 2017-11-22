'use strict';

app.controller('ViewCtrl', function( $location, $rootScope, $scope, $base64, ContactsService ){

    const getContacts = () => {
        ContactsService.getAllContacts($rootScope.uid).then((results) => {            
            $scope.contacts = results; 
            // $scope.decode = $base64.decode(`${results[0].base64}`);
            var base64EncodedString = $base64.encode(`${results[0].base64}`);
            var urlSafeBase64EncodedString = encodeURIComponent(base64EncodedString);
            var newbase64EncodedString = decodeURIComponent(`${urlSafeBase64EncodedString}`);
            var decodedString = $base64.decode(newbase64EncodedString);
            // let decoded = $base64.encode(`${results[0].base64}`);
            // console.log(results);
            console.log(decodedString);
        }).catch((err) => {
            console.log('error in getRatedMovies:', err);
        });
    };

    getContacts();

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

    $scope.contactDetail = (contact, contactId) => {
        $location.path(`/contacts/detail/${contactId}`);
    };

    $scope.routeToNewContacts = () => {        
        $location.path("/contacts/new");
    };
});