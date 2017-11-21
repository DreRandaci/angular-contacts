'use strict';

app.service("ContactsService", function( $http, $q, FIREBASE_CONFIG ){
    const getAllContacts = (userUid) => {
        let contacts = [];
        return $q(( resolve, reject ) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userUid}"`).then(( results ) => {
                let fbContacts = results.data;
                Object.keys(fbContacts).forEach(( key ) => {
                    fbContacts[key].id = key;
                    contacts.push(fbContacts[key]);                    
                });
                resolve(contacts);
            }).catch((err) => {
                console.log('error in getRatedMovies:', err);
            });
        });
    };

        const postNewContact = ( newContact ) => {
            return $http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify(newContact));
        };

        const deleteContactInFb = (contactId) => {
            return $http.delete(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`);
        };

    return { getAllContacts, postNewContact, deleteContactInFb };
});