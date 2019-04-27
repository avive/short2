# Shirley Shor Art Token Project

Output: [https://shirleyshor.studio](https://shirleyshor.studio)

Includes contracts, migrations, tests, user interface, and webpack build pipeline.

## Installation

First ensure you are in a new and empty directory.

1. Install Truffle globally
    ```javascript
    npm install -g truffle
    ```

2. Run the development console
    ```javascript
    truffle develop
    ```

3. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    test
    compile
    migrate
    ```

4. In the `app` directory, we build and run our frontend. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd app
    yarn install
    yarn dev
    ```

5. To build the application for production, use the build script in the `app` folder. A production build will be in the `app/dist` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    yarn build
    ```

## FAQ

* __Where is my production build?__

    The production build will be in the `app/dist` folder after running `yarn build` in the `app` folder.
