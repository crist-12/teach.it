import createDataContext from "./createDataContext";
import { firebase } from "../firebase";
import { validate } from "email-validator";

//Acciones disponibles para el reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "signIn":
      return { ...state, user: action.payload, loggedIn: true };
    case "signOut":
      return { ...state, user: action.payload, loggedIn: false, userCreated: false, passReset: false };
    case "persistLogin":
      return {
        ...state,
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
        loading: false,
      };
    case "signUp":
      return {
        ...state,
        user: action.payload.user,
        userCreated: true,
      };  
    case "resetPassword":
      return { ...state, passReset: action.payload.passReset};  
    default:
      return state;
  }
};

// Permite el inicio de sesión mediante firebase con email y password
const signIn = (dispatch) => ( email, password ) => {
  //Hacer peticion al API de firebase
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      // Obtener el Unique Identifier generado para cada usuario
      // Firebase -> Authentication
      const uid = response.user.uid;

      // Obtener la colección desde Firebase
      const usersRef = firebase.firestore().collection("users");

      // Verificar que el usuario existe en Firebase authentication y también está almacenado en la colección de usuarios.
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
          if (!firestoreDocument.exists) {
            dispatch({
              type: "errorMessage",
              payload: "¡El usuario no existe en la base de datos!",
            });
          } else {
            //Llamar el reducer y enviarle los valores del usuario al estado
            dispatch({ type: "errorMessage", payload: "" });
            dispatch({ type: "signIn", payload: firestoreDocument.data() });
          }
        });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Cierra la sesión del usuario
const signOut = (dispatch) => () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "signOut", payload: {} });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

//Permite el registro en la APP
const signUp = (dispatch) => (fullname, email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      // Obtener el Unique Identifier generado para cada usuario
      // Firebase -> Authentication
      const uid = response.user.uid;

      // Construir el objeto que le enviaremos a la collección de "users"
      const data = {
        id: uid,
        email,
        fullname,
      };

      // Obtener la colección desde Firebase
      const usersRef = firebase.firestore().collection("users");

      // Almacenar la información del usuario que se registra en Firestore
      usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          dispatch({
            type: "signUp",
            payload: { user: data, userCreated: true },
          });
        })
        .catch((error) => {
          dispatch({ type: "errorMessage", payload: error.message });
        });
    });
  dispatch({ type: "errorMessage", payload: error.message });
};

// Verifica si existe el token de firebase para iniciar sesión sin credenciales
const persistLogin = (dispatch) => () => {
  const userRef = firebase.firestore().collection("users");

  // Si el usuario ya se ha autenticado previamente, retornar la información del usuario, caso contrario,retonar un objeto vacío.
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userRef
        .doc(user.uid)
        .get()
        .then((document) => {
          dispatch({
            type: "persistLogin",
            payload: { user: document.data(), loggedIn: true },
          });
        })
        .catch((error) => {
          dispatch({ type: "errorMessage", payload: error.message });
        });
    } else {
      dispatch({
        type: "persistLogin",
        payload: { user: {}, loggedIn: false },
      });
    }
  });
};

// Permite el inicio de sesión mediante firebase con email y password
const resetPassword = (dispatch) => ( email ) => {
  console.log(email);
  if (validate(email)) {
    var auth = firebase.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        console.log("Correo enviado");
        dispatch({ type: "errorMessage", payload: "" });
        dispatch({ type: "resetPassword", payload: { passReset: true } });
      })
      .catch(function (error) {
        if (error.code == "auth/user-not-found") {
          dispatch({ type: "errorMessage",payload: "No existe ningún usuario registrado con este correo."});
        } else {
          dispatch({ type: "errorMessage", payload: "Hubo un error al intentar mandar el correo. Por favor intenta de nuevo."});
        }
      });
  } else {
    dispatch({ type: "errorMessage", payload: "¡Ingresa una dirección de correo válida!" });
  }
};

//Funcion para dejar limpio el error, se aplica en las pantallas
const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "errorMessage", payload: "" });
};

// Exportar las funcionalidades requeridas al contexto
export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signIn,
    signOut,
    signUp,
    persistLogin,
    resetPassword,
    clearErrorMessage
  },
  { user: {}, errorMessage: "", loggedIn: false, loading: true, userCreated: false, passReset: false }
);