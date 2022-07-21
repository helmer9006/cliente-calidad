export interface ReqResResponseAreas {
    status: boolean;
    response: Area[];
    msg: string;
}

export interface Area {
    id?: number;
    nombre: string;
    ubicacion: string;
    imagen: string;
    createdAt?: Date;
    updatedAt?: Date;
}

