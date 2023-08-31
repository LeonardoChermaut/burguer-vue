<template>
  <div id="form-main-container">
    <p>Component of Messsage</p>
    <div>
      <form id="form-burguer-order">

        <div class="input-order-conteiner">
          <label for="name">
            Nome do Cliente
          </label>
          <input type="text" id="name" name="name" placeholder="Digite seu nome completo" maxlength="50" minlength="10" required>
        </div>

        <div class="input-order-conteiner">
          <label for="selected-bread">Escolha o tipo do pão</label>
          <select id="select-option-bread" name="selected-bread" required>
            <option value="">Selecione o seu pão</option>
            <option value="option-bread-integral">Integral</option>
          </select>
        </div>

        <div class="input-order-conteiner">
          <label for="selected-meat">Escolha o tipo da carne</label>
          <select id="select-option-meat" name="selected-meat" required>
            <option value="">Selecione a sua carne</option>
            <option value="option-alcatra">Alcatra</option>
          </select>
        </div>

        <div class="additional-order-conteiner">
          <label id="additional-order-label-title" for="selected-addtional">Escolha o tipo da carne</label>
          <div class="checkbox-container">
            <input type="checkbox" id="checkbox-additional" name="additionals" required>
            <span>Salame</span>
          </div>
        </div>

        <div class="input-order-conteiner">
          <input type="submit" class="submit-input-order" value="Montar meu hamburguer">
        </div>

      </form>
    </div>
  </div>
</template>
  
<script lang="ts">
export default {
  name: 'FormOrderComponent'
}
</script>

<style scoped>
#form-burguer-order {
  max-width: 25rem;
  margin: 0 auto;
}

.input-order-conteiner {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.938rem;
  color: #222;
  padding: 0.313rem 0.625rem;
  border-left: 0.25rem solid #FCBA03;
}

input,
select {
  padding: 0.188rem 0.625rem;
  width: 100%;
  border: 1px solid #555;
  border-radius: .5rem;
}

span {
  margin-top: 1.5rem;
}

input[type="checkbox"] {
  accent-color: #FCBA03;
  mix-blend-mode: multiply;
}

#checkbox-additional {
  margin-top: 1.5rem;
  width: 10%;
  height: 1rem;
}

#additional-order-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#additional-order-label-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 1.25rem;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
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
}

.submit-input-order:hover {
  background-color: #FCBA03;
  color: #222;
}
</style>