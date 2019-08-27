function getPrincipal(pawnAmount, interestRate, productName) {
    if (productName.includes('Prepaid Interest')) {
        return  pawnAmount - (pawnAmount * interestRate / 100 )
    }
    return pawnAmount
}

export function getCost(pawnAmount, interestRate, productName) {
    const principal = getPrincipal(pawnAmount, interestRate, productName)
    return Math.floor(principal * 1000) / 1000
}

export function getRoundFee(pawnAmount, interestRate, productName) {
    const principal = getPrincipal(pawnAmount, interestRate, productName)
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