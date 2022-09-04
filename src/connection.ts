import { Neuron } from '#/neuron';

class Connection {
      public readonly from: Neuron;
      public readonly to: Neuron;
      public weight: number;
      public change: number;

      constructor (from: Neuron, to: Neuron) {
            this.from = from;
            this.to = to;
            this.weight = Math.random();
            this.change = 0;
      }
}

export { Connection };
