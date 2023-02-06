'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null
const STORAGE_KEY = 'QuestsTree'

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
    console.log('no data available')
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
  gPrevQuest[lastRes].no = createQuest(gCurrQuest.txt)
  gCurrQuest.txt = newQuestTxt
  _saveQeuestTree()
}

function _saveQeuestTree() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function restartGame() {
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function getCurrQuest() {
  return gCurrQuest
}
