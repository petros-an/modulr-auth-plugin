To install:

- find your insomnia plugins directory by going to Preferences->Plugins->Reveal directory

- place the insomnia-plugin-modulr-auth there

- npm install inside the folder


To use:

- create an environment that includes the environment variables 'api_key' and 'hmac_secret' with the relevant values

The plugin will add the correct authentication headers to the request.
The nonce value is currently a unique uuid.
