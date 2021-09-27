<template>
<div>
    <h1>Input Range</h1>
    <br>
    <br>
    <br>
    <InputRange :min="10" :max="50" :value="23" @change="value => a = value" @sliding="value => b = value" />
    <hr>
    <br>
    <h3>Events</h3>
    <br>
    <p>
        <strong>@sliding:</strong> {{b}}
    </p>
    <hr>
    <p>
        <strong>@change (stop sliding):</strong> {{a}}
    </p>
</div>
    
</template>
<script>
/**
 * Para usar esse componente faça o seguinte
 */
/* eslint-disable */
// import InputRange from '@ersolucoesweb/input-range'
import InputRange from '../src/InputRange'
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
    padding: 100px;
}
</style>