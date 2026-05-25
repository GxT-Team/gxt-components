# GxT-Components
GxT's Official Components Library

## Installation
```bash
npm install github:GxT-Team/gxt-components
```

## Usage
```javascript
import {Button} from "@gxt/components";

const Example = () => {
  return (
      <Button
        size={"small"}
        text={"Button"}
        onClick={()=> console.log("Clicked")}
        primary
      />
  );
};

## Run Storybook
```bash
npm run storybook
```
