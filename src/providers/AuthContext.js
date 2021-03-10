import createDataContext from "./createDataContext";
import firebase from "../firebase";
import persistLogin from "./firebase/persistLogin";

//Acciones disponibles para el reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
      break;
    case "signIn":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const signIn = (dispatch) => ({ email, password }) => {
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

      // Verificar que el usuario existe en Firebase authentication
      // y también está almacenado en la colección de usuarios.
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
            //Llamar el reducer y enviarlelos valores del usuario al estado
            dispatch({ type: "signIn", payload: firestoreDocument.data() });
          }
        });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn },
  { user: {}, errorMessage: "" }
);