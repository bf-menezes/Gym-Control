module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        
        if (month < 0 || 
            month == 0 &&
            today.getDate() <= birthDate.getDate()) {
                age = age - 1
            }
    
        return age
    },

    date: function(timestamp) {
        const date = new Date(timestamp)
        
        // UTC serve para se referir ao tempo universal e evitar o bug de datas no Brasil
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2) // no getMonth o 0 é janeiro e 11 é dezembro
        const day = `0${date.getUTCDate()}`.slice(-2) // getDate vai de 1 a 31
        // método slice pegará os 2 últimos digitos do número, exemplo: 012 = 12, ou 02 = 02, ou 2002 = 02

        return(`${year}-${month}-${day}`)
    }
}
