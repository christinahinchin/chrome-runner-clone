const keys = {}

function bindEvent(key, handler){
	keys[key] = {}
	keys[key].execute = handler
}

addEventListener('keydown', ({key}) => {
	if(!keys[key]){
		return;
	}

	keys[key].execute()
})


export default {
	bindEvent
}