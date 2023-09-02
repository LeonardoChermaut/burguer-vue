<script lang="ts">
import { reactive, onMounted, ref } from 'vue'
import MessageOrderComponent from './Message.vue'

const BASE_URL: string = 'http://localhost:3000';

enum StatusOrderProduction {
  REQUESTED = 'Solicitado',
  PRODUCTION = 'Em Produção',
  FINISHED = 'Finalizado'
}

type FormOrderType = {
  id: number
  type: string
}

type StringOrNullType = string | null

type IngredientsBurgerType = {
  breads?: FormOrderType[] | null
  meats?: FormOrderType[] | null
  additionalIngredients?: FormOrderType[] | null
  statusOrderRequest?: StatusOrderProduction | null
  optionalData?: FormOrderType[] | null
}

interface IFormOrderBurger extends IngredientsBurgerType {
  nameClientRequested: StringOrNullType
  messageOrderDetail: StringOrNullType
  selectedBread: StringOrNullType
  selectedMeat: StringOrNullType
  selectedAdditionalIngredient: FormOrderType[] | null
}

export default {
  name: 'FormOrderComponent',
  components: {
    MessageOrderComponent
  },
  setup() {
    const isLoadingIngredients = ref(false);
    const isCreatingOrder = ref(false);

    const orderBurger = reactive<IFormOrderBurger>({
      nameClientRequested: null,
      selectedBread: null,
      selectedMeat: null,
      messageOrderDetail: null,
      selectedAdditionalIngredient: [],
      statusOrderRequest: StatusOrderProduction.PRODUCTION
    });

    const handleIngredientTypeSelected = ({ target }: Event, typeIngredient: string) => {
      const { value: ingredientSelected } = target as HTMLSelectElement;

      if (typeIngredient === 'meat') {
        orderBurger.selectedMeat = ingredientSelected;
      } else if (typeIngredient === 'bread') {
        orderBurger.selectedBread = ingredientSelected;
      }
    }

    const getIngredientsBurger = async (): Promise<void> => {
      try {
        isLoadingIngredients.value = !isLoadingIngredients.value;
        const request = await fetch(`${BASE_URL}/ingredients`);
        const { breads, meats, optionals } = await request.json();

        orderBurger.meats = meats;
        orderBurger.breads = breads;
        orderBurger.optionalData = optionals;

        isLoadingIngredients.value = !isLoadingIngredients.value;
      } catch (error) {
        console.error(error);
      }
    }

    const delayToExecute = (action: any, delay: number) => {
      return new Promise<void>((resolve) =>
        setTimeout(() => {
          typeof action === 'function' ? action() : action;
          resolve();
        }, delay)
      )
    }

    const reloadCurrentPage = (timeDelay: number) => {
      return delayToExecute(() => location.reload() , timeDelay);
    }

    const clearFormOrder = () => {
      orderBurger.nameClientRequested = '';
      orderBurger.selectedMeat = 'selecione seu pão 🍞';
      orderBurger.selectedBread = 'selecione sua carne 🥩';
      orderBurger.selectedAdditionalIngredient = [];
    }

    const createOrderBurger = async (event: Event): Promise<void> => {
      try {
        isCreatingOrder.value = !isCreatingOrder.value;
        event.preventDefault();

        const buildBurger = {
          name_client: orderBurger.nameClientRequested,
          order_status: StatusOrderProduction.PRODUCTION,
          bread: orderBurger.selectedBread,
          meat: orderBurger.selectedMeat,
          additional: orderBurger?.selectedAdditionalIngredient
        };

        const bodyRequestJson = JSON.stringify(buildBurger);

        const fetchOrderBurger = await fetch(`${BASE_URL}/burgers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: bodyRequestJson
        });

        const { id } = await fetchOrderBurger.json();

        orderBurger.messageOrderDetail = `Pedido Nº ${id} realizado com sucesso! =)`;
        isCreatingOrder.value = !isCreatingOrder.value;

        clearFormOrder();

        return await reloadCurrentPage(3000);
      } catch (error) {
        console.error(error);
        throw new Error();
      }
    }

    onMounted(async () => {
      await getIngredientsBurger();
    })

    return {
      isLoadingIngredients,
      isCreatingOrder,
      orderBurger,
      createOrderBurger,
      handleIngredientTypeSelected
    }
  }
}
</script>

<template>
  <div id="form-main-container">
    <MessageOrderComponent :message="orderBurger.messageOrderDetail" v-show="orderBurger.messageOrderDetail" />
    <div>
      <form id="form-burguer-order" @submit="createOrderBurger">
        <div class="input-order-container">
          <label for="name"> Nome do Cliente </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome completo"
            maxlength="50"
            minlength="10"
            v-model="orderBurger.nameClientRequested"
            required
            :disabled="isCreatingOrder"/>
        </div>

        <div class="input-order-container">
          <label for="select-option-bread">Escolha o tipo do pão</label>
          <select id="select-option-bread" @change="handleIngredientTypeSelected($event, 'bread')" required>
            <option value="">selecione seu pão 🍞</option>
            <option v-for="bread in orderBurger.breads" :key="bread.id" :value="bread.type">
              {{ bread.type }}
            </option>
          </select>
        </div>

        <div class="input-order-container">
          <label for="select-option-meat">Escolha o tipo da carne</label>
          <select id="select-option-meat" @change="handleIngredientTypeSelected($event, 'meat')" required>
            <option value="">selecione sua carne 🥩</option>
            <option v-for="meat in orderBurger.meats" :key="meat.id" :value="meat.type">{{ meat.type }}</option>
          </select>
        </div>

        <div class="input-order-container" v-if="isLoadingIngredients">
          <label id="additional-order-label-title" for="additional-order-label-title">Carregando Adicionais...</label>
        </div>
        <div v-else class="additional-order-container">
          <label id="additional-order-label-title" for="additional-order-label-title">Adicionais</label>
          <div class="checkbox-container" v-for="opcional in orderBurger.optionalData" :key="opcional.id">
            <input
              type="checkbox"
              id="checkbox-additional"
              name="additional-order-label-title"
              v-model="orderBurger.selectedAdditionalIngredient"
              :value="opcional.type"
            />
            <span>{{ opcional.type }}</span>
          </div>
        </div>

        <div class="input-order-conteiner">
          <input
            type="submit"
            class="submit-input-order"
            :value="isCreatingOrder ? 'Montando pedido...' : 'Montar meu hamburguer'"
            :disabled="isCreatingOrder"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
#form-burguer-order {
  max-width: 25rem;
  margin: 0 auto;
}

label {
  font-weight: bold;
  margin-bottom: 0.938rem;
  color: #222;
  padding: 0.313rem 0.625rem;
  border-left: 0.25rem solid #fcba03;
}

input {
  width: 100%;
  height: 2rem;
  border-radius: 0.5rem;
  padding: 0.188rem 0.625rem;
  border: 2px solid #555;
}

select {
  font-size: 90%;
  width: 95%;
  height: 1.5rem;
  border-radius: 0.5rem;
  padding: 0.188rem 0.625rem;
  border: 2px solid #555;
}

input[type='checkbox'] {
  accent-color: #fcba03;
  mix-blend-mode: multiply;
}

input[type='text'] {
  accent-color: #000000;
  mix-blend-mode: multiply;
}

#checkbox-additional {
  margin-top: 1.5rem;
  width: 10%;
  height: 1rem;
}

#additional-order-label-title {
  width: 100%;
}

.input-order-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}

.additional-order-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.checkbox-container {
  display: flex;
  align-items: flex-end;
  width: 50%;
  margin-bottom: 1rem;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-top: 0.4rem;
  margin-left: 0.375rem;
  font-weight: bold;
}

.submit-input-order {
  width: 100%;
  text-align: center;
  color: #fcba03;
  font-weight: bold;
  background-color: #222;
  border: 0.125rem solid #222;
  padding: 0.625rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  height: 100%;
}
.submit-input-order:hover {
  background-color: #fcba03;
  color: #222;
}

.submit-input-order:disabled {
  color: #ffffff;
  background-color: #5d5d5d;
}
</style>