import { Pagamento } from "./pagamento";
import { ClienteDTO } from "./cliente.dto";
import { EnderecoDTO } from "./endereco.dto";
import { ItemPedido } from "./item.pedido";

export interface Pedido {
  id: number;
  cliente: ClienteDTO;
  enderecoDeEntrega: EnderecoDTO;
  pagamento: Pagamento;
  instante: string;
  itens: ItemPedido[];
  valorTotal: number;
}
