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

const tasks = JSON.parse(localStorage.getItem('tasks') || '{}')

const randomId = () => {
	const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0]

	return uint32.toString(16)
}

const addTask = (task, id) => {
	const taskElement = taskTemplate.content.cloneNode(true)

	taskElement.querySelector('#task').textContent = task.text

	taskElement.querySelector('.delete').setAttribute('data-id', id)

	addInput.value = ''

	tasks[id] = { text: task.text, isDone: task.isDone }

	localStorage.setItem('tasks', JSON.stringify(tasks))

	if (task.isDone) {
		taskElement.querySelector('#done-checkbox').checked = true
	}

	taskElement.querySelector('.delete').addEventListener('click', event => {
		event.preventDefault()

		const task = document.querySelector(`[data-id="${id}"]`)

		task.parentElement.parentElement.remove()

		delete tasks[id]

		localStorage.setItem('tasks', JSON.stringify(tasks))
	})

	taskElement
		.querySelector('#done-checkbox')
		.addEventListener('change', event => {
			event.preventDefault()

			tasks[id].isDone = event.target.checked

			localStorage.setItem('tasks', JSON.stringify(tasks))
		})

	taskList.appendChild(taskElement)
}

Object.keys(tasks).forEach(id => {
	if (tasks[id].isDone) {
		addTask(tasks[id], id)

		return
	}

	addTask({ text: tasks[id], isDone: false }, id)
})

addForm.addEventListener('submit', event => {
	event.preventDefault()

	const task = addInput.value

	if (!addInput.value) return alert('Please enter a task')

	const id = randomId()

	addTask({ text: task, isDone: false }, id)
})
