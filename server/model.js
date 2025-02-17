const model = {
    // We support returning promises.
    getAccessToken: function() {
      return new Promise('works!');
    },
  
    // Or sync-style values
    getAuthorizationCode: function() {
      return 'works!'
    },
  
    // Or, using generators.
    getClient: function*() {
      yield somethingAsync();
      return 'works!';
    },
  
    // Or, async/wait (using Babel).
    getUser: async function() {
      await somethingAsync();
      return 'works!';
    }
  };
  
  const OAuth2Server = require('@node-oauth/oauth2-server');
  let oauth = new OAuth2Server({model: model});