'use strict'

window.addEventListener('load', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./service-worker.js')
	}
})

const AddForm = document.querySelector('#add-form')
const AddInput = document.querySelector('#add-form #task')
