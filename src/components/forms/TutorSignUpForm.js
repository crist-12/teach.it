import React, { useContext, useState, useEffect } from "react";
import { Context as TeachItContext } from "../../providers/TeachItContext";
import { Context as AuthContext } from "../../providers/AuthContext";
import { StyleSheet, View, Dimensions } from "react-native";
import { categories, universities } from "../../utils";
import { Input, Button, Text } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import Alert from "../shared/Alert";
import theme from "../../theme";

import CustomMultiPicker from "react-native-multiple-select-list";


const { width, height } = Dimensions.get("screen");

const TutorSignUpForm = ({ navigation }) => {
  const { state: teachItState,tutorSignUp,clearMessage } = useContext(TeachItContext);
  const { state } = useContext(AuthContext);

  const [university, setUniversity] = useState("");
  const [ocupation, setOcupation] = useState("");
  const [about, setAbout] = useState("");
  const [ocupationError, setOcupationError] = useState(false);
  const [aboutError, setAboutError] = useState(false);
  const [error,setError] = useState(false);

  useEffect(() => {
    if (teachItState.errorMessage){
      clearMessage();
    } 
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

  const handleRegister = () =>{
    let selected = getCategories();
    if (selected.length)
      if (
          ocupation &&
          about &&
          university &&
          !ocupationError &&
          !aboutError
        ){
          tutorSignUp(university, ocupation, selected, about, state.user.id, state.user.fullname);
          navigation.navigate("Principal");
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
    cat();
    return selected;
   };
   const cat =()=>{
    categories.map((category) => (
      category.checked=false
     ))
   };
   useEffect(()=>{
    cat();
   },[]);
  const handlerCheck = (id,valor) =>{
   
    console.log(categories[id].checked);
    categories[id].checked =  !valor;
    console.log(categories[id].description);
    console.log(categories[id].value);
    console.log(categories[id].checked);
   };
   

  return (
    <View>
      {error ? <Alert type="error" title={error} /> : null}
      <Text style={styles.labels}>Universidad</Text>
      <Picker
        style={styles.select}
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
        <View  key={category.value}>
        <CustomMultiPicker
        options={category}
        returnValue={"label"} // label or value
        callback={()=>{ handlerCheck(category.value,category.checked) }} // callback, array of selected items
        rowBackgroundColor={"#eee"}
        rowHeight={40}
        rowRadius={5}
        iconColor={"#00a2dd"}
        iconSize={30}
        selectedIconName={"ios-checkmark-circle-outline"}
        unselectedIconName={"ios-radio-button-off-outline"}
        scrollViewHeight={height*0.05}   
        />
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
        title="Registrarme"
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.buttons}
        onPress={handleRegister}
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
    // color: "#fff",
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
    marginTop: 8
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

export default TutorSignUpForm;