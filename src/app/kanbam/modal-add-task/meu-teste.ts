import { SrvRecord } from "dns";

export interface MeuTeste {
    id: number;
    titulo: string;
    estado: 'todo' | 'doing' | 'done';
    descricao: string;

}
