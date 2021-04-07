import createDataContext from "./createDataContext";
import { firebase } from "../firebase";

// Acciones disponibles para el reducer
const teachItReducer = (state, action) => {
  switch (action.type) {
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "tutorSignUp":
      return { ...state, tutors: action.payload };
    case "getTutors":
      return { ...state, tutors: action.payload };
    case "setCurrentTutor":
      return { ...state, currentTutor: action.payload };
    case "updateTutorData":
      return {
        ...state,
        tutors: state.tutors.map((tutor) => {
          if (tutor.id === action.payload.tutor.id) {
            return {
              ...tutor,
              university: action.payload.tutor.university,
              ocupation: action.payload.tutor.ocupation,
              categories: action.payload.tutor.categories,
              about: action.payload.tutor.about,
              tutorName: action.payload.tutor.tutorName,
            };
          }
          return tutor;
        }),
      };
    default:
      return state;
  }
};

// Referencia al nombre de la colección de tutores
const tutorsRef = firebase.firestore().collection("tutors");

// Almacena un nuevo tutor
const tutorSignUp = (dispatch) => (university, ocupation, categories, about, tutorId, tutorName) => {
  const data = {
    about,
    ocupation,
    categories,
    university,
    name: tutorName,
    userId: tutorId
  };

  tutorsRef
    .add(data)
    .then((_doc) => {
      dispatch({ type: "errorMessage", payload: "¡Registro completado!" });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Obtener las notas del usuario
const getTutors = (dispatch) => () => {
    tutorsRef
      .get()
      .then(
        (querySnapshot) => {
          const tutors = [];
  
          querySnapshot.forEach((doc) => {
            const tutor = doc.data();
            tutor.id = doc.id; //id de tutor
            tutors.push(tutor);
          });
          dispatch({ type: "getTutors", payload: tutors });
        },
        (error) => {
          dispatch({ type: "errorMessage", payload: error.message });
        }
      );
  };

// Limpiar el mensaje del contexto
const clearMessage = (dispatch) => () => {
  dispatch({ type: "errorMessage", payload: "" });
};  

// Establece la nota actual seleccionada
const setCurrentTutor = (dispatch) => (tutorId) => {
  tutorsRef
    .where("userId", "==", tutorId)
    .onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          dispatch({ type: "errorMessage", payload: "NotTutor" });
          return;
        }
        
        //Acceder al dato sin el foreach?
        const tutor = [];
        querySnapshot.forEach((doc) => {
          const tutorData = doc.data();
          tutorData.id = doc.id;
          tutor.push(tutorData);
        });
        dispatch({ type: "setCurrentTutor", payload: tutor[0] });

      },
      (error) => {
        dispatch({ type: "errorMessage", payload: error.message });
      }
    );
};

// Actualizar una nota existente
const updateTutorData = (dispatch) => (id, university, ocupation, categories, about, tutorName) => {
  tutorsRef
    .doc(id)
    .update({ university, ocupation, categories, about, name: tutorName })
    .then(() => {
      dispatch({
        type: "updateTutorData",
        payload: { tutor: { id, university, ocupation, categories, about,  tutorName } },
      });
      dispatch({ type: "errorMessage", payload: "¡Datos actualizados!" });
    })
    .catch((error) => {
      dispatch({ type: "errorMessage", payload: error.message });
    });
};

// Exportar las funcionalidades requeridas al contexto
export const { Provider, Context } = createDataContext(
  teachItReducer,
  {
    tutorSignUp,
    getTutors,
    clearMessage,
    setCurrentTutor,
    updateTutorData,
  },
  {
    tutors: [],
    errorMessage: "",
    currentTutor: { university:"", ocupation:"", categories:"", about:"", tutorId:"", tutorName:"" },
  }
);