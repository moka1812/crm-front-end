import { ProfileService } from '../../../../services/storage.service';

export default  {
    current_branch: ProfileService.getBranch()
}