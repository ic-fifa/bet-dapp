const serverVars = {
    authUrl: '#{authUrl}#',
    apiUrl: '#{apiUrl}#',
  };
  
  const localVars = {
    authUrl: 'local_auth_url',
    apiUrl: 'local_api_url',
  
  };
  
  export function getConfiguration() {
    if (process.env.NODE_ENV === 'production') {
      return serverVars;
    }
  
    return localVars;
  }