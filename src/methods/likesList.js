import emitter from '@/methods/emitter'
export function getLikesIdList () {
  const likesIdList = JSON.parse(localStorage.getItem('tacos-likesList')) || []
  return likesIdList
}

export function updateLikesList (itemId) {
  const likesIdList = JSON.parse(localStorage.getItem('tacos-likesList')) || []
  if (likesIdList.includes(itemId)) {
    likesIdList.splice(likesIdList.indexOf(itemId), 1)
  } else {
    likesIdList.push(itemId)
  }
  localStorage.setItem('tacos-likesList', JSON.stringify(likesIdList))
  emitter.emit('updateLikes')
}
