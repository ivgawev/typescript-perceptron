import { Connection } from '#/connection';

class Neuron {
      public readonly inputs: Connection[];
      public readonly outputs: Connection[];
      public bias: number;
      public delta: number;
      public output: number;
      public error: number;

      constructor () {
            this.inputs = [];
            this.outputs = [];
            this.bias = 0;
            this.delta = 0;
            this.output = 0;
            this.error = 0;
      }

      public randomize () {
            return Math.floor(Math.random());
      }
}

export { Neuron };
