import { Neuron } from '#/neuron';

class Layer {
      public readonly neurons: Neuron[];

      constructor (neurons: number) {
            this.neurons = [];
            for (let i = 0; i < neurons; i++) {
                  const neuron = new Neuron();
                  this.neurons.push(neuron);
            }
      }
}

export { Layer };
