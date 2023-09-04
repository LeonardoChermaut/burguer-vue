export const BASE_URL: string = 'http://localhost:3000';

export type GlobalOrderType = {
  id: number
  type: string
}

export enum StatusOrderProduction {
      REQUESTED = 'Solicitado',
      PRODUCTION = 'Em Produção',
      FINISHED = 'Finalizado'
}

export type StatusOrderType = GlobalOrderType & { status: StatusOrderProduction };
