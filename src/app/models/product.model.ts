
export interface Produto {
  id: number | null,
  name: string | null,
  preco: number | null,
  estoque: number | null,
  status: boolean | null,
  imagem: string | null,
  quantidade: number
}



export interface ProdutoList {
  id: number | null,
  name: string | null,
  preco: number | null,
  concentracao: string | null,
  descricao: string | null,
  estoque: number | null,
  categoria: string | null,
  avaliacao: number | null,
  status: boolean | null,
  imagem: string | null
}


export interface Pedido {
  id: number;
  data: string;
  total: number;
  status: 'Pendente' | 'Pago' | 'Enviado' | 'Entregue' | 'Cancelado';
  produtos: {
    nome: string;
    quantidade: number;
    preco: number;
  }[];
}