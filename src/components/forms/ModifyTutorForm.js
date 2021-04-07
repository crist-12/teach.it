import React, { useContext, useState, useEffect } from "react";
import { Context as TeachItContext } from "../../providers/TeachItContext";
import { Context as AuthContext } from "../../providers/AuthContext";
import { StyleSheet, View, Dimensions } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import CheckBox from '@react-native-community/checkbox';
import { categories, universities } from "../../utils";
import { Picker } from "@react-native-picker/picker";
import Alert from "../shared/Alert";
import theme from "../../theme";

const { width, height } = Dimensions.get("screen");

const ModifyTutorForm = ({ navigation }) => {
  const { state: teachItState, updateTutorData, setCurrentTutor } = useContext(TeachItContext);
  const { state } = useContext(AuthContext);

  const [university, setUniversity] = useState("");
  const [ocupation, setOcupation] = useState("");
  const [about, setAbout] = useState("");
  const [ocupationError, setOcupationError] = useState(false);
  const [aboutError, setAboutError] = useState(false);
  const [error,setError] = useState(false);

  useEffect(() => {
    if (teachItState.currentTutor.id) {
      setUniversity(teachItState.currentTutor.university);
      setAbout(teachItState.currentTutor.about);
      setOcupation(teachItState.currentTutor.ocupation);
      //lenar categorias seleccionadas
      categories.forEach(category => {
        teachItState.currentTutor.categories.forEach( cat =>{
          if(cat === category.description) //verificamos los nombres que esten en el estado del contexto
            category.checked= true; //si esta se marca check
        })
      });
    }
  }, [teachItState.currentTutor]);

  useEffect(() => {
    if (teachItState.errorMessage){
      clearMessage();
    } 
    setCurrentTutor(state.user.id);
  }, []);

  useEffect(() => {
    if (teachItState.errorMessage) setError(state.errorMessage);
  }, [teachItState.errorMessage]);

  //Verificar si se ingresan todos los datos solicitados y si son válidos
  const handleVerify = (input) => {
    if (input === "ocupation") {
      //verificar ocupacion
      if (!ocupation) setOcupationError(true); //email-validator
      else setOcupationError(false);
    } else if (input === "about") {
      //verificar la informacion acerca del usuario
      if (!about) setAboutError(true);
      else setAboutError(false);
    }
  };

  const handlerUpdateData = () =>{
    let selected = getCategories();
    if (selected.length)
      if (
          ocupation &&
          about &&
          university &&
          !ocupationError &&
          !aboutError
        ){
          updateTutorData(teachItState.currentTutor.id, university, ocupation, selected, about, state.user.fullname);
        }
      else setError("¡Debes ingresar todos los campos!");
    else setError("Debes seleccionar al menos una categoría");
   };

   const getCategories = () =>{
    let selected = [];
    categories.forEach(category => {
      if(category.checked === true)
        selected.push(category.description);
    });
    return selected;
   };

  const handlerCheck = (id, valor) =>{
    const index = categories.findIndex(category=> category.value === id);
    categories[index].checked = valor;
   };

  return (
    <View>
      {error ? <Alert type="error" title={error} /> : null}
      <Text style={styles.labels}>Universidad</Text>
      <Picker
        style={styles.select}
        selectedValue={university} //https://stackoverflow.com/questions/56843747/react-native-picker-default-value
        onValueChange={(itemValue) => {
          setUniversity(itemValue);
        }}
      >
        {universities.map((university) => (
          <Picker.Item
            key={university.index}
            label={university.value}
            value={university.value}
          />
        ))}
      </Picker>
      <Text style={styles.labels}>Ocupación</Text>
      <Input
        placeholder="Ocupación"
        value={ocupation}
        onChangeText={setOcupation}
        onBlur={()=>{handleVerify("ocupation")}}
        errorMessage={ocupationError ? "Debes ingresar a que te dedicas" : null}
        inputStyle={styles.input}
      />
      <Text style={styles.labels}>Categorías de tutoría que brindas</Text>
      {categories.map((category) => (
        <View style={styles.categoriesContainer} key={category.value}>
          <CheckBox
            disabled={false}
            value={category.checked}
            onValueChange={(newValue)=>handlerCheck(category.value, newValue)}
            tintColors={{ true: '#01463f', false: '#01463fb' }}
          />
          <Text>{category.description}</Text>
        </View>
          ))}
      <Text style={styles.labels}>Información acerca de ti</Text>
      <Input
        labelStyle={styles.input}
        placeholder="..."
        multiline
        numberOfLines={5}
        value={about}
        onChangeText={setAbout}
        onBlur={()=>{handleVerify("about")}}
        errorMessage={aboutError ? "Debes ingresar datos útiles acerca de ti" : null}
        inputStyle={styles.input} 
      />
      <Button
        title="Actualizar"
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.buttons}
        onPress={handlerUpdateData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    borderRadius:50,
    margin:10,
    padding: 14,
    marginVertical: 15
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  about: {
    height: 30,
  },
  select: {
    fontSize: 12,
    width: width * 0.8,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: "center",
    paddingVertical: 10,
  },
  labels: {
    fontWeight: "bold",
    paddingLeft: 10,
    color: theme.colors.primary,
    marginTop: 10
  },
  input: {
    fontSize: 12
  },
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
});

export default ModifyTutorForm;