export interface ReqResResponseEspecialidades {
    status: boolean;
    response: Response[];
    msg: string;
}

export interface Response {
    id: number;
    nombre: string;
    createdAt: Date;
    updatedAt: Date;
}
