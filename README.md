# Simple CL

A simple lib for construction of command line interface - CLI. 
Compatibility with typescript 

## Instalation

```bash
npm install @caiorafael/simple-cl
```

## Usage

import lib

with typescript:

```typescript
import { CommandLine } from 'simple-cl'
```

with javascript:

```javascript
const { CommandLine } = rquire('simple-cl')
```

## Set cli's informations

```typescript
const args = process.argv.slice(2)

const command = new CommandLine()

commandLine
    .setName('cli-name')
    .setVersion('1.0.0')
    .setDescription('a new command line interface')

commandLine.parse(args)
```

From now on, it's possible to send some commands to your CLI, such as --help or -h to view the help text on your CLI, and --version or -v to view the CLI version.

## Add new command

To add new commands to your CLI, you can use the 'addCommand' function. Along with this function, you can also add its description using the 'setDescription' function, and you can add flags with the 'addOption' command. Finally, you should add the action for this command using the 'setAction' function.

```typescript
commandLine
    .addCommand('command')
    .setDsescription('set description')
    .addOption({
        flag: '--flag',
        alias: '-f',
        description: 'flag option',
        value: 'flag-value'
    })
    .setAction(() => console.log('Hello world!'))
```

To add the flags, you have some options. The 'flag' and 'alias' attributes can be provided without the ' -- ' and ' - ' prefixes, but they must be sent with these prefixes in the command line. If you don't want the flags to come with any default values, simply don't provide any value in the 'value' attribute; it is optional.

## Action Options

The actions can receive two parameters: the first one is the argument that can be sent by the user after calling the command, and the second one is a JSON object representing the flags and their values, either default or sent with the respective flags. 


```typescript
commandLine
    .addCommand('command')
    .setDsescription('set description')
    .addOption({
        flag: '--flag',
        description: 'flag option',
    })
    .setAction((arg, options) => console.log(arg, options))
```

The values sent above are only the flags or aliases that are registered in the command and are sent in the command line.

## Observation

If you are building your CLI with TypeScript and using [ts-node](https://typestrong.org/ts-node/) or [tsx](https://www.npmjs.com/package/tsx) to execute your code during tests, it's important to add -- before every command you are sending. This is because there are TypeScript commands that use the same syntax, and by adding this small snippet, it understands that it should take all the arguments sent.

```bash
tsx script.ts -- comando --flag
```