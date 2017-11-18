'use strict';

app.service("ContactsService", function( $http, $q, FIREBASE_CONFIG ){
    const getAllContacts = (userUid) => {
            return $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userUid}"`);
        };

        const postNewContact = ( newContact ) => {
            return $http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify(newContact));
        };

        const deleteContact = (contactId) => {

        };

    return { getAllContacts, postNewContact, deleteContact };
});