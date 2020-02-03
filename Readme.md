# ReactSelectDropdown

ReactSelectDropdown is a JS library which is dropdwon with all the features of select element given by HTML. 

## Why we need this module

When we use default select of HTML we are not able to modify its CSS completely specially for option menu but this module gives you the feature of select and allow you to set CSS in any way you want it to be.

## Installation

```bash
npm install --save reactjs-selectdropdown
```

## Usage

```js
import SelectDropdown from 'ReactSelectDropdown';

<SelectDropdown 
  data={data} 
  labelToShow='labelCheck' 
  getData={(data) =>{
    console.log(data)
  }}
  height='200'
  arrowColor='#57a61e'
/>


const data =  [
  { labelCheck: 'A', value: 1 },
  { labelCheck: 'B', value: 2 },
  { labelCheck: 'C', value: 3 },
  { labelCheck: 'D', value: 4 },
  { labelCheck: 'E', value: 5 },
  { labelCheck: 'F', value: 6 },
] or ['A','B','C','D','E','F']
```

## Props

```js
  className: PropTypes.string,
  labelToShow: PropTypes.string,
  getData: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  height: PropTypes.string,
  arrowColor: PropTypes.string,
```

## DefaultProps

```js
  className: '',
  labelToShow: 'label',
  height: 'auto',
  arrowColor: '#000',
```

## Props Explanation

```js
  className: Pass a dynamic class which will apply the css to the wrapper.

  labelToShow: If you are passing array of object then pass the key of the object you want to render.

  getData: This is function which will return the selected value.

  items: This is data which is an array either of string or objects.

  height: Max-height of the dropdown with scroll.

  arrowColor: color of the chevron.
```

## License

ISC
