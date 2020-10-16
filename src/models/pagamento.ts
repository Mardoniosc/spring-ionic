export interface Pagamento {
    "@type": string;
    id: number;
    estado: string;
    dataVencimento: string;
    dataPagamento: string;
}
