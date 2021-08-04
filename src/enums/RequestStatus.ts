/* eslint no-unused-vars: 0 */

export enum RequestStatus {
  INIT = 'INIT',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  IDLE = 'IDLE',
  SUCCEED = 'SUCCEED',
  FAILED400 = 'Request failed with status code 400',
  ERROR500 = 'Request failed with status code 500',
}
