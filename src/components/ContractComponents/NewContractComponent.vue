<template>
    <v-container fluid class="pa-0 ma-2">
        <h2 v-if="contract">Kiểm Tra Hợp Đồng</h2>
        <v-layout v-else row>
            <v-flex md5 class="title">
                <h2 v-show="step==1">Hợp Đồng Mới - Thông Tin KH</h2>
                <h2 v-show="step==2 && !isAuthorizedForm">Hợp Đồng Mới - Thông Tin Tài Sản</h2>
                <h2 v-show="step==2 && isAuthorizedForm">
                    Hợp Đồng Mới - 
                    <template v-if="authorizedType==='Bike/Car'">Giấy Uỷ Quyền</template>
                    <template v-else-if="authorizedType==='Realestate'">Hợp Đồng Mua Bán</template>
                </h2>
                <h2 v-show="step==3">Hợp Đồng Mới - Thông Tin HĐ</h2>
                <h2 v-show="step==4">Hợp Đồng Mới - Xác Nhận</h2>
                <h2 v-show="step==5">Hợp Đồng Mới - Hoàn Thành</h2>
            </v-flex>
            <v-flex md7 v-show="!contract">
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
                                    hint="Ví dụ: Phạm"
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
                                    hint="Ví dụ: Lê David"
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
                                <date-picker 
                                    v-model="dobInput" 
                                    label="Ngày Sinh*" 
                                    :readonly="!newClient"
                                    :rules="dobRules"
                                />
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="nationalIDInput"
                                    label="CMND/HC*"
                                    :readonly="!newClient"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-text-field
                            v-model.lazy="addressInput"
                            :rules="[v => !!v || 'Yều cầu cần có']"
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
                                    :disabled="true"
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
                                    :disabled="!newClient"
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
                                    :disabled="!newClient"
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
                                :disabled="!valid1"
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
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > validatorAmountInput) {
                                                    return 'Không được lớn hơn giá thẩm định'
                                                }
                                                return true
                                            },
                                        ]"
                                    label="Giá cầm"
                                    :hint="approvedAmountHint"
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
                                :disabled="!valid2"
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
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleTypeInput"
                                        label="Dòng xe"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="chassisNumberInput"
                                        label="Số khung"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="colorInput"
                                        label="Màu sơn"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleIDInput"
                                        label="Số máy"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="licensePlateInput"
                                        label="Biển số đăng ký"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </template>
                        <template v-else-if="authorizedType==='Realestate'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="customer2Input"
                                        label="Khách hàng 2"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="nationalID2Input"
                                        label="CMND/HC 2"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
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
                                :disabled="!authorizedValid"
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
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > validatorAmountInput) {
                                                    return 'Không được lớn hơn giá thẩm định'
                                                }
                                                return true
                                            },
                                        ]"
                                    label="Giá cầm*"
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
                                    v-model="interestValueInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    :hint="interestValueHint"
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
                                :disabled="!valid3"
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="4">
                <v-form v-model="valid1" class="form">
                    <center><p class="title-form">Thông Tin Khách Hàng</p></center>
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="firstNameInput"
                                    label="Họ*"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                    ]"
                                    :readonly="newClient ? !edit1 : true "
                                    hint="Ví dụ: Phạm"
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
                                    :readonly="newClient ? !edit1 : true "
                                    hint="Ví dụ: Lê David"
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
                                    :readonly="newClient ? !edit1 : true "
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <date-picker 
                                    v-model="dobInput" 
                                    label="Ngày Sinh*" 
                                    :readonly="newClient ? !edit1 : true "
                                    :rules="dobRules"
                                />
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="nationalIDInput"
                                    label="CMND/HC*"
                                    :readonly="newClient ? !edit1 : true "
                                    :rules="[v => !!v || 'Yều cầu cần có']"
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
                            :readonly="newClient ? !edit1 : true "
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
                                    :disabled="true"
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
                                    :disabled="newClient ? !edit1 : true "
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
                                    :disabled="newClient ? !edit1 : true "
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit2 && !editAuthorized && !edit3"
                        >
                            <v-dialog
                                v-model="dialog1"
                                width="300"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        class="backBtn"
                                        color="#fff"
                                        round
                                        v-on="on"
                                        v-show="!edit1"
                                    >
                                        <i class="fas fa-pen" style="margin-right:5px"></i>
                                        Edit
                                    </v-btn>
                                </template>

                                <v-card class="pa-4">
                                    <center>
                                        <strong>Xác nhận chỉnh sửa hợp đồng</strong>
                                    </center>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn
                                            class="yesBtn"
                                            color="#157F1F"
                                            round
                                            @click="edit1=true; dialog1=false"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            class="backBtn"
                                            color="#fff"
                                            round
                                            @click="dialog1=false"
                                        >
                                            No
                                        </v-btn>
                                    </v-layout>
                                </v-card>
                            </v-dialog>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="edit1=false"
                                v-show="edit1"
                            >
                                Accept
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="valid2" class="form">
                    <center><p class="title-form">Thông Tin Tài Sản</p></center>
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
                                    :readonly="!edit2"
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
                                    :readonly="!edit2"
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
                                    :readonly="!edit2"
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
                                    :readonly="!edit2"
                                    >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > validatorAmountInput) {
                                                    return 'Không được lớn hơn giá thẩm định'
                                                }
                                                return true
                                            },
                                        ]"
                                    label="Giá cầm"
                                    :hint="approvedAmountHint"
                                    :readonly="!edit2"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit1 && !editAuthorized && !edit3"
                        >
                            <v-dialog
                                v-model="dialog2"
                                width="300"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        class="backBtn"
                                        color="#fff"
                                        round
                                        v-on="on"
                                        v-show="!edit2"
                                    >
                                        <i class="fas fa-pen" style="margin-right:5px"></i>
                                        Edit
                                    </v-btn>
                                </template>

                                <v-card class="pa-4">
                                    <center>
                                        <strong>Xác nhận chỉnh sửa hợp đồng</strong>
                                    </center>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn
                                            class="yesBtn"
                                            color="#157F1F"
                                            round
                                            @click="edit2=true; dialog2=false"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            class="backBtn"
                                            color="#fff"
                                            round
                                            @click="dialog2=false"
                                        >
                                            No
                                        </v-btn>
                                    </v-layout>
                                </v-card>
                            </v-dialog>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="edit2=false"
                                v-show="edit2"
                            >
                                Accept
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="authorizedValid" v-show="isAuthorizedForm" class="form">
                    <center>
                        <p class="title-form">
                            <template v-if="authorizedType==='Bike/Car'">Giấy Uỷ Quyền</template>
                            <template v-else-if="authorizedType==='Realestate'">Hợp Đồng Mua Bán</template>
                        </p>
                    </center>
                    <v-container>
                        <template v-if="authorizedType==='Bike/Car'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="labelInput"
                                        label="Nhãn hiệu"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleTypeInput"
                                        label="Dòng xe"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="chassisNumberInput"
                                        label="Số khung"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="colorInput"
                                        label="Màu sơn"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleIDInput"
                                        label="Số máy"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="licensePlateInput"
                                        label="Biển số đăng ký"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </template>
                        <template v-else-if="authorizedType==='Realestate'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="customer2Input"
                                        label="Khách hàng 2"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="nationalID2Input"
                                        label="CMND/HC 2"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </template>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit1 && !edit2 && !edit3"
                        >
                            <v-dialog
                                v-model="dialogAuthorized"
                                width="300"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        class="backBtn"
                                        color="#fff"
                                        round
                                        v-on="on"
                                        v-show="!editAuthorized"
                                    >
                                        <i class="fas fa-pen" style="margin-right:5px"></i>
                                        Edit
                                    </v-btn>
                                </template>

                                <v-card class="pa-4">
                                    <center>
                                        <strong>Xác nhận chỉnh sửa hợp đồng</strong>
                                    </center>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn
                                            class="yesBtn"
                                            color="#157F1F"
                                            round
                                            @click="editAuthorized=true; dialogAuthorized=false"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            class="backBtn"
                                            color="#fff"
                                            round
                                            @click="dialogAuthorized=false"
                                        >
                                            No
                                        </v-btn>
                                    </v-layout>
                                </v-card>
                            </v-dialog>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="editAuthorized=false"
                                v-show="editAuthorized"
                            >
                                Accept
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="valid3" class="form">
                    <center><p class="title-form">Thông Tin Hợp Đồng</p></center>
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
                                <date-picker v-model="openingDateInput" :readonly="!edit3" label="Ngày mở hợp đồng*"/>
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
                                    :readonly="!edit3"
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
                                    :readonly="!edit3"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > validatorAmountInput) {
                                                    return 'Không được lớn hơn giá thẩm định'
                                                }
                                                return true
                                            },
                                        ]"
                                    label="Giá cầm*"
                                    :hint="approvedAmountHint"
                                    :readonly="!edit3"
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
                                    :readonly="!edit3"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <label class="v-label theme--light"> Phương thức </label>
                                <v-radio-group v-model="methodInput" row :readonly="!edit3">
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
                                    :readonly="!edit3"
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
                                    :readonly="!edit3"
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
                                    :readonly="!edit3"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit1 && !edit2 && !editAuthorized"
                        >
                            <v-btn
                                class="cancelBtn"
                                color="#808495"
                                round
                                @click="cancleHandle"
                            >
                                Cancel
                            </v-btn>
                            <v-dialog
                                v-model="dialog3"
                                width="300"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        class="backBtn"
                                        color="#fff"
                                        round
                                        v-on="on"
                                        v-show="!edit3"
                                    >
                                        <i class="fas fa-pen" style="margin-right:5px"></i>
                                        Edit
                                    </v-btn>
                                </template>

                                <v-card class="pa-4">
                                    <center class="edit">
                                        <strong>Xác nhận chỉnh sửa hợp đồng</strong>
                                    </center>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn
                                            class="yesBtn"
                                            color="#157F1F"
                                            round
                                            @click="edit3=true; dialog3=false"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            class="backBtn"
                                            color="#fff"
                                            round
                                            @click="dialog3=false"
                                        >
                                            No
                                        </v-btn>
                                    </v-layout>
                                </v-card>
                            </v-dialog>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="edit3=false"
                                v-show="edit3"
                            >
                                Accept
                            </v-btn>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="contract=true"
                                :disabled="edit3"
                            >
                                Confirm
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="5">
                <v-card class="form">
                    <center>
                        <v-icon size="150" color="#157F1F">check_circle</v-icon>
                        <br/>
                        <strong class="content-success">HOÀN THÀNH HỢP ĐỒNG</strong>
                        <br/>
                        <v-btn class="nextBtn"
                            color="#dd1e26"
                            round
                            min-width="166"
                            min-height="51"
                            @click="cancleHandle"
                        >
                            Back
                        </v-btn>
                    </center>
                </v-card>
            </v-window-item>
        </v-window>
        <template v-else>
            <new-contract-preview
                :contractType="authorizedType"
                :transactionDate="openingDateInput"
                :customerName="`${firstNameInput} ${lastNameInput}`"
                :anotherCustomerName="customer2Input"
                :phoneNumber="phone1Input"
                :birthDay="dobInput"
                :nationalID="nationalIDInput"
                :anothernationalID="nationalID2Input"
                :address="`${addressInput}, ${districtInput}, ${cityInput}`"
                :asset="assetTypeInput"
                :description="assetInput"
                :accessory="accessoryInput"
                :approvedAmount="parseFloat(approvedAmountInput)"
                :date="expirationDateInput"
                :fee="parseFloat(interestRateInput) - 1.5"
                :receivedAmount="parseFloat(receivedAmountInput)"
                :interestMoneyHint="parseFloat(interestValueInput)"
                :productName="productListResult[packageInput].productName"
                :repayEvery="productListResult[packageInput].repayEvery"
                :vehicleID="vehicleIDInput"
                :chassisNumber="chassisNumberInput"
                :label="labelInput"
                :vehicleType="vehicleTypeInput"
                :color="colorInput"
                :licensePlate="licensePlateInput"
                :newClient="this.newClient"
                @back="contract=false" 
                @end="endHandle"
                @create="createHandle"
            />
        </template>
    </v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/ContractComponents/DatePicker.vue"
import NewContractPreview from "@/components/ContractComponents/NewContractPreview.vue"
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
    NewContractPreview,
  },
  data() {
    return {
      step: 1,
      valid1: false,
      valid2: true,
      valid3: true,
      edit1: false,
      edit2: false,
      edit3: false,
      editAuthorized: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialogAuthorized: false,
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
      vehicleTypeInput: '',
      chassisNumberInput: '',
      colorInput: '',
      vehicleIDInput: '',
      licensePlateInput: '',
      customer2Input: '',
      nationalID2Input: '',
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
      dobRules: [
            value => {
                if (value !== null) {
                    const date = moment(value, "DD/MM/YYYY", true)

                    if (date.isValid()) {
                        const currentDate = moment()
                        if (currentDate.diff(date, 'years') >= 15) {
                            return true
                        } else {
                            return 'Không đủ độ tuổi'
                        }
                    }

                    return 'Dữ liệu không hợp lệ'
                }
                return 'Yêu cầu cần có'
            }
        ]
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
        clientResult: 'client/clientResult',
        clientCreatingResult: 'client/clientCreatingResult',
        clientCreatingErrorCode: 'client/clientCreatingErrorCode',
        clientCreatingError: 'client/clientCreatingError',
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
        searchClient: 'client/searchClient',
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

            if (productName.includes('Prepaid Interest')) {
                this.interestValueInput = String((this.approvedAmountInput - this.costInput).toFixed(3))
            } else {
                const interestValue = Math.round(this.approvedAmountInput * 1000000 * this.interestRateInput / 100) / 1000000
                this.interestValueInput = String(interestValue.toFixed(3))
            }
             
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
                DOB: moment(this.dobInput, "DD/MM/YYYY").format("YYYY-MM-DD"),
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
            if (this.contractCreatingErrorCode === 201) {
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
    endHandle() {
        this.contract = false
        this.step ++
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
.yesBtn {
    color: #ffff !important;
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
.edit {
    font-size: 18px;
    color: #4D4F5C;
}
.content-success {
    color: #4D4F5C;
    font-size: 70px;
}
</style>