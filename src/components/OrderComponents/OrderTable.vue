<template>
    <div class="table-content">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" v-for="headName in headNames" :key="headName">{{headName}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">3152</th>
                    <td>16/5/2018</td>
                    <td>@17/5/2018</td>
                    <td>Hồng</td>
                    <td>Moving</td>
                    <td>Tuyết Hoa</td>
                    <td>+84123456789</td>
                    <td>Bike</td>
                    <td>
                        <div class="back-check" style="display: inline;">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="back-cancel" style="display: inline;">
                            <i class="fas fa-times"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// @ is an alias to /src
let headNames = [
    "ORDER ID",
    "CREATED DATE",
    "LAST MODIFY",
    "AGENT",
    "STATUS",
    "NAME",
    "PHONE",
    "ASSET",
    "ACTION"
]

export default {
  name: "order-table",
  data() {
    return {
      headNames: headNames
    }
  }
}
</script>

<style scoped>
.table {
  background-color: #fff;
}

.back-check {
  background-color: #e1f3e5;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-check i {
  font-size: 15px;
  padding: 0px 0px 0 5px;
  color: #157f1f;
}

.back-cancel {
  background-color: #F9D9DA;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-cancel i {
  font-size: 15px;
  padding: 0px 7px 0 7px;
  color: #DD1E26;
}

.back-phone {
  background-color: #C0E4FB;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-phone i {
  font-size: 15px;
  padding: 0 3px 0 5px;
  color: #0197F6;
}
</style>