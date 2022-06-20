'use strict'

window.addEventListener('load', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./service-worker.js')
	}
})

const AddForm = document.querySelector('#add-form')
const AddInput = document.querySelector('#add-form #task')

const randomId = () => {
	const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0]

	return uint32.toString(16)
}
