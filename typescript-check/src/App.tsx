import React from 'react';
import logo from './logo.svg';
import './App.css';

//DECORATOR
function logable() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (args: any[]) {
        console.log('called:', propertyKey)
        original.call(this);
    }  
  };
}

//MIXIN
type Constructor<T = {}> = new (...args: any[]) => T;

// a mixin that adds a property and methods
function Activatable<TBase extends Constructor>(Base: TBase) {
   class ActivatableClass extends Base {

    isActivated = false;

    @logable()
    activate() { 
      this.isActivated = true;
    }

    @logable()
    deactivate() {
      this.isActivated = false;
    }
  };

  return ActivatableClass;
}

class User {
  name = '';
}


type UserType = {
    id: number;
    name: string;
    age: number;
};


//MAPPED
type CreateImutableType<Type> = {
  +readonly [Property in keyof Type]: Type[Property];
};

const ActivatableUser = Activatable(User);
type ImutableUserType = CreateImutableType<UserType>;

var imutableUser: ImutableUserType = {
   id: 10,
   name: "Nick",
   age: 22
}

console.log(imutableUser);

const activatableUserExample = new ActivatableUser();
activatableUserExample.activate();

console.log(activatableUserExample.isActivated);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;