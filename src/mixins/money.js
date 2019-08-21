const changeDigitToText = (rawMoney) => {
    //Example 1.3 to 1300000
    let money = parseFloat(rawMoney) * 1000000

    let billionDigit = Math.floor(money / 1000000000)
    
    money %= 1000000000

    let millionDigit = Math.floor(money / 1000000)

    money %= 1000000

    let hundredDigit = Math.floor(money / 100000)

    money %= 100000

    let thousandDigit = Math.floor(money / 1000)

    let result = ''

    if (billionDigit>0) {
        result += `${billionDigit} tỷ `
    }
    if (millionDigit>0) {
        result += `${millionDigit} triệu `
    }
    if (hundredDigit>0) {
        result += `${hundredDigit} trăm `
    }
    if (thousandDigit>0) {
        result += `${thousandDigit}  `
    }
    if (hundredDigit>0 | thousandDigit > 0) {
        result += 'nghìn '
    }
    if (result) {
        result += 'đồng'
    } 
    
    return result
}

export default changeDigitToText