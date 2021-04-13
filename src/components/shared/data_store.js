let tutorName;
let collegeName;
let about;
let categories;

export const setTutor = (tutor) => {
tutorName = tutor;
}

export const getTutor = () =>{
    return tutorName;
}

export const setUniversity = (university) => {
    collegeName = university;
}

export const getUniversity = () =>{
    return collegeName;
}

export const setAbout = (_about) => {
    about = _about;
}

export const getAbout = () =>{
    return about;
}

export const setCategories = (_categories) => {
    categories = _categories;
}

export const getCategories = () =>{
    return categories;
}

