import app from "../../config/firebase";

export function haySesion(){
    return new Promise((resolve, reject) => {
         const unsubscribe = app.auth().onAuthStateChanged(user => {
             unsubscribe();
            resolve(!!user);
        }, reject);
    });
}

export function getCurrentUser(){
    return new Promise((resolve, reject) => {
        const unsubscribe = app.auth().onAuthStateChanged(item => {
            let currentUser = null;
            unsubscribe();
            if(item) {
                let db = app.firestore();
                const settings = {timestampsInSnapshots: true};
                db.settings(settings);
                db.collection('users_pdn').where("uid", "==", item.uid).get().then((querySnapshot) => {
                    let item = querySnapshot.docs[0].data();
                    currentUser = {
                        apellido1: item.apellido1,
                        apellido2: item.apellido2,
                        cargo: item.cargo,
                        correo: item.correo,
                        dependencia: item.dependencia,
                        extension: item.extension,
                        fecha_solicitud: item.fecha_solicitud,
                        nombre: item.nombre,
                        rol: item.rol,
                        telefono_oficina: item.telefono_oficina,
                        telefono_personal: item.telefono_personal,
                        uid: item.uid
                    }
                    resolve(currentUser);
                });
            }

        }, reject);
    });
}
export  function getCurrentUserx(){
    let currentUser ={};
    app.auth().onAuthStateChanged((usuario)=>{
        if(usuario){
            console.log("Usuario: ",usuario);
            let db = app.firestore();
            const settings = {timestampsInSnapshots: true};
            db.settings(settings);
            db.collection('users_pdn').where("uid", "==", usuario.uid).get().then((querySnapshot) => {
                let item = querySnapshot.docs[0].data();
                currentUser = {
                    apellido1 : item.apellido1,
                    apellido2 : item.apellido2,
                    cargo : item.cargo,
                    correo : item.correo,
                    dependencia : item.dependencia,
                    extension : item.extension,
                    fecha_solicitud : item.fecha_solicitud,
                    nombre : item.nombre,
                    rol : item.rol,
                    telefono_oficina : item.telefono_oficina,
                    telefono_personal : item.telefono_personal,
                    uid : item.uid
                }
            })
        }

    });
    return currentUser;
}

export  function getPermisos(){
    let permisos =[];
    app.auth().onAuthStateChanged((usuario)=>{
        if(usuario){
            let db = app.firestore();
            const settings = {timestampsInSnapshots: true};
            db.settings(settings);
            db.collection('users_pdn').where("uid", "==", usuario.uid).get().then((querySnapshot) => {
                let role = querySnapshot.docs[0].data().rol;
               return db.collection('roles_rbacrules').where("rol", "==", role).get().then((querySnapshot) => {
                    querySnapshot.docs.forEach(doc => {
                        if (doc.data().estatus)
                            permisos.push(doc.data().permission);
                    });
                });
            })
        }

    });
    return permisos;
}
