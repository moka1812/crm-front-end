import ApiService from './api.service'
import { ProfileService, CurrentBranchService } from './storage.service'
import { 
    deleteContractDocument, contractDoucument, contractCollectoralInfo, contractSummary,
    contractApi, contractById, contractDocumentApi, contractRepaymentSchedule, 
    contractTransaction, updateContractNote
} from '../config/backend-api'
import moment from 'moment'

class ContractError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const ContractService = {

    createContract: async function(newContractInfo) {

        const data = {
            order: newContractInfo.orderID,
            client: newContractInfo.clientID,
            product: newContractInfo.productID,
            required_amount: newContractInfo.expectedAmount * 1000000,
            market_amount: newContractInfo.marketAmount * 1000000,
            proposed_amount: newContractInfo.validatorAmount * 1000000,
            approved_amount: newContractInfo.approvedAmount * 1000000,
            special_interest_value: newContractInfo.interestRate,
            agent: ProfileService.getID(),
            branch: CurrentBranchService.getCurrentBranchID(),
            warehousing_fee: newContractInfo.warehousingFee,
            matures_date: newContractInfo.openingDate,
            due_date: newContractInfo.expirationDate,
        }

        if (newContractInfo.penalty != null) {
            data.penalty = newContractInfo.penalty
        }

        if (newContractInfo.parentContractId != null) {
            data.parent_contract_id = newContractInfo.parentContractId
        }

        try {
            const response = await ApiService.post(contractApi, data)
            if (response.status == 201) {
                return response.data
            }
        } catch (error) {
            const array = error.response.data.detail.map(x =>{
                const key = Object.keys(x);
                return x[key]
            })
            throw new ContractError(error.response.status, array.join())
        }
    },

    getContractList: async function(page) {
        try {

            let url = contractApi

            const response = await ApiService.get(url)

            const data = this.filterRawContractList(response.data)

            return {
                contracts: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractByContractId: async function(id) {
        try {

            const url = contractById.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawContract(response.data)
            
            return {
                contract: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractDoucument: async function(id) {
        try {

            const url = contractDoucument.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawDocumnetList(response.data)
            
            return {
                docs: data,
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    deleteContractDocument:  async function(id) {
        try {

            const url = deleteContractDocument.replace(":id", id)

            const responsedelete = await ApiService.delete(url)
            
            return {
                docs: responsedelete.data,
            }

        } catch (error) {

            throw new ContractError(error.responsedelete.status, error.responsedelete.data.detail)
        }
    },

    uploadContractDocument: async function(data) {
        try {
            const currentUserID = ProfileService.getID()
            data.append('uploader', currentUserID)
            const url = contractDocumentApi;

            const response = await ApiService.post(contractDocumentApi, data)
            
            return {
                docs: response.data,
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    updateNote: async function(id, data) {
        try {
    
            const url = updateContractNote.replace(":id", id)
    
    
            const response = await ApiService.patch(url, data)
            
            return {
                cus: response.data,
            }
    
        } catch (error) {
    
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractSummary: async function(id) {
        try {

            const url = contractSummary.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawSummary(response.data)

            const total = this.filterTotalSummary(response.data)
            
            return {
                contracts: data,
                total: total
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractRepaymentSchedule: async function(id) {
        try {

            const url = contractRepaymentSchedule.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawRepaymentSchedule(response.data)

            const total = this.filterRawContractTotalSchedule(response.data)
            
            return {
                contracts: data,
                total: total
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractCollectoralInfo: async function(id) {
        try {

            const url = contractCollectoralInfo.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCollectoralInfo(response.data)
            
            return {
                contracts: data,
                total: total
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractTransactionLog: async function(id) {

        try {

            const url = contractTransaction.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawTransactionInfo(response.data)
            
            return {
                contracts: data,
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }

    },

    filterRawContract: function(item) {
        let data = null;
        try {
            //Example created: "2019-05-31T14:16:03.932314+07:00"   
            const created = new moment(item.created, "YYYY-MM-DD[T]HH:mm").format("DD/MM/YYYY");

            data = {
                id: item.id,
                contractID: item.mifos_id,
                createdDate: created,
                status: item.status,
                maturesDate: item.matures_date,
                agentName: item.agent_name,
                clientId: item.client,
                branchName: item.branch_name,
                storageId: item.storage_id,
                assetDescription: item.asset_description,
                assetType: item.asset_type,
                note: item.note,
            };
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    
    filterRawContractList: function(rawData) {
        const data = []
        try {
            for (let item of rawData) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created, "YYYY-MM-DD[T]HH:mm").format("DD/MM/YYYY")
                
                const closedDate = null;
                if (item.close_date !== null) {
                    closedDate = new moment(item.close_date, "YYYY-MM-DD[T]HH:mm").format("DD/MM/YYYY")
                }
                 
                data.push({
                    id: item.id,
                    contractID: item.mifos_id,
                    createdDate: created,
                    closedDate: closedDate,
                    status: item.status,
                    clientName: item.client_name,
                    assetDescription: this.subTextAsset(item.asset_description),
                    approvedAmount: item.approved_amount,
                    interest: item.interest_value,
                    branchName: item.branch_name,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    subTextAsset: function(textFull) {
        if(textFull === null || textFull === undefined || textFull.length <= 30) {
            return textFull
        } else {
            return textFull.substring(0, 30) + "...";
        }
    },
    filterRawDocumnetList: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created, "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

                data.push({
                    id: item.id,
                    uploader: item.uploader_name,
                    create_date: created,
                    last_update: item.status,
                    link: item.s3_path,
                    document: item.doc_type
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawRepaymentSchedule: function(rawData) {
        const data = []
        try {
            for (let item of rawData.detail.repaymentSchedule.periods) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                // const date = new moment(item.dueDate, "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                // const paid = new moment(item.date, "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                const date = '15/03/2016'
                const paid = '15/03/2016'

                data.push({
                    day: item.daysInPeriod,
                    date: date,
                    paid_date: paid,
                    principal_due: item.due,
                    blance_of_loan: item.principalLoanBalanceOutstanding,
                    interest: item.interestDue,
                    fees: '',
                    fenalties: '',
                    due: item.totalDueForPeriod,
                    pain: item.totalPaidForPeriod,
                    in_advance: item.totalPaidInAdvanceForPeriod,
                    late: item.totalPaidLateForPeriod,
                    outstanding: item.totalOutstandingForPeriod
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawContractTotalSchedule: function(item) {
        let total = null;
        try {
            total = {
                // Total Outstanding
                totalOutstanding: item.detail.repaymentSchedule.totalOutstanding,
                // Total Late
                totalPaidLate: item.detail.repaymentSchedule.totalPaidLate,
                // Total In Advance
                totalAdvancePayment: item.detail.repaymentSchedule.totalAdvancePayment,
                // Total Paid
                totalRepayment: item.detail.repaymentSchedule.totalRepayment,
                // Total Due
                totalRepaymentExpected: item.detail.repaymentSchedule.totalRepaymentExpected,
                // Total Penalties
                totalPenaltyChargesCharged: item.detail.repaymentSchedule.totalPenaltyChargesCharged,
                // Total Fees
                totalFeeChargesCharged: item.detail.repaymentSchedule.totalFeeChargesCharged,
                //Total Interest
                totalInterestCharged: item.detail.repaymentSchedule.totalInterestCharged,
                // Total Principle due
                totalPrincipalExpected: item.detail.repaymentSchedule.totalPrincipalExpected,
            }
            return total
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    // chưa có bản map, đang chờ bản map
    filterRawCollectoralInfo: function(rawData) {
        const data = []
        try {

        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawTransactionInfo: function(rawData) {
        const data = []
        if (rawData.detail.length > 0) {
            data.push(
                {
                    office: '',
                    transaction_date: '',
                    transaction_type: '',
                    amount: '',
                    principal: 'Gốc',
                    interest: 'Lãi',
                    fee: 'Phí',
                    penalties: 'Lãi thêm',
                    loan_balance: '',
                },
            )
        }
        try {
            for (let item of rawData.detail) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const date = '11/02/2016'
                // if (item.date !== null && item.date !== '') {
                //     date = new moment(item.date, "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                // }
            
                data.push({
                    office: item.officeName,
                    transaction_date: date,
                    transaction_type: item.type.value,
                    amount: item.amount,
                    principal:  item.principalPortion,
                    fee: item.feeChargesPortion,
                    interest: item.interestPortion,
                    penalties: item.penaltyChargesPortion,
                    loan_balance: item.outstandingLoanBalance,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawSummary: function(rawData) {
        let data = []
        let principal = null
        let interest = null
        let fees = null
        let storage = null
        let peanalties = null
        principal = {
            original: 'Gốc',
            css:'bold-text',
            loan_amount: rawData.detail.principalDisbursed,
            paid: rawData.detail.principalPaid,
            waived: rawData.detail.principalNetDisbursed,
            outstanding: rawData.detail.principalOutstanding,
            unpaid: rawData.detail.principalWrittenOff,
            overdue: rawData.detail.principalOverdue,
        }
        data.push(principal)
        interest = {
            original: 'Lãi',
            css:'bold-text',
            loan_amount: rawData.detail.interestCharged,
            paid: rawData.detail.interestPaid,
            waived: rawData.detail.interestWaived,
            outstanding: rawData.detail.interestOutstanding,
            unpaid: rawData.detail.interestWrittenOff,
            overdue: rawData.detail.interestOverdue,
        }
        data.push(interest)
        fees = {
            original: 'Phí',
            css:'bold-text',
            loan_amount: rawData.detail.feeChargesCharged,
            paid: rawData.detail.feeChargesPaid,
            waived: rawData.detail.interestWaived,
            outstanding: rawData.detail.interestOutstanding,
            unpaid: rawData.detail.interestWrittenOff,
            overdue: rawData.detail.interestOverdue,
        }
        data.push(fees)
        storage = {
            original: 'Storage',
            css:'normal-text',
            loan_amount: 0,
            paid: 0,
            waived: 0,
            outstanding: 0,
            unpaid: 0,
            overdue: 0,
        }
        data.push(storage)
        peanalties = {
            original: 'Lãi trễ',
            css:'bold-text',
            loan_amount: rawData.detail.penaltyChargesCharged,
            paid: rawData.detail.penaltyChargesPaid,
            waived: rawData.detail.penaltyChargesWaived,
            outstanding: rawData.detail.penaltyChargesOutstanding,
            unpaid: rawData.detail.penaltyChargesWrittenOff,
            overdue: rawData.detail.penaltyChargesOverdue,
        }
        data.push(peanalties)
        // const total = {
        //     original: 'Tổng',
        //     css:'bold-text',
        //     loan_amount: rawData.detail.totalExpectedRepayment,
        //     paid: rawData.detail.totalRepayment,
        //     waived: rawData.detail.totalWaived,
        //     outstanding: rawData.detail.totalOutstanding,
        //     unpaid: rawData.detail.totalWrittenOff.totalWrittenOff,
        //     overdue: rawData.detail.totalOverdue,
        // }
        // data.push(total)
        return data
    },

    filterTotalSummary: function(rawData) {
        const total = {
            original: 'Tổng',
            css:'bold-text',
            loan_amount: rawData.detail.totalExpectedRepayment,
            paid: rawData.detail.totalRepayment,
            waived: rawData.detail.totalWaived,
            outstanding: rawData.detail.totalOutstanding,
            unpaid: rawData.detail.totalWrittenOff.totalWrittenOff,
            overdue: rawData.detail.totalOverdue,
        }
        return total
    }

}

export default ContractService

export { ContractService, ContractError }