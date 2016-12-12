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

1. On the client, install the Kerberos configuration file (i.e., `/etc/krb5.conf`).

2. On the client, create the credentials cache for the external name using kinit (e.g., `kinit test1@MLTEST1.LOCAL`).

3. Copy the `services.keytab` file to the MarkLogic data directory.

4. In the MarkLogic Admin UI, set up external security. Go to Security > External Security:
   ```
   Name:                            mykerberos
   Authentication:                  kerberos
   Authorization:                   internal
   SSL Require Client Certificate:  false
   ```
5. In the ml-kerberos root directory, copy config_sample.js to config.js and edit the USERNAME, PASSWORD, and EXTNAME values in config.js. (EXTNAME will be something like `test1@MLTEST1.LOCAL`.)

6. In the ml-kerberos root directory, run the following:
   ```
   node setup.js
   ```
   This will configure MarkLogic for using Kerberos, including:

   - creating a MarkLogic database, `ml-kerberos`
   - creating a REST server for that database, `ml-kerberos-rest`
   - creating a user `user1` with an external name
   - configuring the REST server to require Kerberos authentication

7. In the ml-kerberos root directory, run the following script to test:
   ```
   node kerberos-test.js
   ```
8. To remove the REST server, database, and user, run from the ml-kerberos root directory:

   ```
   node teardown.js
   ```
