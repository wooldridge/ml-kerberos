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

TODO

1. Set up your Kerberos configuration file (e.g., /etc/krb5.conf) and create the credentials cache (e.g., kinit [user]).

2. In the MarkLogic Admin UI, set up external security. Go to Security > External Security:
   ```
   Name:           mykerberos
   Authentication: kerberos
   Authorization:  internal
   ```
3. In the MarkLogic Admin UI, set up an external user. Go to Security > Users:
   ```
   user name:     user1
   password:      user1
   external name: test1@MLTEST1.LOCAL
   ```
4. Copy config_sample to config.js and edit /PATH/TO, USERNAME, PASSWORD, and EXTERNAL values. (Use the Name from step 2 for the EXTERNAL value.)

5. Run the following to create a Kerberos-enabled HTTP app server on MarkLogic:
   ```
   node setup.js
   ```
6. On the Kerberos-enabled HTTP server, copy the services.keytab file to the MarkLogic data directory.

7. Run a script to test, e.g.:
   ```
   node kerberos-test.js
   ```
