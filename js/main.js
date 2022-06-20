'use strict'

window.addEventListener('load', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./service-worker.js')
	}
})

const addForm = document.querySelector('#add-form')
const addInput = document.querySelector('#add-form #task')
const taskTemplate = document.querySelector('template#taskRow')
const taskList = document.querySelector('#tasks tbody')

const randomId = () => {
	const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0]

	return uint32.toString(16)
}

addForm.addEventListener('submit', event => {
	event.preventDefault()

	const task = addInput.value

	if (!addInput.value) return alert('Please enter a task')

	const id = randomId()

	const taskElement = taskTemplate.content.cloneNode(true)

	taskElement.querySelector('#task').textContent = task

	taskElement.querySelector('.delete').setAttribute('data-id', id)

	addInput.value = ''

	taskList.appendChild(taskElement)
})
