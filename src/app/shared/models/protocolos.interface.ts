export interface ReqResponseProtocolos {
    status:   boolean;
    response: Protocolo[];
    msg:      string;
}

export interface Protocolo {
    id:             number;
    nombre:         string;
    idEspecialidad: number;
    idArea:         number;
    creadoPor:      number;
    url:            string;
    createdAt:      Date;
    updatedAt:      Date;
    Usuario:        Usuario;
    Especialidad:   Especialidad;
    Area:           Area;
}

export interface Area {
    id:        number;
    nombre:    string;
    ubicacion: string;
    imagen:    string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Especialidad {
    id:        number;
    nombre:    string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Usuario {
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
