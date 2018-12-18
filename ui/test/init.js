import 'isomorphic-fetch';
import Adapter from 'enzyme-adapter-react-16';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import Enzyme from 'enzyme';
import SinonChai from 'sinon-chai';

Enzyme.configure({adapter: new Adapter()});

Chai.use(ChaiAsPromised);
Chai.use(SinonChai);

global.expect = Chai.expect;
global.mount = Enzyme.mount;
global.render = Enzyme.render;
global.shallow = Enzyme.shallow;
