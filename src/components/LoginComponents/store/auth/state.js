import { TokenService, ProfileService } from '../../../../services/storage.service'

let profile = ProfileService.getProfile()

export default  {
    authenticating: false,
    accessToken: TokenService.getToken(),
    name: profile ? profile.name : null,
    branch: profile ? profile.branch : null,
    refreshTokenPromise: null, // Holds the promise of the refresh token
    authenticationErrorCode: 0,
    authenticationError: ''
}