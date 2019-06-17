import { CurrentBranchService } from '../../../../services/storage.service';

export default  {
    //Current Branch
    currentBranch: CurrentBranchService.getCurrentBranchName(),
    currentBranchID: CurrentBranchService.getCurrentBranchID(),
    //For Branch API
    branchListRequest: false,
    branchListResult: [],
    branchListErrorCode: 0,
    branchListError: '',
}