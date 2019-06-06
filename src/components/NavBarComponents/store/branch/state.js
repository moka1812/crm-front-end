import { ProfileService } from '../../../../services/storage.service';

export default  {
    currentBranch: ProfileService.getBranch(),
    //For Branch API
    branchListRequest: false,
    branchListResult: null,
    branchListErrorCode: 0,
    branchListError: '',
}