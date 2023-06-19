# PlutoLedger

PlutoLedger is an electron application, written in TypeScript, made to deal with the splitting of tips based on amount of hours worked. Currently in development.

## Installation
The build code is not included in the repository, before running the project please ensure that you have built the most recent version using
```bash
npx tsc
```

## Development tools
This project has some development tools incorporated into the package.json file

### Start the project

```bash
npm start
## electron ./build/index.js
```
This will run the electron window on the current build

### Compile current build
```bash
npm run build
### npx tsc
```
This will transpile any code within the "./src" folder, all transpiled code will appear in "./dist"

### Watch
```bash
npm run watch
## npx nodemon
```
This will use node package nodemon to watch for any changes made to .ts, .js, .html & .css files and restart the electron application upon any changes. 
To see the commands this runs please check nodemon.json

## License

[MIT](https://choosealicense.com/licenses/mit/)