import * as Yup from "yup";
import { User } from "../types/reduceType";

export const updateMonitorSchema = Yup.object({
    firstname: Yup.string().required("Le prénom est requis"),
    lastname: Yup.string().required("Le nom est requis"),
    gender: Yup.string().oneOf(["homme", "femme", "autre"]).required("Le sexe est requis"),
});

export const changePasswordSchema = Yup.object({
    oldPassword: Yup.string().required("L'ancien mot de passe est requis"),
    newPassword: Yup.string().required("Le nouveau mot de passe est requis").min(6, "6 caractères minimum"),
    confirmPassword: Yup.string().required("La confirmation est requise").oneOf([Yup.ref('newPassword')], "Les mots de passe ne correspondent pas"),
});

export const initialUpdateMonitorValues = (user: User) => {
    return {
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phone: user.phone || "",
        address: user.instructor_profile?.address || "",
        city: user.instructor_profile?.city || "",
        postal_code: user.instructor_profile?.postal_code || "",
        gender: user.genre || "",
    };
};
