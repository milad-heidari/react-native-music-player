import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {

    constructor(){
        
    }

    getItem(key){
        const get = async()=>{     
            let value
            try {
                const reqGetItem =await AsyncStorage.getItem(key,(e,r)=>{
                    const parsed = JSON.parse(r)
                    console.log('qqqqqqqqqqqqww',typeof parsed)
                    value = parsed
                })
                // return parsed
            } catch (error) {
                
            }
            return value
        }
        return get()
    }

    setItem(key,value){
        const generateKey = `@storage_playlists_${key}`
        const stringifidValue = JSON.stringify(value)
        return AsyncStorage.setItem(generateKey,stringifidValue)
    }

    getAllKeys(){
        const requestGatKeys = async()=>{
           let keys = []
           try {
               
           keys = await AsyncStorage.getAllKeys()

           } catch (error) {
               
           }
        //    console.log('services',typeof keys)
           return keys
        }
        return requestGatKeys()
    }

    multiGet(keys){

        const getAll =async()=>{
            let values
            try {
                const stringifyValue = await AsyncStorage.multiGet(keys,(error,result)=>{
                    console.log('error',error)
                    // console.log('res',result)
                    const resValue = result.map(playlist =>{
                        const parsedValue= JSON.parse(playlist[1])
                        return [playlist[0],parsedValue]
                    })
                    values = resValue
                })
            //  const resValues = stringifyValue.map(playlist=>{
                    // const parsedValue= JSON.parse(JSON.parse(playlist[1]))
                    // return [playlist[0],parsedValue]
                // })
                // values = resValues
                // return values
            } catch (error) {
                
            }
            return values
        }

        return getAll()

    }

    mergeItem(key,value){
        const requestMergeItem = async()=>{
            try {
                const stringifidValue = JSON.stringify(value)
               return await AsyncStorage.mergeItem(key,stringifidValue)
            } catch (error) {
                
            }
        }
        
       return requestMergeItem()
      
    }
    
    multiSet(data){
       return AsyncStorage.multiSet(data)
    }

}

export default AsyncStorageService;