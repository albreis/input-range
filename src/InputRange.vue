<template>
<div class="input-range">
    <div class="left">
        <span class="min">
            {{min}}<slot name="min"><span>KM</span></slot>
        </span>
    </div>
    <div @mouseout="unlock" ref="center" class="center" @mousedown="lock($event)" @mouseup="unlock($event)">
        <div ref="line" class="line">
            <div ref="handler" class="handler"></div>
        </div>
        <div class="value">
            {{valor}}<slot name="value"><span>KM</span></slot>
        </div>
    </div>
    <div class="right">
        <span class="max">
            {{max}}<slot name="max"><span>KM</span></slot>
        </span>
    </div>
</div>
</template>

<script>
/**
 * Created at 2021-09-26 19:32:14
 */
export default {
  name: 'InputRange',
  props: {
      min: {
          default: 0
      },
      max: {
          default: 33
      },
      value: {
          default: false
      }
  },
  components: {},
  computed: {},
  data() {
    return {
        locked: false,
        valor: 0,
        listener: false
    }
  },
  mounted() {
      /**
       * Se o valor não for boleano
       * inicia o calculo da posição do ponteiro
       */
      if(this.value !== false) {
          /**
           * Posição inicial do ponteiro quendo é definido
           * o atributo VALUE nas propriedades do componente
           * (diferença entre max e value) / (diferença max e min) * 100
           * para descobrir a porcentagem do valor inicial em relação ao valor max
           */
          let valor = (((this.max - this.value) / (this.max - this.min)) * 100)

          /**
           * Define a posição X do ponteiro
           */
          this.$refs.handler.style.left = `${100 - valor}%`

          /**
           * Define o valor em unidades
           */
          this.valor = this.value
      }
      else {
          /**
           * Caso não tenha valor inicial definido
           * inicia o ponteiro a 50% do valor máximo
           */
          this.$refs.handler.style.left = `50%`
          this.valor = ((this.max - this.value) / 2)
      }

      /**
       * Monitora o evento mouseup par finalizar o arraste do ponteiro
       * independente de onde o mouse seja solto
       */
        window.addEventListener('mouseup', () => {
            /**
             * Verifica se a referencia existe
             */
            if(this.$refs.center) {
              try {
                  /**
                   * Remove o event listener
                   */
                this.$refs.center.removeEventListener('mousemove', this.$refs.center, true)
              } catch(e) {
                  console.log(e)
              }
            }
        })
        window.addEventListener('touchend', () => {
            /**
             * Verifica se a referencia existe
             */
            if(this.$refs.center) {
              try {
                  /**
                   * Remove o event listener
                   */
                this.$refs.center.removeEventListener('touchmove', this.$refs.center, true)
              } catch(e) {
                  console.log(e)
              }
            }
        })
        setTimeout(() => this.$forceUpdate(), 1000)
  },
  methods: {
      calculate(e) {
          /**
           * Percentual proporcional do eixo X do mouse
           * em relação a largura do componente
           */
          let percent = (e.offsetX / this.$refs.line.offsetWidth) * 100

          /**
           * Diferença percentual no valor mínimo em relação
           * ao eixo X do mouse
           */
          let min = parseFloat(this.min) - (parseFloat(this.min) * (percent / 100))

          /**
           * Baseado no percentual do eixo X do mouse
           * calculamos o valor atual baseado no valor máximo
           */
          let valor = (((percent / 100) * this.max) + min).toFixed(1)

          
          if(valor > parseInt(this.max) || valor < parseInt(this.min)) {
             return this.unlock()
          }
          this.valor = valor
          this.$refs.handler.style.left = `${e.offsetX-15}px`
      },
      /* eslint-disable */
      lock(e) {
            if('targetTouches' in e) {
                e = {offsetX: e.targetTouches[0].clientX - e.targetTouches[0].target.offsetLeft}
            }
        //   console.log('Lock: ', e)
          this.calculate(e)
          this.locked = true
          this.listener =  this.$refs.center.addEventListener('mousemove', e => {
            if(this.locked) {
                this.calculate(e)
                this.$emit('sliding', this.valor)
            }
          })
          this.listener =  this.$refs.center.addEventListener('touchmove', e => {
            if(this.locked) {
                this.calculate({offsetX: e.targetTouches[0].clientX - e.targetTouches[0].target.offsetLeft})
                this.$emit('sliding', this.valor)
            }
          })
      },
      /* eslint-disable */
      unlock(e) {
        //   console.log('Unlock: ', e)
          this.locked = false
        this.$emit('input', this.valor)
        this.$emit('change', this.valor)
          if(this.listener) {
              try {
                this.$refs.center.removeEventListener('mousemove', this.$refs.center, true)
                this.$refs.center.removeEventListener('touchmove', this.$refs.center, true)
              } catch(e) {
                  console.log(e)
              }
          }
      }
    },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
.input-range {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 31px;
    user-select: none;
    margin-bottom: 40px;
    font-family: sans-serif;
	.left {
		.min {
			color: #000;
			font-size: 25px;
		}
	}

	.center {
		width: 100%;
		position: relative;
		margin: 0 30px;
        height: 31px;
        display: flex;
        align-items: center;
        &:before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            height: 31px;
            width: 100%;
            z-index: 9;
            cursor: pointer;
        }
		.line {
			border: 1px solid #fe043c;
			border-radius: 0.7200000286102295px;
			height: 2px;
			background: #fe043c;
			position: relative;
            width: 100%;
			.handler {
				position: absolute;
				left: 50%;
				top: -15.5px;
				width: 27px;
				height: 27px;
				border: 2px solid #fe043c;
				border-radius: 50px;
				background: #fe043c;
				cursor: pointer;
                user-select: none;
			}
		}

		.value {
			position: absolute;
			top: 35px;
			left: 0;
			text-align: center;
			width: 100%;
			color: #fe043c;
			font-size: 22px;
		}
	}

	.right {
		.max {
			color: #000;
			font-size: 25px;
		}
	}
}

</style>