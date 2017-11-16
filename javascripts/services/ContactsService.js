'use strict';

app.service("ContactsService", function( $http, $q, FIREBASE_CONFIG ){
    const getAllContacts = (userUid) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userUid}"`);
        };
    return { getAllContacts };
});