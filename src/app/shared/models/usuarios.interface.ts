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
        usuarioId: number;
        token: string;
        perfil: string;
        nombre: string;
        foto: string;
        idArea: number;
        idEspecialidad: number;
        fechaNacimiento: Date;
        celular: string;
        correo: string;
        estado: number;
        createdAt: Date;
    };
    msg: string;
}

export interface ReqResponseCambioClave {
    status: boolean;
    response: Response;
    msg: string;
}

export interface Response {
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
