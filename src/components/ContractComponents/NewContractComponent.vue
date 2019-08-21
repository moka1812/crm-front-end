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
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                    ]"
                                    :readonly="!newClient"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="lastNameInput"
                                    label="Tên*"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                    ]"
                                    :readonly="!newClient"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    label="Phone 1*"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                       v => /^null$|^\s*$|^[0-9]{10,13}?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 2"
                                    :readonly="!newClient"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <date-picker v-model="dobInput" label="DOB*" :readonly="!newClient"/>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="nationalIDInput"
                                    label="CMND/HC*"
                                    :readonly="!newClient"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-text-field
                            v-model.lazy="addressInput"
                            :rules="[
                                v => !!v || 'Yêu cầu cần có',
                            ]"
                            label="Địa chỉ*"
                            :readonly="!newClient"
                        >
                        </v-text-field>
                        <v-layout>
                            <v-flex sm7>
                            </v-flex>
                            <v-flex sm5>
                                <v-select
                                    v-model="sourceInput"
                                    :items="sourceItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Source"
                                    :readonly="!newClient"
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="districtInput"
                                    :items="districtItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Quận/Huyện"
                                    :readonly="!newClient"
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
                                    :readonly="!newClient"
                                >
                                </v-select>
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
                                    type="number"
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
                                    readonly
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
                                    type="number"
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
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm"
                                    :hint="approvedAmountHint"
                                    type="number"
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
                                    :readonly="true"
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
                                    type="number"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm*"
                                    :hint="approvedAmountHint"
                                    type="number"
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
                                    type="number"
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
                                    type="number"
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
                                    type="number"
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
                                    v-model="interestValueInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    :hint="interestValueHint"
                                    type="number"
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
                                    type="number"
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
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                    ]"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="lastNameInput"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                    ]"
                                    label="Tên*"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    label="Phone 1*"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^null$|^\s*$|^[0-9]{10,13}?$/.test(v) || 'Dữ liệu không hợp lệ'
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
                                    v-model.lazy="nationalIDInput"
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
                            label="Địa chỉ*"
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
                                    type="number"
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
                                    type="number"
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
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm"
                                    :hint="approvedAmountHint"
                                    type="number"
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
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá cầm*"
                                    required
                                    :hint="approvedAmountHint"
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
                                    type="number"
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
                                    type="number"
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
                                    type="number"
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
                                    v-model="interestValueInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    :hint="interestValueHint"
                                    type="number"
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
                                    type="number"
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
                                @click="createHandle"
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
      newClient: true,
      firstNameInput: '',
      lastNameInput: '',
      phone1Input: '',
      phone2Input: '',
      dobInput: '',
      nationalIDInput: '',
      addressInput: '',
      districtInput:'',
      cityInput: Object.keys(cityItems)[0],
      cityItems: Object.keys(cityItems),
      sourceInput: '',
      sourceItems: sourceItems,
      assetInput: '',
      expectedAmountInput: '',
      assetTypeInput: '',
      assetTypeItems: [],
      validatorAmountInput: '',
      accessoryInput: '',
      approvedAmountInput: '',
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
      interestValueInput: '',
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
      const phone = this.$route.params.orderDetail.phone
      this.searchClient({phone: phone}).then(() => {
          if (this.clientResult !== null) {
            this.newClient = false
            this.firstNameInput = this.clientResult.firstName
            this.lastNameInput = this.clientResult.lastName
            this.phone1Input = this.clientResult.primaryPhone
            this.phone2Input = this.clientResult.alternativePhone
            this.dobInput = this.clientResult.dateOfBirth
            this.nationalIDInput = this.clientResult.nationalId
            this.addressInput = this.clientResult.address
            this.districtInput = this.clientResult.district
            this.cityInput = this.clientResult.city
          } else {
            this.phone1Input = phone
            this.lastNameInput = this.$route.params.orderDetail.name
          }
      })

      this.expectedAmountInput = this.$route.params.orderDetail.expectedAmount
      this.validatorAmountInput = this.$route.params.orderDetail.validatorAmount
      this.assetTypeInput = this.$route.params.orderDetail.assetType
      this.sourceInput = this.$route.params.orderDetail.source

      const [asset, accessory] = this.$route.params.orderDetail.asset.split(' __ ')
      this.assetInput = asset
      this.accessoryInput = accessory == undefined ? '' : accessory
    } catch (error) {
        
    }
    this.getProduct()
  },
  computed: {
    ...mapGetters({
        SAssetListResult: 'asset/SAssetListResult',
        CAssetUpdatingResult: 'asset/CAssetUpdatingResult',
        CAssetUpdatingErrorCode: 'asset/CAssetUpdatingErrorCode',
        CAssetUpdatingError: 'asset/CAssetUpdatingError',
        productListResult: 'product/productListResult',
        clientResult: 'order/clientResult',
        clientCreatingRequest: 'client/clientCreatingRequest',
        clientCreatingResult: 'client/clientCreatingResult',
        clientCreatingErrorCode: 'client/clientCreatingErrorCode',
        clientCreatingError: 'client/clientCreatingError',
        contractCreatingRequest: 'contract/contractCreatingRequest',
        contractCreatingResult: 'contract/contractCreatingResult',
        contractCreatingErrorCode: 'contract/contractCreatingErrorCode',
        contractCreatingError: 'contract/contractCreatingError',
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
    approvedAmountHint() {
        return changeDigitToText(this.approvedAmountInput)
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
    interestValueHint() {
        return changeDigitToText(this.interestValueInput)
    },
    receivedAmountInput() {
        try {
            return (this.costInput - this.warehousingFeeInput).toFixed(3)
        } catch (error) {
            return null
        }
    },
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
        this.changeExpirationDate()
        if (this.interestRateInput) {
            this.interestRateDisabled = true
        } else {
            this.interestRateDisabled = false
        }
    },
    openingDateInput() {
        this.changeExpirationDate()
    },
    approvedAmountInput() {
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
        searchClient: 'order/searchClient',
        createClient: 'client/createClient',
        updateCAsset: 'asset/updateCAsset',
        createContract: 'contract/createContract',
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
        if (this.interestRateInput && this.approvedAmountInput) {
            const productName = this.productListResult[this.packageInput].productName
            this.costInput = String(getCost(this.approvedAmountInput, this.interestRateInput, productName))
            this.roundingInput = String(getRoundFee(this.approvedAmountInput, this.interestRateInput, productName))
            this.interestValueInput = String((this.approvedAmountInput - this.costInput).toFixed(3))
        } else {
            this.costInput = '0'
            this.roundingInput = '0'
            this.interestValueInput = '0'
        }
    },
    changeExpirationDate() {
        const repayEvery = this.productListResult[this.packageInput].repayEvery
        const openingDate = moment(this.openingDateInput, "DD/MM/YYYY")
        if (repayEvery === 30) {
            this.expirationDateInput = openingDate.add(1, 'M').format("DD/MM/YYYY")
        } else {
            this.expirationDateInput = openingDate.add(repayEvery, 'd').format("DD/MM/YYYY")
        }
    },
    cancleHandle() {
        this.$router.back();
    },
    getClient: async function() {

        if (this.newClient === true) {
            const data = {
                firstName: this.firstNameInput,
                lastName: this.lastNameInput,
                primaryPhone: this.phone1Input,
                alternativePhone: this.phone2Input,
                address: this.addressInput,
                district: this.districtInput,
                city: this.cityInput,
                DOB: this.dobInput,
                nationalID: this.nationalID,
            }
            await this.createClient(data)
            if (this.clientCreatingErrorCode === 201) {
                return this.clientCreatingResult.id
            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Error: "+this.clientCreatingErrorCode,
                    text: this.clientCreatingError,
                });
                return null
            }
        }
        return this.clientResult.id
    },
    updateAsset: async function() {
        const data = {}

        if (!/^null$|^\s*$/.test(this.accessoryInput)) {
            data['description'] = `${this.assetInput} __ ${this.accessoryInput}`
        } else {
            data['description'] =this.assetInput
        }
        await this.updateCAsset({
            id: this.$route.params.orderDetail.assetID,
            data: data,
        })
        if (this.CAssetUpdatingErrorCode == 200) {
            return true
        } else {
            this.$notify({
                group: 'foo',
                type: 'error',
                title: "Error: "+this.CAssetUpdatingErrorCode,
                text: this.CAssetUpdatingError,
            });
            return false
        }
    },
    createHandle: async function() {
        
        const promise1 = new Promise((resolve, reject) => {
            this.getClient().then(clientID => {
                resolve(clientID)
            })
        });

        const promise2 = new Promise((resolve, reject) => {
            this.updateAsset().then(assetUpdate => {
                resolve(assetUpdate)
            })
        });

        const [clientID, assetUpdate] = await Promise.all([promise1, promise2])

        if (clientID === null || assetUpdate === false) {
            return
        }

        const data = {
            orderID: this.$route.params.orderDetail.orderID,
            clientID: clientID,
            productID: this.productListResult[this.packageInput].id,
            expectedAmount: this.expectedAmountInput,
            marketAmount: this.marketAmount,
            validatorAmount: this.validatorAmountInput,
            approvedAmount: this.approvedAmountInput,
            interestRate: this.interestRateInput,
            warehousingFee: this.warehousingFeeInput,
            openingDate: moment(this.openingDateInput, "DD/MM/YYYY").format("YYYY-MM-DD"),
            expirationDate: moment(this.expirationDateInput, "DD/MM/YYYY").format("YYYY-MM-DD"),
        }

        this.createContract(data).then(() => {
            if (this.contractCreatingError == 201) {
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: "Tạo hợp đồng thành công",
                    text: ''
                });
            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Error: "+this.contractCreatingErrorCode,
                    text: this.contractCreatingError
                });
            }
        })
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