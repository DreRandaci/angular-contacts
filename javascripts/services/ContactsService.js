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

    const getFavoriteContacts = (userUid) => {
        let contacts = [];
        return $q(( resolve, reject ) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts.json?orderBy="uid"&equalTo="${userUid}"`).then(( results ) => {
                let fbContacts = results.data;
                Object.keys(fbContacts).forEach(( key ) => {
                    fbContacts[key].id = key;
                    if (fbContacts[key].favorite){
                    contacts.push(fbContacts[key]);
                    }                    
                });
                resolve(contacts);
            }).catch((err) => {
                console.log('error in getRatedMovies:', err);
            });
        });
    };

    const uploadImageToFb = (newPic, contact, contactId) => {
        let updatedContact = createContactObj(contact, newPic);
        updateContact(updatedContact, contactId).then((results) => {
        }).catch((err) => {
            console.log("error in updateContact:", err);
        });
    };

    const getSingleContact = ( contactId ) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`);
    };

    const postNewContact = ( newContact ) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/contacts.json`, JSON.stringify(newContact));
    };

    const deleteContactInFb = (contactId) => {
        return $http.delete(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`);
    };

    const updateContact = ( updatedContact, contactId ) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/contacts/${contactId}.json`, JSON.stringify(updatedContact));
    };

    const createContactObj = (contact, picInfo) => {
        return {
            "name_first": contact.name_first,
            "name_last": contact.name_last,
            "address": contact.address,
            "company": contact.company,
            "birthday": contact.birthday,
            "email": contact.email,
            "uid": contact.uid,
            "phone": contact.phone,
            "id": contact.id,
            "favorite": contact.favorite,
            "base64": picInfo.base64,
            "filename": picInfo.filename,
            "filesize": picInfo.filesize,
            "filetype": picInfo.filetype,
        };
    };

    return { getAllContacts, postNewContact, deleteContactInFb, updateContact, createContactObj, getFavoriteContacts, getSingleContact, uploadImageToFb };
});