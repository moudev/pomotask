# Pomotask

Pomodoro timer and To-do list combination.

App made with [Vue.js v2](https://vuejs.org/). To convert the app to a desktop app was used: [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/#installation)

## Features

- Pomodoro timer (max 60 mins)
- To-do list with multiple states
- Drag and drop to order the tasks
- Local storage
- Dark mode

![pomotask](https://user-images.githubusercontent.com/13499566/148619612-9313adcd-bd09-4045-a306-b970951c426a.png)

## More information

### How do task states work?

In the file `./src/components/TodoList/tabs.js` is exported an array with the task states. Each state is a select option of each task item. Doesn't exist limit of states.

An array item has the `name` attribute which is the name shown in the state select.

When you add one task to the list is required to know the default state of the task, for that reason exist the boolean attribute `isDefaultTab`. Only one element needs to have the attribute with the `true` value.

### How to add another task state?

You can have multiple states, not limit. Only add an element with the `name` attribute.

## Project setup

```bash
yarn install
```

### Development

```bash
yarn electron:serve
```

### Build (Windows and GNU/Linux 32-bit)

```bash
yarn electron:build
```

### Lints and fixes files

```bash
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
