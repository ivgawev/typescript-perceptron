import { Layer } from '#/layer';
import { Connection } from '#/connection';
import { sigmoid } from '#/utils';

class Network {
      public readonly layers: Layer[];
      public learningRate: number;
      public momentum: number;
      public iterations: number;

      constructor (layers: number[]) {
            this.layers = layers.map((amount, index) => {
                  const layer = new Layer(amount);

                  if (index > 0) {
                        for (const neuron of layer.neurons) {
                              neuron.bias = neuron.randomize();
                        }
                  }

                  return layer;
            });

            this.learningRate = 0.3;
            this.momentum = 0.1;
            this.iterations = 0;
            this.connectLayers();
      }

      public train (input: number[], output: number[]) {
            this.activate(input);
            this.run();
            this.calculateDeltas(output);
            this.adjustWeights();
            this.iterations++;
      }

      private connectLayers () {
            for (let l = 1; l < this.layers.length; l++) {
                  const current = this.layers[l];
                  const previous = this.layers[l - 1];

                  for (let p = 0; p < previous.neurons.length; p++) {
                        for (let c = 0; c < current.neurons.length; c++) {
                              const connection = new Connection(previous.neurons[p], current.neurons[c]);
                              previous.neurons[p].outputs.push(connection);
                              current.neurons[c].inputs.push(connection);
                        }
                  }
            }
      }

      public activate (values: number[]) {
            this.layers[0].neurons.forEach((neuron, index) => {
                  neuron.output = values[index];
            });
      }

      public run () {
            for (let l = 1; l < this.layers.length; l++) {
                  const layer = this.layers[l];
                  const neurons = layer.neurons;

                  for (let n = 0; n < neurons.length; n++) {
                        const neuron = neurons[n];
                        const bias = neuron.bias;

                        const connectionsValue = neuron.inputs.reduce((previous, connection) => {
                              const value = connection.weight * connection.from.output;
                              return previous + value;
                        }, 0);

                        neuron.output = sigmoid(bias + connectionsValue);
                  }
            }

            return this.layers[this.layers.length - 1].neurons.map((neuron) => neuron.output);
      }

      private calculateDeltas (target: number[]) {
            for (let l = this.layers.length - 1; l >= 0; l--) {
                  const current = this.layers[l];

                  for (let n = 0; n < current.neurons.length; n++) {
                        const neuron = current.neurons[n];
                        const output = neuron.output;
                        let error = 0;

                        if (l === (this.layers.length - 1)) {
                              error = target[n] - output;
                        } else {
                              for (let c = 0; c < neuron.outputs.length; c++) {
                                    const connection = neuron.outputs[c];
                                    error += connection.to.delta * connection.weight;
                              }
                        }

                        neuron.error = error;
                        neuron.delta = error * output * (1 - output);
                  }
            }
      }

      private adjustWeights () {
            for (let l = 1; l <= this.layers.length - 1; l++) {
                  const current = this.layers[l];

                  for (let n = 0; n < current.neurons.length; n++) {
                        const neuron = current.neurons[n];
                        const delta = neuron.delta;

                        for (let c = 0; c < neuron.inputs.length; c++) {
                              const connection = neuron.inputs[c];
                              const change = (this.learningRate * delta * connection.from.output) + (this.momentum * connection.change);
                              connection.change = change;
                              connection.weight = connection.weight + change;
                        }

                        neuron.bias = neuron.bias + (this.learningRate * delta);
                  }
            }
      }
}

export { Network };
