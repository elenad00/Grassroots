const neededData = {
    session:{
      jwt: data.sessionJwt,
      expires: data.sessionExpiration
    },
    user:{
      firstSeen: data.firstSeen,
      userEmail: data.user.email,
      username: data.user.name,
      picture: data.user.picture,
      verification:{
        status: data.user.status,
        email: data.user.verifiedEmail,
        phone: data.user.verifiedPhone
      }
    }
  }