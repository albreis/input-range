# InputRange

Componente para criar range slider

![Input Range](https://raw.github.com/albreis/input-range/master/print.png)

## Instalação 

```properties
yarn add @ersolucoesweb/input-range
```

ou

```properties
npm i -s @ersolucoesweb/input-range
```

## Exemplo:
```vue
<template>
<div>
    <InputRange :min="10" :max="50" :value="23" @change="value => a = value" @sliding="value => b = value" />
    <hr>
    <p>
        <strong>On sliding:</strong> {{b}}
    </p>
    <hr>
    <p>
        <strong>On change (stop sliding):</strong> {{a}}
    </p>
</div>
</template>
/**
 * Para usar esse componente faça o seguinte
 */
import InputRange from '@ersolucoesweb/input-range'
export default {
    components: {
        InputRange
    },
    data() {
        return{
            a: 0,
            b: 0
        }
    }
}
</script>
<style lang="stylus">
body {
    font-family: sans-serif;
}
</style>
```
Acesse a documentação em https://albreis.github.io/input-range/

## Suporte 
https://www.ersolucoesweb.com.br