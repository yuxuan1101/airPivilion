import { combineReducers } from 'redux'
import { SEND_CHATMESSAGE,SEND_SYSTEMMESSAGE,LOGIN,CHANGE_TO,OTHERS_LOGIN,OTHERS_LOGOUT} from './actions'
import { createStore } from 'redux';

function chatContent(state = [], action) {
    switch (action.type) {
        case SEND_CHATMESSAGE:
            return [
                ...state,
                {
                    system: false,
                    from: action.from,
                    to: action.to,
                    text: action.text
                }
            ]
        case SEND_SYSTEMMESSAGE:
            return [
                ...state,
                {
                    system: true,
                    text: action.text
                }
            ]
        case LOGIN:
        case OTHERS_LOGIN:
            return [
                ...state,
                {
                    system: true,
                    text: "用户 "+action.name+" 已登陆"
                }
            ]
        case OTHERS_LOGOUT:
            return [
                ...state,
                {
                    system: true,
                    text: "用户 "+action.name+" 已离线"
                }
            ]
        default:
            return state
    }
}

function inputBox(state = {from:"",to:"所有人"}, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({},state,{
                from: action.name
            });
        case CHANGE_TO:
            return Object.assign({}, state, {
                to: action.to
            });
        default:
            return state
    }
}

function userList(state = [{name:"所有人",status:false}],action) {
    switch (action.type) {
        case LOGIN:
        case OTHERS_LOGIN:
        case OTHERS_LOGOUT:
            return [
                {name:"所有人",status:false},
                ...action.users
            ]
        default:
            return state
    }
}

const chatReducer = combineReducers({
    chatContent,
    inputBox,
    userList
});
export let store = createStore(chatReducer);

export default chatReducer;