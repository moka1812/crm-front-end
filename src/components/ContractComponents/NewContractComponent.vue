<template>
    <v-container fluid class="pa-0 ma-2">
        <v-layout row>
            <v-flex md5 class="title">
                <h2 v-show="step==1">New Contract - Customer Info</h2>
                <h2 v-show="step==2">New Contract - Asset Info</h2>
                <h2 v-show="step==3">New Contract - Contract Info</h2>
                <h2 v-show="step==4">New Contract - Confirmation</h2>
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

        <v-window v-if="!contract" v-model="step">
            <v-window-item :value="1" class="padding">
                <v-form v-model="valid1">
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="firstNameInput"
                                    label="Họ*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="lastNameInput"
                                    label="Tên*"
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
                                        v => /\s|[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
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
                                    label="CMND/HC*"
                                >
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
                                :diasbled="!valid1"
                                round
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="2" class="padding">
                <v-form v-model="valid2" v-show="!isAuthorizedForm">
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
                                    v-model="validatorAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá thẩm định"
                                    :hint="this.validatorAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-textarea
                                    v-model.lazy="accessoryInput"
                                    label="Phụ Kiện"
                                    rows="1"
                                    auto-grow
                                    >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="pawnAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm"
                                    :hint="pawnAmountHint"
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
                                @click="AssetNextHandle"
                                round
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <v-form v-model="authorizedValid" v-show="isAuthorizedForm">
                    <v-container>
                        <template v-if="authorizedType==='Bike/Car'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="labelInput"
                                        label="Nhãn hiệu"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleStreamInput"
                                        label="Dòng xe"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="chassisNumberInput"
                                        label="Số khung"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="colorInput"
                                        label="Màu sơn"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleIDInput"
                                        label="Số máy"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="licensePlateInput"
                                        label="Biển số đăng ký"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </template>
                        <template v-else-if="authorizedType==='Realestate'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="customer1Input"
                                        label="Khách hàng 1"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="nationalID1Input"
                                        label="CMND/HC 1"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="customer2Input"
                                        label="Khách hàng 2"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="nationalID2Input"
                                        label="CMND/HC 2"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="landUseRightsCertificateIDInput"
                                        label="Số sổ"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="parcelIDInput"
                                        label="Thửa đất số"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="mapNoInput"
                                        label="Tờ bản đồ số"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="acreageInput"
                                        label="Diện tích"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-textarea
                                v-model.lazy="landAddressInput"
                                label="Địa chỉ"
                                rows="1"
                                auto-grow
                            >
                            </v-textarea>
                        </template>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn 
                                class="backBtn"
                                color="#fff"
                                @click="isAuthorizedForm=false"
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
                                    label="Mã HĐ"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <date-picker v-model="openingDateInput" label="Ngày mở hợp đồng*"/>
                            </v-flex>
                            <v-flex sm4>
                                
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
                                <v-text-field
                                    v-model="expirationDateInput"
                                    label="Ngày hết hạn hợp đồng"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestRateInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                        ]"
                                    label="Lãi suất*"
                                    :disabled="interestRateDisabled"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="pawnAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm*"
                                    :hint="pawnAmountHint"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="roundingInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Khoản làm tròn"
                                    readonly
                                    :hint="roundingHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="costInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Gốc*"
                                    :hint="costHint"
                                    required
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="warehousingFeeInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Phí kho bãi"
                                    :hint="warehousingFeeHint"
                                >
                                </v-text-field>
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
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestMoneyInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    :hint="interestMoneyHint"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="receivedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tiền nhận được"
                                    :hint="this.receivedAmountHint"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="bankInput"
                                    :items="bankItems"
                                    label="Ngân hàng"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="accountNumberInput"
                                    :style="{'margin-left': '5px'}"
                                    :rules="[
                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tài khoản"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm8>
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
                    <center><p class="title-form">Customer Info</p></center>
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="firstNameInput"
                                    label="Họ*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="lastNameInput"
                                    label="Tên*"
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
                                        v => /^-?[0-9]{10,13}?$/.test(v) || 'Dữ liệu không hợp lệ'
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
                    <center><p class="title-form">Asset Info</p></center>
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
                            <v-flex sm1 :style="{'padding-left': '0px'}">
                                <v-btn flat icon color="#000000" :style="{'margin-left': '0px', 'margin-bottom': '0px'}">
                                    <v-icon>description</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="validatorAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá thẩm định"
                                    :hint="this.validatorAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-textarea
                                    v-model.lazy="accessoryInput"
                                    label="Phụ Kiện"
                                    rows="1"
                                    auto-grow
                                    >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="pawnAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm"
                                    :hint="pawnAmountHint"
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
                    <center><p class="title-form">Contract Info</p></center>
                    <v-container>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="contractIDInput"
                                    label="Mã HĐ"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <date-picker v-model="openingDateInput" label="Ngày mở hợp đồng*"/>
                            </v-flex>
                            <v-flex sm4>
                                
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
                                <v-text-field
                                    v-model="expirationDateInput"
                                    label="Ngày hết hạn hợp đồng"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                               
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestRateInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            
                                        ]"
                                    label="Lãi suất*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="pawnAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm*"
                                    required
                                    :hint="pawnAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="roundingInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Khoản làm tròn"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="costInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Gốc*"
                                    :hint="costHint"
                                    readonly
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="warehousingFeeInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Phí kho bãi"
                                    :hint="warehousingFeeHint"
                                >
                                </v-text-field>
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
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestMoneyInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    :hint="interestMoneyHint"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="receivedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tiền nhận được"
                                    :hint="this.receivedAmountHint"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="bankInput"
                                    :items="bankItems"
                                    label="Ngân hàng"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="accountNumberInput"
                                    :style="{'margin-left': '5px'}"
                                    :rules="[
                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tài khoản"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm8>
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
        <v-container v-else>

        </v-container>
    </v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/ContractComponents/DatePicker.vue"
import changeDigitToText from '../../mixins/money'
import sourceItems from '../../mixins/source_items'
import contractItems from './utils/contract_items'
import cityItems from './utils/city_items'
import moment from 'moment'
import {getCost, getRoundFee} from './utils/caculate'

const has = Object.prototype.hasOwnProperty

export default {
  name: "new-contract",
  components: {
    DatePicker,
  },
  data() {
    return {
      step: 1,
      valid1: false,
      valid2: true,
      valid3: true,
      authorizedValid: true,
      firstNameInput: '',
      lastNameInput: '',
      phone1Input: '',
      phone2Input: '',
      dobInput: '',
      NationalIDInput: '',
      addressInput: '',
      districtInput:'',
      cityInput: Object.keys(cityItems)[0],
      cityItems: Object.keys(cityItems),
      sourceInput: '',
      sourceItems: sourceItems,
      noteInput: '',
      assetInput: '',
      expectedAmountInput: '',
      assetTypeInput: '',
      assetTypeItems: [],
      validatorAmountInput: '',
      accessoryInput: '',
      pawnAmountInput: '',
      authorizedType: 'normal',
      isAuthorizedForm: false,
      labelInput: '',
      vehicleStreamInput: '',
      chassisNumberInput: '',
      colorInput: '',
      vehicleIDInput: '',
      licensePlateInput: '',
      customer1Input: '',
      nationalID1Input: '',
      customer2Input: '',
      nationalID2Input: '',
      landUseRightsCertificateIDInput: '',
      parcelIDInput: '',
      mapNoInput: '',
      acreageInput: '',
      landAddressInput: '',
      packageInput: '',
      expirationDateInput: '',
      roundingInput : '',
      contractIDInput: '',
      openingDateInput: moment().format("DD/MM/YYYY"),
      costInput: '',
      interestRateInput: '',
      interestRateDisabled: true,
      interestMoneyInput: '',
      warehousingFeeInput: 0,
      methodInput: 'Tiền mặt',
      bankInput: '',
      bankItems: ['Không', 'ACB', 'Maritimebank', 'Sacombank', 'OCB', 'thêm...'],
      accountNumberInput: '',
      bankBranchInput: '',
      contract: false,
    }
  },
  beforeCreate() {
    if (!has.call(this.$route.params, 'orderDetail')) {
      this.$router.push({name: 'homepage'})
    }
  },
  mounted() {
    this.getSAssetList()
    try {
      this.phone1Input = this.$route.params.orderDetail.phone
      this.lastNameInput = this.$route.params.orderDetail.name
      this.expectedAmountInput = this.$route.params.orderDetail.expectedAmount
      this.validatorAmountInput = this.$route.params.orderDetail.validatorAmount
      this.assetTypeInput = this.$route.params.orderDetail.assetType
      this.assetInput = this.$route.params.orderDetail.asset
      this.sourceInput = this.$route.params.orderDetail.source
      this.noteInput = this.$route.params.orderDetail.note
    } catch (error) {
        
    }
    this.getProduct()
  },
  computed: {
    ...mapGetters({
        SAssetListResult: 'asset/SAssetListResult',
        productListResult: 'product/productListResult',
    }),
    packageItems() {
        try {
            return Object.keys(this.productListResult)
        } catch (error) {
            return []
        }
    },
    districtItems() {
        try {
            return cityItems[this.cityInput]
        } catch (error) {
            return []
        }
    },
    expectedAmountHint() {
      return changeDigitToText(this.expectedAmountInput)
    },
    validatorAmountHint() {
        return changeDigitToText(this.validatorAmountInput)
    },
    pawnAmountHint() {
        return changeDigitToText(this.pawnAmountInput)
    },
    warehousingFeeHint() {
        return changeDigitToText(this.warehousingFeeInput)
    },
    roundingHint() {
        return changeDigitToText(this.roundingInput)
    },
    costHint() {
        return changeDigitToText(this.costInput)
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
    interestMoneyHint() {
        return changeDigitToText(this.interestMoneyInput)
    },
    receivedAmountInput() {
        try {
            return (this.costInput - this.warehousingFeeInput).toFixed(3)
        } catch (error) {
            return null
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
    packageInput() {
        this.interestRateInput = this.productListResult[this.packageInput].interestValue
        if (this.interestRateInput) {
            this.interestRateDisabled = true
        } else {
            this.interestRateDisabled = false
        }
    },
    pawnAmountInput() {
        this.changeCaculate()
    },
    interestRateInput() {
        this.changeCaculate()
    },
  },
  methods: {
    ...mapActions({
        getSAssetList: 'asset/getSAssetList',
        getProduct: 'product/getProduct',
    }),
    //Find asset from asset description
    findAssetNameType(assetType) {
      for (let item of this.SAssetListResult) {
        if (item.description === assetType) {
          return item.name
        }
      }
    },
    AssetNextHandle() {
        const name = this.findAssetNameType(this.assetTypeInput)
        if (name === 'Realestate') {
            this.authorizedType = name
        } else if (name === 'Bike' || name === 'Car' || name === 'Truck') {
            this.authorizedType = 'Bike/Car'
        }
        if (this.authorizedType === 'normal') {
            this.step++
        } else {
            this.isAuthorizedForm = true
        }
    },
    changeCaculate() {
        if (this.interestRateInput && this.pawnAmountInput) {
            const productName = this.productListResult[this.packageInput].productName
            this.costInput = getCost(this.pawnAmountInput, this.interestRateInput, productName)
            this.roundingInput = getRoundFee(this.pawnAmountInput, this.interestRateInput, productName)
            this.interestMoneyInput = (this.pawnAmountInput - this.costInput).toFixed(3)
        } else {
            this.costInput = 0
            this.roundingInput = 0
            this.interestMoneyInput = 0
        }
    },
    cancleHandle() {
        this.$router.back();
    },
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
}
.padding {
    padding-left: 95px;
    padding-right: 95px;
    background-color: #ffffff;
    border-style: solid;
}
.title-form {
    font-size: 28px;
    color: #43425D;
    text-decoration: underline;
    font-weight: bold;
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