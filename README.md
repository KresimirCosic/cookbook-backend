## **Important**

> The setup of this requires following of a certain procedure and naming convention, if you wish to change the names of certain directories, the changes should reflect in your `package.json` file as well.

# **express-typescript-boilerplate**

This is a repo that is hosting the backend portion of the stack I use. I am a fan of **ReactJS**, so I presume automatically this will be used in conjunction with it - it has been configured to use `create-react-app`'s `build` script; and eventually serve the static content via this backend application.

## Requirements

- [NodeJS](https://nodejs.org/en/)
- [openssl](https://www.openssl.org/)

> `openssl` is usually pre-installed on _Linux_, as I am using this to create a self-signed certificate to enable HTTPS protocol, I am unsure how this works on Mac or Windows

You may also install `create-react-app`, but with newer versions of `npm` and `node`, you have access to `npx` command which will actually run the commands and packages that are not installed (i.e. globally) on your machine, which makes things much easier as you don't have to install many different packages globally and automatically have bigger chances of conflicting versionings between developers.

A good example for using `npx` will be something we will use to setup the frontend part of this boilerplate:

```sh
$ npx create-react-app ./
```

## **Setup**

- Create a directory to hold the entire application (_backend_ and _frontend_):

```sh
$ mkdir my-app
$ cd my-app
```

- Make directories for backend and frontend (**naming is important** here as mentioned above - if you change the names of these two directories, make the changes reflect the `package.json` command scripts as well):

```sh
$ mkdir backend frontend
```

- Clone this repo into the _backend_ directory (since you are telling the command to use the _backend_ directory, it will not create a directory named `express-typescript-boilerplate` inside it, instead it will just clone the files into it, which is what we want):

```sh
$ git clone https://github.com/KresimirCosic/express-typescript-boilerplate ./backend
```

- Create a _ReactJS_ application via `npx`, using the _frontend_ directory as its container (possibly passing some flags if you want, _TypeScript_ for example, omit if you don't want it):

```sh
$ npx create-react-app ./frontend --typescript
```

- The basics have been set up. The next thing to do (with the _backend_ portion only) is to install the dependencies. Change into the _backend_ directory and type:

```sh
$ npm install
```

- This will install all the dependencies needed. Now you need to create a few files. The first thing is to create a `.env` file in the root of the _backend_ directory, this will hold some environment variables to connect to the _MySQL_ database; for example:

```sh
DB_NAME=databasename
DB_USER=databaseuser
DB_PASSWORD=databasepassword
```

> These should reflect the credentials that you use to log in your _MySQL_, I am using my `root` (not the _Linux OS_, but the _MySQL_ `root` user) user credentials to log in.

### _The project structure should look like this now:_

```sh
my-app/
  frontend/
  backend/
    config/
    src/
      ssl/
        options.ts
      utils/
        startup.util.ts
      index.ts
    .gitignore
    .env
    package.json
    package-lock.json
    tsconfig.json
    README.md
```

> Most has been set up. Now the last thing to do is to create the certificate and key to enable _HTTPS_ protocol during production phase, which will serve the static content built from `create-react-app` via _SSL_/_TLS_ on the same protocol, hostname and port; this is all important to remove _CORS_ issues.

- Now to wrap up the setup, navigate to `my-app/backend/src/ssl/` and create the certificate and key by first creating a `req.cnf` file with this information:

```sh
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no
[req_distinguished_name]
C = HR
ST = .
L = Tenja
O = .
OU = .
CN = www.localhost.com
[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[alt_names]
DNS.1 = www.localhost.com
DNS.2 = localhost.com
DNS.3 = localhost
```

> I would change only the `C = HR` and `L = Tenja` parts, but don't believe it's too necessary, since it's just irrelevant information - I entered my country and city name. The way to create these has been found on this [Stack Overflow issue](https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node).

- Now (while inside the `my-app/backend/src/ssl/`) directory, use this command to create the certificate and key:

```sh
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256
```

## **Usage**

There are two basic usages; either in _development_ or _production_ phase. During _development_, you are probably going to use `create-react-app`'s `start` script (with `HTTPS=true` forced while being served). This will host the app on a different port (default I believe is _3000_). The _backend_ portion will be hosted on `http://localhost:8080`, while the `CRA` will open the app on `https://localhost:3000`.

### **development**

To start the _backend_ in _development_ environment, use this command:

```sh
$ npm run serve:dev
```

> This will build the files with `webpack`, create a `dev` directory in the _backend_ directory root, and start up the server through the file that has been created in the `dev` directory. There is a `devtool` enabled to make debugging easier. The server is being watched with `webpack`'s `--watch` flag, and restarted via `nodemon` whenever files have been saved.

### **production**

To start the _backend_ in _production_ environment, use this command:

```sh
$ npm run serve:prod
```

> This will build the _backend_ files, minify them and disable any `devtool` to reduce the file size. This will also build the `create-react-app`'s files via `CRA`'s `build` script command, copy those files over to a directory named `static`, copy the certificate and key files from the `src` directory into `static` directory as well, and start up the server. The static files will be served through _SSL_/_TLS_ to enable better development with things like cookie sessions that require secure flags and similar.

## **TO DOs**

- Make the console logs prettier and easier to read via [chalk](https://www.npmjs.com/package/chalk) package
- Re-configure the _development_ phase if necessary. There still might be issues sending the cookies since the _backend_ is on regular _HTTP_ protocol. The production phase should be good to go, just start it up and open up the link listed in the console - `https://localhost:8443`
