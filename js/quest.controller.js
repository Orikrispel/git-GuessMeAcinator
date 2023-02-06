'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.btn-restart').click(onRestartGame)
$('.btn-close').click(closeModal)

function closeModal() {
  $('.modal').hide()
}

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $(this).closest('.game-start').hide()
  // TODO: show the quest section
  $('.quest').show()
  renderQuest()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(`${getCurrQuest().txt}`)
}

function onUserResponse(ev) {
  // console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.modal').show()
    } else {
      // alert('I dont know...teach me!')
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  // TODO: Get the inputs' values
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  // newGuess.value = ''
  // newQuest.value = ''
  // TODO: Call the service addGuess
  console.log(`newQuest: ${newQuest}
  newGuess: ${newGuess}
  gLastRes: ${gLastRes}`)
  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  restartGame()
  gLastRes = null
  $('.modal').hide()
  $('.new-quest').hide()
  $('.quest').hide()
  $('.game-start').show()
}

