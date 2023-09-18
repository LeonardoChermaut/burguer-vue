<script lang="ts">
import MessageOrderComponent from './Message.vue'
import { type StatusOrderType } from '../utils'
import { onMounted, reactive } from 'vue'
import { useFetch } from '../data'

type OrderDetailType = {
  id: number
  name_client: string
  meat: string
  bread: string
  additional: []
  order_status: StatusOrderType
}

type OrdersClientsType = {
  orders: OrderDetailType[] | null
  order_id: number | null
  status: StatusOrderType | null
}

const OrderClient = reactive<OrdersClientsType>({
  orders: [],
  order_id: null,
  status: null
})

export default {
  name: 'DashboardComponent',
  components: {
    MessageOrderComponent
  },
  setup() {

    const getOrdersClient = async (): Promise<void> => {
      const fetchRequest = await useFetch('/burgers', {
        method: 'GET'
      });
      const orders = await fetchRequest.json();

      OrderClient.orders = orders
    }

    const checkAdditionalIngredients = ({ additional }: OrderDetailType): string[] | string => {
      return additional.length > 0 ? additional : ['Sem adicionais'];
    }

    const getOrderClientStatus = async (): Promise<void> => {
      const fetchRequest = await useFetch('/status', {
        method: 'GET'
      });
      const status = await fetchRequest.json();

      OrderClient.status = status;
    }

    const deleteOrderBurger = async (id: number): Promise<void> => {
      try {
        const fetchRequest = await useFetch(`/burgers/${id}`, {
          method: 'DELETE'
        });
        await fetchRequest.json();
  
        getOrdersClient();
      } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição do pedido");
      }
    }
    const updateOrderBurger = async ({ target }: Event, id: number): Promise<void> => {
      const { value: orderSelected } = target as HTMLSelectElement;

      const dataJson = JSON.stringify({ status: orderSelected });
      await useFetch(`/burgers/${id}`, {
        method: 'PATCH',
        body: dataJson
      });
    }

    onMounted(async() => {
      await Promise.all([getOrdersClient(), getOrderClientStatus()])
    })
    
    return {
      getOrdersClient,
      OrderClient,
      updateOrderBurger,
      deleteOrderBurger,
      checkAdditionalIngredients
    }
  }
}
</script>

<template>
  <div class="dashboard-main-content" v-if="OrderClient.orders && OrderClient.orders?.length > 0">
    <div id="burger-table">
      <div>
        <div id="burger-table-heading">
          <div class="order-id">#:</div>
          <div>Cliente:</div>
          <div>Pão:</div>
          <div>Carne:</div>
          <div>Opcionais:</div>
          <div>Ações:</div>
        </div>
      </div>
      <div id="burger-table-rows">
        <div class="burger-table-row" v-for="order in OrderClient.orders" :key="order?.id">
          <div class="order-number">#{{ order.id }}</div>
          <div>{{ order.name_client }}</div>
          <div>{{ order.bread }}</div>
          <div>{{ order.meat }}</div>
          <div>
            <ul>
            <li v-for="(additional, index) in checkAdditionalIngredients(order)" :key="index">
              {{ additional }}
            </li>
            </ul>
          </div>
          <div>
            <select name="status" class="status" @change="updateOrderBurger($event, order.id)">
                <option :value="status" v-for="status in OrderClient.status" :key="status.id">
                  {{ status.type }}
                </option>
              </select>
            <button class="delete-btn" @click="deleteOrderBurger(order.id)">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <MessageOrderComponent message="Não há pedidos no momento" color="warning" />
  </div>
</template>

<style scoped>

#burger-table {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}
.burger-table-row {
  width: 100%;
  padding: 0.9rem;
  border-bottom: 1px solid #CCC;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
  width: 50%;
  height: 2.68rem;
  text-align: center;
  border: #555 solid 1px;
}

.delete-btn {
  background-color: #222;
  color:#fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: .5s;
}
.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>