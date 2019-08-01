<template>
    <v-container fluid class="pa-0 ma-2">
        <v-layout row>
            <v-flex md5 class="title">
                <h2>New Contract - Customer Info</h2>
            </v-flex>
            <v-flex md7>
                <v-stepper v-model="step" class="elevation-0 background">
                    <v-stepper-header>
                        <template v-for="index in 4" class="step">
                            <v-stepper-step :step="index" color="#dd1e26" :key="`step-${index}`">Step {{index}}</v-stepper-step>
                            <v-divider v-if="index !== 4" :key="`divider-${index}`"/>
                        </template>
                    </v-stepper-header>
                </v-stepper>
            </v-flex>
        </v-layout>
        <v-layout v-if="step==1">
            <v-flex sm3>
                <v-layout justify-start>
                    <v-checkbox
                        v-model="newCustomer"
                        label="Khách hàng mới"
                        color="#dd1e26"
                    ></v-checkbox>
                    <v-checkbox
                        v-model="oldCustomer"
                        label="Khách hàng cũ"
                        color="#dd1e26"
                    ></v-checkbox>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-window v-model="step">
            <v-window-item :value="1" class="padding">
                <v-form v-model="valid1">
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="nameInput"
                                    label="Tên*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="emailInput"
                                    label="Email"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 1*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^-?[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 2"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <date-picker v-model="dobInput" label="DOB*"/>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="NationalIDInput"
                                    label="CMND"
                                >
                                    <template slot="append-outer">
                                        <v-icon>attach_file</v-icon>
                                    </template>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-text-field
                            v-model.lazy="addressInput"
                            :rules="[
                                v => !!v || 'Yêu cầu cần có',
                            ]"
                            label="Địa chỉ"
                            required
                        >
                        </v-text-field>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="districtInput"
                                    :items="districtItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Quận/Huyện"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-select
                                    v-model="cityInput"
                                    :items="cityItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Thành phố"
                                    required
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="sourceInput"
                                    :items="sourceItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Source"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-textarea
                                    v-model.lazy="noteInput"
                                    label="Note"
                                    rows="1"
                                    auto-grow
                                    >
                                </v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn 
                                class="backBtn"
                                color="#fff"
                                round
                                @click="cancleHandle"
                            >
                                Back
                            </v-btn>
                            <v-btn 
                                class="nextBtn"
                                color="#dd1e26"
                                @click="step++"
                                round
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="2" class="padding">
                <v-form v-model="valid2">
                    <v-container>
                        <v-layout>
                            <v-flex sm5>
                                <v-textarea
                                    v-model.lazy="assetInput"
                                    label="Mô tả tài sản*"
                                    rows="1"
                                    auto-grow
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    required
                                >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="expectedAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá mong muốn"
                                    :hint="this.expectedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="assetTypeInput"
                                    :items="assetTypeItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Loại tài sản*"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="validatorAmount1Input"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá thẩm định 1"
                                    :hint="this.validatorAmount1Hint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="validatorAmount2Input"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá thẩm định 2"
                                    :hint="this.validatorAmount2Hint"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="pawnAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm"
                                    :hint="this.pawnAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn 
                                class="backBtn"
                                color="#fff"
                                @click="step--"
                                round
                            >
                                Back
                            </v-btn>
                            <v-btn
                                class="nextBtn"
                                color="#dd1e26"
                                @click="step++"
                                round
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="3" class="padding">
                <v-form v-model="valid3">
                    <v-container>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="contractIDInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Mã hợp đồng"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="receivedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tiền nhận được"
                                    :hint="this.receivedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-select
                                    v-model="packageInput"
                                    :items="packageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Gói"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm4>
                                <date-picker v-model="expirationDateInput" label="Ngày hết hạn hợp đồng*"/>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="roundingInput"
                                    :rules="[
                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Khoản làm tròn"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <date-picker v-model="openingDateInput" label="Ngày mở hợp đồng*"/>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="costInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Gốc*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="owedInput"
                                    :rules="[
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Còn nợ"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="pawnPriceInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="feeInput"
                                    label="Tổng phí"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestMoneyInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm8>
                                <v-layout>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="warehousingFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm11>
                                                <v-text-field
                                                    v-model="warehousingFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    label="Phí kho bãi"
                                                    :disabled="!warehousingFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex sm1>
                                        
                                    </v-flex>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="appraisalFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm11>
                                                <v-text-field
                                                    v-model="appraisalFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    label="Phí thẩm định"
                                                    :disabled="!appraisalFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="notaryFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm11>
                                                <v-text-field
                                                    v-model="notaryFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    label="Phí công chứng"
                                                    :disabled="!notaryFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex sm1></v-flex>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="anotherFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm11>
                                            <v-text-field
                                                v-model="anotherFeeInput"
                                                :rules="[
                                                        v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                    ]"
                                                label="Phí khác"
                                                :disabled="!anotherFeeCheck"
                                            >
                                            </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <label class="v-label theme--light"> Phương thức </label>
                                <v-radio-group v-model="methodInput" row>
                                    <v-radio color="#dd1e26" label="Tiền mặt" value="Tiền mặt"></v-radio>
                                    <v-radio color="#dd1e26" label="Chuyển khoản" value="Chuyển khoản"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex sm8>
                                <v-layout>
                                    <v-flex sm6>
                                        <v-select
                                            v-model="bankInput"
                                            :items="bankItems"
                                            label="Ngân hàng"
                                            :disabled="methodInput == 'Tiền mặt'"
                                        >
                                        </v-select>
                                    </v-flex>
                                    <v-flex sm6>
                                        <v-text-field
                                            v-model="accountNumberInput"
                                            :rules="[
                                                    v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                ]"
                                            label="Số tài khoản"
                                            :disabled="methodInput == 'Tiền mặt'"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-text-field
                                    v-model="bankBranchInput"
                                    label="Chi Nhánh/PGD"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn
                                class="backBtn"
                                color="#fff"
                                @click="step--"
                                round
                            >
                                Back
                            </v-btn>
                            <v-btn
                                class="nextBtn"
                                color="#dd1e26"
                                @click="step++"
                                round
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="4">
                <v-form v-model="valid1" class="form">
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="nameInput"
                                    label="Tên*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="emailInput"
                                    label="Email"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 1*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^-?[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 2"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <date-picker v-model="dobInput" label="DOB*"/>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="NationalIDInput"
                                    label="CMND"
                                >
                                    <template slot="append-outer">
                                        <v-icon>attach_file</v-icon>
                                    </template>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-text-field
                            v-model.lazy="addressInput"
                            :rules="[
                                v => !!v || 'Yêu cầu cần có',
                            ]"
                            label="Địa chỉ"
                            required
                        >
                        </v-text-field>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="districtInput"
                                    :items="districtItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Quận/Huyện"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-select
                                    v-model="cityInput"
                                    :items="cityItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Thành phố"
                                    required
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="sourceInput"
                                    :items="sourceItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Source"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-textarea
                                    v-model.lazy="noteInput"
                                    label="Note"
                                    rows="1"
                                    auto-grow
                                    >
                                </v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn
                                class="backBtn"
                                color="#fff"
                                round
                            >
                                <i class="fas fa-pen" style="margin-right:5px"></i>
                                Edit
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="valid2" class="form">
                    <v-container>
                        <v-layout>
                            <v-flex sm5>
                                <v-textarea
                                    v-model.lazy="assetInput"
                                    label="Mô tả tài sản*"
                                    rows="1"
                                    auto-grow
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    required
                                >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="expectedAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá mong muốn"
                                    :hint="this.expectedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="assetTypeInput"
                                    :items="assetTypeItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Loại tài sản*"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="validatorAmount1Input"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá thẩm định 1"
                                    :hint="this.validatorAmount1Hint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="validatorAmount2Input"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá thẩm định 2"
                                    :hint="this.validatorAmount2Hint"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="pawnAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm"
                                    :hint="this.pawnAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn class="backBtn"
                                color="#fff"
                                round
                            >
                                <i class="fas fa-pen" style="margin-right:5px"></i>
                                Edit
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="valid3" class="form">
                    <v-container>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="contractIDInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Mã hợp đồng"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="receivedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tiền nhận được"
                                    :hint="this.receivedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-select
                                    v-model="packageInput"
                                    :items="packageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Gói"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm4>
                                <date-picker v-model="expirationDateInput" label="Ngày hết hạn hợp đồng*"/>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="roundingInput"
                                    :rules="[
                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Khoản làm tròn"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <date-picker v-model="openingDateInput" label="Ngày mở hợp đồng*"/>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="costInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Gốc*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="owedInput"
                                    :rules="[
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Còn nợ"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="pawnPriceInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="feeInput"
                                    label="Tổng phí"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestMoneyInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm8>
                                <v-layout>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="warehousingFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm11>
                                                <v-text-field
                                                    v-model="warehousingFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    label="Phí kho bãi"
                                                    :disabled="!warehousingFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex sm1>
                                        
                                    </v-flex>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="appraisalFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm11>
                                                <v-text-field
                                                    v-model="appraisalFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    label="Phí thẩm định"
                                                    :disabled="!appraisalFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="notaryFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm11>
                                                <v-text-field
                                                    v-model="notaryFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    label="Phí công chứng"
                                                    :disabled="!notaryFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex sm1></v-flex>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="anotherFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm11>
                                            <v-text-field
                                                v-model="anotherFeeInput"
                                                :rules="[
                                                        v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                    ]"
                                                label="Phí khác"
                                                :disabled="!anotherFeeCheck"
                                            >
                                            </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <label class="v-label theme--light"> Phương thức </label>
                                <v-radio-group v-model="methodInput" row>
                                    <v-radio color="#dd1e26" label="Tiền mặt" value="Tiền mặt"></v-radio>
                                    <v-radio color="#dd1e26" label="Chuyển khoản" value="Chuyển khoản"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex sm8>
                                <v-layout>
                                    <v-flex sm6>
                                        <v-select
                                            v-model="bankInput"
                                            :items="bankItems"
                                            label="Ngân hàng"
                                            :disabled="methodInput == 'Tiền mặt'"
                                        >
                                        </v-select>
                                    </v-flex>
                                    <v-flex sm6>
                                        <v-text-field
                                            v-model="accountNumberInput"
                                            :rules="[
                                                    v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                ]"
                                            label="Số tài khoản"
                                            :disabled="methodInput == 'Tiền mặt'"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-text-field
                                    v-model="bankBranchInput"
                                    label="Chi Nhánh/PGD"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn
                                class="cancelBtn"
                                color="#808495"
                                round
                                @click="cancleHandle"
                            >
                                Cancel
                            </v-btn>
                            <v-btn class="backBtn"
                                color="#fff"
                                round
                            >
                                <i class="fas fa-pen" style="margin-right:5px"></i>
                                Edit
                            </v-btn>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                            >
                                Confirm
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
        </v-window>
        
    </v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/ContractComponents/DatePicker.vue"
import changeDigitToText from '../../mixins/money'
import sourceItems from '../../mixins/source_items'
import contractItems from './utils/contract_items'

export default {
  name: "new-contract",
  components: {
    DatePicker,
  },
  data() {
    return {
      step: 1,
      newCustomer: true,
      valid1: true,
      valid2: true,
      valid3: true,
      nameInput: '',
      emailInput: '',
      phone1Input: '',
      phone2Input: '',
      dobInput: '',
      NationalIDInput: '',
      addressInput: '',
      districtInput:'',
      districtItems: ['Quận 1', 'Quận 2', 'Quận 3'],
      cityInput: '',
      cityItems: ['Tp.HCM', 'Hà Nội'],
      sourceInput: '',
      sourceItems: sourceItems,
      noteInput: '',
      assetInput: '',
      expectedAmountInput: '',
      assetTypeInput: '',
      assetTypeItems: [],
      validatorAmount1Input: '',
      validatorAmount2Input: '',
      pawnAmountInput: '',
      contractIDInput: '',
      receivedAmountInput: '',
      packageInput: '',
      packageItems: ['1 Tuần', '1 Tháng', '1 Tháng - Ưu đãi', 'Flexi'],
      expirationDateInput: '',
      roundingInput : '',
      openingDateInput: '',
      costInput: '',
      owedInput: '',
      pawnPriceInput: '',
      interestMoneyInput: '',
      warehousingFeeCheck: false,
      warehousingFeeInput: '',
      appraisalFeeCheck: false,
      appraisalFeeInput: '',
      notaryFeeCheck: false,
      notaryFeeInput: '',
      anotherFeeCheck: false,
      anotherFeeInput: '',
      methodInput: 'Tiền mặt',
      bankInput: '',
      bankItems: ['Không', 'ACB', 'Maritimebank', 'Sacombank', 'OCB', 'thêm...'],
      accountNumberInput: '',
      bankBranchInput: '',
    }
  },
  mounted() {
    this.getSAssetList()
  },
  computed: {
    ...mapGetters({
        SAssetListResult: 'asset/SAssetListResult',
    }),
    oldCustomer: {
        get() {return !this.newCustomer},
        set(value) {this.newCustomer = !value}
    },
    expectedAmountHint() {
      return changeDigitToText(this.expectedAmountInput)
    },
    validatorAmount1Hint() {
        return changeDigitToText(this.validatorAmount1Input)
    },
    validatorAmount2Hint() {
        return changeDigitToText(this.validatorAmount2Input)
    },
    pawnAmountHint() {
        return changeDigitToText(this.pawnAmountInput)
    },
    contractTypeItems() {
        const types = []
        for (let key in contractItems) {
            types.push(contractItems[key].vi)
        }
        return types
    },
    receivedAmountHint() {
        return changeDigitToText(this.receivedAmountInput)
    },
    feeInput() {
        try {
            const warehousingFee = this.warehousingFeeCheck ? Number.parseInt(this.warehousingFeeInput) || 0 : 0
            const appraisalFee = this.appraisalFeeCheck ? Number.parseInt(this.appraisalFeeInput) || 0 : 0
            const notaryFee = this.notaryFeeCheck ? Number.parseInt(this.notaryFeeInput) || 0 : 0
            const anotherFee = this.anotherFeeCheck ? Number.parseInt(this.anotherFeeInput) || 0 : 0
            return warehousingFee + appraisalFee + notaryFee + anotherFee
        } catch (error) {
            return ''
        }
    }
  },
  watch: {
    //When finish call API get SAsset, Update assetTypeItems
    SAssetListResult() {
      const asset = []
      for (let item of this.SAssetListResult) {
        asset.push(item.description)
      }
      this.assetTypeItems = asset
    },
  },
  methods: {
    ...mapActions({
        getSAssetList: 'asset/getSAssetList',
    }),
    cancleHandle() {
        this.$router.back();
    }
  }
}
</script>
<style scoped>
.background {
    background-color: #F0F0F7;
}
.step {
    padding-top: 0px;
}
.title {
    padding-top: 20px;
    padding-left: 16px;
}
.padding {
    padding-left: 95px;
    padding-right: 95px;
    background-color: #ffffff;
    border-style: solid;
}
.form {
    background-color: #ffffff;
    border-style: solid;
}
.backBtn {
  color: #dd1e26 !important;
}
.nextBtn {
  color: #ffff !important;
}
.cancelBtn {
  color: #fff !important;
}
</style>