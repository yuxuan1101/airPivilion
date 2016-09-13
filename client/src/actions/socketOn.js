/**
 * Created by yuxuan on 9/13/16.
 */
import socket from './socket'

export const OTHERS_LOGIN = "OTHERS_LOGIN";

export function othersLogin(obj) {
  return {
    type: OTHERS_LOGIN,
  }
}