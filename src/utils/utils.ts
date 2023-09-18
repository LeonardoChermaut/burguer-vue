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
