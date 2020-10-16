import { ProdutoDTO } from "./produto.dto";

export interface ItemPedido {
  desconto: number;
  quantidade: number;
  preco: number;
  produto: ProdutoDTO;
  subTotal: number;
}
