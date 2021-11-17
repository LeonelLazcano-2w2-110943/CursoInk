import sesionUsuarioReducer from "./SesionUsuarioReducer";
import openSnackBarReducer from "./OpenSnackBarReducer";

export const mainReducer = ({ sesionUsuario, openSnackBar }, action) => {
    return {
        sesionUsuario: sesionUsuarioReducer(sesionUsuario, action),
        openSnackBar: openSnackBarReducer(openSnackBar, action)
    }
}