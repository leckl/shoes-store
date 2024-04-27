<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

	const props = defineProps({
		user: Object
	})

	const values = ref({
		userName: '',
		userLogin: '',
		userEmail: '',
	})

	const schema = yup.object().shape({
		userName: yup.string().max(70, 'Максимальная длина 70'),
		userLogin: yup.string().max(50, 'Максимальная длина 50'),
		userEmail: yup.string().email('Неверная форма').max(70, 'Максимальная длина 70'),
	})

	const emit = defineEmits(['updateUser'])

	const clearFields = () => {
		values.value.userName = ''
		values.value.userLogin = ''
		values.value.userEmail = ''
	}

	const updateData = () => {
		const token = props.token || localStorage.getItem('token');

		axios.put('http://localhost:3001/edit-general', {
			newUserName: values.value.userName,
			newUserLogin: values.value.userLogin,
			newUserEmail: values.value.userEmail
		}, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			console.log(response)
			emit('updateUser', {
				userName: values.value.userName,
				userLogin: values.value.userLogin,
				userEmail: values.value.userEmail,
			})

			clearFields()
		})
		.catch(err => {
			console.log(err)
		})
	}
</script>
<template>
  <section class="generalData">
    <h2 class="generalName">Основные данные</h2>
		<Form :validation-schema="schema" @submit="updateData" class="dataFieldsContainer">
			<label class="dataFieldContainer">
				<p class="dataName">Имя</p>
				<Field class="dataField" :placeholder="user.userName" v-model="values.userName" name="userName" id="userName" type="text" />
				<ErrorMessage class="alertPhrase" name="userName" />
			</label>
			<label class="dataFieldContainer">
				<p class="dataName">Логин</p>
				<Field class="dataField" :placeholder="user.userLogin" v-model="values.userLogin" name="userLogin" id="userLogin" type="text" />
				<ErrorMessage class="alertPhrase" name="userLogin" />
			</label>
			<label class="dataFieldContainer">
				<p class="dataName">Email</p>
				<Field class="dataField" v-model="values.userEmail" name="userEmail" id="userEmail" type="text"
				:placeholder="`${user && user.userEmail ? user.userEmail : 'Email'}`"
				 />
				<ErrorMessage class="alertPhrase" name="userEmail" />
			</label>
		</Form>
		<div class="profileButtonsContainer">
			<p @click="clearFields" class="generalDataCancel">Отменить</p>
			<button @click="updateData" class="generalDataConfirm">Сохранить</button>
		</div>
  </section>
</template>
<style>
	.generalData{
		color: #123026;
		display: flex;
		flex-direction: column;
		max-width: 1100px;
		padding-bottom: 50px;
	}
	.dataFieldsContainer{
		display: flex;
		justify-content: space-between;
		gap: 30px;
	}
	.generalName{
		padding-bottom: 15px;
	}
	.dataFieldContainer{
		display: flex;
		flex-direction: column;
		flex-basis: 30%;
		gap: 5px;
	}
	.dataField{
		border: none;
		background-color: #fff;
		padding: 13px;
		border-radius: 5px;
		outline: 1px solid #123026;
		font-size: 16px;
	}
	.dataField:hover{
    outline: 2px solid rgba(18, 48, 38, 0.6);
    border: none;
  }
	.dataField:focus{
    outline: 2px solid rgba(18, 48, 38, 1);
  }
	::placeholder{
		color: #123026;
		font-size: 16px;
	}
	.profileButtonsContainer{
		display: flex;
		align-items: center;
		position: relative;
		justify-content: flex-end;
		gap: 30px;
		padding-top: 30px;
	}
	.generalDataCancel{
		color: black;
		font-size: 16px;
		cursor: pointer;
	}
	.generalDataConfirm{
		border-radius: 5px;
		background-color: #123026;
		color: #fff;
		padding: 15px 33px;
		border: none;
		font-size: 16px;
	}
</style>