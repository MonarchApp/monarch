import 'isomorphic-fetch';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import SinonChai from 'sinon-chai';

Chai.use(SinonChai);
Chai.use(ChaiAsPromised);

global.expect = Chai.expect;
global.window = {};
