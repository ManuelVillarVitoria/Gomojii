//! importing necessary files and/or libraries
import { retrieveFrom } from '../../config'
import axios from 'axios'
import { signupUser, loginUser, logoutUser, checkIfUserAlreadyLoggedIn } from '../manageAuthReducer'

//todo: returns my endpoint urls from my config file
//todo: After retrieving the endpoints and access key, I pick them out using destructuring 
const { baseUrl, loggedIn, registrations, sessions, logout } = retrieveFrom.backendServerEndpoints
const { email, username, password } = retrieveFrom.userAttributes

export const validateSession = () => {
     //todo: funtion returned in enhanced thunk action creator 
     //todo: Checking if user is logged in
     return async dispatch => {
          const loggedInPath = baseUrl + loggedIn
          const response = await axios
               .get(
                    loggedInPath,
                    { withCredentials: true }
               )
          const user = response.data
          if (user) dispatch(checkIfUserAlreadyLoggedIn(user))
     }
}

export const createNewUser = () => {
     //todo: funtion returned in enhanced thunk action creator 
     //todo: Creating a user after a successful fetch
     return async dispatch => {
          const signupPath = baseUrl + registrations
          const response = await axios
               .post(
                    signupPath,
                    { email, username, password },
                    { withCredentials: true }
               )
          const user = response.data
          dispatch(signupUser(user))
     }
}

export const getExistingUser = () => {
     //todo: funtion returned in enhanced thunk action creator 
     //todo: Retrieving existing user after successful fetch
     return async dispatch => {
          const loginPath = baseUrl + sessions
          const response = await axios
               .post(
                    loginPath,
                    { email, password },
                    { withCredentials: true }
               )
          const user = response.data
          dispatch(loginUser(user))
     }
}

export const endUsersSession = () => {
     //todo: funtion returned in enhanced thunk action creator 
     //todo: Creating delete request to logout a user
     return async dispatch => {
          const logoutPath = baseUrl + logout
          await axios
               .delete(
                    logoutPath,
                    { withCredentials: true }
               )
          dispatch(logoutUser())
     }
}