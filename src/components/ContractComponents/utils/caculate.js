function getPrincipal(approvedAmount, interestRate, productName) {
    if (productName.includes('Prepaid Interest')) {
        return  approvedAmount - (approvedAmount * interestRate / 100 )
    }
    return approvedAmount
}

export function getCost(approvedAmount, interestRate, productName) {
    const principal = getPrincipal(approvedAmount, interestRate, productName)
    return Math.floor(principal * 1000) / 1000
}

export function getRoundFee(approvedAmount, interestRate, productName) {
    const principal = getPrincipal(approvedAmount, interestRate, productName)
    const upperPrincipal = Math.round(principal * 1000) 
    const downPrincipal = Math.floor(principal * 1000)
    if (upperPrincipal - downPrincipal == 1) {
        return 0.001
    }
    return 0
}

export function getInterestValue(approvedAmount, productName, cost=null, interestRate=null) {
    if (productName.includes('Prepaid Interest')) {
        return (approvedAmount - cost).toFixed(3)
    } else {
        const interestValue = Math.round(this.approvedAmount * 1000000 * this.interestRate / 100) / 1000000
        return interestValue.toFixed(3)
    }
}