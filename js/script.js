var keys = [].slice.call(document.getElementsByClassName('note')).map(function(e){
	return e.id
});

var timeoutList = []
var activeLength = 100

function clearTimeoutList(){
	timeoutList.forEach(function(e){
		clearTimeout(e)
	})

	timeoutList = []
}

[].slice.call(document.getElementsByClassName('note')).forEach(function(e){
	e.onclick = function(ev){
		playNoise(getHalfStep(ev.target.id))
		toggleActive(ev.target.id)
	}
})

function getHalfStep(key){
	return keys.indexOf(key)
}

function keyCodeToCharacter(keyCode){//219
	return String.fromCharCode(keyCode).toLowerCase()
}

document.onkeydown = function(e){
	
	var key = keyCodeToCharacter(e.which)
	toggleActive(key)

	playNoise(getHalfStep(key))

}

function getFileName(i){
	return 'noises/test_' + i + '.wav'
}

function playNoise(halfStep){
	if(halfStep == -1)//will need to fix later to allow negative half steps, but it'll work for now
		return

	lowLag.play(getFileName(halfStep))
	//...
}

function toggleActive(id){

	if(!document.getElementById(id))
		return
	document.getElementById(id).classList.add('active-key')

	setTimeout(function(){

		document.getElementById(id).classList.remove('active-key')

	}, activeLength)
}

lowLag.init()
loadNoises()

function loadNoises(){
	for(var i = 0; i <= 12; i++)
		lowLag.load(getFileName(i))
	
}