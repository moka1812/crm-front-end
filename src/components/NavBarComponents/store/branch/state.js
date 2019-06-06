import { ProfileService } from '../../../../services/storage.service';

export default  {
    //Current Branch
    currentBranch: ProfileService.getBranch(),
    currentBranchID: ProfileService.getBranchID(),
    //For Branch API
    branchListRequest: false,
    branchListResult: [],
    branchListErrorCode: 0,
    branchListError: '',
}