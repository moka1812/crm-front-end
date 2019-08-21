import ApiService from './api.service'
import { ProfileService, CurrentBranchService } from './storage.service'
import { AssetService, AssetError } from './asset.serivce'
import { deleteCustomerDocument, customerDoucument, customerCollectoralInfo, customerSummary,
customerApi, customerById, customerDocumentApi, customerRepaymentSchedule, customerTransaction } from '../config/backend-api'
import moment from 'moment'

class CustomerError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const CustomerService = {

    getCustomerList: async function(page) {
        try {

            let url = customerApi

            const response = await ApiService.get(url)

            const data = this.filterRawCustomerList(response.data)
            
            return {
                customers: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerByCustomerId: async function(id) {
        try {

            const url = customerById.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCustomer(response.data)
            
            return {
                customer: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerDoucument: async function(id) {
        try {

            const url = customerDoucument.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawDocumnetList(response.data)
            
            return {
                docs: data,
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    deleteCustomerDocument:  async function(id) {
        try {

            const url = deleteCustomerDocument.replace(":id", id)

            const responsedelete = await ApiService.delete(url)
            
            return {
                docs: responsedelete.data,
            }

        } catch (error) {

            throw CustomerError(error.responsedelete.status, error.responsedelete.data.detail)
        }
    },

    uploadCustomerDocument: async function(data) {
        try {
            const currentUserID = ProfileService.getID()
            data.append('uploader', currentUserID)

            const response = await ApiService.post(customerDocumentApi, data)
            
            return {
                docs: response.data,
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerSummary: async function(id) {
        try {

            const url = customerSummary.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawSummary(response.data)

            const total = this.filterTotalSummary(response.data)
            
            return {
                customers: data,
                total: total
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerRepaymentSchedule: async function(id) {
        try {

            const url = customerRepaymentSchedule.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawRepaymentSchedule(response.data)

            const total = this.filterRawCustomerTotalSchedule(response.data)
            
            return {
                customers: data,
                total: total
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerCollectoralInfo: async function(id) {
        try {

            const url = customerCollectoralInfo.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCollectoralInfo(response.data)
            
            return {
                customers: data,
                total: total
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerTransactionLog: async function(id) {

        try {

            const url = customerTransaction.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawTransactionInfo(response.data)
            
            return {
                customers: data,
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }

    },

    filterRawCustomer: function(item) {
        let data = null;
        try {
            data = {
                id: item.id,
                fullName: item.full_name,
                primaryPhone: item.primary_phone,
                alternativePhone: item.alternative_phone,
                address: item.address + " " + item.district+ " " + item.city,
            };
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    
    filterRawCustomerList: function(rawData) {
        const data = []
        try {
            for (let item of rawData) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD/MM/YYYY")
                const closedDate = new moment(item.close_date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD/MM/YYYY")

                data.push({
                    id: item.id,
                    customerId: item.mifos_id,
                    customerName: item.first_name +' '+ item.last_name,
                    externalId: closedDate,
                    status: item.status,
                    office: item.client,
                    lastContact: item.asset,
                    matures_date: item.agent,
                    activeLoan: item.market_amount,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawDocumnetList: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

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
                // const date = new moment(item.dueDate.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                // const paid = new moment(item.date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
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

    filterRawCustomerTotalSchedule: function(item) {
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
                //     date = new moment(item.date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
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

export default CustomerService

export { CustomerService, CustomerError }