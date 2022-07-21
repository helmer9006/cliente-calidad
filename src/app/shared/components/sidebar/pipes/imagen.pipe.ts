import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from './../../../models';

@Pipe({
    name: 'imagen'
})
export class ImagenPipeUsuario implements PipeTransform {

    transform(usuario: any): string {
        return usuario.response.foto ? `${usuario.response.foto}` : 'assets/images/no-image.png';
    }

}
