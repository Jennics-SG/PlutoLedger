# PlutoLedger

PlutoLedger is an electron application, written in TypeScript, made to deal with the splitting of tips based on amount of hours worked. Currently in development.

## Installation


## Development tools
This project has some development tools incorporated into the package.json file

### Start the project

```bash
npm start
```
This will run the electron window on the current build

### Compile current build
```bash
npx tsc
```
This will transpile any code within the "./src" folder, all transpiled code will appear in "./dist"

### Watch
```bash
npm run watch
```
This will use node package nodemon to watch for any changes made to .ts, .js, .html & .css files and restart the electron application upon any changes.

## License

[MIT](https://choosealicense.com/licenses/mit/)