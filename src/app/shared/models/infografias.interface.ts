export interface ReqResponseInfografias {
    status: boolean;
    response: infografia[];
    msg: string;
}

export interface infografia {
    id: number;
    descripcion: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}
