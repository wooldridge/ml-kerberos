# ml-kerberos

Kerberos for MarkLogic

## Requirements

- MarkLogic 8
- Node.js
- [MIT Kerberos](http://web.mit.edu/kerberos/dist/) software installed
- Kerberos Distribution Center installed

Also, the Node.js [kerberos library](https://www.npmjs.com/package/kerberos) requires the following:

- gcc and g++
- Python 2.7
- [node-gyp](https://github.com/nodejs/node-gyp)

Windows requires additional libraries. See the [kerberos documentation](https://www.npmjs.com/package/kerberos) for details.

## Setup

1. Set up your Kerberos configuration file (e.g., `/etc/krb5.conf`).

2. Create the credentials cache for the external name using kinit (e.g., `kinit test1@MLTEST1.LOCAL`).

3. Copy the `services.keytab` file to the MarkLogic data directory.

4. In the MarkLogic Admin UI, set up external security. Go to Security > External Security:
   ```
   Name:                            mykerberos
   Authentication:                  kerberos
   Authorization:                   internal
   SSL Require Client Certificate:  false
   ```
5. Copy config_sample to config.js and edit /PATH/TO, USERNAME, PASSWORD, and EXTNAME values. (EXTNAME will be something like `test1@MLTEST1.LOCAL`.)

6. Run the following:
   ```
   node setup.js
   ```
   This will:

   - create a MarkLogic database, `ml-kerberos`
   - create a REST server for that database, `ml-kerberos-rest`
   - create a user `user1` with an external name
   - configure the REST server to require Kerberos authentication

7. Run a script to test, e.g.:
   ```
   node kerberos-test.js
   ```
8. To remove the REST server, database, and user, run:
   ```
   node teardown.js
   ```
