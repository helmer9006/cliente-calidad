export type Roles = 'admin' | 'estandar' | 'especial';

export interface ReqResResponseUsuarios {
    status: boolean;
    response: Usuario[];
    msg: string;
}

export interface Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    tipoDoc: string;
    documento: string;
    correo: string;
    fechaNacimiento: Date;
    celular: string;
    clave: string;
    perfil: string;
    estado: number;
    idArea: number;
    idEspecialidad: number;
    foto: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface UsuarioAuth {
    correo: string;
    clave: string;
}

export interface RespuestaLogin extends UsuarioAuth {
    status: boolean;
    response: {
        token: string;
        usuarioId: string;
        perfil: Roles;
        nombre: string;
        foto: string;
        idArea: number;
        idEspecialidad: number;
    };
    msg: string;
}

export interface ReqResponseCambioClave {
    status:   boolean;
    response: Response;
    msg:      string;
}

export interface Response {
    id:              number;
    nombres:         string;
    apellidos:       string;
    tipoDoc:         string;
    documento:       string;
    correo:          string;
    fechaNacimiento: Date;
    celular:         string;
    clave:           string;
    perfil:          string;
    estado:          number;
    idArea:          number;
    idEspecialidad:  number;
    foto:            string;
    createdAt:       Date;
    updatedAt:       Date;
}
