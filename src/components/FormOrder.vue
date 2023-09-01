<script lang="ts">
import { reactive, onMounted } from 'vue'
const BASE_URL: string = "http://localhost:3000/ingredients";

enum StatusOrderProduction {
  REQUESTED = 'Solicitado',
  PRODUCTION = 'Em Produção',
  FINISHED = 'Finalizado'
}

type FormOrderType = {
  id: number;
  type: string;
}

interface IFormOrderBurger {
  nameClientRequested: string | null;
  messageOrderDetail: string | null;
  bread: FormOrderType[] | null;
  meat: FormOrderType[] | null;
  optionalData?: FormOrderType[] | null;
  additionalIngredients?: FormOrderType[] | null;
  statusOrderRequest: StatusOrderProduction | null,
}

export default {
  name: 'FormOrderComponent',
  setup() {
    const orderStateReactive = reactive<IFormOrderBurger>({
        nameClientRequested: null,
        bread: null,
        meat: null,
        messageOrderDetail: null,
        additionalIngredients: [],
        optionalData: null,
        statusOrderRequest: null, 
    });

    const getIngredientsBurger = async (): Promise<void> => {
      try {
        const request = await fetch(BASE_URL);
        const { breads, meats, optionals } = await request.json();

        orderStateReactive.meat = meats;
        orderStateReactive.bread = breads;
        orderStateReactive.optionalData = optionals;

      } catch (error) {
        //todo: create handler error
        console.error(error);
      }
    }
    onMounted(() => {
      getIngredientsBurger();
    });

    return {
      orderStateReactive,
    };
  },
}
</script>

<template>
  <div id="form-main-container">
    <p>Component of Messsage</p>
    <div>
      <form id="form-burguer-order">

        <div class="input-order-conteiner">
          <label for="name">
            Nome do Cliente
          </label>
          <input type="text" id="name" name="name" placeholder="Digite seu nome completo" maxlength="50" minlength="10"
            required>
        </div>

        <div class="input-order-conteiner">
          <label for="selected-bread">Escolha o tipo do pão</label>
          <select id="select-option-bread" name="selected-bread" required>
            <option value="">selecione seu pão 🍞</option>
            <option v-for="bread in orderStateReactive.bread" :key="bread.id" :value="bread.type">{{ bread.type }}
            </option>
          </select>
        </div>

        <div class="input-order-conteiner">
          <label for="selected-meat">Escolha o tipo da carne</label>
          <select id="select-option-meat" name="selected-meat" required>
            <option value="">selecione sua carne 🥩</option>
            <option v-for="meat in orderStateReactive.meat" :key="meat.id" :value="meat.type">{{ meat.type }}</option>
          </select>
        </div>

        <div class="additional-order-conteiner">
          <label id="additional-order-label-title" for="selected-addtional">Adicionais</label>
          <div class="checkbox-container" v-for="opcional in orderStateReactive.optionalData" :key="opcional.id">
            <input type="checkbox" id="checkbox-additional" name="additionals" v-model="orderStateReactive.additionalIngredients"
              :value="opcional.type">
            <span>{{ opcional.type }}</span>
          </div>
        </div>

        <div class="input-order-conteiner">
          <input type="submit" class="submit-input-order" value="Montar meu hamburguer">
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
  border-left: 0.25rem solid #FCBA03;
}

input {
  width: 100%;
  height: 2rem;
  border-radius: .5rem;
  padding: 0.188rem 0.625rem;
  border: 2px solid #555;
}

select {
  width: 95%;
  height: 1.5rem;
  border-radius: .5rem;
  padding: 0.188rem 0.625rem;
  border: 2px solid #555;
}

input {
  accent-color: #FCBA03;
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

.input-order-conteiner {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}

.additional-order-conteiner {
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
  margin-top: .4rem;
  margin-left: 0.375rem;
  font-weight: bold;
}

.submit-input-order {
  width: 100%;
  text-align: center;
  color: #FCBA03;
  font-weight: bold;
  background-color: #222;
  border: 0.125rem solid #222;
  padding: 0.625rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: .5s;
  height: 100%;
}

.submit-input-order:hover {
  background-color: #FCBA03;
  color: #222;
}
</style>