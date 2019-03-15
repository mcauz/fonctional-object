# Fonctional Object

This module adds functional methods and some useful methods on objects and arrays.
Each function can be rewritten so as not to block any other library.

## Installing

Install the package with npm :

    npm install fonctional-object --save

Import the package in your project :

    require("fonctional-object");

The methods are directly added to the prototypes of Object and Array.

## Summary of methods

- [Array.prototype.clone](#clone)
- [Array.prototype.toObject](#toObject)
- [Object.prototype.clone](#clone)
- [Object.prototype.every](#every)
- [Object.prototype.find](#find)
- [Object.prototype.forEach](#forEach)
- [Object.prototype.has](#has)
- [Object.prototype.isEmpty](#isEmpty)
- [Object.prototype.length](#length)
- [Object.prototype.map](#map)
- [Object.prototype.some](#some)

## Callback

### entryCallbackArray

    entryCallbackArray (value, key, array)

Params :

- **value (*)** - The current value of the array entry.
- **key (Number)** - The current key of the array entry.
- **array (Array)** - The array that contains the value.

### entryCallbackObject

    entryCallbackObject (value, key, object)

Params :

- **value (*)** - The current value of the object entry.
- **key (Number)** - The current key of the object entry.
- **object (Object)** - The object that contains the value.

## Array methods

### clone

    Array.prototype.clone ()

Create a deep clone of the array.

Returns : **Array**

### toObject

    Array.prototype.toObject (key, value)

Transforms the array into an object.

Params :

- **key (entryCallbackArray)** - A callback that give the key.
- **value (entryCallbackArray)** - A callback that give the value.

Returns : **Object**

## Object methods

### clone

    Object.prototype.clone ()

Create a deep clone of the object.

Returns : **Object**

### every

    Object.prototype.every (callback)

Check if each entry of an object respect a callback.

Params :

- **callback (entryCallbackObject)** - The callback for each entry of the object.

Returns : **Boolean**

### find

    Object.prototype.find (key)

Finds an element in the object. Use a dot for the recursion.

Params :

- **key (String)** - The key of the element.

Returns : *

### forEach

    Object.prototype.forEach (callback)

Execute a callback on each entry of the object.

Params :

- **callback (entryCallbackObject)** - The callback for each entry of the object.

### has

    Object.prototype.has (key)

Check the existence of an element in the object. Use a dot for the recursion.

Params :

- **key (String)** - The key of the element.

Returns : **Boolean**

### isEmpty

    Object.prototype.isEmpty

Indicates if the object is empty or not. It's not a function.

### length

    Object.prototype.length

Gets the number of element in the object. It's not a function.

### map

    Object.prototype.map (value, key)

Create a new object from this object.

Params :

- **value (entryCallbackObject)** - The callback for the key.
- **key (entryCallbackObject)** - The callback for the key.

Returns : **Object**

### some

    Object.prototype.some (callback)

Check if at least one entry of an object respect a callback.

Params :

- **callback (entryCallbackObject)** - The callback for each entry of the object.

Returns : **Boolean**

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.