import { DateTimeFormatPipePipe } from '../helpers/DateTimeFormatPipe.pipe';

export interface Usuario {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    dataNascimento: Date;
    escolaridade: number;
}
