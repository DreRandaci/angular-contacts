'use strict';

app.controller('DetailCtrl', function( $location, $routeParams, $scope, $base64, ContactsService ){

    $scope.contact = {};
    $scope.noImage = true;

    const getContact = () => {
        ContactsService.getSingleContact($routeParams.id).then((results) => {
            $scope.contact = results.data;
        }).catch((err) => {
            console.log('error in getSingleContact:', err);
        });
    };    

    $scope.deleteContact = ( contactId ) => {
        ContactsService.deleteContactInFb(contactId).then((results) => {
            getContact();
        }).catch((err) => {
            console.log('error in deleteContactInFb:', err);
        });  
    };

    $scope.changeFavorite = ( contact, contactId ) => {        
        contact.favorite = contact.favorite ? false : true;        
        let favoriteContact = ContactsService.createContactObj( contact );
        ContactsService.updateContact( favoriteContact, contactId ).then(() => {
            getContact();
        }).catch((err) => {
            console.log('error in updateContact:', err);
        });
    };

    $scope.addPic = (contact, contactId) => {        
        $scope.hideUploadOptions = () => {
            return true;
        };
        let newPic = {
            base64: $scope.pic.base64,
            filename: $scope.pic.filename,
            filesize: $scope.pic.filesize,
            filetype: $scope.pic.filetype,
        };
        ContactsService.uploadImageToFb(newPic, contact, contactId);
    };

    $scope.showImageUpload = () => {
        $scope.noImage = false;
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

    getContact();
});