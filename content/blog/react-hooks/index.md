---
title: React Hooks 
description: The functional way to React.
date: 2020-07-11
tags: ["react", "react-hooks"]
---

## Introduction

Hooks are a new API introduced in React v16.8 which consist of a set of primitive functions that give us the ability to manage state and coordinate with the component lifecycle. This post introduces hooks assuming you are familar with `setState` and lifecycle methods (`componentDidMount`, etc.) in class components.

## Writing a class component

Before we jump into hooks, let's create a class component and name it `Nametag`.

```tsx
class Nametag extends React.Component {
  render() {
    return (
      <div>
        <h3>Hello my name is:</h3>
        <p>Austin</p>
      </div>
    );
  }
}
```

> *insert screenshot of component*

Let's say we want to allow the user to enter their name. To do this we'll add state and a text input.

```tsx
interface State {
  name: string;
}

class Nametag extends React.Component<{}, State> {
  // highlight-start
  constructor(props: {}) {
    super(props);

    this.state = {
      name: "Austin"
    };
  }

  onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };
  // highlight-end

  render() {
    return (
      <div>
        <h3>Hello my name is:</h3>
        {/* highlight-start */}
        <input
          type="text"
          value={this.state.name}
          onChange={this.onNameChange}
        />
         {/* highlight-end */}
      </div>
    );
  }
}
```

> *insert screenshot here*

## Working with function components

Now we want to take this class component and convert it to a function, starting with the static name.

```tsx
const Nametag: React.FC = () => {
  return (
    <div>
      <h3>Hello my name is:</h3>
      <p>Austin</p>
    </div>
  );
}
```

#### State

Before we can add the input, we'll have to take a look at our first hook - `useState`.

```tsx
const [state, setState] = useState(initialValue);
```

`useState` is functionallty equivalent to `setState` in class components. It returns an array with 2 items. Array destructuring gives us the ability to name the items logically. The previous code is equivalent to the following:

```tsx
const hook = useState(initialValue);

// current state value - set to initialValue on first render
const state = hook[0];

// a function that sets a new state
const setState = hook[1];
```

Equipped with this hook, we can update our functional component to include the name input, like in our class component.

```tsx
const Nametag: React.FC = () => {
  // highlight-start
  const [name, setName] = useState("Austin");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  // highlight-end

  return (
    <div>
      <h3>Hello my name is:</h3>
      {/* highlight-start */}
      <input
        type="text"
        value={name}
        onChange={onNameChange}
      />
      {/* highlight-end */}
    </div>
  );
};
```

Calling `setName` re-renders the component and `name` is assigned the value passed in.

## Hooks - pros

Content

## Hooks - cons

1. This is a test
2. This is also a test

## Testing hooks

Content
