import AsyncStorageService from './AsyncStorageService';

const asyncStorageService = new AsyncStorageService()

// const gatAllKeys = new Promise((resolve,reject)=>{
//   const keys = asyncStorageService.getAllKeys()

//   resolve(keys)
// })

export const initGetPlaylistsService = async() => {
  
  const keys = await asyncStorageService.getAllKeys();
  const allData = await asyncStorageService.multiGet(keys)

  return allData

}