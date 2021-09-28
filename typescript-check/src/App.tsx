import React from 'react';
import logo from './logo.svg';
import './App.css';

//DECORATOR
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor) {
        
        console.log('a')
  };
}

//MIXIN
type Constructor<T = {}> = new (...args: any[]) => T;

// A mixin that adds a property
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// a mixin that adds a property and methods
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    @enumerable(false)
    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

class User {
  name = '';
}

const TimestampedUser = Timestamped(User);

const TimestampedActivatableUser = Timestamped(Activatable(User));

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActivatableUserExample = new TimestampedActivatableUser();
timestampedActivatableUserExample.activate();

console.log(timestampedActivatableUserExample.timestamp);
console.log(timestampedActivatableUserExample.isActivated);




type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getters<Person>;
 
class a implements Person


console.log(a);


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