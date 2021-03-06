import { Auth, API } from 'aws-amplify'

export async function addUserToGroup(email: string, groupname: string) {
  try {
    await API.post('AdminQueries', '/addUserToGroup', {
      body: {
        username: email,
        groupname
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    })
  } catch {}
}

export async function removeUserFromGroup(email: string, groupname: string) {
  try {
    await API.post('AdminQueries', '/removeUserFromGroup', {
      body: {
        username: email,
        groupname
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    })
  } catch {}
}

export async function confirmUserSignUp(email: string) {
  try {
    await API.post('AdminQueries', '/confirmUserSignUp', {
      body: {
        username: email
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    })
  } catch {}
}
export async function disableUser(email: string) {
  try {
    await API.post('AdminQueries', '/disableUser', {
      body: {
        username: email
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    })
  } catch {}
}

export async function enableUser(email: string) {
  try {
    await API.post('AdminQueries', '/enableUser', {
      body: {
        username: email
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
    })
  } catch {}
}
