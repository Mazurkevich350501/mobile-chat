const gendersMap = {
    male: 'female',
    female: 'male'
}

export const firebaseHelper = {
    createCouple: (firebase, account, user) => {
        const updates = {}
        const key = firebase.database().ref().child('couples').push().key
        updates[`couples/${key}/member_${account.id}`] = true
        updates[`couples/${key}/member_${user.id}`] = true
        updates[`couples/${key}/title_${account.id}`] = user.displayName
        updates[`couples/${key}/title_${user.id}`] = account.displayName
        updates[`couples/${key}/photo_${account.id}`] = user.photoUrl
        updates[`couples/${key}/photo_${user.id}`] = account.photoUrl 
        firebase.database().ref().update(updates)    
    },
    rejectMatch: (firebase, account, user) => {
        const updates = {}
        updates[`matches/${user.id}/${account.id}/isMatched`] = false;
        updates[`matches/${account.id}/${user.id}/isMatched`] = false;
        firebase.database().ref().update(updates)
    },
    acceptMatch: (firebase, account, user) => {
        const updates = {}
        updates[`matches/${account.id}/${user.id}/isMatched`] = true;
        firebase.database().ref().update(updates)
    },
    onNewUser: (firebase, account, onNewUserAddToFirebase) => {
        const usersRef = firebase.database().ref('users')
            .orderByChild('gender')
            .equalTo(gendersMap[account.gender]);
        const matchesRef = firebase.database().ref(`matches/${account.id}`)
            .orderByChild('rejectedId');
    
        matchesRef.once('value').then((matches) => {
            usersRef.on('child_added', (data) => {      
                if (!matches.val() || Object.keys(matches.val()).indexOf(data.key) === -1) {
                    onNewUserAddToFirebase(data);
                }       
            });
        });
    },
    // createMatches: (firebase, accountId, gender) => {
    //     firebase.database().ref('users').orderByChild('gender').equalTo(gender)
    //         .once("value").then((users) => {
    //             console.warn(Object.keys(users.val()));
    //             Object.keys(users.val()).forEach((u, index) => {
    //                     let updates = {};
    //                     if(index & 1) {
    //                         updates[`matches/${u}/${accountId}/isMatched`] = false;
    //                         updates[`matches/${accountId}/${u}/isMatched`] = false;
    //                     }
    //                     else{
    //                         updates[`matches/${u}/${accountId}/isMatched`] = true;                            
    //                     }
    //                     firebase.database().ref().update(updates)
    //                 });
    //         });
            
    // }
}

// function createUserModel(name, index){
//     var localIndex = index + 1;
//     return {
//         age: localIndex + 18,
//         name: name,
//         email: name.replace(/[ ]+/, "") + "-email@asd.com",
//         gender: (localIndex & 1) ? "male" : "female",
//         photoUrl: "http://multgubkabob.ru/data/uploads/pic/" + localIndex + ".jpg"
//     }
// }


// var UserNames =  [
//     "Lakisha Jelley",
//     "Cheryll Stedman",
//     "Elden Coggins",
//     "Olga Litt",
//     "Marisol Opperman",
//     "Kassie Hiers",
//     "Devin Hanselman",
//     "Marlen Longshore",
//     "Ossie Priddy",
//     "Maranda Dominquez",
//     "Bettina Plowden",
//     "Lee Latour",
//     "Kimberlie Waye",
//     "Wendell Simmonds",
//     "Eliana Halsell",
//     "Kandy Rolph",
//     "Reid Ishibashi",
//     "Stella Rinke",
//     "Rupert Durazo",
//     "Hildred Kirkwood",
// ]

